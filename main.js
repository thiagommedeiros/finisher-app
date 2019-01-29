const { app, BrowserWindow } = require('electron')

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 200, height: 200 })
  mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.setAlwaysOnTop(true, 'floating', 1)
  mainWindow.setVisibleOnAllWorkspaces(true)
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
