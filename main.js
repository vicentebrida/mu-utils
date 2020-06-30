// require('material-design-icons/iconfont/material-icons.css');
// require('typeface-roboto/index.css');

const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const url = require('url');

let win;
let winSign;
let winAbout;
let devTools;
let tray;

function createWindow () {
  const appName = 'Mu Utils';
  const backgroundColor = '#44475a';
  const rendersPath = path.join(__dirname, 'renderers');
  const iconPath = path.join(__dirname, 'assets', 'icons', 'icon.png');

  console.log(iconPath);

  win = new BrowserWindow({
    title: appName,
    backgroundColor,
    width: 700,
    height: 500,
    icon: iconPath,
    resizable: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    show: false,
  })

  win.menuBarVisible = false;

  win.loadURL(url.format({
    pathname: path.join(rendersPath, 'main', 'index.html'),
    protocol: 'file',
    slashes: true,
  }));

  win.on('closed', () => {
    app.quit();
  });

  winSign = new BrowserWindow({
    parent: win,
    title: win.title,
    backgroundColor,
    width: 700,
    height: 500,
    icon: iconPath,
    resizable: false,
    maximizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  winSign.menuBarVisible = false;

  winSign.loadURL(url.format({
      pathname: path.join(rendersPath, 'signin', 'index.html'),
      protocol: 'file',
      slashes: true,
  }));

  winSign.on('closed', () => {
    app.quit();
  });

  winAbout = new BrowserWindow({
    parent: win,
    title: win.title,
    backgroundColor,
    width: 700,
    height: 500,
    icon: iconPath,
    resizable: false,
    maximizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    show: false,
  });

  winAbout.menuBarVisible = false;

  winAbout.loadURL(url.format({
      pathname: path.join(rendersPath, 'about', 'index.html'),
      protocol: 'file',
      slashes: true,
  }));

  winAbout.on('close', (event) => {
    event.preventDefault();
    winAbout.hide();
  });

  devTools = new BrowserWindow({
    x: 0,
    y: 0,
  });
  win.webContents.setDevToolsWebContents(devTools.webContents);
  win.webContents.openDevTools({ mode: 'detach' });

  // tray = new Tray(iconPath);

  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'Item1', type: 'radio' },
  //   { label: 'Item2', type: 'radio' },
  //   { label: 'Item3', type: 'radio', checked: true },
  //   { label: 'Item4', type: 'radio' }
  // ]);

  // tray.setToolTip('Mu Utils');

  // tray.setContextMenu(contextMenu);

  ipcMain.on('Session', (event, arg) => {
    win.show();
    winSign.hide();
  });

  ipcMain.on('SignIn', (event) => {
    winSign.loadURL(url.format({
      pathname: path.join(rendersPath, 'signin', 'index.html'),
      protocol: 'file',
      slashes: true,
    }));
  });

  ipcMain.on('SignUp', (event) => {
    winSign.loadURL(url.format({
      pathname: path.join(rendersPath, 'signup', 'index.html'),
      protocol: 'file',
      slashes: true,
    }));
  });

  ipcMain.on('Locale', (event) => {
    event.returnValue = app.getLocale();
  });

  ipcMain.on('Logoff', (event) => {
    winSign.show();
    win.hide();
  });

  ipcMain.on('About', (event) => {
    winAbout.show();
  });

  ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
  });

  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

app
  .whenReady()
  .then(createWindow);
