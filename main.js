// Import Moduels //////////////////////////////////////////////////////////////
const {app,BrowserWindow,ipcMain,dialog} = require('electron');
const fs = require('fs');
const Store = require('electron-store');
const {userDefaults} = require('./defaults.js');
const {fileEvents} = require('./events.js');

// Main window variable ////////////////////////////////////////////////////////
let mainWindow;

// Config files ////////////////////////////////////////////////////////////////
let userStore = new Store({
  name: 'user-data',
  defaults: new userDefaults()
});

// Function Literals ///////////////////////////////////////////////////////////
/**
* Creates the main application window and setups event handlers.
**/
function createWindow() {
  // Get window properties from userStore config file.
  let {width,height,maximized} = userStore.get('windowProperties') || userDefaults.getProperties();

  // Create the main window with the stored values or the defaults.
  mainWindow = new BrowserWindow({width,height});

  // Load the index.html into the main window.
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  // Maximize the window if needed.
  if(maximized) {
    mainWindow.maximize();
  }

  // Uncomment the line below to enable Chrome Dev Tools.
  mainWindow.openDevTools();

  // Save current window properties as they change.
  mainWindow.on('maximize',saveWindowProperties);
  mainWindow.on('unmaximized',saveWindowProperties);
  mainWindow.on('resize',saveWindowProperties);
}

/**
* Stores the current window properties into the userStore config file.
**/
function saveWindowProperties() {
  let {width,height} = mainWindow.getBounds();
  let maximized = mainWindow.isMaximized();
  userStore.set('windowProperties',{width,height,maximized});
}

/**
* Open a file from the local file system
*/
function openFile(event) {
  // Show the open file dialog to the user.
  const files = dialog.showOpenDialog(mainWindow,{
    properties: ['openFile']
  });

  // If no files selected then exit
  if(files.length === 0) return console.log('No files selected');

  // If files where selected, loop through each file and read it
  files.forEach((fileName) => {
    fs.readFile(fileName,'utf8',(err,data) => {
      // If there was an error send to console.
      if(err) return console.log(err);

      // Send the contents to the console and the renderer process
      console.log(data);
      event.sender.send(fileEvents.fileOpened,data);
    });
  });
}

// Electron App Event Handlers /////////////////////////////////////////////////
// onReady - create the main application window when the ready event fires
app.on('ready',createWindow);

app.on('window-all-close',function() {
  // Is the platform OS X?
  if(process.platform !== "darwin") {
    app.quit();
  }
});

// IPC Event Handlers //////////////////////////////////////////////////////////
ipcMain.on(fileEvents.fileOpen,openFile);
