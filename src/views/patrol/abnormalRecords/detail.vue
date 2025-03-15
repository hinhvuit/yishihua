<!-- 
  @FileDescription: 异常记录详情
  @Date:2024-09-27 19:36:39
  @Author:LZW
-->
<template>
  <div class="app-container">
    <el-form class="box" :model="data" ref="formRef" label-width="82px" :inline="false" v-if="loading">
      <div class="form-item">
        <div class="item-title">巡查信息</div>
        <div class="item-context">
          <el-form-item label="园区：">
            <div class="context-info" v-if="data?.patrolCentre?.park">
              {{ useParkStore().getPark(data.patrolCentre.park)?.name }}
            </div>
          </el-form-item>
          <el-form-item label="巡查时间：">
            <div class="context-info">{{ data.patrolCentre.startTime }} 至 {{ data.patrolCentre.endTime }}</div>
          </el-form-item>
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">条款信息</div>
        <div class="item-context">
          <el-form-item label="类别：">
            <div class="context-info">{{ data.items[0].itemName }}</div></el-form-item
          >
          <el-form-item label="类型：">
            <div class="context-info">{{ data.items[0].childs[0].itemName }}</div></el-form-item
          >
          <el-form-item label="细分类型：">
            <div class="context-info">{{ data.items[0].childs[0].childs[0].itemName }}</div></el-form-item
          >
          <el-form-item label="条款：">
            <div class="context-info">{{ data.items[0].childs[0].childs[0].childs[0].itemName }}</div></el-form-item
          >
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">异常信息</div>
        <div class="item-context">
          <el-form-item label="异常描述：">
            <div class="context-info">{{ data.meno }}</div></el-form-item
          >
          <el-form-item v-if="data.files?.length" label="相关信息：">
            <div v-for="(i, id) in data.files">
              <el-image
                v-if="isPdf(i.fileUrl)"
                :src="pdf"
                fit="contain"
                @click="openFile(i.fileUrl)"
                style="width: 50px; height: 50px; margin-right: 10px; cursor: pointer"
              ></el-image>
              <el-image
                v-else
                :src="i.fileUrl"
                fit="contain"
                style="width: 50px; height: 50px; margin-right: 10px"
                :preview-src-list="[i.fileUrl]"
              ></el-image></div
          ></el-form-item>
        </div>
      </div>
      <div class="form-item" v-if="data?.patrolReform?.context">
        <div class="item-title">整改信息</div>
        <div class="item-context">
          <el-form-item label="整改描述：">
            <div class="context-info">{{ data.patrolReform.context }}</div>
          </el-form-item>
          <el-form-item label="相关信息：" v-if="data.patrolReform.files.length">
            <div v-for="(i, id) in data.patrolReform.files">
              <el-image
                v-if="isPdf(i.fileUrl)"
                :src="pdf"
                fit="contain"
                @click="openFile(i.fileUrl)"
                style="width: 50px; height: 50px; margin-right: 10px; cursor: pointer"
              ></el-image>
              <el-image
                v-else
                :src="i.fileUrl"
                fit="contain"
                style="width: 50px; height: 50px; margin-right: 10px"
                :preview-src-list="[i.fileUrl]"
              ></el-image>
            </div>
          </el-form-item>
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">签核流程</div>
        <div class="item-context">
          <ApprovalProcess :signData="signData"></ApprovalProcess>
        </div>
      </div>

      <el-form-item label-width="0">
        <el-button style="width: 80px; margin: 0 20px" type="primary" @click="goBack">返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import ApprovalProcess from '@/components/ApprovalProcess/index';
  import pdf from '@/assets/images/pdf.jpg';
  import { openFile } from '@/api/public';
  import { getInfoByNumberAndType } from '@/api/patrol';
  import { useUserType } from '@/views/dealt/patrol/useState';
  import useParkStore from '@/store/modules/park';
  const route = useRoute();
  const { proxy } = getCurrentInstance();

  const { getUserType } = useUserType();
  const signData = ref([]);
  const loading = ref(false);
  const data = ref({});

  getInfoByNumberAndType({ number: route.params.number, type: 3 }).then((res) => {
    data.value = res.data;
    loading.value = true;
    signData.value = res.data.patrolApproves.map((item) => {
      const { empName, empNo, empEmail, state, applicationLevel, stopTime, singTime, meno } = item;
      return {
        empName,
        empNo,
        email: empEmail,
        state,
        applicationLevel: getUserType(3, applicationLevel)?.label,
        stopTime,
        singTime,
        meno
      };
    });
  });

  const goBack = () => {
    proxy.$router.replace('/patrol/abnormalRecords');
  };

  // 判断是否为pdf
  function isPdf(url) {
    let arr = url.split('.');
    let type = arr[arr.length - 1];
    return type === 'pdf' ? true : false;
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
      padding: 20px 0 0 0;
    }
  }
  .box {
    width: 1200px;
    padding: 10px 35px;
    margin: 25px auto;
    background: #ffffff;
    box-shadow: 0px 0px 20px 0px rgba(153, 153, 153, 0.3);
    .form-item {
      width: 100%;
      background-color: #ffffff;
      .item-title {
        height: 40px;
        padding-left: 25px;
        font-weight: 400;
        font-size: 15px;
        color: #222222;
        line-height: 40px;
        border-bottom: 2px solid #ebebeb;
        position: relative;
        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 13px;
          left: 8px;
          border-bottom: 6px solid #ffffff;
          border-top: 6px solid #ffffff;
          border-left: 10px solid #156cff;
        }
      }
      .item-context {
        padding: 10px;
        :deep(.el-form-item) {
          margin-bottom: 0;
        }
        :deep(.el-form-item__label) {
          color: #666;
          font-weight: normal;
          justify-content: start;
          padding-right: 5px;
        }
      }
      .excl-user {
        min-width: 150px;
      }
      .item-flex {
        display: flex;
      }
    }
  }
</style>
