import { IpcMainEvent } from 'electron';
const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  nativeTheme,
  Menu,
} = require('electron');
const path = require('path');
// 全局启动沙盒
// app.enableSandbox()
function handleSetTitle(event: IpcMainEvent, title: string) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}
function handleThemeToggle() {
  console.log('切换主题', nativeTheme.shouldUseDarkColors);
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light';
  } else {
    nativeTheme.themeSource = 'dark';
  }
  return nativeTheme.shouldUseDarkColors;
}
function handleSystemTheme() {
  nativeTheme.themeSource = 'system';
}
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: true,
    },
  });
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: '自增',
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: '自减',
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
  mainWindow.loadFile(path.join(__dirname, '../index.html'));
  mainWindow.webContents.openDevTools();
}
app.whenReady().then(() => {
  // 使用ipcMain.on监听事件window.
  //  renderer->main单向接收
  ipcMain.on('set-title', handleSetTitle);
  // 使用ipcMain.handle设置事件处理器
  // renderer->main双向
  ipcMain.handle('dialog:openFile', handleFileOpen);
  ipcMain.handle('dark-mode:toggle', handleThemeToggle);
  ipcMain.handle('dark-mode:system', handleSystemTheme);
  createWindow();
});
app.on('window-all-closed', () => {
  // 非macOS平台上没有窗口开启的时候退出app
  // 实践下来控制台项目停止运行并退出
  if (process.platform !== 'darwin') app.quit();
});
