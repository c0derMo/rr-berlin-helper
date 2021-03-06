const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const createImage = require('./image_creation');

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 320,
    height: 390,
    webPreferences: {
      preload: path.join(__dirname, "preload_communication.js")
    },
    resizable: false
  })

  win.loadFile('index.html')
  win.setMenu(null);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

let timeout = 0;
let tm;

ipcMain.on('rr_berlin', (event, data) => {
  if(Date.now() - timeout < 5000) {
    if(tm == undefined) {
      tm = setTimeout(() => {
        createImage(data);
        console.log("Function called.");
        tm = undefined;
        timeout = Date.now();
      }, 5000 - (Date.now() - timeout));
    }
  } else {
    createImage(data);
    timeout = Date.now();
  }
});