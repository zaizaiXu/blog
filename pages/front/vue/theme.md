---
title: Vue3+elementPlus主题动态切换
---
Vue3+elementPlus主题动态切换

## 前言
本文换肤的实现思路是手动定制多套主题，然后进行动态切换

主要实现分为两块

1. 获取主题文件
2. 根据主题类型使用函数进行动态切换加载css变量

## 获取主题文件
- 文件内容太长了从示例仓库复制点击打开，或者直接拷贝[themes.js](http://qiniu.wangcaiyuan.cn/ichun/theme.js)，文件放到项目中。
- 当然这么多css 变量不是每个都需要改的，本文作为示例文章所以存入了全部的变量（能获取到的）。`个人依实际情况进行删减保留`.

## 实现：根据主题类型使用函数进行动态切换加载css变量
- 项目中控制主题切换的地方引入上边获取到的 `themes.js`
- 我放在了 `src -> utils -> themes.js` 目录下，所以导入路径是`import themes from '@/utils/themes'`
- 通过 `switchTheme函数` 来控制主题的切换

```vue
<script setup lang="ts">
import themes from '@/utils/themes.js'
import {colorMix} from '@/utils/tool.js'
import {ref, onMounted, reactive, watch, nextTick} from "vue";
import { useUser } from "@/store/user";

const user = useUser()
let currentSkinName = ref<string>('defaultTheme')
const themeColorArr = ref<Array<any>>([
  {
    type: 'defaultTheme',
    title: '浅色主题'
  },
  {
    type: 'darkTheme',
    title: '深色主题'
  }
])
let themeObj = reactive<any>({})
// 根据不同的主题类型 获取不同主题数据
const switchTheme = (type:string) => {
  // themes 对象包含 defaultTheme、darkTheme 两个属性即默认主题与深色主题
  if (user.role !== 1) { // 超管不进行主题切换
    currentSkinName.value = type || 'darkTheme'
  } else {
    currentSkinName.value = 'defaultTheme'
  }
  themeObj = themes[currentSkinName.value];
  getsTheColorScale()
  // 设置css 变量
  Object.keys(themeObj).map(item => {
    document.documentElement.style.setProperty(item, themeObj[item])
  })
}
// 获取色阶
const getsTheColorScale = () => {
  const colorList = ['primary', 'success', 'warning', 'danger', 'error', 'info']
  const prefix = '--el-color-'
  colorList.map(colorItem => {
    for (let i = 1; i < 10; i += 1) {
      if (i === 2) {
        themeObj[`${prefix}${colorItem}-dark-${2}`] = colorMix(themeObj[`${prefix}black`], themeObj[`${prefix}${colorItem}`], 1)
      } else {
        themeObj[`${prefix}${colorItem}-light-${10 - i}`] = colorMix(themeObj[`${prefix}white`], themeObj[`${prefix}${colorItem}`], i * 0.1)
      }
    }
  })
}

onMounted(() => {
  switchTheme('defaultTheme')
})
</script>

<template>
  <div class="app">
    <el-select v-model="currentSkinName" placeholder="请选择" @change="switchTheme">
      <el-option v-for="(item,index) in themeColorArr" :key="index" :label="item.title" :value="item.type"></el-option>
    </el-select>
  </div>
</template>
```
`colorMix函数` 仓库示例是在 `src -> utils -> tool.js` 导出

```ts
const colorMix = (color1, color2, weight) => {
  weight = Math.max(Math.min(Number(weight), 1), 0)
  let r1 = parseInt(color1.substring(1, 3), 16)
  let g1 = parseInt(color1.substring(3, 5), 16)
  let b1 = parseInt(color1.substring(5, 7), 16)
  let r2 = parseInt(color2.substring(1, 3), 16)
  let g2 = parseInt(color2.substring(3, 5), 16)
  let b2 = parseInt(color2.substring(5, 7), 16)
  let r = Math.round(r1 * (1 - weight) + r2 * weight)
  let g = Math.round(g1 * (1 - weight) + g2 * weight)
  let b = Math.round(b1 * (1 - weight) + b2 * weight)
  r = ("0" + (r || 0).toString(16)).slice(-2)
  g = ("0" + (g || 0).toString(16)).slice(-2)
  b = ("0" + (b || 0).toString(16)).slice(-2)
  return "#" + r + g + b;
}
```

## 使用：网站与主题颜色同步更改
项目内需要跟随主题改变的颜色，使用主题的`css`变量即可如
```css
.text {
        margin-top: 35px;
        font-size: 24px;
        color: var(--el-color-info);
      }
```







