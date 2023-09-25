---
title: Vue keep-alive返回保存滚动条位置
---
Vue keep-alive返回保存滚动条位置

```vue
<script>
export default{
  data() {
    return{
      scrollY: 0
    }
  },
  // 页面离开前保存滚动条距离.page为滚动元素
  beforeRouteLeave(to, from, next) {
    // 保存滚动条元素scrollTop值
    this.scrollY = document.querySelector(".page").scrollTop;
    next();
  },
  // 进入页面 恢复滚动条位置
  activated() {
    document.querySelector(".page").scrollTop = this.scrollY;
  },
}
</script>
```