// Importa o módulo ipcRenderer do Electron
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("electron", {
    receive: (channel) => {
        console.log(channel);
        return ipcRenderer.invoke(channel);
    },
    send: (channel, data) => {
        let a = ipcRenderer.send(channel, data);
        console.log(a);
    }
});


