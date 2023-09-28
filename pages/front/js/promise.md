---
title: Promise 7个高级用法
---
Promise 7个高级用法

直奔主题

## promise数组串行执行
例如你有一组接口需要串行执行，首先你可能会想到使用await

```js
const requestAry = [() => api.request1(), () => api.request2(), () => api.request3()];
for (const requestItem of requestAry) {
  await requestItem();
}
```
如果使用promise的写法，那么你可以使用then函数来串联多个promise，从而实现串行执行。
```js
const requestAry = [() => api.request1(), () => api.request2(), () => api.request3()];
const finallyPromise = requestAry.reduce(
    (currentPromise, nextRequest) => currentPromise.then(() => nextRequest()),
    Promise.resolve() // 创建一个初始promise，用于链接数组内的promise
);
```

## 在new Promise作用域外更改状态
假设你有多个页面的一些功能需要先收集用户的信息才能允许使用，在点击使用某功能前先弹出信息收集的弹框，你会怎么实现呢？

**解决：写在所有页面都能调用的地方，一个方法调用**

```vue
<!-- App.vue -->
<template>
  <!-- 以下是模态框组件 -->
  <div class="modal" v-show="visible">
    <div>
      用户姓名：<input v-model="info.name" />
    </div>
    <!-- 其他信息 -->
    <button @click="handleCancel">取消</button>
    <button @click="handleConfirm">提交</button>
  </div>
  <!-- 页面组件 -->
</template>

<script setup>
import { provide } from 'vue';

const visible = ref(false);
const info = reactive({
  name: ''
});
let resolveFn, rejectFn;

// 将信息收集函数函数传到下面
provide('getInfoByModal', () => {
  visible.value = true;
  return new Promise((resolve, reject) => {
    // 将两个函数赋值给外部，突破promise作用域
    resolveFn = resolve;
    rejectFn = reject;
  });
})

const handleConfirm = () => {
  resolveFn && resolveFn(info);
};
const handleCancel = () => {
  rejectFn && rejectFn(new Error('用户已取消'));
};
</script>
```
接下来直接调用`getInfoByModal`即可使用模态框，轻松获取用户填写的数据。
```vue
<template>
  <button @click="handleClick">填写信息</button>
</template>

<script setup>
import { inject } from 'vue';

const getInfoByModal = inject('getInfoByModal');
const handleClick = async () => {
  // 调用后将显示模态框，用户点击确认后会将promise改为fullfilled状态，从而拿到用户信息
  const info = await getInfoByModal();
  await api.submitInfo(info);
}
</script>
```
这也是很多UI组件库中对常用组件的一种封装方式。

## async/await的另类用法
很多人只知道在async函数调用时用await接收返回值，但不知道async函数其实就是一个返回promise的函数，例如下面两个函数是等价的：
```js
const fn1 = async () => 1;
const fn2 = () => Promise.resolve(1);

fn1(); // 也返回一个值为1的promise对象
```
然而，await还有一个鲜为人知的秘密，当后面跟的是非promise对象的值时，它会将这个值使用promise对象包装，因此await后的代码一定是异步执行的。如下示例：
```js
Promise.resolve().then(() => {
  console.log(1);
});
await 2;
console.log(2);
// 打印顺序位：1  2
```
等价于
```js
Promise.resolve().then(() => {
  console.log(1);
});
Promise.resolve().then(() => {
  console.log(2);
});
```

## promise实现请求共享
当一个请求已发出但还未响应时，又发起了相同请求，就会造成了请求浪费，此时我们就可以将第一个请求的响应共享给第二个请求。
```js
request('GET', '/test-api').then(response1 => {
  // ...
});
request('GET', '/test-api').then(response2 => {
  // ...
});
```
上面两个请求其实只会真正发出一次，并且同时收到相同的响应值。

那么，请求共享会有哪几个使用场景呢？我认为有以下三个：

- 当一个页面同时渲染多个内部自获取数据的组件时；
- 提交按钮未被禁用，用户连续点击了多次提交按钮；
- 在预加载数据的情况下，还未完成预加载就进入了预加载页面；

实现请求共享需要用到promise的缓存功能，即一个promise对象可以通过多次await获取到数据，简单的实现思路如下：
```js
const pendingPromises = {};
function request(type, url, data) {
  // 使用请求信息作为唯一的请求key，缓存正在请求的promise对象
  // 相同key的请求将复用promise
  const requestKey = JSON.stringify([type, url, data]);
  if (pendingPromises[requestKey]) {
    return pendingPromises[requestKey];
  }
  const fetchPromise = fetch(url, {
    method: type,
    data: JSON.stringify(data)
  })
  .then(response => response.json())
  .finally(() => {
    delete pendingPromises[requestKey];
  });
  return pendingPromises[requestKey] = fetchPromise;
}
```
## 同时调用resolve和reject会怎么样？
大家都知道`promise`分别有`pending/fullfilled/rejected`三种状态，但例如下面的示例中，promise最终是什么状态？

```js
const promise = new Promise((resolve, reject) => {
  resolve();
  reject();
});
```
正确答案是`fullfilled`状态，我们只需要记住，promise一旦从pending状态`转到`另一种状态，`就不可再更改了`，因此示例中先被转到了fullfilled状态，再调用reject()也就不会再更改为rejected状态了。

## 彻底理清then/catch/finally返回值
先总结成一句话，就是以上三个函数都会返回一个新的promise包装对象，被包装的值为被执行的回调函数的返回值，回调函数抛出错误则会包装一个rejected状态的promise。，好像不是很好理解

我们来看看例子：
```js
// then函数
Promise.resolve().then(() => 1); // 返回值为 new Promise(resolve => resolve(1))
Promise.resolve().then(() => Promise.resolve(2)); // 返回 new Promise(resolve => resolve(Promise.resolve(2)))
Promise.resolve().then(() => {
  throw new Error('abc')
}); // 返回 new Promise(resolve => resolve(Promise.reject(new Error('abc'))))
Promise.reject().then(() => 1, () => 2); // 返回值为 new Promise(resolve => resolve(2))

// catch函数
Promise.reject().catch(() => 3); // 返回值为 new Promise(resolve => resolve(3))
Promise.resolve().catch(() => 4); // 返回值为 new Promise(resolve => resolve(调用catch的promise对象))

// finally函数
// 以下返回值均为 new Promise(resolve => resolve(调用finally的promise对象))
Promise.resolve().finally(() => {});
Promise.reject().finally(() => {});
```

## then函数的第二个回调和catch回调有什么不同？
promise的then的第二个回调函数和catch在请求出错时都会被触发，咋一看没什么区别啊，但其实，前者不能捕获当前then第一个回调函数中抛出的错误，但catch可以。

```js
Promise.resolve().then(
  () => {
    throw new Error('来自成功回调的错误');
  },
  () => {
    // 不会被执行
  }
).catch(reason => {
  console.log(reason.message); // 将打印出"来自成功回调的错误"
});
```









