---
title: 切片上传
---
切片上传

## 代码实现

:::code-group
```html
<template>
  <div class="upload-btn flex">
    <div class="upload-box">
      <input class="input-file" type="file" name="" id="file" ref="file"
             accept=".doc, .docx, .ppt, .pptx, .pdf, .mp4"
             multiple @change="changeFile">
      <el-button type="primary" size="large">选择文件</el-button>
    </div>
  </div>
  
  <el-table :data="list" style="width: 100%;" class="table-custom">
    <el-table-column prop="policymaker_name" label="文件">
      <template #default="scope">
        <div class="hidden-center">
          <span class="txt">{{scope.row.file_name}}</span>
          <span class="title" :title="scope.row.file_name">{{scope.row.file_name}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="上传进度">
      <template #default="scope">
        <el-progress :percentage="scope.row.percentage"
                     :color="scope.row.percentage === 100 ? '' : '#FDA34F'"
                     :status="scope.row.percentage === 100 ? 'success' : ''" />
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="80">
      <template #default="scope">
        <el-link type="danger" :underline="false" @click.stop="delBtn(scope.$index)">删除</el-link>
      </template>
    </el-table-column>
  </el-table>
  
  <el-button type="primary" @click="uploadBtn">上传</el-button>
</template>
```
```js
import { ref } from "vue";
import {randomStr, sliceFile, fileNameExt} from '@/library/common.js'
import axios from "axios";

const file = ref()
// 选择文件
const changeFile = (evt:any) => {
  Object.values(file.value.files).forEach(item => {
    let obj = {
      file: item,
      file_name: item.name,
      file_name1: item.name,
      title: item.name.substring(0, item.name.lastIndexOf('.')),
      introduction: item.name.substring(0, item.name.lastIndexOf('.')),
      duration: void 0, //时长/页数

      percentage: 0,
      file_path: '', // fileUrl
      blobList: [],
      fileName: '',
      fileExt: '',
      stopFlag: false,
    }
    list.value.push(obj)
  })
  evt.target.value = ''
}
// 上传
const uploadBtn = () => {
  for (let i = 0; i < list.value.length; i++) {
    let item = list.value[i]
    if (item.percentage < 100) {
      uploadFile(i)
    }
  }
}
const uploadFile = (index: number) => {
  const fileEle = list.value[index].file;
  //此处还要注意的一点，就是当文件大小如果小于分片的大小，那就没有必要分片上传，直接用普通的上传接口就行
  //获取分片数组，分片总数
  const [blobList1, total] = sliceFile(fileEle, 0.5 * 1024 * 1024);
  list.value[index].blobList = blobList1;
  //文件名和文件后缀
  let [fileName1, fileExt1] = fileNameExt(fileEle.name);
  list.value[index].file_name1 = fileName1;
  list.value[index].fileExt = fileExt1;
  let flag = randomStr(8);
  uploadSlice(0, flag, total, index);
}
const uploadSlice = (i, flag, total, index) => {
  let formData = new FormData();
  let sliceFile = new File([list.value[index].blobList[i]], `${list.value[index].file_name1}_${i}.${list.value[index].fileExt}`);
  formData.append('file', sliceFile);
  formData.append('flag', flag);
  formData.append('index', i);
  formData.append('total', total);
  uploadSliceApi(formData).then(res => {
    i++
    list.value[index].percentage = Math.round((i / total) * 100);
    if (res.code === 200 && res.data.src) {
      list.value[index].file_path = res.data.src;
    }
    if (i < total && !list.value[index].stopFlag) {
      uploadSlice(i, flag, total, index);
    }
  }).catch(err => {
    console.log('err', err)
  })
}
//不走loading组件的动效交互，自己封装一个后端请求api
const uploadSliceApi = (param) => {
  const instance = axios.create({
    timeout: 0,
    baseURL: import.meta.env.DEV ? 'api/' : '', //开发环境加api前缀
  });
  instance.interceptors.response.use(res => {
    return res.data;
  }, error => {
    return Promise.reject(error);
  })
  return instance.post('v1/resources/upload', param, {
    headers: {
      "authorization": localStorage.getItem('token'),
      "Content-Type": "multipart/form-data"
    }
  });
}
```
```js
// 引入的方法 /utils/common.js

/**
 * 获取有数字字母组成的随机字符串
 * @param len  长度
 * @returns '' 返回随机字符串
 */
export const randomStr = (len=16) => {
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length;
  let string = '';
  for (let i = 0; i < len; i++) {
    string += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return string;
}

/**
 * 获取分片数组和分片总数
 * @param file  文件
 * @param blockSize 分片的大小
 * @returns {[*[],number]} 返回分片的数组，和分片总数
 */
export const sliceFile = (file, blockSize = 5 * 1024 * 1024) => {
  let total = Math.ceil(file.size / blockSize);
  let blobList = [];
  for (let i = 0; i < total; i++) {
    const start = i * blockSize;
    const end = start + blockSize;
    const blob = file.slice(start, end);
    blobList.push(blob);
  }
  return [blobList, total];
}

/**
 * 获取文件名和文件后缀
 * @param fileName  文件名包含后缀
 * @returns {[*,string]|[string,string]}
 */
export const fileNameExt = (fileName) => {
  const fileInfo = fileName.split('.');
  if (fileInfo.length > 2) {
    let fileExt = fileInfo[fileInfo.length - 1].toLowerCase();
    let fileName = fileInfo.splice(0, fileInfo.length - 1).join('.');
    return [fileName, fileExt];
  } else {
    return [fileInfo[0], fileInfo[1].toLowerCase()];
  }
}
```
:::

![An image](../../../images/slice-upload-1.gif)
