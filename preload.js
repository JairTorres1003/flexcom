const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    }
  },
  bateryApi: {

  },
  filesApi: {

  }
});

contextBridge.exposeInMainWorld('optionsWin', {
  optionApi: {
    sendOption(opt) {
      if (opt === 'close') {
        ipcRenderer.send('closeApp');
      }
      if (opt === 'minimize') {
        ipcRenderer.send('minimizeApp');
      }
      if (opt === 'maximizeRestore') {
        ipcRenderer.send('maximizeRestoreApp');
      }
    }
  }
});
