# vite-plugin-vue-app-loading

[![NPM version](https://img.shields.io/npm/v/vite-plugin-vue-app-loading?color=a1b858&label=)](https://www.npmjs.com/package/vite-plugin-vue-app-loading)

给 Vue 应用添加一个加载动画。

## 安装

```bash
npm i vite-plugin-vue-app-loading -D
```

## 使用

```ts
// vite.config.ts
import AppLoading from 'vite-plugin-vue-app-loading'

export default defineConfig({
  plugins: [
    AppLoading(),
  ],
})
```

```ts
// src/main.ts
import { loadingFadeOut } from 'virtual:app-loading'
loadingFadeOut()
```

## TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "vite-plugin-vue-app-loading/client"
    ]
  }
}
```

## 自定义动画

在应用根目录创建 `loading.html` 文件，例如：

```html
<style>
.loader {
  font-weight: bold;
  font-family: sans-serif;
  font-size: 30px;
  animation: l1 1s linear infinite alternate;
}
.loader:before {
  content:"Loading..."
}
@keyframes l1 {to{opacity: 0}}
</style>
<div class="loader"></div>
```

```ts
// vite.config.ts
import AppLoading from 'vite-plugin-vue-app-loading'

export default defineConfig({
  plugins: [
    AppLoading('loading.html'),
  ],
})
```

> [!TIP]
> 你可以从 [CSS Loaders](https://css-loaders.com/) 网站中找找灵感，它提供了 600+ 个纯 CSS 的加载动画。
