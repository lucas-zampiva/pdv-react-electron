// Importa o módulo ipcRenderer do Electron
const { ipcRenderer } = require('electron');

// Expor o ipcRenderer para o contexto de renderização da janela
window.api = {
    send: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    receive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
};
