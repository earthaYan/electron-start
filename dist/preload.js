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
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    hello: '你好'
});
//# sourceMappingURL=preload.js.map