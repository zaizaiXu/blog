---
title: element-plus中用el-image-viewer实现图片预览
---
element-plus中用el-image-viewer实现图片预览

el-image-viewer是element-plus文档中没有单独描述的组件，如果要了解更详细需要去看源码

最近在工作中需要实现统一图片预览风格，下面是我用el-image-viewer写的一个小demo，仅供参考

## 实现
```vue
<template>
  <el-image-viewer
    v-if="show"
    :url-list="imgs"
    :initial-index="index"
    :infinite="infinite"
    teleported
    @close="closePreview"
    @switch="handleSwitch"
  />
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  infinite: {
    type: Boolean,
    default: false
  },
  index: {
    type: Number,
    default: 0,
  },
  imgs: {
    type: Array,
    default: []
  }
});

// 如果页面有滚动条
watch(() => props.show, (newVal) => {
  if (newVal) {
    document.querySelector('body').style.overflow = 'hidden';
  } else {
    document.querySelector('body').style.overflow = '';
  }
})

const emit = defineEmits<{
  (e: 'switchImgViewer', imgIndex: any): void
}>;
function closePreview() {
  emit('update:show', false);
}
let changeIndex = ref<number>(0)
function handleSwitch(index: number) {
  changeIndex.value = index
  emits('switchImgViewer', changeIndex.value)
}
</script>
```


