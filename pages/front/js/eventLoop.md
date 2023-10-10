---
title: 事件循环机制
---
事件循环机制

## js事件循环执行顺序
1. 执行同步代码
2. 执行所有微任务队列
3. 清除微任务队列
4. 执行宏任务队列第一个

`2、3、4循环`





- 按顺序执行就是同步，不按顺序执行就是异步
- Promise的构造函数是同步执行的：new的时候即执行
- Promise处理异步回调
- 微任务：`Promise.then` `MutationObserver`  
- 宏任务：`setTimeout` `setInterval` `setImmediate`

```js
const promise = new Promise((resolve, reject) => { // 1
    console.log('这里是promise的构造函数');
    resolve('resolve success')
})

setTimeout(() => { // 3
    console.log('setTimeout 这里定义一个异步任务')
}, 0)

promise.then((res) => { // 2
    console.log('res', res)
})

console.log('创建了一个promise', promise) // 1
// 从打开结果看出，promise的构造函数是同步的：按顺序执行
```
```sh
#打印结果
这里是promise的构造函数
创建了一个promise Promise { 'resolve success' }
res resolve success
setTimeout 这里定义一个异步任务
```







