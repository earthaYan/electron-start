import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Menu,
  dialog,
  MenuItem,
} from 'electron';
import { release } from 'os';
import { join } from 'path';
import { menuTemplate } from './index.data';
import * as fs from 'fs';
// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, '../..'),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
};

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js');
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`;
const indexHtml = join(ROOT_PATH.dist, 'index.html');
let title = '',
  content = '';
async function createWindow(width?: number, height?: number) {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(ROOT_PATH.public, 'favicon.ico'),
    width: width ?? 800,
    height: height ?? 600,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  // 通过模板生成菜单并设置为顶部菜单栏内容
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  if (app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
    // Open devTool if the app is not packaged
    if (!app.isPackaged) {
      win.webContents.openDevTools();
    }
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => createWindow());

app.on('window-all-closed', () => {
  win = null;
  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// 让主进程代表渲染器进程显示菜单
ipcMain.on('show-context-menu', (event) => {
  const menu = Menu.buildFromTemplate(menuTemplate);
  menu.popup({
    window: BrowserWindow.fromWebContents(event.sender) as BrowserWindow,
  });
});
export function openExistFile(): void {
  // 第一个参数browserWindow允许该对话框将自身附加到父窗口, 作为父窗口的模态框
  dialog
    .showOpenDialog(win as BrowserWindow, {
      // 对话框窗口标题
      title: '选择文件',
      // 对话框默认展示路径
      defaultPath: '',
      // 确认按钮自定义名称,windows默认值是 打开
      buttonLabel: '选定离手',
      // 底部文件过滤,指定某种后缀，并不能过滤文件夹
      filters: [
        {
          name: '文本文档',
          extensions: ['txt'],
        },
        {
          name: 'oneNote',
          extensions: ['one', 'onetoc*'],
        },

        {
          name: '所有文件',
          extensions: ['*'],
        },
      ],
      properties: [
        'openFile',
        // 允许多选
        // 'multiSelections',
        'showHiddenFiles',
        // 当输入的文件路径不存在的时候，提示是否要创建该文件
        // 并不会真正创建,只是允许返回一些不存在地址交给应用程序去创建
        'promptToCreate',
        // 不要将正在打开的项目添加到最近使用中
        'dontAddToRecent',
      ],
    })
    .then((res) => {
      if (!res.canceled) {
        const filePath = res.filePaths[0];
        let titleTemp = res.filePaths[0].split('\\');
        let title = titleTemp[titleTemp.length - 1].split('.')[0];
        fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
          if (err) {
            throw err;
          }
          win?.webContents.send('openExistFile', [
            {
              title: encodeURIComponent(title),
              content: encodeURIComponent(data),
            },
          ]);
        });
      }
    });
}
export function handleOpenNewWin(
  menuItem: MenuItem,
  currentWin: BrowserWindow
): void {
  createWindow(400, 600);
}

function openSaveDialog(): void {
  dialog
    .showSaveDialog({
      title: '保存',
      defaultPath: !!title ? `${title}.md` : '',
      filters: [
        {
          name: '文本文档',
          extensions: ['txt', 'md'],
        },
        {
          name: '所有文档',
          extensions: ['*'],
        },
      ],
      properties: ['dontAddToRecent', 'showHiddenFiles'],
    })
    .then((res) => {
      if (!res.canceled) {
        const filePath = res.filePath;
        fs.writeFile(filePath ?? '', content, {}, () => {
          console.log('successs');
        });
      }
    });
}
ipcMain.handle('dialog:save', async (event, args) => {
  const state = await JSON.parse(decodeURIComponent(args));
  title = state.title;
  content = state.editingText;
  openSaveDialog();
});

export function openMessageBox(): void {
  dialog.showMessageBox({
    // 主题消息
    message: '当前操作违法了',
    // 消息类型: "none", "info", "error", "question"
    type: 'error',
    // 按钮数组,置空或不设置会显示确定按钮
    buttons: [],
    // 对话框打开的时候，设置默认选中的按钮，值为在 buttons 数组中的索引.
    defaultId: 1,
    // 左上角标题
    title: '友情提示',
    // message下的提示内容
    detail: '详情',
    // 按钮是否以链接方式呈现
    noLink: false,
    // 规范跨平台的键盘访问键
    normalizeAccessKeys: true,
    checkboxLabel: '是否认可该结论',
    checkboxChecked: true,
  });
}
