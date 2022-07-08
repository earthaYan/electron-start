var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow;
var path = require('path');
var createWindow = function () {
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.loadFile(path.join(__dirname, '../index.html'));
    win.on('enter-full-screen', function () {
        console.log('to screen');
    });
    win.webContents.openDevTools();
    var win2 = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win2.loadFile(path.join(__dirname, '../index.html'));
};
app.whenReady().then(function () {
    createWindow();
    // macOS
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows.length === 0) {
            createWindow();
        }
    });
});
app.on('window-all-closed', function () {
    // 非macOS平台上没有窗口开启的时候退出app
    // if (process.platform !== 'darwin') app.quit();
});
//# sourceMappingURL=main.js.map