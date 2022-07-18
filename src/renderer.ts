// renderer.ts Renderer Process渲染器进程
const setButton = document.getElementById('btn');
const fileButton = document.getElementById('openFile');
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
const counter = document.getElementById('counter');

window.electronAPI.onUpdateCounter((_event: any, value: string) => {
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + Number(value);
  counter.innerText = newValue.toString();
});

const darkBtn = document.querySelector('#toggle-dark-mode');
const sysBtn = document.querySelector('#reset-to-system');
darkBtn.addEventListener('click', async () => {
  const isDarkMode = await window.electronAPI.toggleThemeDarkMode();
  document.getElementById('theme-source').innerHTML = isDarkMode
    ? 'Dark'
    : 'Light';
});
sysBtn.addEventListener('click', async () => {
  await window.electronAPI.toggleThemeSystem();
  document.getElementById('theme-source').innerHTML = 'System';
});
