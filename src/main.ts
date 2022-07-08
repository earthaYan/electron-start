import { IpcMainEvent } from 'electron';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function handleSetTitle(event: IpcMainEvent, title: string) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadFile(path.join(__dirname, '../index.html'));
}
app.whenReady().then(() => {
  // 使用ipcMain.on监听事件window.
  ipcMain.on('set-title', handleSetTitle);
  createWindow();
});
app.on('window-all-closed', () => {
  // 非macOS平台上没有窗口开启的时候退出app
  // 实践下来控制台项目停止运行并退出
  if (process.platform !== 'darwin') app.quit();
});
