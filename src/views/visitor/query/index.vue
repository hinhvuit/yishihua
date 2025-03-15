<!-- 
  @FileDescription: 访客资料查询
  @Date:2024-08-06 16:45:14
  @Author:LZW
-->

<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane v-for="item in list" :key="item.name" :label="item.label" :name="item.name">
        <component :is="item.component" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="VisitorQuery">
  import car from './car.vue';
  import info from './info.vue';
  import user from './user.vue';
  const { proxy } = getCurrentInstance();

  const list = [
    { label: '访客信息查询', name: 'info', component: info },
    { label: '车辆进出记录查询', name: 'car', component: car },
    { label: '人员进出记录查询', name: 'user', component: user }
  ];
  const activeName = ref('info');
</script>
<style lang="scss" scoped></style>
