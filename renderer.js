// connect the user
const socket = io('http://localhost:3000')

//selectors
const loginPanel = document.querySelector('#loginPanel')
const statePanel = document.querySelector('#statePanel')
const enterButton = document.querySelector('#enter')  

//helper
const generateId = () => '_' + Math.random().toString(36).substr(2, 9)


//login button
enterButton.addEventListener('click', () => {  
  const name = document.querySelector('#name').value
  
  if (!name) {
    alert('Preencha seu nome corretamente!')
    return
  }
  
  window.userId = generateId()
  
  socket.emit('enter', {
    id: userId,
    name,
  })
  
  loginPanel.classList.add('hidden')
  statePanel.classList.remove('hidden')
})