---
title: Vue3使用tinymce富文本编辑器
---
Vue3使用tinymce富文本编辑器

## 前言
注： vue2请看[tinymce官网](https://www.tiny.cloud/)

## 下载tinymce
[官网例子](https://www.tiny.cloud/docs/tinymce/6/vue-cloud/)

```sh
npm install --save "@tinymce/tinymce-vue"
```
## 开始使用
api-key ：去官方申请key，免费的，注册账号就行。

[key申请地址](https://www.tiny.cloud/my-account/dashboard/)

如果不填有效key，会弹出提示，影响体验。

下面是我自个配置的基本功能。

更多功能参考官网即可。 

```vue
<template>
  <Editor api-key="写你的key" :init="init" />
</template>
 
<script setup>
import { reactive } from "vue";
import Editor from "@tinymce/tinymce-vue";
 
const init = reactive({
  plugins: "lists link image table code help wordcount",
  content_css: "tinymce-5", //主题tinymce-5-dark || tinymce-5 || default || writer || document || dark
  custom_undo_redo_levels: 50, //回退数量
  end_container_on_empty_block: true, //块级文本是否换行
  keep_styles: true, //回车是否保存原有样式，例如code块回车是否截断
  menubar: false,//是否开启顶部菜单 > false 关闭菜单 |  'edit insert view format table tools help' 菜单按照这里排序 | 参考:https://www.tiny.cloud/docs/tinymce/6/menus-configuration-options/
  toolbar_mode: 'wrap',//功能栏是否换行 > | wrap 换行  | scrolling 滚动 | sliding 省略
 
  toolbar_location: 'top',//菜单栏位置 > bottom 底部 | top 顶部
  style_formats_merge: true,//是否开启默认功能
  elementpath: false,//是否展示编辑层级  > p span
  resize: true,//调整宽高 > true 调整高 | false 不可调整宽高 | both 宽高可调
  language: 'zh_CN',//中文
  
  // 自定义快捷将
  text_patterns: [
    { start: "---", replacement: "<hr/>" },
    { start: "--", replacement: "—" },
    { start: "-", replacement: "—" },
    { start: "(c)", replacement: "©" },
    { start: "//brb", replacement: "Be Right Back" },
    {
      start: "//h",
      replacement:
        '<h1 style="color: blue">Heading here</h1> <h2>Author: Name here</h2> <p><em>Date: 01/01/2000</em></p> <hr />',
    },
  ],
 
  // 自定义指令
  text_patterns_lookup: (ctx) => {
    const parentTag = ctx.block.nodeName.toLowerCase();
    if (parentTag === "pre" || parentTag === "p") {
      return [{ start: "`", end: "`", format: "code" }];
    } else if (parentTag === "p") {
      return [{ start: "*", end: "*", format: "bold" }];
    } else if (parentTag === "span") {
      return [
        // ctx.text is the string from the start of the block to the cursor
        { start: "brb", replacement: ctx.text + ": Be Right Back" },
      ];
    } else {
      return [];
    }
  },
});
</script>
```
官方设置中文直接配置 `language: 'zh_CN'`就可以了。




