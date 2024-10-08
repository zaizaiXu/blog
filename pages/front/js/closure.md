---
title: 闭包
---
闭包

## 定义
闭包是指有权访问另一个函数作用域中的变量的函数。 ——《JavaScript高级程序设计》

如果一个函数访问了此函数的父级及父级以上的作用域变量，那么这个函数就是一个闭包。闭包会创建一个包含外部函数作用域变量的环境，并将其保存在内存中，这意味着，即使外部函数已经执行完毕，闭包仍然可以访问和使用外部函数的变量。

## 代码实例
```js
function fn1() {
    let a = 1;
    function fn2() {
        a++;
        console.log(a);
    }
    return fn2;
}
const fn2 = fn1()
// 闭包函数执行完后外部作用域变量仍然存在，并保持状态
fn2() // 2
fn2() // 3
```

## 特性/优点/缺点
- 特性：
    1. 函数嵌套：闭包的实现依赖于函数嵌套，即在一个函数内部定义另一个函数。
    2. 记忆外部变量：闭包可以记住并访问外部函数的变量，即使外部函数已经执行完毕。
    3. 延长作用域链：闭包将外部函数的作用域链延长到内部函数中，使得内部函数可以访问外部函数的变量。
    4. 返回函数：闭包通常以函数的形式返回，使得外部函数的变量仍然可以被内部函数引用和使用。
- 优点
    1. 保护变量：闭包可以将变量封装在函数内部，避免全局污染，保护变量不被外部访问和修改。
    2. 延长变量生命周期：闭包使得函数内部的变量在函数执行完后仍然存在，可以在函数外部继续使用。
    3. 实现模块化：闭包可以创建私有变量和私有方法，实现模块化的封装和隐藏，提高代码的可维护性和安全性。
    4. 保持状态：闭包可以捕获外部函数的变量，并在函数执行时保持其状态。这使得闭包在事件处理、回调函数等场景中非常有用。

- 缺点：
    1. 内存占用：闭包会导致外部函数的变量无法被垃圾回收，从而增加内存占用。如果滥用闭包，会导致内存泄漏问题。
    2. 性能损耗：闭包涉及到作用域链的查找过程，会带来一定的性能损耗。在性能要求高的场景下，需要注意闭包的使用。

## 平常使用
我们经常使用闭包，比如定时器、事件监听、ajax请求等很多使用了回调函数的地方，实际上就是在使用闭包

## 应用场景

### 自执行函数
```js
let say = (function(){
  let val = 'hello world';
  function say(){
    console.log(val);
  }
  return say;
})()
```

### 节流防抖
```js
// 节流函数封装
function throttle(func, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arguments);
        timer = null;
      }, delay);
    }
  };
}

// 防抖函数封装
function debounce(func, delay) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}
```
### 函数柯里化
函数柯里化（Currying）是一种将多个参数的函数转换为一系列接受单个参数的函数的过程。举个简单的例子，我们有一个原始函数add(a, b, c)，我们可以将它柯里化为addCurried(a)(b)(c)的形式。
```js
//柯里化前
function add(a, b, c) {
  return a + b + c;
}
console.log(add(1, 2, 3)); //6
//柯里化后
function addCurried1(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
//箭头函数简写
const addCurried2 = (a) => (b) => (c) => a + b + c;
console.log(addCurried1(1)(2)(3)); //6
console.log(addCurried2(1)(2)(3)); //6
```

### 链式调用
利用闭包原理封装一个简单的计算器
```js
function calculator() {
  let result = 0;

  function add(num) {
    result += num;
    return this;
  }

  function subtract(num) {
    result -= num;
    return this;
  }

  function multiply(num) {
    result *= num;
    return this;
  }

  function divide(num) {
    result /= num;
    return this;
  }

  function getResult() {
    return result;
  }

  function clear() {
    result = 0;
    return this;
  }

  return {
    add,
    subtract,
    multiply,
    divide,
    getResult,
    clear,
  };
}
const calc = calculator();
const result = calc.add(5).subtract(2).divide(3).multiply(6).getResult();
console.log(result); // 输出：6
```

### 迭代器
```js
function createIterator(arr) {
  let index = 0;

  return {
    next: function() {
      if (index < arr.length) {
        return {
          value: arr[index++],
          done: false
        };
      } else {
        return {
          done: true
        };
      }
    }
  };
}

const myIterator = createIterator([1, 2, 3]);

console.log(myIterator.next()); // { value: 1, done: false }
console.log(myIterator.next()); // { value: 2, done: false }
console.log(myIterator.next()); // { value: 3, done: false }
console.log(myIterator.next()); // { done: true }
```

## 闭包造成的内存泄漏怎么解决？
闭包中的内存泄漏指的是在闭包函数中，由于对外部变量的引用而导致这些变量无法被垃圾回收机制释放的情况。当一个函数内部定义了一个闭包，并且这个闭包引用了外部变量时，如果这个闭包被其他地方持有，就会导致外部变量无法被正常释放，从而造成内存泄漏。

解决闭包中的内存泄漏问题通常需要注意解除外部变量和闭包函数的引用，以及解绑函数本身的引用，使得闭包中引用的外部变量和闭包函数能够被垃圾回收机制释放。

例子：
```js
function createClosure() {
  let value = 'Hello';
  // 闭包函数
  var closure = function() {
    console.log(value);
  };
  // 解绑定闭包函数，并释放资源
  var releaseClosure = function() {
    value = null; // 解除外部变量的引用
    closure = null; // 解除闭包函数的引用
    releaseClosure = null; // 解除解绑函数的引用
  };
  // 返回闭包函数和解绑函数
  return {
    closure,
    releaseClosure
  };
}
// 创建闭包
var closureObj = createClosure();
// 调用闭包函数
closureObj.closure(); // 输出：Hello
// 解绑闭包并释放资源
closureObj.releaseClosure();
// 尝试调用闭包函数，此时已解绑，不再引用外部变量
closureObj.closure(); // 输出：null
```










