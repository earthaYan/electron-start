import { contextBridge, ipcRenderer } from 'electron';
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
// 看上去preload.js是一个中介的角色?
contextBridge.exposeInMainWorld('electronAPI', {
  // 暴露接口：使用ipcRenderer发送消息
  setTitle: (title: string) => ipcRenderer.send('set-title', title),
});
