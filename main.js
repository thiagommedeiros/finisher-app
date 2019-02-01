const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    x: 2000,
    y: 0,
    width: 200,
    height: 105,
    frame: true,
    autoHideMenuBar: true,
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.setAlwaysOnTop(true, 'floating', 1)
  mainWindow.setVisibleOnAllWorkspaces(true)

  mainWindow.setMenu(null)

  ipcMain.on('resize-window', (event, arg) => {
    mainWindow.setSize(200, 480)
  })
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
