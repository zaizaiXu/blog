---
title: JS树形结构数组遍历方式(深度遍历+广度遍历)
---
JS树形结构数组遍历方式(深度遍历 + 广度遍历)

数据结构如下
```js
let treeData = [
  {
    id:1,
    children: [
      {
        id: 2
      },
      {
        id:3,
        children: [
          {
            id:5
          }
        ]
      }]
  },
  {
    id:4
  }
]
```

## 实现目标
获取所有id的一维数组(不要求顺序) // `[1,2,3,4,5]`

## 深度遍历
对单个元素由浅到深，一层层递进循环扒取数据

### 方法一
for循环 + 递归
```js
function flatten(arr) {
    let flatArray=[];
    for(let item of arr){
        item.id&&flatArray.push(item.id);
        if(item.children&&Array.isArray(item.children)){
            flatArray=[...flatArray,...flatten(item.children)]
        }
    
    }
    return flatArray
}

// 调用
console.log(flatten(treeData)) // [1, 2, 3, 5, 4]
```

### 方法二
借用reduce + 递归

```js
function flatten(arr){
    return arr.reduce((prev,cur)=>{
         cur.id&&prev.push(cur.id);
        return [...prev,...(cur.children&&Array.isArray(cur.children) ? flatten(cur.children):[] )]
    },[])
}
// 调用
console.log(flatten(treeData)) // [1, 2, 3, 5, 4]
```

## 广度遍历
广度循环，循环最外层，有子层的扒取出来追加到原数组
```js
function flatten(arr){
    let flatArray=[];
    while(arr.length>0){
        let item=arr.shift();
        item.id&&flatArray.push(item.id);
        if(item.children&&Array.isArray(item.children)){
            arr=[...arr,...item.children];
        }
    }
    return flatArray
}
// 调用
console.log(flatten(treeData)) // [1, 4, 2, 3, 5]
```






