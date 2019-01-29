// connect the user
const socket = io('http://localhost:3000')
window.userId = '_' + Math.random().toString(36).substr(2, 9)


//update users state
socket.on('usersState', state => {
  console.log('novo estado', state)
})


//selectors
const loginPanel = document.querySelector('#loginPanel')
const statePanel = document.querySelector('#statePanel')
const waitingPanel = document.querySelector('#waitingPanel')
const adminPanel = document.querySelector('#adminPanel')
const enterButton = document.querySelector('#enterButton')  
const finishButton = document.querySelector('#finishButton')
const clearButton = document.querySelector('#clearButton')
const usersList = document.querySelector('#usersList')


// admin controls
socket.on('isAdmin', isAdmin => {
  if (isAdmin) {
    statePanel.classList.add('hidden')
    adminPanel.classList.remove('hidden')
  }
})

clearButton.addEventListener('click', () => {
  socket.emit('clearUsersStatus')
})

socket.on('usersReady', value => {
  waitingPanel.classList.add('hidden')
  statePanel.classList.remove('hidden')
})


// users state
socket.on('usersState', users => {
  console.log('chegou')
  const usersHTML = users.map(user => `
    <li class="${user.status}">
      <span class="name">${user.name}</span>
      <span class="status">${user.status}</span>
    </li>
  `).join('')

  usersList.innerHTML = usersHTML
})


//login button
enterButton.addEventListener('click', () => {  
  const name = document.querySelector('#name').value
  
  if (!name) {
    alert('Preencha seu nome corretamente!')
    return
  }
    
  socket.emit('enter', {
    id: window.userId,
    name,
  })
  
  loginPanel.classList.add('hidden')
  statePanel.classList.remove('hidden')
})


//finish button
finishButton.addEventListener('click', () => {
  statePanel.classList.add('hidden')
  waitingPanel.classList.remove('hidden')

  socket.emit('updateUser', { 
    id: window.userId,
    status: 'finished'
  })
})


// user exits
window.onbeforeunload = () => {
  socket.emit('exit', {
    id: window.userId
  })
}
