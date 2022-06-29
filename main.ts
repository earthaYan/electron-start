const { app, BrowserWindow } = require('electron');
const path = require('path');
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.ts'),
    },
  });
  win.loadFile('index.html');
  win.webContents.openDevTools();
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
  // macOS
  if (process.platform === 'darwin') app.quit();
});
