---
title: HackTimer 避免计时器在标签页不活动时被浏览器节流
---
HackTimer 避免计时器在标签页不活动时被浏览器节流

`安装引入即可`

### 安装
```shell
npm install hacktimer
```

## 全局引入
```js
import 'hacktimer'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.mount('#app');
```

## 局部引入使用
```js
<script setup lang="ts">
import 'hacktimer'

let timer: any = null
const getTime = () => {
  // 避免重复执行 setTimeout
  timer && clearTimeout(timer)
  timer = setTimeout(async () => {
    // todo something
    getTime() 
  }, 1000)
}

onMounted(() => {
  getTime()
})

</script>
```






















