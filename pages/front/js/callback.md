---
title: 回调函数callback
---
回调函数callback：把函数当作一个参数传到另外一个函数中，当需要用这个函数是，再回调运行()这个函数.

简单说：函数可以作为一个参数传递到另外一个函数中。

## 使用
```js
const add = (num1, num2, callback) => {
    let sum = num1 + num2
    callback(sum) // 把参数传出去
}
const print = (num) => {
    console.log('print', num);
}
add(1, 2, print)

// 或者用匿名函数的写法
add(1, 2, (data) => {
    console.log('data', data)
})
```

## 特点
1. 不会立即执行
2. 回调函数是一个必报，能访问到骑外层定义的变量
3. 执行前类型判断:最好确认其是一个函数
```js
const add = (num1, num2, callback) => {
    let sum = num1 + num2
    // 判定callback接收到的数据是一个函数
    if (typeof callback === 'function') {
        //callback是一个函数，才能当回调函数使用
        callback(sum);
    }
}
```

## 为什么用到回调函数
有一个非常重要的原因 —— JavaScript是事件驱动的语言。这意味着，JavaScript不会因为要等待一个响应而停止当前运行，而是在监听其他事件时继续执行。

例子：
```js
const first = () => {
    console.log(1);
}
const second = () => {
  console.log(2);
}
first()
second()
```
```sh
#打印结果
1
2
```
但是如果first函数中包含某种不能立即执行的代码会怎样呢？如下：
```js
const first = () => {
  setTimeout(() => {
    console.log(1);
  }, 500)
}
const second = () => {
  console.log(2);
}
first()
second()
```

```sh
#打印结果
2
1
```
先调用了first()函数，输出结果却在second()之后。

这不是 JavaScript 没有按照我们想要的顺序执行函数的问题，而是 JavaScript 在继续向下执行 second() 之前没有等待 first() 响应的问题。回调正是确保一段代码执行完毕之后再执行另一段代码的方式。






