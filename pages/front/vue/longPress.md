---
title: Vue移动端长按事件
---
Vue移动端长按事件

## 功能描述
用户长按列表项弹出操作按钮组。

## 解决方法
### 1.去掉默认事件
首先特别要注意的一点就是，在移动端存在其默认的长按事件（比如：文字部分的长按选择文字），这便容易和我们的业务需求产生冲突，我们首先要做的就是先去掉它（可以加在App.vue的全局默认样式中，以便达到更好的效果）。

App.vue
```css
* {
  -webkit-touch-callout: none!important;
  -webkit-user-select: none;
}
```
### 2.实现
```vue
<template>
  <div @touchstart="gtouchstart($event ,item)" @touchmove="gtouchmove" @touchend="showDeleteButton(item)">
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const timeOutEvent = ref<number>(0)
//长按事件（起始）
const gtouchstart = (evt, item) => {
  timeOutEvent.value = setTimeout(() => {
    longPress(evt, item) //这里设置定时器，定义长按600毫秒触发长按事件
  }, 600)
  return false
}
//手释放，如果在600毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
const showDeleteButton = (item) => {
  clearTimeout(timeOutEvent.value)
  if (timeOutEvent.value !== 0) {
    //这里写要执行的内容（如onclick事件）
    // timeOutEvent.value = 0
  }
  return false
}
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
const gtouchmove = () => {
  clearTimeout(timeOutEvent.value)
  timeOutEvent.value = 0
}
// 长按显示
const longPress = (evt, val) => {
  timeOutEvent.value = 0
}
</script>
```

