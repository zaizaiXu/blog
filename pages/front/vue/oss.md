---
title: Vue前端直传至阿里云OSS
---
Vue前端直传至阿里云OSS（支持断点续传，分片上传，批量上传）
## 前言
公司自用项目crm要做一个网盘，需要多文件同时上传，支持断点续传，分片上传，批量上传
## 预览
![An image](../../../images/oss.gif)
## 特性
- 支持vue3
- 基于element-plus组件库el-upload
- 支持分片
- 支持断点
- 批量上传
## 安装依赖
::: code-group
```sh [npm]
npm install ali-oss
```
```sh [yarn]
yarn add ali-oss
```
:::

## 代码实现
::: code-group
```vue
<template>
<div class="upload-dialog">
  <div class="head-title-wrapper">
    <div class="head-title">
      <div class="flex align-center">
        <div class="text flex align-center">
          <template v-if="uploadStore.unList.length">
            <el-icon color="var(--el-color-primary)"><Loading /></el-icon>正在导入
          </template>
          <template v-else>
            <el-icon color="var(--el-color-success)"><SuccessFilled /></el-icon>已完成
          </template>
        </div>
        <div class="text">
          {{uploadStore.fileList.length - uploadStore.unList.length}}/{{uploadStore.fileList.length}}
        </div>
        <el-link :underline="false" type="primary" v-if="!uploadStore.uploadDisabled" :disabled="uploadStore.uploadDisabled" @click="submitForm">开始上传</el-link>
        <el-link :underline="false" type="success" v-if="!uploadStore.resumeDisabled" :disabled="uploadStore.resumeDisabled" @click="resumeUpload">继续</el-link>
        <el-link :underline="false" type="danger" v-if="!uploadStore.pauseDisabled" :disabled="uploadStore.pauseDisabled" @click="stopUpload">暂停</el-link>
      </div>
      <div class="right-close">
        <el-icon class="icon" @click="uploadStore.showListBox = !uploadStore.showListBox"><ArrowDown /></el-icon>
        <el-icon class="icon" @click="handleClose"><Close /></el-icon>
      </div>
    </div>
    <template v-if="!uploadStore.showListBox">
      <el-progress :stroke-width="2" :percentage="uploadStore.allPercent" :show-text="false" />
    </template>
  </div>

  <template v-if="uploadStore.showListBox">
  <el-scrollbar max-height="500px">
    <div class="file-item" v-for="(item, index) in uploadStore.fileList" :key="`fileList_${index}`">
      <div class="file-name">
        <div class="name" v-show-tip>
          <el-tooltip effect="dark" :content="item.file_name" placement="top">
            <div class="file-name-item">
              <span style="height: 16px">
                <svg v-if="item.ext === 'doc' || item.ext === 'docx'" t="1687317744573" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4630" width="16" height="16"><path d="M959.16 187.68c2.14-23.23-16.1-41.26-39.32-38.92-108.92-1.76-217.84 0-326.84-0.61V66.64h-60.95C375.86 94.45 219.57 121 63.38 148.35v713c155.38 27.2 310.85 53.18 465.93 81.51H593v-81.51c102 0 203.87-0.2 305.86 0.31 17.32-0.82 36.58 0.51 51.45-10.09 11.92-18.24 8.87-41.06 9.89-61.64-1.45-200.72 0.69-401.53-1.04-602.25z" fill="#2A5699" p-id="4631"></path><path d="M593 178.71h336.21v652.08H593v-81.51h264.9v-40.76H593v-50.94h264.9v-40.76H593v-50.94h264.9v-40.75H593v-50.95h264.9v-40.75H593v-50.94h264.9v-40.76H593v-50.94h264.9V250H593zM115.57 419.49h42.54q14.39 0 21.94 2.38a38.18 38.18 0 0 1 17.38 11.46 55.43 55.43 0 0 1 11 20.18q3.78 11.94 3.78 29.43 0 15.37-3.54 26.51-4.33 13.58-12.35 22-6.05 6.37-16.35 9.94-7.71 2.64-20.6 2.64h-43.8z m23.28 21.06V523h17.38q9.75 0 14.07-1.18a21 21 0 0 0 9.39-5.18q3.74-3.66 6.09-12t2.36-22.81q0-14.43-2.36-22.17t-6.6-12.06a21.6 21.6 0 0 0-10.78-5.87q-4.87-1.18-19.1-1.18zM227.23 482.51q0-19 5.27-31.94a59.12 59.12 0 0 1 10.73-17.07 45.09 45.09 0 0 1 14.9-11.21q10.78-4.93 24.85-4.93 25.48 0 40.77 17.07T339 481.92q0 30.15-15.17 47.18t-40.58 17q-25.72 0-40.89-16.94t-15.13-46.65z m24-0.85q0 21.15 9 32.06a29.54 29.54 0 0 0 45.8 0.09Q315 503 315 481.32q0-21.4-8.69-31.94t-23.08-10.54q-14.39 0-23.19 10.67t-8.83 32.15zM351.31 503.49l22.69-2.38q2 12.31 8.29 18.09t16.82 5.8q11.25 0 16.94-5.14t5.7-12a11.94 11.94 0 0 0-2.4-7.51q-2.4-3.1-8.37-5.39-4.09-1.54-18.64-5.44-18.72-5-26.26-12.32a33.55 33.55 0 0 1-10.62-25.05 33.91 33.91 0 0 1 5-17.8 31.92 31.92 0 0 1 14.39-12.61q9.4-4.34 22.69-4.34 21.7 0 32.67 10.28t11.52 27.44l-23.28 1.1q-1.49-9.6-6.41-13.8t-14.74-4.21q-10.15 0-15.88 4.5a9.33 9.33 0 0 0-3.7 7.73 9.85 9.85 0 0 0 3.46 7.56q4.4 4 21.39 8.33t25.12 9a33.6 33.6 0 0 1 12.74 12.66q4.6 8 4.6 19.84a38.79 38.79 0 0 1-5.51 20A33.64 33.64 0 0 1 424 541.67q-10.07 4.55-25.08 4.55-21.86 0-33.58-10.91t-14.03-31.82z" fill="#FFFFFF" p-id="4632"></path></svg>
                  <!--              pdf-->
                <svg v-if="item.ext === 'pdf'" t="1687317766940" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4773" width="16" height="16"><path d="M901.63125 926.725c0 12.8-5.125 25.0875-14.3375 34.3-9.225 9.2125-21.5 14.3375-34.3125 14.3375H170.49375c-12.8 0-25.6-5.125-34.3-14.3375-9.2125-9.225-14.3375-21.5-14.3375-34.3V48.6375c0-12.8 5.1125-25.6 14.3375-34.3C144.89375 5.125 157.70625 0 170.49375 0H589.31875c12.8 0 25.6 5.125 34.8125 14.3375l263.675 263.6875c9.2125 9.2125 14.3375 21.5 14.3375 34.8125v613.8875h-0.5125z" fill="#EBECF0" p-id="4774"></path><path d="M901.63125 926.725v48.6375c0 12.8-5.125 25.6-14.3375 34.3-9.225 9.225-21.5 14.3375-34.3125 14.3375H170.49375c-27.1375 0-48.6375-22.0125-48.6375-48.6375v-48.6375c0 12.8 5.1125 25.0875 14.3375 34.3 9.2125 9.2125 21.5 14.3375 34.3 14.3375h682.5c27.1375 0 48.6375-22.0125 48.6375-48.6375z" fill="#C1C7D0" p-id="4775"></path><path d="M121.85625 536.575v-97.8L24.06875 536.575h97.7875z m779.775 0l1.025-97.8 97.275 97.8h-98.3z" fill="#D30000" p-id="4776"></path><path d="M901.63125 312.8375v6.65H637.94375c-27.1375 0-48.6375-22.0125-48.6375-48.6375V0c12.8 0 25.6 5.125 34.8125 14.3375L888.31875 278.025c8.7 9.2125 13.825 21.5 13.3125 34.8125z" fill="#C1C7D0" p-id="4777"></path><path d="M502.93125 611.1125H462.81875v142.9875h39.4c44.75 0 68.9375-25.2125 68.9375-73.85 0-42.325-22.125-68.575-68.225-69.1375zM274.95625 611.1875H217.56875v60.7625h57.3875c23.5125 0 38.375-8.0625 38.375-30.7875 0-18.525-11.3875-29.975-38.375-29.975z" fill="#FF1D1D" p-id="4778"></path><path d="M24.58125 536.575v243.2c0 13.3125 5.1125 25.6 14.3375 34.8125 8.7 9.225 21.5 14.3375 34.3 14.3375h877.575c26.625 0 48.6375-21.5 48.6375-48.6375V536.575H24.58125z m254.675 178.475H217.56875v82.075h-55.8v-228.75h118.3625c53.1875 0 88.55 26.8875 88.55 71.9s-33.3125 74.775-89.425 74.775z m230.275 82.075h-102.225v-228.75h103.4c77.075 0 119.25 50.025 119.25 110.375 0 73.225-53.85 118.375-120.425 118.375z m354.3375-184.5875H731.13125v52.025h123.8125v44.4875h-123.8125v88.0625h-55.5125v-228.75h188.25v44.1625z" fill="#FF1D1D" p-id="4779"></path><path d="M280.11875 568.375h-118.35v228.75h55.8v-82.075h61.6875c56.1125 0 89.425-28 89.425-74.775s-35.3625-71.9-88.55-71.9z m-5.175 103.575h-57.3875v-60.7625h57.3875c26.9875 0 38.375 11.45 38.375 29.975 0 22.7125-14.875 30.7875-38.375 30.7875zM510.70625 568.375h-103.4v228.75h102.225c66.575 0 120.425-45.15 120.425-118.375 0-60.35-42.1625-110.375-119.25-110.375z m-8.5 185.725h-39.4V611.1125h40.1125c46.0875 0.575 68.225 26.825 68.225 69.1375 0 48.6375-24.1875 73.85-68.9375 73.85zM675.61875 797.125h55.5125v-88.0625h123.8125v-44.4875h-123.8125v-52.025h132.7375V568.375h-188.25v228.75z" fill="#FFFFFF" p-id="4780"></path></svg>
                <!--              ppt-->
                <svg v-if="item.ext === 'pptx' || item.ext === 'ppt'" t="1687317783822" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4921" width="16" height="16"><path d="M538.731891 0h65.98683v107.168391c124.387582 0.722484 248.895579-1.324553 373.28316 0a40.699906 40.699906 0 0 1 45.034808 46.118533c2.047037 222.404516 0 444.929445 1.204139 667.454374-1.204139 24.082785 2.287865 50.694262-11.198495 72.248354-16.978363 12.041392-39.014111 10.957667-59.002822 12.041392-116.319849-0.60207-232.639699 0-349.200376 0V1023.518344h-72.248354C355.100659 990.886171 177.490122 960.662277 0 928.752587V95.488241C179.537159 63.698965 359.074318 31.30762 538.731891 0z" fill="#D24625" p-id="4922"></path><path d="M604.718721 142.931326H988.598307v726.216369H604.718721v-95.247413h279.239887v-47.563499H604.718721v-60.206962h279.239887v-46.96143H604.839135v-69.960489c46.118532 14.570085 98.619003 14.208843 139.800564-14.088429 44.553151-27.093133 67.793039-78.630292 71.646284-130.047036H663.119473c0-51.777987 0.60207-103.555974-0.963311-155.213547-19.145814 3.732832-38.171214 7.826905-57.196614 12.041392z" fill="#FFFFFF" p-id="4923"></path><path d="M686.35936 224.69238a165.689558 165.689558 0 0 1 153.16651 156.5381c-51.055503 0.60207-102.111007 0-153.286924 0 0.120414-52.380056 0.120414-104.278457 0.120414-156.5381z" fill="#D24625" p-id="4924"></path><path d="M186.64158 314.521167c63.21731 3.130762 139.680151-25.527752 192.662277 22.878645 50.092192 62.374412 36.84666 176.888053-37.44873 214.095955-26.370649 13.847601-56.714958 12.041392-85.373471 10.957667v139.68015l-69.238006-5.900282c-1.806209-127.157103-2.047037-254.434619-0.60207-381.712135z" fill="#FFFFFF" p-id="4925"></path><path d="M255.759172 378.942615c22.878645-0.963311 51.296331-5.298213 66.709313 16.737536a87.902164 87.902164 0 0 1 1.565381 78.148635c-13.245532 24.082785-43.228598 22.035748-66.468485 24.925682-2.408278-39.857008-2.167451-79.714017-1.806209-119.811853z" fill="#D24625" p-id="4926"></path></svg>
                <!--              MP4-->
                <svg v-if="item.ext === 'mp4' || item.ext === 'avi'" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5067" width="16" height="16"><path d="M594.944 0l335.12448 341.31968v563.2c0 65.9968-52.50048 119.48032-117.29408 119.48032H209.54624c-64.7936 0-117.2992-53.5296-117.2992-119.48032V119.48032C92.25216 53.48352 144.75776 0 209.55136 0H594.944z" fill="#627CFE" p-id="5068"></path><path d="M930.06848 341.31968h-211.9168c-64.74752 0-123.20768-59.48928-123.20768-125.4912V0l335.12448 341.31968z" fill="#FFFFFF" fill-opacity=".4" p-id="5069"></path><path d="M519.68 606.62784v66.42176l120.832 73.40032v-213.0432z" fill="#FFFFFF" opacity=".99" p-id="5070"></path><path d="M534.528 512.13824H282.25024a22.48192 22.48192 0 0 0-22.2976 22.62016v210.52928c0 12.38016 9.91744 22.66624 22.25152 22.66624h252.50816a22.48192 22.48192 0 0 0 22.25152-22.66624v-210.7136a22.62016 22.62016 0 0 0-22.43584-22.43584zM356.2496 719.36v-158.81216L483.328 639.9488 356.2496 719.36z" fill="#FFFFFF" opacity=".99" p-id="5071"></path></svg>
                <!--              zip-->
                <svg v-if="item.ext === 'zip' || item.ext === 'rar'" t="1687317832089" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5212" width="16" height="16"><path d="M97.9 376h828.4v269.2H97.9z" fill="#F95F5D" p-id="5213"></path><path d="M926.3 376V161.5c0-26.6-23.8-50.3-52.1-50.3H149.9c-28.3 0-52.1 23.7-52.1 50.3V376h828.5z m0 0" fill="#55C7F7" p-id="5214"></path><path d="M97.9 645.2v214.5c0 26.6 23.6 50.3 51.7 50.3h725c28.1 0 51.7-23.7 51.7-50.3V645.2H97.9z m0 0" fill="#7ECF3B" p-id="5215"></path><path d="M421.8 111.2h184.9V910H421.8z" fill="#FDAF42" p-id="5216"></path><path d="M606.7 457.4v112.4H413V457.4h193.7m31.1-45.9H381.9c-4.4 0-11.8 4.4-11.8 11.8v179c0 4.4 4.4 11.8 11.8 11.8h255.9c4.4 0 11.8-4.4 11.8-11.8v-179c-2.9-8.8-7.4-11.8-11.8-11.8z m0 0" fill="#FFFFFF" p-id="5217"></path></svg>
                <!--              xls-->
                <svg v-if="item.ext === 'xls' || item.ext === 'xlsx'" t="1687317865856" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5358" width="16" height="16"><path d="M533.58 75H594v81.31c101.74 0 203.47 0.2 305.21-0.31 17.18 0.71 36.09-0.51 51 9.76 10.47 15 9.25 34.15 10 51.43q-0.76 264.66-0.2 529.12c-0.51 29.58 2.74 59.76-3.45 88.93-4.14 21.1-29.56 21.61-46.56 22.32-105.3 0.31-210.69-0.2-316.09 0V949h-63.07c-154.9-28.15-310.1-54.17-465.2-81.31V156.37C221.66 129.23 377.67 102.51 533.58 75z" fill="#207245" p-id="5359"></path><path d="M594 186.76h335.4v640.31H594v-61h81.31v-71.12H594v-40.66h81.31v-71.14H594v-40.66h81.31v-71.14H594v-40.66h81.31v-71.14H594v-40.66h81.31v-71.15H594z" fill="#FFFFFF" p-id="5360"></path><path d="M715.92 247.74h142.29v71.15H715.92zM715.92 359.55h142.29v71.15H715.92zM715.92 471.35h142.29v71.15H715.92zM715.92 583.15h142.29v71.15H715.92zM715.92 694.95h142.29v71.15H715.92z" fill="#207245" p-id="5361"></path><path d="M98.48 551.16l39.3-64.82-35.61-59.39h27.14l23.06 39.91L175 426.95h26.91l-35.77 60.33 39.3 63.89h-28l-25.49-43-25.57 43zM217.94 551.16V428h23.22v102.23h57.73v20.93zM309.56 510.75l22.59-2.37q2 12.28 8.27 18t16.82 5.77q11.22 0 16.9-5.13t5.69-12a11.91 11.91 0 0 0-2.39-7.49q-2.39-3.1-8.35-5.38-4.08-1.53-18.59-5.43-18.67-5-26.2-12.29a33.47 33.47 0 0 1-10.59-25 33.82 33.82 0 0 1 5-17.76A31.84 31.84 0 0 1 333 429.15q9.37-4.33 22.63-4.33 21.65 0 32.59 10.25t11.49 27.37l-23.22 1.1q-1.49-9.57-6.39-13.77t-14.7-4.2q-10.12 0-15.85 4.49a9.3 9.3 0 0 0-3.69 7.71 9.83 9.83 0 0 0 3.45 7.54q4.39 4 21.33 8.31t25.06 8.93a33.52 33.52 0 0 1 12.7 12.63q4.59 8 4.59 19.79a38.7 38.7 0 0 1-5.49 20 33.56 33.56 0 0 1-15.5 13.86q-10 4.54-25 4.54-21.81 0-33.49-10.89t-13.95-31.73z" fill="#FFFFFF" p-id="5362"></path></svg>
                <!--              jpg-->
                <svg v-if="item.ext === 'jpg' || item.ext === 'png' || item.ext === 'jpeg'" t="1689666526222" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2688" width="16" height="16"><path d="M594.944 0l335.12448 341.31968v563.2c0 65.9968-52.50048 119.48032-117.29408 119.48032H209.54624c-64.7936 0-117.2992-53.5296-117.2992-119.48032V119.48032C92.25216 53.48352 144.75776 0 209.55136 0H594.944z" fill="#36D2AD" p-id="2689"></path><path d="M930.06848 341.31968h-211.9168c-64.74752 0-123.20768-59.48928-123.20768-125.4912V0l335.12448 341.31968z" fill="#FFFFFF" fill-opacity=".4" p-id="2690"></path><path d="M613.56032 426.68032H278.4256c-10.24 0-18.61632 8.4736-18.61632 18.944V749.056c0 10.4704 8.37632 18.944 18.61632 18.944h335.1296c10.28608 0 18.61632-8.4736 18.61632-18.944V445.62432a18.80576 18.80576 0 0 0-18.61632-18.944z m-37.23776 284.39552H315.66848v-94.7712l55.8592-56.87296 93.08672 94.81216 55.8592-56.92416 55.84896 56.92416v56.87808-0.0512z m-37.23776-151.64416a37.56032 37.56032 0 0 1-37.23264-37.9392c0-20.9408 16.66048-37.93408 37.23264-37.93408 20.57728 0 37.23776 16.99328 37.23776 37.9392 0 20.9408-16.66048 37.93408-37.23776 37.93408z" fill="#FFFFFF" p-id="2691"></path></svg>
              </span>

              <span class="name-title text-overflow" style="margin-left: 8px">{{item.file_name}}</span>
            </div>
          </el-tooltip>
          <template v-if="!item.hasOwnProperty('isEnd')">
          <div class="speed" v-if="item.isLoading && !item.isPlay">
            准备就绪
          </div>
          <div class="speed" v-if="item.isPlay && item.percentage !== 100">
            {{item.speed}}/s
          </div>
<!--          <span class="speed success" v-if="item.percentage === 100">完成</span>-->
          <div class="speed">
            {{filterSize(item.size)}}
          </div>
          </template>

          <span class="tool-icon delete" v-if="!item.percentage" @click="handleDeleteChangeFile(index)">
            <el-icon><Close /></el-icon>
          </span>
          <div v-if="item.percentage === 100">
            <el-link type="primary" v-if="item.ext === 'rar' || item.ext === 'zip'" @click="downloadBtn($event, item)" :underline="false">下载</el-link>
            <el-link type="primary" v-else @click="seeDetail($event, item)" :underline="false">查看</el-link>
          </div>
        </div>
        <span class="name error" v-if="item.errMsg">{{item.errMsg}}</span>
        <el-progress :percentage="item.percentage" v-if="item.percentage < 100 && !item.errMsg" :stroke-width="2" style="margin-top: 10px" />
        <!--            <template v-else>-->
        <!--              <el-progress :percentage="item.percentage" :status="item.errMsg ? 'exception' : 'success'" />-->
        <!--            </template>-->
      </div>
    </div>
  </el-scrollbar>
  </template>
</div>
</template>
```

```ts
import { useUploadStore } from "@/store/networkDiskUpload";
import {onMounted, onUnmounted, reactive, ref, watch} from "vue"
import dayjs from "dayjs";
import OSS from 'ali-oss'
import { randomStr, filterSize } from '@/library/common.js'
import {sharespaceGetOssSts, sharespaceSaveFiles} from "@/api/networkDisk";
import { Close, SuccessFilled, Loading, ArrowDown } from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {useRoute, useRouter} from "vue-router";
import {useNetworkDiskStore} from "@/store/networkDiskStore";

const route = useRoute()
const router = useRouter()
const uploadStore = useUploadStore()

const uploadSrc = ref<String>('upload/shareSpace/') // model
const fileMap = ref<object>({})
const map_max_key = ref<number>(0)
const partSize = ref<number>(1024 * 1024) // 每个部分的建议大小，默认1024 * 1024(1MB)，最小100 * 1024(100KB)
const parallel = ref<number>(4) // 并行上传的分片数
// const checkpoints = ref<object>({})
let credentials = reactive({
  accessKeyId: '', // AccessKeyId
  accessKeySecret: '', // AccessKeySecret
  securityToken: '', // SecurityToken
  bucket: '',
  region: '',
})

// 获取OSS信息
const getOss = async () => {
  try {
    const res = await sharespaceGetOssSts()
    let isPass = {
      pass: true
    }
    if (res.code === 200) {
      credentials = {...res.data}
    } else {
      isPass = {...res, pass: false}
    }
    return isPass
  } catch (e) {
    ElMessage.error(e.message ?? e)
  }
}
// 删除上传的文件
const handleDeleteChangeFile = (idx:number) => {
  uploadStore.fileList.splice(idx, 1)
  if (!uploadStore.fileList.length) {
    uploadStore.fileList.splice(0, uploadStore.fileList.length)
    uploadStore.dialogVisible = false
    uploadStore.allPercent = 0
  }
}

const domain = localStorage.getItem('domain')
// 查看详情
const seeDetail = (evt: any, item: object) => {
  if (item.ext === 'avi') {
    const to = router.resolve({
      path: '/preview',
      query: {
        url: item.view_online
      }
    })
    window.open(to.href, '_blank')
  } else {
    window.open(item.view_online)
  }
}
function downloadFn(url: any) {
  const a = document.createElement('a');
  a.href = url;
  a.download = "downloads.zip" // 下载后文件名
  a.click();
}
// 下载
const downloadBtn = (evt: any, item: object) => {
  if (import.meta.env.MODE == "development"){
    downloadFn(`api${item.oss_path}?Authorization=${localStorage.getItem('token')}`)
  } else {
    downloadFn(`${item.oss_path}?Authorization=${localStorage.getItem('token')}`)
  }
}
// 开始上传 点击上传至服务器
const submitForm = async () => {
  uploadStore.uploadDisabled = true
  uploadStore.pauseDisabled = false
  await multipartUpload()
}
// 切片上传
const multipartUpload = async () => {
  if (!uploadStore.files) {
    ElMessage.error('请选择文件')
    return
  }
  uploadStore.fileList.forEach(async (item) => {
    item.isLoading = true
    const getOssRes = await getOss()
    const {accessKeyId, accessKeySecret, securityToken, bucket, region} = credentials
    item.client = new OSS({
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
      stsToken: securityToken,
      bucket: bucket,
      region: region,
      secure: true
    })
    if (!getOssRes.pass) {
      return ElMessage.error('获取oss上传凭证异常')
    }
    if (item.percentage === 0) {
      await ossUpload(item)
    } else if (item.percentage < 100) {
      await resumeUploadFile(item, item.upload)
    }
  })
}
// 上传至oss item 文件信息
const ossUpload = async (item: object) => {
  let isPass = {
    pass: true,
    filePath: ''
  }
  try {
    const {raw, percentage} = item
    item.partSize = 0

    if (percentage < 100 && raw.name.indexOf('.') !== -1) {
      const file = raw
      const currentDate = dayjs().format('YYYYMMDD')
      const fileName = dayjs().unix() + randomStr(6)
      const suffix = item.name.substring(item.name.lastIndexOf('.')) // 文件名后缀
      const path = `${uploadSrc.value}${currentDate}/${fileName}${suffix}`

      await item.client.multipartUpload(path, file, {
        parallel: parallel.value,
        partSize: partSize.value,
        progress: async (p:any, checkpoint:any, res:any) => {
          await onUploadProgress(item, p, checkpoint, res, path)
        },
        headers: {
          // 'Content-Disposition': `${fileName}${suffix}`,
          'Content-Disposition': 'inline',
        }
      }).then(() => {
        onCreatePanFile(item)
        if (uploadStore.unList.length && uploadStore.uploadDisabled) {
          // uploadStore.resumeDisabled = false
        }
      }).catch(async (err: any) => {
        console.log('err--', err)
        // resetUpload(err, item)
      })
    }
  } catch (e) {
    //上传失败处理
    isPass = {
      ...e,
      pass: false,
      filePath: '',
    }
  }
  //上传成功返回filepath
  return isPass
}

const networkDiskStore = useNetworkDiskStore()
// 上传文件至数据库 file 文件信息
const onCreatePanFile = async (file: object) => {
  let params = await getParams(file)
  let paramsSub = {
    sid: params.sid,
    fid: params.fid,
    files: []
  }
  let obj = {
    file_name: params.ResTitle,
    path: params.OssKey,
  }
  paramsSub.files.push(obj)
  const res = await sharespaceSaveFiles(paramsSub)

  const findIndex = uploadStore.fileList.findIndex(item => params.uid === item.uid)

  let resObj = {
    id: res.data.list[0].id,
    file_name: res.data.list[0].file_name,
    path: res.data.list[0].path,
    oss_path: res.data.list[0].oss_path,
    view_online: res.data.list[0].view_online,
    ext: file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase(),
    isEnd: 1,
    ...file
  }
  uploadStore.fileList.splice(findIndex, 1, resObj)

  let spaceId = parseInt(route.query.spaceId)
  let folderId = parseInt(route.query.folderId) || 0
  let addObj = {
    id: res.data.list[0].id,
    file_name: res.data.list[0].file_name,
    path: res.data.list[0].path,
    oss_path: res.data.list[0].oss_path,
    view_online: res.data.list[0].view_online,
    ext: res.data.list[0].ext,
    username: localStorage.getItem('nickname'),
    last_user_name: localStorage.getItem('nickname'),
    update_time: dayjs().format('YYYY-MM-DD')
  }
  if (route.name === 'networkDiskFolder' && file.pushType === 'folder' && params.sid === spaceId) {
    let findIndex = networkDiskStore.folderList.filter(item => !item.hasOwnProperty('ext'))
    networkDiskStore.folderList.splice(findIndex.length, 0, addObj)
  }
  if (route.name === 'networkDiskFile' && file.pushType === 'file' && params.sid === spaceId && params.fid === folderId) {
    networkDiskStore.fileList1.unshift(addObj)
  }
}
const onUploadProgress = (item:object, p:any, checkpoint:any, res:any, path:string) => {
  if (checkpoint) {
    uploadStore.checkpoints[checkpoint.uploadId] = checkpoint
    item.speed = handleNetworkSpeed(res, partSize.value, p)
    item.tempCheckpoint  = checkpoint
    item.abortCheckpoint = checkpoint
    item.upload = checkpoint.uploadId
  }
  // 改变上传状态
  item.isPlay = true
  // 改变准备就绪状态
  if (item.isPlay) item.isLoading = false
  item.uploadName = path
  // 上传进度
  item.percentage = Number((p * 100).toFixed(2))
}
// 获取上传的网络状态 res：文件信息，partSize：分片大小，p：上传进度 network_speed：网速
const handleNetworkSpeed = (res:any, partSize:number, p:any) => {
  const spend_time = res.rt / 1000 // 单位s
  const end_item = new Date(res.headers.date).getTime()
  const start_time = end_item - spend_time
  let network_speed = parseInt(partSize / spend_time) // 每s中上传的字节(b)数
  if (p === 0) network_speed = 0
  if (network_speed === 0) {
    //nothing to do
  } else {
    handleNetworkSpeedChange(start_time, end_item, network_speed)
  }
  return network_speed ? filterSize(network_speed) : 0
}
const handleNetworkSpeedChange = async (start_time:number, end_item:number, network_speed:number) => {
  // 如果超过10秒没有传输数据，则清空map
  if (start_time - map_max_key.value >= 10000) {
    fileMap.value = {}
  }
  for (let i = start_time; i <= end_item ; i++) {
    const value = await fileMap.value[i]
    if (value) {
      await change(i, value + network_speed)
    } else {
      await change(i, network_speed)
    }
  }
}
const change = async (i: number, value: any) => {
  fileMap.value[i] = value
  map_max_key.value = i
}
const getParams = async (file: object) => {
  const { type } = file.raw
  const isVideo = type.indexOf('video') !== -1,
      isImage = type.indexOf('image') !== -1,
      isAudio = type.indexOf('audio') !== -1
  let fileType = ''
  if (isVideo) {
    fileType = 'video'
  } else if (isImage) {
    if (type.indexOf('adobe') === -1) {
      fileType = 'image'
    }
  } else if (isAudio) {
    fileType = 'audio'
  }
  let option
  if (isVideo || isImage || isAudio) {
    if (fileType) {
      option = await handleMediaRes(fileType)(file.raw)
    }
  }
  return {
    ResTitle: file.name,
    ResDescribe: '',
    OssKey: file.uploadName,
    ContentType: type || 'application/octet-stream',
    ContentLength: file.size,
    uid: file.uid,
    sid: file.sid,
    fid: file.fid,
    ...option,
  }
}
// 获取没提文件信息 type 文件类型
const handleMediaRes = (type: string) => {
  return {
    image: async function (file: any) {
      return new Promise((resolve) => {
        let reader = new FileReader()
        reader.onload = function (e) {
          let data = e?.target?.result
          //加载图片获取图片真实宽度和高度
          let image = new Image()
          image.onload = function (e) {
            resolve({
              Width: this.width,
              Height: this.height,
            })
          }
          image.src = data
        }
        reader.readAsDataURL(file)
      })
    },
    audio: async function (file: any) {
      return new Promise((resolve) => {
        let reader = new FileReader()
        reader.onload = function (e) {
          let data = e?.target?.result
          //加载图片获取图片真实宽度和高度
          let audio = new Audio()
          audio.onloadeddata = function (e) {
            const duration = audio.duration
            resolve({
              Duration: duration * 1000,
            })
          }
          audio.src = data
        }
        reader.readAsDataURL(file)
      })
    },
    video: async function (file: any) {
      return new Promise((resolve) => {
        let videoUrl = URL.createObjectURL(file)
        const video = document.createElement('video')
        video.src = videoUrl
        video.onloadeddata = function (e) {
          resolve({
            CoverImg: '',
            Duration: this.duration * 1000,
            Width: this.videoWidth,
            Height: this.videoHeight,
          })
        }
      })
    }
  }[type]
}
// 继续上传
const resumeUpload = async () => {
  uploadStore.pauseDisabled = false
  uploadStore.uploadDisabled = uploadStore.resumeDisabled = true
  await resumeMultipartUpload()
}
// 暂停上传
const stopUpload = () => {
  uploadStore.resumeDisabled = false
  uploadStore.pauseDisabled = true
  uploadStore.fileList.forEach((item) => {
    if (item.hasOwnProperty('client')) {
      item.isPlay = false
      item.client.cancel()
    }
  })
}
// 恢复上传
const resumeMultipartUpload = async (item?: object) => {
  // 恢复单文件
  if (item) {
    const  { tempCheckpoint } = item
    await resumeUploadFile(item, tempCheckpoint)
  } else {
    // 多文件
    Object.values(uploadStore.checkpoints).forEach((checkpoint) => {
      const { uploadId } = checkpoint
      const index = uploadStore.fileList.findIndex((option) => option.upload === uploadId)
      const item = uploadStore.fileList[index]
      resumeUploadFile(item, checkpoint)
    })
  }
}
// 恢复上传 item 文件信息 checkpoint分片信息
const resumeUploadFile = async (item:object, checkpoint:any) => {
  const { uploadId, file, name } = checkpoint
  try {
    const { raw, percentage } = item
    item.partSize = 0
    if (percentage < 100 && raw.name.indexOf('.') !== -1) {
      await item.client.multipartUpload(uploadId, file, {
        parallel: parallel.value,
        partSize: partSize.value,
        progress: async (p:any, checkpoint:any, res:any) => {
          await onUploadProgress(item, p, checkpoint, res, name)
        },
        checkpoint,
      }).then(() => {
        onCreatePanFile(item)
        delete uploadStore.checkpoints[checkpoint.uploadId]
      }).catch(async (err) => {
        await resetUpload(err, item)
      })
    }
  } catch (e) {
    console.log('resumeUploadFile -e---', e)
  }
}
const resetUpload = async (err:any, item:object) =>{
  const msg = JSON.stringify(err)
  if (msg.indexOf('Error') !== -1) {
    if (item.client) {
      item.client.cancel()
    }
    await getOss()
    const {accessKeyId, accessKeySecret, securityToken, bucket, region} = credentials
    item.client = new OSS({
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
      stsToken: securityToken,
      bucket: bucket,
      region: region,
      secure: true
    })
    await resumeMultipartUpload(item)
  }
}
// 弹窗关闭前
const handleClose = () => {
  if (uploadStore.isDoing) {
    uploadStore.fileList.splice(0, uploadStore.fileList.length)
    uploadStore.dialogVisible = false
    uploadStore.allPercent = 0
  } else {
    ElMessageBox.confirm('确定要放弃正在导入的文件吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      customClass: 'messageBox-custom',
      cancelButtonClass: 'el-button--info',
      closeOnClickModal: false,
      type: "warning"
    }).then(async () => {
      uploadStore.fileList.forEach((item, index) => {
        if (item.client && item.percentage < 100) {
          item.client.cancel()
        }
      })
      uploadStore.fileList.splice(0, uploadStore.fileList.length)
      uploadStore.dialogVisible = false
      uploadStore.allPercent = 0
    }).catch(() => {})
  }
}
onMounted(() => {
  window.addEventListener('online', async () => await resumeUpload())
})
onUnmounted(() => {
  window.removeEventListener('online', async () => await resumeUpload())
})
```

```scss
.upload-dialog {
  position: fixed;
  right: 24px;
  bottom: 51px;
  box-shadow: var(--el-box-shadow);
  background: #fff;
  width: 340px;
  border-radius: 2px;
  z-index: 9;
  color: var(--el-text-color-regular);
}
.head-title {
  font-size: 16px;
  padding: 20px 24px 10px;
  color: #333;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .text {
    font-weight: 500;
    .el-icon {
      margin-right: 8px;
    }
  }
  .text + .text {
    margin-left: 5px;
  }
  .el-link {
    margin-left: 10px;
  }
  .right-close {
    .icon {
      cursor: pointer;
      padding: 4px 10px;
      display: inline-flex;
      align-items: center;
      transition: all .3s;
      &:hover {
        color: #999;
      }
    }
  }
}
.file-item {
  display: flex;
  align-content: center;
  border-bottom: 1px solid #F6F6F6;
  padding: 10px 0;
  margin: 0 24px;
  .file-name {
    flex: 1;
    .el-progress {
      :deep(.el-progress__text) {
        text-align: right;
        min-width: 30px;
      }
    }
    .name {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .total {
        margin-left: 10px;
      }
      .file-name-item {
        max-width: 150px;
        flex: 1;
        width: 1%;
        font-weight: 500;
        display: flex;
        align-items: center;
      }
      .speed {
        margin-left: 10px;
        text-align: center;
        font-size: 12px;
        &.success {
          color: #91cc75;
        }
      }
      &.error {
        color: #f45;
        font-size: 12px;
      }
    }
  }
  &:last-child {
    border-bottom: 0;
  }
  .tool-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background-color: #eee;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
    font-size: 15px;
    color: rgb(255, 68, 85);
    font-weight: 600;
    &.success {
      color: #91cc75;
      background-color: #eee;
    }
  }
}
.num {
  background: #515256a8;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 5px;
  color: #fff;
}
```

```ts [pinia]
import {defineStore} from 'pinia'
import type { UploadRawFile } from 'element-plus'
interface State {
  fileList: Array<any>,
  unList: Array<any>,
  files: UploadRawFile | undefined,
  uploadDisabled: boolean,
  pauseDisabled: boolean,
  resumeDisabled: boolean,
  dialogVisible: boolean,
  isDoing: boolean,
  allPercent: number,
  showListBox: boolean,
  checkpoints: object,
}
export const useUploadStore = defineStore('upload', {
  state: () : State => {
    return {
      fileList: [],
      unList: [],
      files: undefined,
      uploadDisabled: true, // 开始上传
      pauseDisabled: true, // 暂停
      resumeDisabled: true, // // 重新开始
      dialogVisible: false, // 弹窗
      isDoing: false, // 弹窗
      allPercent: 0,
      showListBox: true,
      checkpoints: {},
    }
  },
  actions: {

  }
})
```
:::

## 上传按钮
```vue
<template>
  <el-upload
      ref="uploadRef"
      action=""
      :show-file-list="false"
      multiple
      :on-change="handleChange"
      :auto-upload="false"
      :accept="accept">
    <div class="custom-upload-btn">导入本地文件</div>
  </el-upload>
</template>

<script lang="ts" setup>
const handleChange: UploadProps['onChange'] = async (uploadFile, uploadFiles) => {
  let obj = {
    ...uploadFile,
    client: null,
    isPlay: false,
    isLoading: false,
    abortCheckpoint: false,
    sid: parseInt(route.query.spaceId as string),
    fid: parseInt(route.query.folderId) || 0,
    ext: uploadFile.name.substring(uploadFile.name.lastIndexOf('.') + 1).toLowerCase(),
    file_name: uploadFile.name.substring(0, uploadFile.name.lastIndexOf('.')),
    pushType: 'file'
  }
  uploadStore.fileList.unshift(obj)
  uploadStore.files = uploadFile.raw
  uploadStore.uploadDisabled = false
  uploadStore.pauseDisabled = uploadStore.resumeDisabled = true
}
</script>
```
## 页面引入
```vue
<template>
  <UploadAlone v-if="uploadStore.dialogVisible" />
</template>

<script lang="ts" setup>
import UploadAlone from '@/components/upload/UploadAlone.vue'
</script>
```











