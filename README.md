# electron-vite-vue

🥳 Really simple `Electron` + `Vue` + `Vite` boilerplate.

[![awesome-vite](https://awesome.re/mentioned-badge.svg)](https://github.com/vitejs/awesome-vite)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ae3863e3-1aec-4eb1-8f9f-1890af56929d/deploy-status)](https://app.netlify.com/sites/electron-vite/deploys)
[![GitHub license](https://img.shields.io/github/license/caoxiemeihao/electron-vite-vue?style=flat)](https://github.com/electron-vite/electron-vite-vue/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/caoxiemeihao/electron-vite-vue?color=fa6470&style=flat)](https://github.com/electron-vite/electron-vite-vue)
[![GitHub forks](https://img.shields.io/github/forks/caoxiemeihao/electron-vite-vue?style=flat)](https://github.com/electron-vite/electron-vite-vue)
[![GitHub Build](https://github.com/electron-vite/electron-vite-vue/actions/workflows/build.yml/badge.svg)](https://github.com/electron-vite/electron-vite-vue/actions/workflows/build.yml)

## Features

📦 Out of the box  
🎯 Based on the official [vue-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts) template, less invasive  
🌱 Extensible, really simple directory structure  
💪 Support using Node.js API in Electron-Renderer  
🔩 Support C/C++ native addons  
🖥 It's easy to implement multiple windows

## Quick Start

```sh
npm create electron-vite
```

<!-- [![quick-start](https://asciinema.org/a/483731.svg)](https://asciinema.org/a/483731) -->

![electron-vite-vue.gif](https://github.com/electron-vite/electron-vite-vue/blob/main/public/electron-vite-vue.gif?raw=true)

## Debug

![electron-vite-react-debug.gif](https://github.com/electron-vite/electron-vite-react/blob/main/public/electron-vite-react-debug.gif?raw=true)

## Directory

```diff
+ ├─┬ electron
+ │ ├─┬ main
+ │ │ └── index.ts    entry of Electron-Main
+ │ └─┬ preload
+ │   └── index.ts    entry of Preload-Scripts
  ├─┬ src
  │ └── main.ts       entry of Electron-Renderer
  ├── index.html
  ├── package.json
  └── vite.config.ts
```

## 🚨 Be aware

By default, this template integrates Node.js in the Renderer process. If you don't need it, you just remove the option below. [Because it will modify the default config of Vite](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#config-presets-opinionated).

```diff
# vite.config.ts

electron({
- renderer: {}
})
```

## FAQ

- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#dependencies-vs-devdependencies)
- [Using C/C++ native addons in Electron-Renderer](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#load-nodejs-cc-native-modules)
- [Node.js ESM packages](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#nodejs-esm-packages) (e.g. `execa` `node-fetch`)

# my-electron-app

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

### 涉及技术栈：

- 本体：[Electron](https://www.electronjs.org/)
- web 框架：[Vue3](https://vuejs.org)
- 项目脚手架：[electron-vite-vue](https://github.com/electron-vite/electron-vite-vue)
- UI 库：[BalmUI](https://material.balmjs.com)
- 状态管理：[Vuex](https://vuex.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)

### 需求:

#### 总目标

使用 electron 开发一个记事本桌面应用

#### 需求拆解:

##### 文件

- [ ] 新建
- [ ] 新建窗口
- [ ] 打开
- [ ] 保存
- [ ] 另存为
- [x] 退出

##### 编辑

- [ ] 撤销
- [ ] 剪切
- [ ] 复制
- [ ] 粘贴
- [ ] 删除
- [ ] 查找
- [ ] 查找上一个
- [ ] 查找下一个
- [ ] 替换
- [ ] 转到
- [ ] 全选
- [ ] 时间/日期
- [ ] 字体

##### 查看

- [x] 缩放
- [ ] 状态栏
- [ ] 自动换行
