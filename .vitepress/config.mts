import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/my-blog/",
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
      { text: '工具', link: '/pages/tool/preview', activeMatch: '/pages/tool/' },
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
            { text: 'Vue页面回退或关闭发送请求不中断', link: '/pages/front/vue/fetch' },
            { text: 'Vue3 10种组件通讯方式', link: '/pages/front/vue/communication3' },
            { text: 'Vue2 父传子 父传后代 子传父', link: '/pages/front/vue/communication2' },
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
          ]
        },
        // {
        //   text: 'Css',
        //   collapsed: false,
        //   items: [
        //     { text: 'Css', link: '/pages/front/css' },
        //   ]
        // },
        // {
        //   text: 'HTML',
        //   collapsed: false,
        //   items: [
        //     { text: 'HTML', link: '/pages/front/html' },
        //   ]
        // },
      ],
      '/pages/tool/': [
        {
          text: '工具',
          collapsed: false,
          items: [
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
