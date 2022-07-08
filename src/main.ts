const { app, BrowserWindow } = require('electron');
const path = require('path');
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile(path.join(__dirname, '../index.html'));
  win.on('enter-full-screen', () => {
    console.log('to screen');
  });
  win.webContents.openDevTools();
  const win2 = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win2.loadFile(path.join(__dirname, '../index.html'));
};
app.whenReady().then(() => {
  createWindow();
  // macOS
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // 非macOS平台上没有窗口开启的时候退出app
  // 实践下来控制台项目停止运行并退出
  if (process.platform !== 'darwin') app.quit();
});
