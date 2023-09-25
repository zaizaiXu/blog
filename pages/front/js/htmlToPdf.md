---
title: HTML内容转pdf
---
HTML内容转pdf

## 安装插件(jspdf, html2canvas)

```shell
npm install jspdf --save
npm install --save html2canvas
```

### 分页
```js
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
 
// html导出pdf @domId:html DOM id,@fileName:pdf文件名,@resolve:回调函数
export function htmlExportPdf (domId, fileName,resolve) {
  html2canvas(document.getElementById(domId), {
    useCORS: true, // 支持图片跨域
    scale: 2// 设置放大的倍数
  })
    .then((canvas) => {
      var contentWidth = canvas.width
      var contentHeight = canvas.height
 
      // 一页pdf显示html页面生成的canvas高度;
      var pageHeight = contentWidth / 592.28 * 841.89
      // 未生成pdf的html页面高度
      var leftHeight = contentHeight
      // pdf页面偏移
      var position = 0
      // html页面生成的canvas在pdf中图片的宽高（a4纸的尺寸[595.28,841.89]）
      var imgWidth = 595.28
      var imgHeight = 592.28 / contentWidth * contentHeight
 
      var pageData = canvas.toDataURL('image/jpeg', 1.0)
      // eslint-disable-next-line new-cap
      var pdf = new jsPDF('', 'pt', 'a4')
 
      // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      // 当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          // 避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage()
          }
        }
      }
      pdf.save(fileName+'.pdf')
    }).finally(() => {
      resolve()
    })
}
```
### 不分页
分页可能内容被分割此时可以采用不分页
```js
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
 
// html导出pdf @domId:html DOM id,@fileName:pdf文件名,@resolve:回调函数export function htmlExportPdf (domId, fileName, resolve) {
  var shareContent = document.getElementById(domId)
  var width = shareContent.offsetWidth / 4
  var height = shareContent.offsetHeight / 4
  html2canvas(document.getElementById(domId), {
    useCORS: true, // 支持图片跨域
    scale: 2// 设置放大的倍数
  })
    .then((canvas) => {
      var context = canvas.getContext('2d')
      context.mozImageSmoothingEnabled = false
      context.webkitImageSmoothingEnabled = false
      context.msImageSmoothingEnabled = false
      context.imageSmoothingEnabled = false
      var pageData = canvas.toDataURL('image/jpeg', 1.0)
      var img = new Image()
      img.src = pageData
      img.onload = () => {
        // 获取dom高度、宽度
        img.width = img.width / 2
        img.height = img.height / 2
        img.style.transform = 'scale(0.5)'
        if (width > height) {
          // eslint-disable-next-line
          var pdf = new jsPDF('l', 'mm', [width * 0.505, height * 0.505]);
        } else {
          // eslint-disable-next-line
          var pdf = new jsPDF('p', 'mm', [width * 0.505, height * 0.505]);
        }
        pdf.addImage(pageData, 'jpeg', 0, 0, width * 0.505, height * 0.505)
        pdf.save(fileName + '.pdf')
      }
    }).finally(() => {
      resolve()
    })
}
```
### 调用
```html
<div id="page">download</div>
```
```js
htmlExportPdf('page', '测试', () => {
   console.log('下载完成')
})
```


