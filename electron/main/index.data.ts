import { handleOpenNewWin, openExistFile, openMessageBox } from '.';

export const menuTemplate: (
  | Electron.MenuItemConstructorOptions
  | Electron.MenuItem
)[] = [
  {
    label: '文件',
    id: 'file',
    submenu: [
      {
        label: '新建',
        click(menuItem, browserWindow, event) {
          browserWindow?.webContents.postMessage('create_new_file', true);
        },
      },
      {
        label: '新建窗口',
        click: handleOpenNewWin,
      },
      {
        label: '打开',
        /**
         * 打开文件功能：
          1.用户点击electron的 打开菜单 ，弹出系统的文件选择弹窗
          2.用户选中文件，点击确定，electron获取文件名和文件内容,读取文件内容
          3.electron把文件名和文件内容转换成字符串传给vue程序
          4.vue页面根据获取到的两个变量显示标题和内容
         */
        click: openExistFile,
      },
      {
        label: '保存',
        /**
         * 保存文件功能
         * 1.用户点击保存按钮，获取当前标题和内容，渲染进程把信息传给主进程
         * 2.electron弹出保存弹窗，用户点击确定，
         * 3.写入文件到系统本地
         */
        click(menuItem, browserWindow, event) {
          browserWindow?.webContents.postMessage('save', true);
        },
      },
      {
        label: '另存为',
        click(menuItem, browserWindow, event) {
          browserWindow?.webContents.postMessage('save', true);
        },
      },
      {
        type: 'separator',
      },
      // 分隔线
      {
        label: '退出',
        role: process.platform === 'darwin' ? 'close' : 'quit',
      },
    ],
  },
  {
    label: '编辑',
    id: 'edit',
    submenu: [
      { label: '撤销' },
      {
        type: 'separator',
      },
      {
        label: '剪切',
      },
      {
        label: '复制',
      },
      {
        label: '粘贴',
      },
      {
        label: '删除',
      },
      {
        type: 'separator',
      },
      {
        label: '查找',
      },
      {
        label: '查找上一个',
      },
      {
        label: '查找下一个',
      },
      {
        label: '替换',
      },
      {
        label: '转到',
      },
      {
        type: 'separator',
      },
      {
        label: '全选',
      },
      {
        label: '时间/日期',
      },
      {
        type: 'separator',
      },
      {
        label: '字体',
      },
    ],
  },
  {
    label: '查看',
    submenu: [
      {
        label: '缩放',
        submenu: [
          {
            label: '放大',
            role: 'zoomIn',
          },
          {
            label: '缩小',
            role: 'zoomOut',
          },
          {
            label: '还原',
            role: 'resetZoom',
          },
        ],
      },
      {
        label: '状态栏',
      },
      {
        label: '自动换行',
      },
    ],
  },
  {
    label: '项目',
    submenu: [
      {
        role: 'reload',
      },
      {
        role: 'forceReload',
      },
    ],
  },
];
