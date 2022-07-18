"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
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
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    // 暴露接口：使用ipcRenderer发送消息
    // renderer->main单向发送
    setTitle: function (title) { return electron_1.ipcRenderer.send('set-title', title); },
    // // renderer->main双向发送
    openFile: function () { return electron_1.ipcRenderer.invoke('dialog:openFile'); },
    onUpdateCounter: function (callback) {
        return electron_1.ipcRenderer.on('update-counter', callback);
    }
});
//# sourceMappingURL=preload.js.map