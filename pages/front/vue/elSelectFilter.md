---
title: el-select自定义搜索
---
el-select自定义搜索

## 实现代码
```vue
<template>
  <el-select v-model="searchForm.knowledge_point" placeholder="请选择" multiple filterable :filter-method="filterMethod">
    <el-option
        v-for="item in knowledgePointList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
    />
    <template #empty>
      <template v-if="route.query.resource_type === '4'">
        <div class="no-data">无匹配数据</div>
        <div class="select-footer">
          没有找到？
          <span @click="addKnowledge">
                    <el-link type="primary" :underline="false">创建知识点</el-link>&nbsp;
                    <el-link type="primary" :underline="false">{{addKnowledgeText}}</el-link>
                  </span>
        </div>
      </template>
      <div v-else class="no-data">无匹配数据</div>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { ref, reactive， onMounted } from "vue";

// 搜索表单
let searchForm = reactive({
  knowledge_point: [],
})
// 知识点
const knowledgePointList = ref<Array<any>>([])
const knowledgePointListCopy = ref<Array<any>>([]) // 复制一份列表 方便搜索
const addKnowledgeText = ref<string>('')
const getKnowledgePointList = async () => {
  const [msg, res] = await categorySelect({type: 4})
  if (msg.err) {
    msg.err();
    return;
  }
  knowledgePointList.value = res?.data || []
  knowledgePointListCopy.value = res?.data || []
}

const filterMethod = (val:string) => {
  addKnowledgeText.value = val
  if (!val) {
    knowledgePointList.value = JSON.parse(JSON.stringify(knowledgePointListCopy.value))
  } else {
    knowledgePointList.value = knowledgePointListCopy.value.filter(item => item.name.includes(val))
  }
}

// 添加知识点
const addKnowledge = async () => {
  // 新增知识点
  await getKnowledgePointList()
  let findCurrentAdd = knowledgePointList.value.find(item => {
    return item.name === addKnowledgeText.value
  })
  searchForm.knowledge_point.push(findCurrentAdd.id)
}
onMounted(() => {
  getKnowledgePointList()
})
</script>
```

## 最终效果展示
![An image](../../../images/el-select-filter.gif)
