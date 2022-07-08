"use strict";
exports.__esModule = true;
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow, ipcMain = _a.ipcMain;
var path = require('path');
function handleSetTitle(event, title) {
    var webContents = event.sender;
    var win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
}
function createWindow() {
    var mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadFile(path.join(__dirname, '../index.html'));
}
app.whenReady().then(function () {
    // 使用ipcMain.on监听事件window.
    ipcMain.on('set-title', handleSetTitle);
    createWindow();
});
app.on('window-all-closed', function () {
    // 非macOS平台上没有窗口开启的时候退出app
    // 实践下来控制台项目停止运行并退出
    if (process.platform !== 'darwin')
        app.quit();
});
//# sourceMappingURL=main.js.map