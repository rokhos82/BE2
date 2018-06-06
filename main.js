const {app,BrowserWindow,ipcMain} = require('electron');
const Store = require('electron-store');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadURL(`file://${__dirname}/src/index.html`);

  win.openDevTools();
}

app.on('ready',createWindow);

app.on('window-all-close',function() {
  // Is the platform OS X?
  if(process.platform !== "darwin") {
    app.quit();
  }
});
