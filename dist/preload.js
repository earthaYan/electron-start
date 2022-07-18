var _a = require('electron'), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
window.addEventListener('DOMContentLoaded', function () {
    var replaceText = function (selector, text) {
        var element = document.getElementById(selector);
        if (element)
            element.innerText = text;
    };
    for (var _i = 0, _a = ['chrome', 'node', 'electron']; _i < _a.length; _i++) {
        var dependency = _a[_i];
        replaceText("".concat(dependency, "-version"), process.versions[dependency]);
    }
});
// 看上去preload.js是一个中介的角色?
contextBridge.exposeInMainWorld('electronAPI', {
    // 暴露接口：使用ipcRenderer发送消息
    // renderer->main单向发送
    setTitle: function (title) { return ipcRenderer.send('set-title', title); },
    // // renderer->main双向发送
    openFile: function () { return ipcRenderer.invoke('dialog:openFile'); },
    // main->renderer
    onUpdateCounter: function (callback) {
        return ipcRenderer.on('update-counter', callback);
    },
    toggleThemeDarkMode: function () { return ipcRenderer.invoke('dark-mode:toggle'); },
    toggleThemeSystem: function () { return ipcRenderer.invoke('dark-mode:system'); }
});
//# sourceMappingURL=preload.js.map