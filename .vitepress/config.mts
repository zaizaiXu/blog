import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blog/",
  title: "许如风",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],
    nav: [
      { text: 'Home', link: '/' },
      { text: '前端', link: '/pages/front/vue/debounce', activeMatch: '/pages/front/' },
      { text: '工具', link: '/pages/tool/git', activeMatch: '/pages/tool/' },
      { text: '项目', link: '/pages/project' },
      // {
      //   text: 'Dropdown Menu',
      //   items: [
      //     {
      //       // Title for the section.
      //       text: 'Section A Title',
      //       items: [
      //         { text: 'Section A Item A', link: '...' },
      //         { text: 'Section B Item B', link: '...' }
      //       ]
      //     },
      //     {
      //       // Title for the section.
      //       text: 'Section A Title',
      //       items: [
      //         { text: 'Section A Item A', link: '...' },
      //         { text: 'Section B Item B', link: '...' }
      //       ]
      //     }
      //   ]
      // },
      // { text: 'Github', link: 'https://github.com/...' }
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    sidebar: {
      '/pages/front/': [
        // {
        //   items: [
        //     { text: '项目笔记', link: '/pages/front/' },
        //     // {
        //     //   text: 'HTML',
        //     //   collapsible: true,
        //     //   collapsed: false,
        //     //   items: [
        //     //     { text: 'HTML', link: '/front/html' },
        //     //   ]
        //     // },
        //     // {
        //     //   text: 'Css',
        //     //   collapsible: true,
        //     //   collapsed: false,
        //     //   items: [
        //     //     { text: 'Css', link: '/front/css' },
        //     //   ]
        //     // },
        //     // {
        //     //   text: 'JavaScript',
        //     //   collapsible: true,
        //     //   collapsed: false,
        //     //   items: [
        //     //     { text: 'JavaScript', link: '/front/js' },
        //     //   ]
        //     // },
        //   ]
        // },
        {
          text: 'Vue',
          collapsed: false,
          items: [
            { text: '自定义防抖指令debounce', link: '/pages/front/vue/debounce' },
            { text: '自定义指令showTip', link: '/pages/front/vue/showTip' },
            { text: 'Vue3与Vue2的区别', link: '/pages/front/vue/differentVue23' },
            { text: 'Vue页面回退或关闭发送请求不中断', link: '/pages/front/vue/fetch' },
            { text: 'Vue实现定时刷新', link: '/pages/front/vue/refresh' },
            { text: 'Vue3 组件通讯', link: '/pages/front/vue/communication3' },
            { text: 'Vue2 组件通讯', link: '/pages/front/vue/communication2' },
            { text: 'Vue项目使用keep-alive', link: '/pages/front/vue/keepAlive' },
            { text: 'Pinia.js上手指南', link: '/pages/front/vue/pinia' },
            { text: 'Vue3使用tinymce富文本编辑器', link: '/pages/front/vue/tinymce' },
            { text: 'Vue 截取视频第一帧', link: '/pages/front/vue/videoFirstFrame' },
            { text: 'Vue3+TS实现倒计时组件', link: '/pages/front/vue/countdown' },
            { text: '切片上传', link: '/pages/front/vue/sliceUpload' },
            { text: 'el-select自定义搜索', link: '/pages/front/vue/elSelectFilter' },
            { text: 'Vue3+elementPlus动态主题', link: '/pages/front/vue/theme' },
            { text: 'el-image-viewer实现图片预览', link: '/pages/front/vue/imageViewer' },
            { text: 'el-image实现下载功能', link: '/pages/front/vue/elImage' },
            { text: 'Vue项目文件导入导出功能', link: '/pages/front/vue/importAndExport' },
            { text: 'Vue keep-alive返回保存滚动条位置', link: '/pages/front/vue/keepaliveScrollY' },
            { text: 'Vue移动端长按事件', link: '/pages/front/vue/longPress' },
            { text: 'van-field失去焦点输入框自动清空', link: '/pages/front/vue/vanField' },
          ]
        },
        {
          text: 'JavaScript',
          collapsed: false,
          items: [
            { text: '项目笔记', link: '/pages/front/js/' },
            { text: 'WebSocket', link: '/pages/front/js/websocket' },
            { text: 'JS计算精度丢失', link: '/pages/front/js/lossOfPrecision' },
            { text: 'Vue前端直传至阿里云OSS', link: '/pages/front/js/oss' },
            { text: 'DIV触底加载更多实现', link: '/pages/front/js/touchBottom' },
            { text: 'JS数据类型最简单判断方法', link: '/pages/front/js/dataType' },
            { text: 'JS树形结构数组遍历方式', link: '/pages/front/js/treeStructureArrayTraversal' },
            { text: 'JS树形结构数据筛选过滤', link: '/pages/front/js/filterTreeData' },
            { text: 'HTML内容转pdf', link: '/pages/front/js/htmlToPdf' },
            { text: 'HackTimer 避免计时器在标签页不活动时被浏览器节流', link: '/pages/front/js/hacktimer' },
          ]
        },
        {
          text: '手机端',
          collapsed: false,
          items: [
            { text: '解决小程序页面首次加载闪屏', link: '/pages/front/applet/splashScreen' },
            { text: 'Vue封装可移动悬浮窗按钮组件', link: '/pages/front/applet/hoverButton' },
          ]
        },
        {
          text: 'Css',
          collapsed: false,
          items: [
            { text: 'CSS文本超出中间内容省略号', link: '/pages/front/css/textOverrun' },
          ]
        },
        {
          text: 'HTML',
          collapsed: false,
          items: [
            { text: 'Vue瀑布流布局多种实现方式', link: '/pages/front/html/waterfalls' },
          ]
        },
      ],
      '/pages/tool/': [
        {
          text: '工具',
          collapsed: false,
          items: [
            { text: 'Git常用命令', link: '/pages/tool/git' },
            { text: '在手机上预览H5本地项目', link: '/pages/tool/preview' },
            {
              text: 'VitePress',
              collapsed: false,
              items: [
                {text: '安装', link: '/pages/tool/vitePress/install'},
                {text: '部署', link: '/pages/tool/vitePress/deploy'}
              ]
            },
          ]
        },
        {
          text: '关于Mac',
          collapsed: false,
          items: [
            {text: '设置Mac启动台图标', link: '/pages/tool/mac/bootstrap'}
          ]
        }
      ]
    },

    outline: {
      level: 'deep',
      label: '本页目录'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local'
    }
  }
})
