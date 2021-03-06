const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld("comms", {
    send: (data) => {
        ipcRenderer.send("rr_berlin", data);
    },
    on: (listener) => {
        ipcRenderer.on("rr_berlin", listener);
    }
});