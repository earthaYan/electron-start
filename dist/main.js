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
    win.webContents.openDevTools();
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
    // macOS
    if (process.platform === 'darwin')
        app.quit();
});
//# sourceMappingURL=main.js.map