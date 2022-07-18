import { ipcRenderer } from 'electron';

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
// const channel = new MessageChannel();
// // 消息发送到port1将会被port2接收，反之亦然
// const port1 = channel.port1;
// const port2 = channel.port2;
// // 允许在另一端还没有注册监听器的情况下就通过通道向其发送消息
// // 消息将排队等待，直到一个监听器注册为止。
// port2.postMessage({ answer: 12 });
// // 这次我们通过 ipc 向主进程发送 port1 对象。 类似的，
// // 我们也可以发送 MessagePorts 到其他 frames, 或发送到 Web Workers, 等.
// ipcRenderer.postMessage('port', null, [port1]);
