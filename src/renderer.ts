// renderer.ts Renderer Process渲染器进程
const setButton = document.getElementById('btn');

const timeInput = document.getElementById('title') as HTMLInputElement;
setButton.addEventListener('click', () => {
  const title = timeInput.value;
  // 在渲染器进程中使用传入的主进程的API/方法
  window.electronAPI.setTitle(title);
});
