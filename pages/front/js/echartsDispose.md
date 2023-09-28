---
title: ECharts:There is a chart instance already initialized on the dom
---
**警告提示**

[ECharts]There is a chart instance already initialized on the dom

使用echarts时，如果存在DOM，就会报存在警告，处理方法删除DOM：
```js
echarts.dispose(document.getElementById(id))
```
使用echarts时，如果不存在DOM，就会报错，处理方法先检查是否DOM存在：
```js
if (document.getElementById(id) == null) {
  return
}
```
最终兼容办法代码
```js
if (document.getElementById(id) == null) {
  return
}
echarts.dispose(document.getElementById(id))
this.charts = echarts.init(document.getElementById(id))
this.charts.setOption({})
```





