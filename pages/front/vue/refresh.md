---
title: Vue实现定时刷新
---
Vue实现定时刷新

项目中遇到一个需要定时刷新组件的功能。就是下面这货。
## 实现

话不多说，直接上代码：
```vue
<script>
export default {
  data() {
    return {
      timer: 0
    };
  },
  mounted() {
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        // 调用相应的接口，渲染数据        
        console.log('hello')
      }, 30000)
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>
```
总结：定时刷新的要点：

1、定时器

2、vue的生命周期函数

3、定时器使用完毕后要及时清除。

