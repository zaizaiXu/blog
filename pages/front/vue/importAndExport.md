---
title: Vue项目文件导入导出功能
---
Vue项目文件导入导出功能

已知 `axios` 已通过Vue原型属性设置（main.js）

Vue.prototype.$axios = axios;

## 导入文件（上传）
```js
// 导入文件 success：成功回调函数 fail失败回调，url:上传地址，that:vue对象（this）
function importFile(that,url,success,fail){
  let input=document.createElement("input");
  input.setAttribute('type','file');
  input.setAttribute('accept','*');
  input.style.display="none";
  input.addEventListener('change',()=>{
     if(input.files&&input.files.length>0){
      uploadFile(that,url,input.files[0],success,fail)
     }
  })
  document.body.appendChild(input);
   input.click();
   document.body.removeChild(input);
}

//上传文件
function uploadFile(that, url, file,success,fail) {
  let formData = new FormData();
  formData.append("file", file);
  let url2 = process.env.VUE_APP_BASE_API + url
  let config={headers: {
    "Content-Type": "multipart/form-data",
  }}
  that.$axios.post(url2,formData,config).then(res=>{
    success(res)
  }).catch(err=>{
    fail(err)
  })
}
```
导入监听事件调用`importFile`方法即可

## 导出文件（下载）（二进制流文件）
```js
// 导出文件 that:vue对象this,url接口地址，filename:'下载下来文件名包含格式例如：物品清单.xls'
function exportFile(that, url, filename,data={}) {
  that
    .$axios({
      responseType: "blob",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "get",
      url: process.env.VUE_APP_BASE_API + url,
      params:data
    })
    .then((res) => {
      if (res?.data) {
        let blob = new Blob([res.data]);
        let url2 = window.URL.createObjectURL(blob);
        downloadFile(url2, filename);
      }
    });
}

//文件下载
function downloadFile(url, filename) {
  if (!url) return;
  let link = document.createElement("a"); //创建a标签
  link.style.display = "none";
  link.href = url; //文件下载地址
  link.setAttribute("download", filename); //设置下载属性 以及文件名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```
导出监听事件调用`exportFile`方法即可



