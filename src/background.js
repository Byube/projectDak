// const path = require('path');
const { app, BrowserWindow } = require('electron');

async function createWindow() {
    let win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
    // win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
}

app.on('ready', createWindow)