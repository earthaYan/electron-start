// renderer.ts Renderer Process渲染器进程
var setButton = document.getElementById('btn');
var timeInput = document.getElementById('title');
setButton.addEventListener('click', function () {
    var title = timeInput.value;
    // 在渲染器进程中使用传入的主进程的API/方法
    window.electronAPI.setTitle(title);
});
//# sourceMappingURL=renderer.js.map