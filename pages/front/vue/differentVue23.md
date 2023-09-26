---
title: Vue3与Vue2的区别
---

Vue3与Vue2的区别

使用`Vue3`开发也一年了，所以写了这篇文章对`Vue2`和`Vue3`做了一个对比总结

## 选项式Api与组合式Api
首先实现一个同样的逻辑(点击切换页面数据)看一下它们直接的区别
- 选项式Api
```vue
<template>
  <div @click="changeMsg">{{msg}}</div>
</template>
<script>
export default  {
  data(){
    return {
     msg:'hello world'
    }
  },
  methods:{
    changeMsg(){
      this.msg = 'hello juejin'
    }
  }
}
</script>
```

- 组合式Api
```vue
<template>
  <div @click="changeMsg">{{msg}}</div>
</template>

<script>
import { ref,defineComponent } from "vue";
export default defineComponent({
  setup() {
    const msg = ref('hello world')
    const changeMsg = ()=>{
      msg.value = 'hello juejin'
    }
    return {
      msg,
      changeMsg
    }
  }
})
</script>
```

- setup 语法糖
```vue
<template>
  <div @click="changeMsg">{{ msg }}</div>
</template>

<script setup>
import { ref } from "vue";

const msg = ref('hello world')
const changeMsg = () => {
  msg.value = 'hello juejin'
}
</script>
```
**总结**

选项式`Api`是将`data`和`methods`包括后面的`watch`，`computed`等分开管理，而组合式`Api`则是将相关逻辑放到了一起（类似于`原生js`开发）。

`setup`语法糖则可以让变量方法不用再写`return`，后面的组件甚至是自定义指令也可以在我们的`template`中自动获得。

## ref 和 reactive
我们都知道在选项式`api`中，`data`函数中的数据都具有响应式，页面会随着`data`中的数据变化而变化，而`组合式api`中不存在`data函数`该如何呢？所以为了解决这个问题`Vue3`引入了`ref`和`reactive`函数来将使得变量成为响应式的数据

- 组合式Api
```vue
<script>
import { ref,reactive,defineComponent } from "vue";
export default defineComponent({
  setup() {
    let msg = ref('hello world')
    let obj = reactive({
      name:'juejin',
      age:3
    })
    const changeData = () => {
      msg.value = 'hello juejin'
      obj.name = 'hello world'
    }
    return {
      msg,
      obj,
      changeData
    };
  },
});
</script>
```
- 语法糖
```vue
<script setup>
import { ref,reactive } from "vue";
let msg = ref('hello world')
let obj = reactive({
    name:'juejin',
    age:3
})
const changeData = () => {
  msg.value = 'hello juejin'
  obj.name = 'hello world'
}
</script>
```
**总结**

使用`ref`的时候在`js`中取值的时候需要加上`.value`。

`reactive`更推荐去定义复杂的数据类型， `ref` 更推荐定义基本类型

## 生命周期
`Vue2`和`Vue3`生命周期的差异

| Vue2(选项式API) | Vue3(setup) | 描述 |
| - | - | - |
| beforeCreate | - | 实例创建前 |
| created | - | 实例创建后 |
| beforeMount | onBeforeMount | DOM挂载前调用 |
| mounted | onMounted | DOM挂载完成调用 |
| beforeUpdate | onBeforeUpdate | 数据更新之前被调用 |
| updated | onUpdated | 数据更新之后被调用 |
| beforeDestroy | onBeforeUnmount | 组件销毁前调用 |
| destroyed | onUnmounted | 组件销毁完成调用 |

举个常用的`onMounted`的例子

- 选项式Api
```vue
<script>
export default  {
  mounted(){
    console.log('挂载完成')
  }
}
</script>
```

- 组合式Api
```vue
<script>
import { onMounted,defineComponent } from "vue";
export default defineComponent({
  setup() {
    onMounted(()=>{
      console.log('挂载完成')
    })
    return {
      onMounted
    }
  }
})
</script>
```

- setup语法糖
```vue
<script setup>
import { onMounted } from "vue";
onMounted(()=>{
  console.log('挂载完成')
})
</script>
```
从上面可以看出`Vue3`中的组合式`API`采用`hook函数`引入生命周期；其实不止生命周期采用hook函数引入，像`watch`、`computed`、`路由守卫`等都是采用`hook函数`实现

**总结**

`Vue3`中的生命周期相对于`Vue2`做了一些调整，命名上发生了一些变化并且移除了`beforeCreate`和`created`，因为`setup`是围绕`beforeCreate`和`created`生命周期钩子运行的，所以不再需要它们。

生命周期采用`hook函数`引入

## watch和computed
- 选项式API
```vue
<template>
  <div>{{ addSum }}</div>
</template>
<script>
export default {
  data() {
    return {
      a: 1,
      b: 2
    }
  },
  computed: {
    addSum() {
      return this.a + this.b
    }
  },
  watch:{
    a(newValue, oldValue){
      console.log(`a从${oldValue}变成了${newValue}`)
    }
  }
}
</script>
```

- 组合式Api
```vue
<template>
  <div>{{addSum}}</div>
</template>
<script>
import { computed, ref, watch, defineComponent } from "vue";
export default defineComponent({
  setup() {
    const a = ref(1)
    const b = ref(2)
    let addSum = computed(() => {
      return a.value+b.value
    })
    watch(a, (newValue, oldValue) => {
     console.log(`a从${oldValue}变成了${newValue}`)
    })
    return {
      addSum
    };
  },
});
</script>
```
- setup语法糖
```vue
<template>
  <div>{{ addSum }}</div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
const a = ref(1)
const b = ref(2)
let addSum = computed(() => {
  return a.value + b.value
})
watch(a, (newValue, oldValue) => {
  console.log(`a从${oldValue}变成了${newValue}`)
})
</script>
```
`Vue3`中除了`watch`，还引入了副作用监听函数`watchEffect`，`watchEffect`不需要传入依赖项。

那么什么是`watchEffect`呢？

`watchEffect`它会立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

比如这段代码
```vue
<template>
  <div>{{ watchTarget }}</div>
</template>
<script setup>
import { watchEffect,ref } from "vue";
const watchTarget = ref(0)
watchEffect(()=>{
  console.log(watchTarget.value)
})
setInterval(()=>{
  watchTarget.value++
},1000)
</script>
```
首先刚进入页面就会执行`watchEffect`中的函数打印出:0,随着定时器的运行，`watchEffect`监听到依赖数据的变化回调函数每隔一秒就会执行一次

**总结**

`computed`和`watch`所依赖的数据必须是响应式的。`Vue3`引入了`watchEffect`, `watchEffect` 相当于将 `watch` 的依赖源和回调函数合并，当任何你有用到的响应式依赖更新时，该回调函数便会重新执行。不同于 `watch`的是`watchEffect`的回调函数会被立即执行，即（{ `immediate: true` }）

## 组件通信
Vue中组件通信方式有很多，其中选项式API和组合式API实现起来会有很多差异(_这模块不再写组合式api写法_)

这里将介绍如下组件通信方式(大概总结)：

| 方式 | Vue2 | Vue3 |
| - | - | - |
| 父传子 | props | props |
| 子传父 | $emit | emits |
| 父传子 | $attrs | attrs |
| 子传父 | $listeners | 无(合并到 attrs方式) |
| 父传子 | provide | provide |
| 子传父 | inject | inject |
| 子组件访问父组件 | $parent | - |
| 父组件访问子组件 | $children | - |
| 父组件访问子组件 | $ref | expose&ref |
| 兄弟传值 | EventBus | mitt |

### props
`props`是组件通信中最常用的通信方式之一。父组件通过`v-bind`传入，子组件通过`props`接收，下面是它的三种实现方式

- 选项式API
```vue
//父组件
<template>
  <div>
    <Child :msg="parentMsg" />
  </div>
</template>
<script>
import Child from './Child'
export default {
  components:{
    Child
  },
  data() {
    return {
      parentMsg: '父组件信息'
    }
  }
}
</script>

//子组件
<template>
  <div>
    {{msg}}
  </div>
</template>
<script>
export default {
  props:['msg']
}
</script>
```

- setup语法糖
```vue
//父组件
<template>
  <div>
    <Child :msg="parentMsg" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'
const parentMsg = ref('父组件信息')
</script>

//子组件
<template>
  <div>
    {{ parentMsg }}
  </div>
</template>
<script setup>
import { toRef, defineProps } from "vue";

const props = defineProps(["msg"]);
console.log(props.msg) //父组件信息
let parentMsg = toRef(props, 'msg')
</script>
```

### emit
子组件可以通过`emit`发布一个事件并传递一些参数，父组件通过`v-on`进行这个事件的监听
- 选项式API
```vue

//父组件
<template>
  <div>
    <Child @sendMsg="getFromChild" />
  </div>
</template>
<script>
import Child from './Child'
export default {
  components:{
    Child
  },
  methods: {
    getFromChild(val) {
      console.log(val) //我是子组件数据
    }
  }
}
</script>

// 子组件
<template>
  <div>
    <button @click="sendFun">send</button>
  </div>
</template>
<script>
export default {
  methods:{
    sendFun(){
      this.$emit('sendMsg','我是子组件数据')
    }
  }
}
</script>
```

- setup语法糖
```vue
//父组件
<template>
  <div>
    <Child @sendMsg="getFromChild" />
  </div>
</template>
<script setup>
import Child from './Child'
const getFromChild = (val) => {
  console.log(val) //我是子组件数据
}
</script>

//子组件
<template>
  <div>
    <button @click="sendFun">send</button>
  </div>
</template>
<script setup>
import { defineEmits } from "vue";
const emits = defineEmits(['sendMsg'])
const sendFun = () => {
  emits('sendMsg', '我是子组件数据')
}
</script>
```

### attrs和listeners
子组件使用`$attrs`可以获得父组件除了`props`传递的属性和特性绑定属性 (`class`和 `style`)之外的所有属性。

子组件使用`$listeners`可以获得父组件(`不含.native`修饰器的)所有`v-on`事件监听器，在`Vue3`中已经不再使用；但是`Vue3`中的`attrs`不仅可以获得父组件传来的属性也可以获得父组件`v-on`事件监听器

- 选项式API
```vue

//父组件
<template>
  <div>
    <Child @parentFun="parentFun" :msg1="msg1" :msg2="msg2"  />
  </div>
</template>
<script>
import Child from './Child'
export default {
  components:{
    Child
  },
  data(){
    return {
      msg1:'子组件msg1',
      msg2:'子组件msg2'
    }
  },
  methods: {
    parentFun(val) {
      console.log(`父组件方法被调用,获得子组件传值：${val}`)
    }
  }
}
</script>

//子组件
<template>
  <div>
    <button @click="getParentFun">调用父组件方法</button>
  </div>
</template>
<script>
export default {
  methods:{
    getParentFun(){
      this.$listeners.parentFun('我是子组件数据')
    }
  },
  created(){
    //获取父组件中所有绑定属性
    console.log(this.$attrs)  //{"msg1": "子组件msg1","msg2": "子组件msg2"}
    //获取父组件中所有绑定方法    
    console.log(this.$listeners) //{parentFun:f}
  }
}
</script>
```

- setup语法糖
```vue
//父组件
<template>
  <div>
    <Child @parentFun="parentFun" :msg1="msg1" :msg2="msg2" />
  </div>
</template>
<script setup>
import Child from './Child'
import { ref } from "vue";
const msg1 = ref('子组件msg1')
const msg2 = ref('子组件msg2')
const parentFun = (val) => {
  console.log(`父组件方法被调用,获得子组件传值：${val}`)
}
</script>

//子组件
<template>
    <div>
        <button @click="getParentFun">调用父组件方法</button>
    </div>
</template>
<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs()
//获取父组件方法和事件
console.log(attrs) //Proxy {"msg1": "子组件msg1","msg2": "子组件msg2"}
const getParentFun = () => {
    //调用父组件方法
    attrs.onParentFun('我是子组件数据')
}
</script>
```
**注意**

`Vue3`中使用`attrs`调用父组件方法时，方法前需要加上`on`；如`parentFun`->`onParentFun`

### provide/inject
`provide`：是一个对象，或者是一个返回对象的函数。里面包含要给子孙后代属性

`inject`：一个字符串数组，或者是一个对象。获取父组件或更高层次的组件`provide`的值，既在任何后代组件都可以通过`inject`获得

- 选项式API
```vue
//父组件
<script>
import Child from './Child'
export default {
  components: {
    Child
  },
  data() {
    return {
      msg1: '子组件msg1',
      msg2: '子组件msg2'
    }
  },
  provide() {
    return {
      msg1: this.msg1,
      msg2: this.msg2
    }
  }
}
</script>

//子组件
<script>
export default {
  inject:['msg1','msg2'],
  created(){
    //获取高层级提供的属性
    console.log(this.msg1) //子组件msg1
    console.log(this.msg2) //子组件msg2
  }
}
</script>
```
- setup语法糖
```vue
//父组件
<script setup>
import Child from './Child'
import { ref,provide } from "vue";
const msg1 = ref('子组件msg1')
const msg2 = ref('子组件msg2')
provide("msg1",msg1)
provide("msg2",msg2)
</script>

//子组件
<script setup>
import { inject } from "vue";
console.log(inject('msg1').value) //子组件msg1
console.log(inject('msg2').value) //子组件msg2
</script>
```
**说明**

`provide/inject`一般在深层组件嵌套中使用合适。一般在组件开发中用的居多。

### parent/children
`$parent`: 子组件获取父组件Vue实例，可以获取父组件的属性方法等

`$children`: 父组件获取子组件Vue实例，是一个数组，是直接儿子的集合，但并不保证子组件的顺序

- Vue2
```vue
<script>
import Child from './Child'
export default {
  components: {
    Child
  },
  created(){
    console.log(this.$children) //[Child实例]
    console.log(this.$parent)//父组件实例
  }
}
</script>
```
**注意**

父组件获取到的`$children`并不是响应式的

### expose&ref
`$refs`可以直接获取元素属性，同时也可以直接获取子组件实例

- 选项式API
```vue
//父组件
<template>
  <div>
    <Child ref="child" />
  </div>
</template>
<script>
import Child from './Child'
export default {
  components: {
    Child
  },
  mounted(){
    //获取子组件属性
    console.log(this.$refs.child.msg) //子组件元素

    //调用子组件方法
    this.$refs.child.childFun('父组件信息')
  }
}
</script>

//子组件
<template>
  <div>
    <div></div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      msg:'子组件元素'
    }
  },
  methods:{
    childFun(val){
      console.log(`子组件方法被调用,值${val}`)
    }
  }
}
</script>
```

- setup语法糖
```vue
//父组件
<template>
  <div>
    <Child ref="child" />
  </div>
</template>
<script setup>
import Child from './Child'
import { ref, onMounted } from "vue";
const child = ref() //注意命名需要和template中ref对应
onMounted(() => {
  //获取子组件属性
  console.log(child.value.msg) //子组件元素

  //调用子组件方法
  child.value.childFun('父组件信息')
})
</script>

//子组件
<template>
    <div></div>
</template>
<script setup>
import { ref,defineExpose } from "vue";
const msg = ref('子组件元素')
const childFun = (val) => {
    console.log(`子组件方法被调用,值${val}`)
}
//必须暴露出去父组件才会获取到
defineExpose({
    childFun,
    msg
})
</script>
```
**注意**

通过`ref`获取子组件实例必须在页面挂载完成后才能获取。

在使用`setup语法糖`时候，子组件必须将元素或方法`暴露`出去父组件才能获取到

### EventBus/mitt
兄弟组件通信可以通过一个事件中心`EventBus`实现，既新建一个Vue实例来进行事件的监听，触发和销毁。

在`Vue3`中没有了EventBus兄弟组件通信，但是现在有了一个替代的方案`mitt.js`，原理还是 `EventBus`

- 选项式API
```vue
//组件1
<template>
  <div>
    <button @click="sendMsg">传值</button>
  </div>
</template>
<script>
import Bus from './bus.js'
export default {
  data(){
    return {
      msg:'子组件元素'
    }
  },
  methods:{
    sendMsg(){
      Bus.$emit('sendMsg','兄弟的值')
    }
  }
}
</script>

//组件2
<template>
  <div>
    组件2
  </div>
</template>
<script>
import Bus from './bus.js'
export default {
  created(){
   Bus.$on('sendMsg',(val)=>{
    console.log(val);//兄弟的值
   })
  }
}
</script>

//bus.js
import Vue from "vue"
export default new Vue()
```

- setup语法糖

首先安装mitt
```shell
npm i mitt -S
```
然后像Vue2中`bus.js`一样新建`mitt.js`文件

mitt.js
```js
import mitt from 'mitt'
const Mitt = mitt()
export default Mitt
```

- setup语法糖
```vue
//组件1
<template>
    <button @click="sendMsg">传值</button>
</template>
<script setup>
import Mitt from './mitt.js'
const sendMsg = () => {
    Mitt.emit('sendMsg', '兄弟的值')
}
</script>

//组件2
<template>
  <div>
    组件2
  </div>
</template>
<script setup>
import { onUnmounted } from "vue";
import Mitt from './mitt.js'
const getMsg = (val) => {
  console.log(val);//兄弟的值
}
Mitt.on('sendMsg', getMsg)
onUnmounted(() => {
  //组件销毁 移除监听
  Mitt.off('sendMsg', getMsg)
})
</script>
```

## v-model和sync
`v-model`大家都很熟悉，就是双向绑定的语法糖。这里不讨论它在`input`标签的使用；只是看一下它和`sync`在组件中的使用

我们都知道Vue中的`props`是单向向下绑定的；每次父组件更新时，子组件中的所有`props`都会刷新为最新的值；但是如果在子组件中修改 `props` ，Vue会向你发出一个警告（无法在子组件修改父组件传递的值)；可能是为了防止子组件无意间修改了父组件的状态，来避免应用的数据流变得混乱难以理解。

但是可以在父组件使用子组件的标签上声明一个监听事件，子组件想要修改`props`的值时使用`$emit`触发事件并传入新的值，让父组件进行修改。

为了方便vue就使用了`v-model`和`sync`语法糖。

- 选项式API

```vue
//父组件
<template>
  <div>
   <!-- 
      完整写法
      <Child @update:changePval="msg=$event" /> 
      -->
    <Child :changePval.sync="msg" />
    {{msg}}
  </div>
</template>
<script>
import Child from './Child'
export default {
  components: {
    Child
  },
  data(){
    return {
      msg:'父组件值'
    }
  }
  
}
</script>

//子组件
<template>
  <div>
    <button @click="changePval">改变父组件值</button>
  </div>
</template>
<script>
export default {
  data(){
    return {
      msg:'子组件元素'
    }
  },
  methods:{
    changePval(){
       //点击则会修改父组件msg的值
      this.$emit('update:changePval','改变后的值')
    }
  }
}
</script>
```

- setup语法糖
```vue
//父组件
<template>
  <div>
    <!-- 
      完整写法
      <Child @update:changePval="msg=$event" /> 
      -->
    <Child v-model:changePval="msg" />
    {{msg}}
  </div>
</template>
<script setup>
import Child from './Child'
import { ref } from 'vue'
const msg = ref('父组件值')
</script>

//子组件
<template>
    <button @click="changePval">改变父组件值</button>
</template>
<script setup>
import { defineEmits } from 'vue';
const emits = defineEmits(['changePval'])
const changePval = () => {
    //点击则会修改父组件msg的值
    emits('update:changePval','改变后的值')
}
</script>
```
**总结**

vue3中移除了`sync`的写法，取而代之的式v-model`:event`的形式

其`v-model:changePval="msg"`或者`:changePval.sync="msg"`的完整写法为 `@update:changePval="msg=$event"`。

所以子组件需要发送`update:changePval`事件进行修改父组件的值

## 路由
vue3和vue2路由常用功能只是写法上有些区别

- 选项式API
```vue
<template>
  <div>
     <button @click="toPage">路由跳转</button>
  </div>
</template>
<script>
export default {
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    next()
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    next()
  },
  beforeRouteLeave ((to, from, next)=>{//离开当前的组件，触发
    next()       
  }),
  beforeRouteLeave((to, from, next)=>{//离开当前的组件，触发
    next()      
  }),
  methods:{
    toPage(){
      //路由跳转
      this.$router.push(xxx)
    }
  },
  created(){
    //获取params
    this.$route.params
    //获取query
    this.$route.query
  }
}
</script>
```

- 组合式API
```vue
<template>
  <div>
    <button @click="toPage">路由跳转</button>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    next()
  },
  beforeRouteLeave ((to, from, next)=>{//离开当前的组件，触发
    next()       
  }),
  beforeRouteLeave((to, from, next)=>{//离开当前的组件，触发
    next()      
  }),
  setup() {
    const router = useRouter()
    const route = useRoute()
    const toPage = () => {
      router.push(xxx)
    }

    //获取params 注意是route
    route.params
    //获取query
    route.query
    return {
      toPage
    }
  },
});
</script>
```

- setup语法糖

我之所以用`beforeRouteEnter`作为路由守卫的示例是因为它在`setup`语法糖中是无法使用的；大家都知道setup中组件实例已经创建，是能够获取到组件实例的。而beforeRouteEnter是再进入路由前触发的，此时组件还未创建，所以是无法用在setup中的；如果想在setup语法糖中使用则需要再写一个script 

如下：

```vue
<template>
  <div>
    <button @click="toPage">路由跳转</button>
  </div>
</template>
<script>
export default {
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    next()
  },
};
</script>

<script setup>
import { useRoute, useRouter，onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
const router = useRouter()
const route = useRoute()
const toPage = () => {
  router.push(xxx)
}
//获取params 注意是route
route.params
//获取query
route.query
//路由守卫
onBeforeRouteUpdate((to, from, next)=>{//当前组件路由改变后，进行触发
    next() 
})
onBeforeRouteLeave((to, from, next)=>{//离开当前的组件，触发
    next() 
})
</script>
```

## 多根节点
熟悉 Vue2 的朋友应该清楚，在模板中如果使用多个根节点时会报错，如下所示
```vue
// vue2中在template里存在多个根节点会报错
<template>
  <header></header>
  <main></main>
  <footer></footer>
</template>

// 只能存在一个根节点，需要用一个<div>来包裹着
<template>
  <div>
    <header></header>
    <main></main>
    <footer></footer>
  </div>
</template>
```
但是，Vue3 支持多个根节点，也就是 `fragment`。即以下多根节点的写法是被允许的。
```vue
<template>
  <header></header>
  <main></main>
  <footer></footer>
</template>
```

## Teleport
Vue3 提供 `Teleport` 组件可将部分 DOM 移动到 Vue app 之外的位置。比如项目中常见的 Dialog 弹窗
```vue
<button @click="dialogVisible = true">显示弹窗</button>
<teleport to="body">
  <div class="dialog" v-if="dialogVisible">
    我是弹窗，我直接移动到了body标签下  </div>
</teleport>
```

## End
通过以上写法的对比会发现setup语法糖的形式最为便捷而且更符合开发者习惯; 未来Vue3的开发应该会大面积使用这种形式.








