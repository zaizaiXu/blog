---
title: Promise
---
Promise对象表示异步操作最终的完成（或失败）以及其结果值。

## 构造函数
```js
const promise1 = new Promise((resolve, reject) => {
    console.log('这里是promise的构造函数1');
    resolve('resolve success')
})
const promise2 = new Promise((resolve, reject) => {
    console.log('这里是promise的构造函数2');
    reject('reject error')
})

promise1.then(res => {
    console.log('promise1 res', res)
})
promise2.then(res => {
    console.log('promise2 res', res)
}).catch(err => {
    console.log('promise2 err', err)
})
```
```sh
#打印结果
这里是promise的构造函数1
这里是promise的构造函数2
promise1 res resolve success
promise2 err reject error
```

## 以前处理异步回调：陷入回调地狱
假如需要获取到分类1列表，之后拿到数组第一条数据再去请求分类2列表，拿到分类2数组第一条数据再去请求分类3列表

```js
// 分类1
const getCategoryList1 = (callback) => {
  console.log('请求category1')
  setTimeout(() => {
    const data = [1, 2, 3]
    console.log('回调给category2')
    callback(data)
  }, 500)
}
// 分类2
const getCategoryList2 = (callback) => {
  console.log('请求category2')
  setTimeout(() => {
    const data = [4, 5, 6]
    console.log('回调给category3')
    callback(data)
  }, 500)
}
// 分类3
const getCategoryList3 = (callback) => {
  console.log('请求category3')
  setTimeout(() => {
    const data = [7, 8, 9]
    console.log('回调结束')
    callback(data)
  }, 500)
}
getCategoryList1((data1) => {
  getCategoryList2((data2) => {
    getCategoryList3((data3) => {
      console.log('end')
    })
  })
})
```

## 使用
为了防止陷入回调地狱，ES6出现了Promise

使用Promise封装一个函数来使用：定义一个函数，return 一个Promise，封装好可直接调用

```js
const funcA = (n) => {
    return new Promise((resolve, reject) => {
        if(n === 1) {
            resolve('success')
        } else {
            reject('error')
        }
    })
}
funcA(1).then((res) => {
  console.log(res);
  funcA(2).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err)
    funcA(1).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err)
    })
  })
}).catch((err) => {
  console.log(err)
})
```
```sh
#打印结果
success
error
success
```
虽然没有回调地狱，但是promise也会无限嵌套，所以出现了更优雅的方式 async/await
## 改成同步的方法： async await
```js
const funcAsync = async () => {
    try {
        const res1 = await funcA(1)
        console.log('res1', res1);
    
        const res2 = await funcA(2)
        console.log('res2', res2);
    
        const res3 = await funcA(1)
        console.log('res3', res3);
    } catch (err) {
        console.log('try catch捕获异常err', err);
    }
}
funcAsync()
```
```sh
#打印结果
res1 success
try catch捕获异常err error
```
代码执行到res2的时候，有异常就跳到catch了

## 静态方法
### [Promise.all()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
接受一个 Promise 可迭代对象作为输入，并返回单个 Promise。返回的 Promise 在所有输入的 Promise 都兑现时（包括传入的可迭代对象为空时）被兑现，其值为一个包含所有兑现值的数组。如果输入的任何 Promise 被拒绝，返回的 Promise 也会被拒绝，并返回第一个拒绝的原因。

Promise.all()是团队作战，每个成员都赢了，最终结果才是赢
### [Promise.allSettled()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
接受一个 Promise 可迭代对象作为输入，并返回单个 Promise。返回的 Promise 在所有输入的 Promise 都敲定时兑现（包括传入的可迭代对象为空时），其值为一个描述每个 Promise 结果的对象数组。
### [Promise.any()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
接受一个 Promise 可迭代对象作为输入，并返回单个 Promise。返回的 Promise 在任何输入的 Promise 兑现时兑现，其值为第一个兑现的值。如果所有输入的 Promise 都被拒绝（包括传入的可迭代对象为空时），返回的 Promise 将以带有一个包含拒绝原因的数组的 AggregateError 拒绝。
### [Promise.race()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
接受一个 Promise 可迭代对象作为输入，并返回单个 Promise。返回的 Promise 与第一个敲定的 Promise 的最终状态保持一致。

Promise.race()则各自为战，只要有一个成员赢了，返回结果就是赢。

