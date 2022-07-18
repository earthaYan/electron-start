// renderer.ts Renderer Process渲染器进程
const setButton = document.getElementById('btn');
const fileButton = document.getElementById('openFile');
console.log(fileButton);
const filePathElement = document.getElementById('filePath');
const timeInput = document.getElementById('title') as HTMLInputElement;
setButton.addEventListener('click', () => {
  const title = timeInput.value;
  // 在渲染器进程中使用传入的主进程的API/方法
  window.electronAPI.setTitle(title);
});
fileButton.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile();
  filePathElement.innerText = filePath;
});
