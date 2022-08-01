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
      },
      {
        label: '新建窗口',
      },
      {
        label: '打开',
      },
      {
        label: '保存',
      },
      {
        label: '另存为',
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
