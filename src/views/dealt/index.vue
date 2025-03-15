<template>
  <div class="dealt-container">
    <div class="main-bg" :style="{ background: `url(${url})` }"></div>
    <div class="main">
      <el-page-header @back="goBack" style="margin: 10px 0">
        <template #content>
          <span class="text-large font-600 mr-3"> {{$t('public.ApproveList')}} </span>
        </template>
        <template #extra>
          <div class="flex items-center">
            <el-button type="primary" class="ml-2 btn-link" link @click="clickRouter">{{$t('public.ApproveRecords')}}</el-button>
          </div>
        </template>
      </el-page-header>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="tabChange">
        <template v-for="item in menu">
          <el-tab-pane :label="item.meta.title" :name="item.name" v-if="item.meta.isRecord" />
        </template>
      </el-tabs>
      <transition name="fade-slide" mode="out-in" appear>
        <keep-alive>
          <component :is="panes[activeName]"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script setup name="DealtIndex">
  import url from '@/assets/images/bannner2.jpg';
  import { trendsRouters } from '@/router';
  import { deepClone } from '@/utils';
  import ExclusionAdmin from './exclusion/list.vue';
  import PatrolAdmin from './patrol/list.vue';
  import IndiaVisitors from './visitors/list.vue';
  import IndiaGoods from './goods/list.vue';
  const { proxy } = getCurrentInstance();
  const route = useRoute();
  const router = useRouter();
  const activeName = ref('IndiaVisitors');
  const menu = ref(deepClone(trendsRouters));
  const panes = {
    ExclusionAdmin: ExclusionAdmin,
    PatrolAdmin: PatrolAdmin,
    IndiaVisitors: IndiaVisitors,
    IndiaGoods:IndiaGoods,
  };
  if (route) {
    route.query.type && (activeName.value = route.query.type);
  }
  function tabChange(tab) {
    console.log('menu', menu.value);
    console.log(tab);
    activeName.value = tab.paneName;
  }
  function goBack() {
    router.go(-1);
  }
  function clickRouter() {
    router.push('/dealt/record?type=' + activeName.value);
  }
</script>
<style lang="scss" scoped>
  .dealt-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .main-bg {
      height: 106px;
      width: 1920px;
      background-repeat: no-repeat;
      background-size: 1920px 100%;
      background-origin: content-box;
    }
    .main {
      width: 1400px;
      margin: 0 auto;
      padding: 20px 0;
    }
  }
  .btn-link {
    font-size: 18px;
    position: relative;
    &::after {
      content: '';
      display: block;
      height: 2px;
      width: 100%;
      background-color: #007bfe;
      position: absolute;
      bottom: -6px;
      left: 0;
    }
    &:hover::after {
      background-color: #7fbdfe;
    }
  }
</style>
