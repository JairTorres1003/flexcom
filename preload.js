const { ipcRenderer, contextBridge } = require('electron');

const API = {
  window: {
    close: () => ipcRenderer.send('app/close'),
    minimize: () => ipcRenderer.send('app/minimize'),
    maximize_restore: () => ipcRenderer.send('app/maximize_restore'),
  }
}

contextBridge.exposeInMainWorld('app', API);