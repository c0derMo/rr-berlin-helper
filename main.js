const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const createImage = require('./image_creation');
const requestSpinData = require("./hitmaps_integration")

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 370,
    height: 530,
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
        tm = undefined;
        timeout = Date.now();
      }, 5000 - (Date.now() - timeout));
    }
  } else {
    createImage(data);
    timeout = Date.now();
  }
});

ipcMain.on('rr_link', (event, data) => {
  const splitted = data.split("/")
  const spinID = splitted[splitted.length-1]
  requestSpinData(spinID, (data) => {
    event.reply("rr_spin_data", data)
  })
})