---
title: JS项目笔记之大乱记
---
JS项目笔记之大乱记


### 数组取交集
```js
const a = [0, 1, 2, 3, 4, 5]
const b = [3, 4, 5, 6, 7, 8]
const duplicatedValues = [...new Set(a)].filter(item => b.includes(item))
console.log(duplicatedValues) // [3, 4, 5]
```
### fill
```js
const arr = Array(3).fill('hi')
console.log(arr) // ['hi', 'hi', 'hi']
```
### &&与运算 ||或运算
`&&`：遇到真往后走，都为真输出最后一个真，遇到假则停止，并且输出假

`||`：遇到假继续往后走，都为假输出最后一个假，遇到真则停止不往后走，输出遇到的第一个真

### js获取数组最后一位元素的五种方法
```js
let arr=[1, 2, 3];
arr[arr.length - 1] //3
arr.pop() //3
arr.slice(-1) //[3]
arr.at(-1) //3
arr.reverse()[0]
```
### 判断是否为空对象
1：Object.keys()方法，返回对象的属性名组成的一个数组，若长度为0，则为空对象（ES6的写法）
```js
console.log(Object.keys(obj).length === 0); //返回true
```
2：Object.getOwnPropertyNames方法获取对象的属性名，存到数组中，若长度为0，则为空对象
```js
console.log(Object.getOwnPropertyNames(obj).length === 0); //返回true
```
### 判断是不是对象
```js
let obj = {}
let res1 = Object.prototype.toString.call(obj) === '[object Object]'
console.log(res1); // true
```
### js数组从首位 移到末尾
```js
let ary = [9,1,2,3,4,5,6,7,8]
ary.push(ary.shift())  // results in [1, 2, 3, 4, 5, 6, 7, 8,9]
```
### 判断标题是否重复
```js
let result = false;
let arr = [
  // ...
]
outer: for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].good_title === arr[j].good_title) {
            result = true
            break outer
        }
    }
}
if (result === true) {
    ElMessage.warning('标题重复了，请修改')
    return
}
```
### Math
```js
// 向下取整
Math.floor(5.20)    //5
// 向上取整
Math.ceil(5.20)    //6
// 去掉小数部分
parseInt(5.20)    //5
// 四舍五入
Math.round(5.20)    //5
Math.round(5.66)    //6
// 绝对值
Math.abs(-1)    //1
//返回两数之间较大者
Math.max(2,5)   //5
//返回两数之间较小者
Math.min(2,5);    //2
//随机生成数
Math.random();
```
### toFixed
银行家算法：四舍六入五成双

四舍六入五考虑，五后非零就进一，五后为零看奇偶，五前为偶应舍去，五后为奇要进一。
```js
let num = 2.446242342;
num = num.toFixed(2); // 输出结果为 2.45
```
### 枚举
```js
const mapColor = (val) => {
  let obj = {
    1: '#FC6D65',
    2: '#FFB166',
    3: '#E7BB0E',
    4: '#93C36B',
    5: '#699BFF',
  }
  if (val in obj) return obj[val]
  return '/'
}
```
### 枚举返回文字
```js
const mapScriptType = (val: string) => {
  let obj = {
    1: '商品讲解',
    2: '商品卖点',
    3: '优惠券',
    4: '商品问答',
  }
  let findItem = Object.entries(obj).find(item => {
    if (item[1] === val) return item
  })
  return '/'
}
```
### 升序
根据数组num值，实现升序
```js
let data = [{name:"香蕉",num:1},{name:"苹果",num:4},{name:"葡萄",num:3},{name:"草莓",num:2},{name:"芒果",num:5}]
data.sort(function(a,b){
    return a.num - b.num
});
```
### 降序
根据数组num值，实现降序
```js
let data = [{name:"香蕉",num:1},{name:"苹果",num:4},{name:"葡萄",num:3},{name:"草莓",num:2},{name:"芒果",num:5}]
data.sort(function(a,b){
   	return b.num - a.num
});
```
### 计算总分
```vue
computed: {
    totalScore() {
        let total = 0
        let arr = [...]
        if (Array.isArray(arr)) {
            arr.forEach(item => {
                if (isNaN(Number(item.score))) {
                    total += 0
                } else {
                    total += Number(item.score)
                }
            })
        }
        return total
    }
},

```
### 将数组转为对象
```js
let arr = [{type: 1,name: '22'}]
let obj = {}
arr.map((item: any) => {
  obj[item.type] = item.name
})
```
### 清掉按钮样式，当下载或者一些操作完之后，选中样式没清掉
```js
let target = evt.target;
if(target.nodeName == "SPAN"){
  target = evt.target.parentNode;
}
target.blur();
```
### 将阿拉伯数字转为汉字
```js
const numberChange = (num) => {
    const arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const arr2 = [ '','十','百','千', '万','十', '百','千','亿','十','百','千','万','十','百','千','亿']; // 可继续追加更高位转换值
    if (!num) return '零'
    
    const splitNumberArr = num.toString().split('').reverse()
    let result  = ''
    for (let i = 0; i < splitNumberArr.length; i++) {
        const index = splitNumberArr[i]
        result = arr1[index] + arr2[i] + result
    }
    // 将【零千、零百、零十】换成【零】 【十零】换成【十】
    result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十')
    // 将【零亿】换成【亿】【零万】换成【万】
    result = result.replace(/零亿/g, '亿').replace(/零万/g, '万')
    // 将【亿万】换成【亿】
    result = result.replace(/亿万/g, '亿')
    // 移除末尾的零
    result = result.replace(/零+$/, '')
    // 将【一十】换成【十】（一开头的两位数）
    result = result.replace(/^一十/g, '十')
    return result
}
```







