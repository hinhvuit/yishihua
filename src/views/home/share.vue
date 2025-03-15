<!-- 
  @FileDescription:技术共享
  @Date:2024-08-28 11:02:45
  @Author:LZW
-->
<template>
  <main class="main">
    <div class="main-bg" :style="{ background: `url(${url})` }"></div>
    <div class="select_box">
      <el-affix :offset="0">
        <div class="select">
          <el-select
            class="select_item"
            v-model="queryParams.parkId"
            placeholder="开发园区"
            clearable
            multiple
            collapse-tags
            collapse-tags-tooltip
          >
            <el-option v-for="item in allParkList" :key="item.pid" :label="item.pname" :value="item.pid"> </el-option>
          </el-select>
          <el-select
            class="select_item"
            v-model="queryParams.client"
            placeholder="客户端"
            clearable
            multiple
            collapse-tags
            collapse-tags-tooltip
          >
            <el-option v-for="item in clientList" :key="item.cId" :label="item.cName" :value="item.cName"> </el-option>
          </el-select>
          <el-select
            class="select_item"
            v-model="queryParams.devLanguage"
            placeholder="开发语言"
            clearable
            multiple
            collapse-tags
            collapse-tags-tooltip
          >
            <el-option v-for="item in languageList" :key="item.lId" :label="item.lName" :value="item.lName">
            </el-option>
          </el-select>
          <el-select
            class="select_item"
            v-model="queryParams.empowerPark"
            placeholder="赋能园区"
            clearable
            multiple
            collapse-tags
            collapse-tags-tooltip
          >
            <el-option v-for="item in parkList" :key="item.eId" :label="item.eName" :value="item.eName"> </el-option>
          </el-select>
          <el-input
            class="select_item"
            v-model="queryParams.name"
            placeholder="应用名称"
            style="width: 250px"
          ></el-input>
          <el-button style="width: 120px" type="primary" size="default" @click="getDataList()">搜 索</el-button>
          <el-button style="width: 120px" type="primary" size="default" plain @click="reset">重 置</el-button>
        </div>
      </el-affix>
    </div>
    <div style="display: flex; flex-wrap: wrap; width: 1480px">
      <template v-for="item in dataList">
        <div class="app_item">
          <app-item
            @click="toInfo(item.fid)"
            :imgUrl="item.coverUrl"
            :name="item.fName"
            :park="item.parkName"
            :pList="item.empowerParkList"
            :lList="item.devLanguageList"
            :cList="item.clientList"
          ></app-item>
        </div>
      </template>
    </div>
  </main>
</template>

<script setup name="Home">
  import { selectBanner, selectAppList, getParkList, getClientList, getLanguageList } from '@/api/share';
  import { getAllPark } from '@/api/public';
  import url from '@/assets/images/bannner2.jpg';
  import AppItem from '@/components/AppItem/index';
  const { proxy } = getCurrentInstance();

  const router = useRouter();
  const bannerList = ref([]);
  const dataList = ref([]);
  const parkList = ref([]);
  const clientList = ref([]);
  const languageList = ref([]);
  const allParkList = ref([]);
  const queryParams = ref({
    parkId: '',
    name: '',
    client: '',
    devLanguage: '',
    empowerPark: ''
  });
  getParkList().then((res) => {
    parkList.value = res.data;
  });

  getClientList().then((res) => {
    clientList.value = res.data;
  });

  getLanguageList().then((res) => {
    languageList.value = res.data;
  });

  getAllPark().then((res) => {
    allParkList.value = res.data;
  });

  // selectBanner().then((res) => {
  //   bannerList.value = res.data;
  // });

  function getDataList() {
    selectAppList(queryParams.value).then((res) => {
      dataList.value = res.data;
    });
  }
  function reset() {
    queryParams.value = {
      parkId: '',
      name: '',
      client: '',
      devLanguage: '',
      empowerPark: ''
    };
    getDataList();
  }
  getDataList();

  function toInfo(id) {
    router.push({
      path: '/home/shareInfo/' + id
    });
  }
</script>
<style lang="scss" scoped>
  .app_item {
    margin-bottom: calc(40px / 3);
    margin-right: calc(40px / 3);
    &:nth-child(4n) {
      margin-right: 0;
    }
  }
  .select_box {
    width: 1480px;
  }
  .select {
    /* margin-top: 10px; */
    width: 100%;
    padding: 20px 0;
    background-color: #fff;
    .select_item {
      margin-right: 10px;
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
    .item-title {
      font-family: Source Han Sans CN;
      font-weight: bold;
      font-size: 56px;
      color: #222222;
      position: relative;
      div {
        width: 240px;
        position: absolute;
        top: -60px;
        left: -120px;
        text-align: center;
      }
      span {
        display: block;
        width: 77px;
        height: 67px;
        font-weight: 600;
        font-size: 86px;
        color: #f2f2f2;
        line-height: 42px;
        position: absolute;
        left: -55px;
        bottom: 0px;
      }
      &::before {
        content: '';
        display: block;
        width: 230px;
        height: 21px;
        background: #c6e5ff;
        position: absolute;
        left: -116px;
        bottom: -12px;
      }
    }
    .main-bg {
      height: 106px;
      width: 1920px;
      background-repeat: no-repeat;
      background-size: 1920px 100%;
      background-origin: content-box;
    }
  }
</style>
