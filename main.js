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
    autoHideMenuBar: true,
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
  mainWin.setBackgroundColor('#141E30');

  // mainWin.webContents.openDevTools(); // open devTools

  ipcMain.on("app/close", () => {
    mainWin.close();
  });
  ipcMain.on("app/minimize", () => {
    mainWin.minimize();
  });
  ipcMain.on("app/maximize_restore", () => {
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