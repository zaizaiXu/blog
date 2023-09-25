---
title: Vue 截取视频第一帧
---
Vue 截取视频第一帧

## 实现
```js
// 获取视频第一帧   url:地址
    function getVideo(value) {
      const that = this;
      const video = document.createElement('video');// 创建video
      video.setAttribute('crossOrigin', 'anonymous'); // 处理跨域
      video.setAttribute('src', value);// 给video添加属性
      video.setAttribute('width', '400');
      video.setAttribute('height', '600');
      video.setAttribute('preload', 'auto');// 当页面加载后载入整个音频
      video.addEventListener('loadeddata', function() { // 当前帧数据加载完成，下一帧数据未记载事件
        const canvas = document.createElement('canvas'),
          width = video.width, // canvas的尺寸和图片一样
          height = video.height;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');// 二维绘图
        ctx.drawImage(video, 0, 0, width, height); // 绘制canvas
        const dataURL = canvas.toDataURL('image/jpeg'); // 转换为base64
        const file = that.dataURLtoFile(dataURL, '789.jpeg');//'789.jpeg'瞎写的图片名称  可替换为当前文件名
        that.upload(file);  //上传图片到服务器方法
        console.log(dataURL, file, '第一帧数据');
      });
    }
   //base64转二进制   dataurl：base64编码  filename：文件名
    function dataURLtoFile(dataurl, filename) {
      const arr = dataurl.split(',');// 截取base64数据
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);// 转码
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([ u8arr ], filename, { type: mime });
    }
```