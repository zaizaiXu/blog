---
title: JS数据类型最简单判断方法
---
JS数据类型最简单判断方法

## 数字类型
### 方法一
```js
function isNum(val){
    return val === +val
}
```
### 方法二
```js
function isNum(val){
    return typeof(a) == 'number' && !isNaN(a)
}
```

## 字符串类型
### 方法一
```js
function isString(val){
  return val === val+''
}
```
### 方法二
```js
function isString(val){
  return typeof(val) == 'string'
}
```

## 判断布尔类型
```js
function isBoolean(val){
  return val === !!val
}
```

## 判断数组类型
```js
function isArray(val){
  return Array.isArray(val)
}
```

## undefined
### 方法一
```js
function isUndefined(val){
  return val === undefined
}
```
### 方法二
```js
function isUndefined(val){
  return typeof(val) == 'undefined'
}
```

## null
```js
function isNull(val){
  return val === null
}
```

## 所有类型通用法
```js
function valType(val){
   return Object.prototype.toString.call(val); // 返回"[object String]","[object Null]","[object Function]"等
}
```







