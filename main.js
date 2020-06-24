// require('material-design-icons/iconfont/material-icons.css');
// require('typeface-roboto/index.css');

const { app, BrowserWindow, Menu, MenuItem, ipcMain, ipcRenderer } = require('electron');
const path = require('path');
const url = require('url');

let win;
let winSignIn;
let winAbout;
let devTools;

function createWindow () {
  const appName = 'Mu Utils';
  const rendersPath = path.join(__dirname, 'renderers');
  const iconPath = path.join(__dirname, 'assets', 'icons', 'icon.png');

  win = new BrowserWindow({
    title: appName,
    width: 600,
    height: 400,
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

  winSignIn = new BrowserWindow({
    parent: win,
    title: win.title,
    width: 600,
    height: 400,
    icon: iconPath,
    resizable: false,
    maximizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  winSignIn.menuBarVisible = false;

  winSignIn.loadURL(url.format({
      pathname: path.join(rendersPath, 'signin', 'index.html'),
      protocol: 'file',
      slashes: true,
  }));

  winSignIn.on('closed', () => {
    app.quit();
  });

  winAbout = new BrowserWindow({
    parent: win,
    title: win.title,
    width: 600,
    height: 400,
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
  winAbout.webContents.setDevToolsWebContents(devTools.webContents);
  winAbout.webContents.openDevTools({ mode: 'detach' });

  ipcMain.on('SignIn', (event, arg) => {
    win.show();
    winSignIn.hide();
  });

  ipcMain.on('Locale', (event) => {
    event.returnValue = app.getLocale();
  });

  ipcMain.on('Logoff', (event) => {
    winSignIn.show();
    win.hide();
  });

  ipcMain.on('About', (event) => {
    winAbout.show();
  });
}

app.whenReady().then(createWindow);
