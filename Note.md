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

## 关于vue的ref

ref 作用：允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用，即直接访问底层 DOM

---
## vue的响应式
### reactive
```javascript
const state=reactive({
  name:'joe'
})
```
限制：

- 仅对对象类型有效（对象、数组和 Map、Set ），而对 string、number 和 boolean 这样的 原始类型 无效。
- Vue 的响应式系统是通过 property 访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着不可以随意地“替换”一个响应式对象(赋值解构到本地变量)，因为这将导致对初始引用的响应性连接丢失：
```javascript
let state = reactive({ count: 0 })
// 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
state = reactive({ count: 1 })
const state = reactive({ count: 0 })

// n 是一个局部变量，同 state.count
// 失去响应性连接
let n = state.count
// 不影响原始的 state
n++

// count 也和 state.count 失去了响应性连接
let { count } = state
// 不会影响原始的 state
count++

// 该函数接收一个普通数字，并且
// 将无法跟踪 state.count 的变化
callSomeFunction(state.count)
```
### ref

- 创建可以使用任何值类型的响应式 ref
- 但是似乎解决不了结构之后丢失响应式的问题???
```javascript
import { ref } from 'vue'
const editingText=ref('')
```

### vue+ts 获取第三方组件内类型并在ref中使用
```typescript
import {UiEditor} from 'balm-ui-plus'
const editor = ref<null|InstanceType<typeof UiEditor>>(null)
```