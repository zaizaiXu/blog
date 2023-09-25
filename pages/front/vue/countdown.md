---
Vue3+TS实现倒计时组件
---
Vue3+TS实现倒计时组件

## 问题描述
最近在写一个考试系统，有一个倒计时自动交卷的需求，所以打算封装一个组件。

## 实现
### 组件代码

// src/components/CountDown.vue
```vue
<template>
  <template v-if="examType !== 2">
    {{durationFormatter.dd ? durationFormatter.dd + '天' : ''}}{{durationFormatter.hh}}:{{durationFormatter.mm}}:{{durationFormatter.ss}}
  </template>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'

const props = defineProps({
  examType: { // 0：考试未开始；1：考试开始 2：考试结束
    type: Number,
    default: 0
  },
  time: { // 开始时间或者结束时间
    type: Number,
    default: 0
  },
})
const emit = defineEmits(['update:endTime', 'update:examType', 'timeEnd'])

const timeLeft = ref<number>(0) //获取时间差
timeLeft.value = Math.floor(props.time - Date.now() / 1000)

const durationFormatter = computed(() => {
  const time = timeLeft.value
  // 将秒格式化一下
  if (!time) return { hh: '00', mm: '00', ss: '00' }
  let t = time
  let ss:number | string = t % 60
  t = (t - ss) / 60
  let mm:number | string = t % 60
  t = (t - mm) / 60
  let hh:number | string = t % 24
  t = (t - hh) / 24
  const dd = t

  ss = ss < 10 ? '0' + ss : ss
  mm = mm < 10 ? '0' + mm : mm
  hh = hh < 10 ? '0' + hh : hh
  return { dd, hh, mm, ss }
})

let timer: any = null
const getTime = () => {
  // 避免重复执行 setTimeout
  timer && clearTimeout(timer)
  timer = setTimeout(async () => {
    if (timeLeft.value > 0) {
      --timeLeft.value
      getTime() // 递归调用
    } else {
      if (props.examType === 0) {
        emit('update:examType', 1)
        emit('timeEnd', 1)
      } else {
        emit('timeEnd', 2)
      }
    }
  }, 1000)
}

onMounted(() => {
  getTime()
})
</script>
```

### 使用组件

```vue
<template>
  <CountDown v-if="flag && detail" v-model:time="time" v-model:examType="examType" @timeEnd="timeEnd" />
</template>
<script setup lang="ts">
import {ref} from 'vue'
import CountDown from '@/components/CountDown.vue'
import {ElMessageBox} from "element-plus";

const time = ref<number>(0) // 考试开始时间或者结束时间 具体情况具体分析
const examType = ref<number>(0) // 0未开始  1进行中 2已结束
const timeEnd = (val: number) => {
  if (val === 1) { // 考试开始
    // to do something
  } else { // 考试结束
    ElMessageBox.alert('考试已结束，请退出', '提示消息', {
      confirmButtonText: '退出',
      type: 'warning',
      showClose: false,
      callback: () => {
        // 退出 清除缓存
      },
    })
  }
}
</script>
```


















