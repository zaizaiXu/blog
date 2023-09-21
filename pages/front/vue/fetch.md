---
title: Vue页面回退或关闭，发送请求不中断
---
Vue页面回退或关闭，发送请求不中断

## 问题描述
最近做项目有个需求：用户进入页面开始计时，回退或者关闭页面时`调用接口`统计时长。

解决方法：`使用ES6的fetch`

## 解决方法
### 1.在页面回退或者关闭之前调用方法
```js
onMounted(async () => {
  window.addEventListener('beforeunload', (e) => handleTiming(e))
})
onUnmounted(() => {
  window.removeEventListener('beforeunload', (e) => handleTiming(e))
})
```
### 2.在handleTiming方法中，调用接口统计时长
在浏览器回退（或关闭）后，axios 调用接口时被中断，没调用成功。搜索问题发现需要同步调用接口。后来用async await 调用 axios 。 甚至用原生 XMLHttpRequest 对象同步调用接口，均以失败告终。

原来 Chrome 浏览器不允许页面关闭期间进行同步调用`XMLHTTPRequest()` 方法。

为了保证页面在卸载时可以成功调用接口请求数据，官方建议使用 `sendBeacon()` 或者 `Fetch keep-alive` 。

以 `Fetch keep-alive` 为例：
```js
// 关闭页面的时候请求计时接口
const handleTiming = async (e: any) => {
  let url =  import.meta.env.DEV ? '/api/v1/traincenter/schedule' : '/v1/traincenter/schedule'

  let params = {
    // 参数
  }
  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(params),
    keepalive: true,
  })
}
```



