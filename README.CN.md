# vite-plugin-vue-app-loading

[![NPM version](https://img.shields.io/npm/v/vite-plugin-vue-app-loading?color=a1b858&label=)](https://www.npmjs.com/package/vite-plugin-vue-app-loading)

[English](./README.md) | **中文**

给 Vue 应用添加一个加载动画。

![vite-plugin-vue-app-loading](https://github.com/user-attachments/assets/95217497-7022-43c1-987a-cec101db7671)

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

在合适的时机隐藏加载动画：

```ts
// src/main.ts
import { loadingFadeOut } from 'virtual:app-loading'
loadingFadeOut()
```

## 类型

有两种方法可以告诉 TypeScript 虚拟导入的类型：

- 在你的 `global.d.ts` 文件添加下面这句：

  ```ts
  /// <reference types="vite-plugin-terminal/client" />
  ```

- 在你的 `tsconfig.json` 中，将以下内容添加到你的 `compilerOptions.types` 数组中：

  ```json
  {
    // ...
    "compilerOptions": {
      // ...
      "types": [
        "vite-plugin-vue-app-loading/client"
      ]
    }
  }
  ```

## 自定义动画

在应用根目录创建 `loading.html` 文件：

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

![](https://github.com/user-attachments/assets/b05f8157-2f06-44af-b8bb-fa53701daf29)

> [!TIP]
> 你可以从 [CSS Loaders](https://css-loaders.com/) 网站中找找灵感，它提供了 600+ 个纯 CSS 的加载动画。

## 范例

[Fantastic-admin](https://github.com/fantastic-admin/basic)

## 致谢

感谢 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin/tree/7bcb973d6595545e2cef6ad4006d781b3176f67b/internal/vite-config/src/plugins/inject-app-loading) 提供的灵感。
