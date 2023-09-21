---
title: van-field失去焦点输入框自动清空
---
Vant bug：van-field失去焦点，输入框自动清空

Vant框架：https://vant-contrib.gitee.io/vant/#/zh-CN/field

## 问题描述
bug描述：当输入框输入完毕后，点击其他地方，焦点消失的时候，就自动清空输入框了。

## 解决方法
### 方法1
如果是Vue3，需要定义数据类型，例如，数字类型加上：type="number"
```vue
<van-field v-model="profitLossForm.triggerPrice" type="number" name="triggerPrice" label="触发价格" placeholder="请输入触发价格" required
                     autocomplete="off" :rules="[{ required: true, message: '请输入触发价格' }]">
            <template #right-icon>元</template>
          </van-field>
```
### 方法2
有些网友说加上一个特性maxlength="50"就行了。确实，在微信小程序好像是有效的。 但在vue的web页面无效（亲测）
