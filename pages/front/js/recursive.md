---
title: 递归
---
递归
1. 一个函数，自己调用自己
2. 需要给条件终止，否则内存溢出

## 代码实例
```js
const fn = (n) => {
    console.log(n + 1);
    if(n < 10) {
        fn(n + 1)
    }
}
fn(0)
// 打印结果
1
2
3
4
5
```
无需终止条件的，例如时钟
```js
const clocks = () => {
    console.log('当前时间：', new Date());
    setTimeout(() => {
        clocks()
    }, 1000)
}
clocks()
```
## 常见场景：处理树形结构
1. 定义一个树形结构
```js
const treeData = [
  {
    title: '一级1',
    children: [
      {
        title: '二级1',
        children: [
          {
            title: '三级1'
          }
        ]
      }
    ]
  },
  {
    title: '一级2',
    children: [
      {
        title: '二级2',
        children: [
          {
            title: '三级2'
          }
        ]
      }
    ]
  }
]
```
2. 给树形结构的每条数据加一个id
```js
const formatTreeData = (data) => {
  let arr = data.map(item => {
    return {
      ...item,
      id: Date.now(),
      children: Array.isArray(item.children) && item.children.length > 0 ? formatTreeData(item.children) : undefined
    }
  })
  return arr
}
const newTreeData = formatTreeData(treeData)
```
3. 处理每个节点的path路径

比如：一级1，path是1，一级2，path是2
一级2，path是1-2，二级2，path是2-2
```js
const formatTreeData = (data, parentPath = []) => {
  let arr = data.map((item, index) => {
    const path = [...parentPath, index + 1]
    return {
      ...item,
      id: Date.now(),
      children: Array.isArray(item.children) && item.children.length > 0 ? formatTreeData(item.children, path) : undefined,
      path: path.join('-')
    }
  })
  return arr
}
const newTreeData = formatTreeData(treeData)
```












