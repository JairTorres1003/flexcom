const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

function createWindow() {
  const mainWin = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 900,
    minHeight: 700,
    resizable: true,
    title: 'Flexcom',
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWin.setMenu(null);
  mainWin.loadURL('http://localhost:3000');
  mainWin.setBackgroundColor('#2c5364');

  mainWin.webContents.openDevTools(); // open devTools

  ipcMain.on('closeApp', () => {
    mainWin.close();
  });
  ipcMain.on('minimizeApp', () => {
    mainWin.minimize();
  });
  ipcMain.on('maximizeRestoreApp', () => {
    if (mainWin.isMaximized()) {
      mainWin.unmaximize();
    } else {
      mainWin.maximize();
    }
  });
}

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

ipcMain.on('notify', (_, message) => {
  new Notification({
    title: 'Flexcom',
    body: message
  }).show();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});