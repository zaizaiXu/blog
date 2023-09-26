---
title: el-image实现下载功能
---
el-image实现下载功能

## 项目需求
开发中遇到需要`el-image`支持下载功能，思路：

1. 考虑自己写一个图片预览的功能，加上放大，删除，下载功能

2. el-image放大的图片按钮增加一个下载按钮

最终选择了2，因为1的话还要自己重写

## 实现代码

```vue
<template>
  <el-image
      @click.stop.prevent="clickImage"
      :src="fileUrl"
      :preview-src-list="getPreviewList(index, imageUrlList)">
    <div slot="error" class="image-slot">
      <i class="el-icon-picture-outline"></i>
    </div>
  </el-image>
</template>

<script>
//导入下载方法
import downLoadRemoteFile from '@util/downLoadRemoteFile';

export default {
  data() {
    return {
      fileUrl:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
      imageUrlList: [
        {
          fileName: 'test4.jpeg',
          fileUrl: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
        },
        {
          fileName: 'test5.jpeg',
          fileUrl: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
        }
      ]
    };
  },

  methods: {
    /**
     * @description: 查看-大图预览, 先看当前大图
     * @param {Number} index 当前下标
     * @param {Array} imgList 所有大图
     * @return {Array} arr 当前图片为第一个的大图
     */
    getPreviewList(index, imgList) {
      let arr = [];
      let i = 0;
      for (i; i < imgList.length; i++) {
        arr.push(imgList[i + index].fileUrl);
        if (i + index >= imgList.length - 1) {
          index = 0 - (i + 1);
        }
      }
      return arr;
    },
    /**
     * @description: 预览的图片添加下载按钮
     */
    clickImage() {
      this.$nextTick(() => {
        let wrapper = document.getElementsByClassName('el-image-viewer__actions__inner');
        let downImg = document.createElement('i');
        downImg.setAttribute('class', 'el-icon-download');
        wrapper[0].appendChild(downImg);
        if (wrapper.length > 0) {
          this.wrapperElem = wrapper[0];
          this.cusClickHandler();
        }
      });
    },
    /**
     * @description: 预览的图片给下载按钮添加事件
     */
    cusClickHandler() {
      this.wrapperElem.addEventListener('click', () => {
        const imgUrl = document.getElementsByClassName('el-image-viewer__img')[0].src;
        const ArrCurImg = this.imageUrlList.filter(item => {
          return item.fileUrl === imgUrl;
        });
        downLoadRemoteFile(imgUrl, ArrCurImg[0].fileName);
      });
    },
  }
};
</script>
```
![An image](../../../images/el-image-1.png)









