<!--  -->
<template>
  <div class="dealt-container">
    <div class="main-bg" :style="{ background: `url(${url})` }"></div>
    <div class="main">
      <el-card style="max-width: 1000px; margin: 10px auto">
        <h2 style="width: 100%; text-align: center">{{ data.fName }}</h2>
        <el-descriptions v-if="data.fMeno" title="系统简介">
          <el-descriptions-item>{{ data.fMeno }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="其他信息">
          <el-descriptions-item label="开发园区">{{ data.parkName }}</el-descriptions-item>
          <el-descriptions-item label="客户端">
            <el-tag size="small" v-for="item in data.clientList" style="margin-right: 5px">{{ item }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="开发语言">
            <el-tag size="small" v-for="item in data.devLanguageList" style="margin-right: 5px">{{ item }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="赋能园区">
            <el-tag size="small" v-for="item in data.empowerParkList" style="margin-right: 5px">{{ item }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="下载地址">
          <el-descriptions-item>
            <div class="btn">
              <el-button type="primary" size="default" link @click="dlowdFile">下载文件</el-button>
              <el-button type="primary" size="default" link @click="back">返回</el-button>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script setup name="ShareInfo">
  import url from '@/assets/images/bannner2.jpg';
  import { getApp } from '@/api/share';
  const { proxy } = getCurrentInstance();
  const data = ref('');
  const route = useRoute();
  const router = useRouter();

  getApp({ fid: route.params.number }).then((res) => {
    data.value = res.data;
  });

  function dlowdFile() {
    window.open(data.value.fFileName);
  }

  function back() {
    router.replace({ path: '/home/share' });
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
</style>
