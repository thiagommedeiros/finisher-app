const { ipcRenderer } = require('electron')

// connect the user
const env = ''

const url = env === 'prod'
  ? 'https://finisher-server.herokuapp.com/' 
  : 'http://localhost:8888'

const socket = io(url)
window.userId = '_' + Math.random().toString(36).substr(2, 9)

let isAdmin = false

// selectors
const finishPanel = document.querySelector('#finishPanel')
const waitingPanel = document.querySelector('#waitingPanel')
const adminPanel = document.querySelector('#adminPanel')

const enterButton = document.querySelector('#enterButton')
const finishButton = document.querySelector('#finishButton')
const clearButton = document.querySelector('#clearButton')

const inputName = document.querySelector('#inputName')
const usersList = document.querySelector('#usersList')

const panels = document.querySelectorAll('.panel')

const hideAllPanels = () => 
  panels.forEach(panel => panel.classList.add('hidden'))


// admin controls
clearButton.addEventListener('click', () => {
  socket.emit('clearUsersStatus')
})

socket.on('usersReady', value => {
  if (isAdmin) return
  
  hideAllPanels()
  finishPanel.classList.remove('hidden')
})


// users state
socket.on('usersState', users => {
  const usersHTML = users.map(user => `
    <li class="${user.status}">
      <span class="name">${user.name}</span>
      <span class="status">${user.status}</span>
    </li>
  `).join('')

  usersList.innerHTML = usersHTML
})

// add user
const addUser = () => {
  const name = inputName.value

  if (!name) {
    alert('Preencha seu nome corretamente!')
    return
  }

  hideAllPanels()

  socket.emit('enter', {
    id: window.userId,
    name,
  })
  
  if (name === 'Professor') {
    isAdmin = true
    ipcRenderer.send('resize-window')
    adminPanel.classList.remove('hidden')
  } else {
    waitingPanel.classList.remove('hidden')
  }
}

// login event
enterButton.addEventListener('click', addUser)
inputName.addEventListener('keyup', (e) => {
  e.keyCode === 13 && addUser()
})


// finish button
finishButton.addEventListener('click', () => {
  hideAllPanels()
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
