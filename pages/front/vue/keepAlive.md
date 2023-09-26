---
title: Vue项目使用keep-alive实现详情页返回列表页,保存之前的查询条件
---
Vue项目使用keep-alive实现详情页返回列表页,保存之前的查询条件

## 项目需求
1. 从列表页面(list.vue)进入详情页面(detail.vue)后再返回列表页，需要保留之前的查询条件
2. 从其他页面(home.vue)进入列表页面(list.vue)不需要保留查询条件

## 使用keep-alive来缓存页面
### 配置路由routes.js

在路由选项中，配置`meta`属性，需要缓存的页面设置`keepAlive`为`true`即为需要缓存，同时设置`isBack`属性，用来标识页面是否是从详情页面返回的，默认`false`
```js
{
  path: '/list',
    component: Layout,
    hidden: true,
    meta: { title: '', icon: 'fa fa-home' },
    children: [
    {
      path: '',
      name: 'List',
      meta: {
        title: '列表页',
        icon: 'fa fa-home',
        keepAlive: true,
        isBack: false
      },
      component: () => import('./views/PPAP/PPAPDealTasks.vue'),
    }
  ]
}
```
### 父页面index.vue配置`keep-alive`

通过判断是否需要缓存的页面，需在`router-view`条件绑定

```vue
<keep-alive>
  <router-view ref="view" v-if="$route.meta.keepAlive"/>
</keep-alive>
<router-view ref="view" v-if="!$route.meta.keepAlive" />
```

### 列表页面(list.vue)配置

通过`beforeRouteEnter(to, from, next)`，来判断路由是从哪里跳转进入列表页面，如果是从详情页面(detail.vue)跳转的，将当前路由对象的`meta.isBack`设置为true，否则设置为false
```js
beforeRouteEnter (to, from, next) {
  if (from.path === '/list/detail') {
      // 详情页路由
    to.meta.isBack = true
  } else {
    to.meta.isBack = false
  }
  next()
}
```
### 在detail.vue页面beforeRouteLeave(to, from, next)方法设置keepAlive
```js
beforeRouteLeave (to, from, next) {
	to.meta.keepAlive = true // 给列表(list.vue)页面设置keepAlive
	next()
}
```

### 在activated钩子函数中挂在页面初次进入时的请求数据
为了在其他页面比如首页(home.vue)进入列表页面(list.vue)，刷新页面中的列表数据和查询条件，我们将在`activated`钩子函数中挂在页面初次进入时的请求数据。当进入详情页面(detail.vue)后返回列表页面(list.vue)，保存缓存之前的查询条件

```js
onActivated () {
    if (!this.$route.meta.isBack) {
      this.init() // 不是详情页面(detail.vue)进入，更新初始化列表数据
    } else {
        // 这是详情页返回，可任意写自己需要处理的方法
        this.$route.meta.isBack = false // 重置详情页标识isBack
    }
}
```





