---
title: DIV触底加载更多实现（下拉列表触底加载更多）
---
DIV触底加载更多实现（下拉列表触底加载更多）

## 原理
应用闭包和截流法实现下拉触底加载

## 实现
```html
<div id="scroll" style="width: 100px;height:500px;overflow-y: auto;">
    <div style="width: 100%;height: 2000px;background-color: red;"></div>
</div>

<script>
window.onload = () => {
  let div = document.getElementById('scroll')
  div.addEventListener('scroll',onScrollEvent(div,loading,500))
}

// el:div滚动元素，fn:触底执行函数,delay:多少秒内触发一次触底函数
function onScrollEvent(el,fn,delay) {
  let is = true;
  return () => {
    if(!is) {
      return false
    }
    if(el.scrollHeight - el.scrollTop - el.clientHeight === 0) { // 触底
      is = false
      fn()
      setTimeout(()=>{
        is = true
      }, delay)
    }
  }
}

// 触底回调
function loading(){
  console.log('触底加载数据')
  // 此处编写从服务器加载数据逻辑
}
</script>
```





