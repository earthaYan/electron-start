## vite 配置 less 和 postcss

vite 支持 less:不需要安装 css-loader 或者 less-loader
postcss 作用：对一些属性自动添加浏览器前缀

```bash
yarn add less -D
yarn add postcss -D
yarn add postcss-preset-env -D //安装插件
```

根目录新建 postcss.config.js 配置文件

```javascript
module.exports = {
  plugins: [require('postcss-preset-env')],
};
```

---

## vite+vue+ts 支持 BalmUI

```bash
yarn add balm-ui
yarn
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.esm.js',
      'balm-ui-css': 'balm-ui/dist/balm-ui.css',
    },
  },
});
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "balm-ui": ["node_modules/balm-ui/dist/balm-ui.d.ts"],
      "balm-ui-plus": ["node_modules/balm-ui/dist/balm-ui-plus.d.ts"]
    }
  }
}
```

```typescript
// main.ts
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui-plus';
import 'balm-ui-css';

createApp(App).use(BalmUI).use(BalmUIPlus);
```

---
