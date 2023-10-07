---
title: 自定义指令：防抖指令debounce
---
自定义指令：防抖指令debounce

## 问题描述
当用户疯狂点击某个按钮时，不希望每次点击都会触发事件并向服务器发送请求。所以我们需要在用户点击时做`防抖处理`。

实现方法：自定义指令，方便复用。

## 解决方法
### 创建文件src/directives/debounce.ts
```ts
import { App, DirectiveBinding } from 'vue'
let timer: ReturnType<typeof setTimeout> | null = null
const debounce = {
  mounted(el: HTMLElement, binding: { value: { callback: Function; params?: any; delay?: number } }) {
    bindEvent(el, binding)
  },
  updated(el: HTMLElement, binding: { value: { callback: Function; params?: any; delay?: number }}) {
    bindEvent(el, binding)
  },
  unmounted() {
    if (timer) {
      clearTimeout(timer)
    }
  },
}
function bindEvent(el: HTMLElement, binding: { value: { callback: Function; params?: any; delay?: number }}) {
  el.addEventListener('click', (e: Event) => {
    // 阻止默认事件
    e.preventDefault()
    // 阻止冒泡
    e.stopPropagation()
    if (timer) {
      clearTimeout(timer)
    }
    let delay = binding.value?.delay || 1000
    timer = setTimeout(() => {
      const { callback, params } = binding.value
      // callback 不是函数
      if (!callback || typeof callback !== 'function') {
        throw new Error('callback is not a function')
      }
      callback(params ? params : e)
      // 重置计时器
      timer = null
    }, delay)
  })
}
export function setupDebounce(app: App) {
  app.directive('debounce', debounce)
}
```
### 在main.ts中引入
```ts
import {setupDebounce} from '@/directives/debounce'
const app = createApp(App);
app.use(setupDebounce);
```
### 在页面中引入
```vue
<template>
  <button v-debounce="{callback: handleClick , params: { type: 0 }, delay: 300}">点击我</button>
</template>

<script setup lang="ts">
// 你的函数
const handleClick = ({ type }: { type: number }) => {
  console.log('防抖函数', type);
  // ... 这里写你组件的逻辑
}
</script>
```