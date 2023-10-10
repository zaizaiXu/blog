---
title: 事件循环机制
---
事件循环机制

js是一门单线程的编程语言，也就是说js在处理任务的时候，所有任务只能在一个线程上排队被执行，那如果某一个任务耗时比较长呢？总不能等到它执行结束再去执行下一个。 所以在线程之内，又被分为了两个队列：
- 同步任务队列
- 异步任务队列
    - 宏任务
    - 微任务
    

| 微任务 | 宏任务 |
| - | - |
| Promise.then | script(整体代码) |
| async/await | setTimeout |
| process.nextTick | setInterval |
| MutationObserver | setImmediate |
| - | I/O |
| - | UI render |

结论：执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环。

## js事件循环执行顺序
1. 执行同步代码
2. 执行所有微任务队列
3. 清除微任务队列
4. 执行宏任务队列第一个

`2、3、4循环`

[//]: # (- 按顺序执行就是同步，不按顺序执行就是异步)

[//]: # (- Promise的构造函数是同步执行的：new的时候即执行)

[//]: # (- Promise处理异步回调)


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







