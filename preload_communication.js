const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld("comms", {
    send: (data) => {
        ipcRenderer.send("rr_berlin", data);
    },
    onSpinData: (listener) => {
        ipcRenderer.on("rr_spin_data", listener);
    },
    sendOverlayLink: (link) => {
        ipcRenderer.send("rr_link", link);
    }
});