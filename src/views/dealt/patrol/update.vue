<!-- 
  @FileDescription:驳回修改
  @Date:2024-09-29 15:53:19
  @Author:LZW
-->
<template>
  <div class="dealt-container">
    <div class="main-bg" :style="{ background: `url(${url})` }"></div>
    <div class="main">
      <el-page-header @back="goBack" style="margin: 10px 0">
        <template #content>
          <span class="text-large font-600 mr-3"> 审核详情 </span>
        </template>
      </el-page-header>
    </div>
    <el-form class="box" :model="subParams" ref="formRef" label-width="82px" :inline="false" v-if="loading">
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
        <div class="item-context" v-if="isZg">
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
        <div class="item-context" v-else>
          <el-form-item
            label="异常描述："
            :rules="[{ required: true, message: '请输入异常描述', trigger: 'blur' }]"
            prop="meno"
            label-width="90px"
          >
            <el-input v-model="subParams.meno" type="textarea" :rows="5" placeholder="异常描述"></el-input>
          </el-form-item>
          <el-form-item label="相关信息：" label-width="90px" style="margin-top: 20px">
            <MyUpload
              :fileSizeMax="10 * 1024"
              :fileSizeMin="0"
              :isShowTip="false"
              :fileType="['png', 'jpg', 'jpeg', 'pdf']"
              :urlList="subParams.files"
              @uploadChange="
                (file) => {
                  subParams.files = file;
                }
              "
            >
            </MyUpload>
          </el-form-item>
        </div>
      </div>
      <div class="form-item" v-if="data.patrolReform">
        <div class="item-title">整改信息</div>
        <div class="item-context" v-if="!isZg">
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
        <div class="item-context" v-else>
          <el-form-item
            label="整改描述："
            :rules="[{ required: true, message: '请输入整改描述', trigger: 'blur' }]"
            prop="meno"
            label-width="90px"
          >
            <el-input v-model="subParams.meno" type="textarea" :rows="5" placeholder="整改描述"></el-input>
          </el-form-item>
          <el-form-item label="相关信息：" label-width="90px" style="margin-top: 20px">
            <MyUpload
              :fileSizeMax="10 * 1024"
              :fileSizeMin="0"
              :isShowTip="false"
              :fileType="['png', 'jpg', 'jpeg', 'pdf']"
              :urlList="subParams.files"
              @uploadChange="
                (file) => {
                  subParams.files = file;
                }
              "
            >
            </MyUpload>
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
        <el-button style="width: 80px; margin: 0 20px" type="primary" @click="handleSubmit">提 报</el-button>
        <el-button style="width: 80px; margin: 0 20px" type="primary" @click="goBack">返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import MyUpload from '@/views/dealt/patrol/MyUpload/index.vue';
  import ApprovalProcess from '@/components/ApprovalProcess/index';
  import pdf from '@/assets/images/pdf.jpg';
  import url from '@/assets/images/bannner2.jpg';
  import { openFile } from '@/api/public';
  import { getInfoByNumberAndType, reportAbnormal } from '@/api/patrol';
  import { patrolSign } from '@/api/patrol/dealt';
  import { useUserType } from '@/views/dealt/patrol/useState';
  import useParkStore from '@/store/modules/park';
  const route = useRoute();
  const { proxy } = getCurrentInstance();

  const { getUserType } = useUserType();
  const signData = ref([]);
  const loading = ref(false);
  const data = ref({});
  const isZg = ref(false);

  const subParams = ref({});

  getInfoByNumberAndType({ number: route.params.number, type: 3 }).then((res) => {
    data.value = res.data;
    loading.value = true;
    const { number, centreId, itemId, meno, files, patrolReform } = res.data;
    subParams.value.number = number;
    subParams.value.centreId = centreId;
    subParams.value.itemId = itemId;
    if (patrolReform) {
      // 后四级节点驳回
      isZg.value = true;
      subParams.value.meno = patrolReform.context;
      subParams.value.files = patrolReform.files;
    } else {
      // 前四级节点驳回
      subParams.value.meno = meno;
      subParams.value.files = files;
    }
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
    proxy.$router.replace('/dealt/index?type=PatrolAdmin');
  };

  // 判断是否为pdf
  function isPdf(url) {
    let arr = url.split('.');
    let type = arr[arr.length - 1];
    return type === 'pdf' ? true : false;
  }

  const handleSubmit = () => {
    proxy.$refs['formRef'].validate((valid) => {
      if (!valid) return;
      if (data.value.patrolReform) {
        // 后四级节点驳回
        const { number, meno, files } = subParams.value;
        const obj = {
          number,
          type: 3,
          meno: '',
          result: true,
          reForm: {
            context: meno,
            files: files
          }
        };
        patrolSign(obj).then((res) => {
          proxy.$message.success('提交成功');
          goBack();
        });
      } else {
        // 前四级节点驳回
        reportAbnormal(subParams.value).then((res) => {
          proxy.$message.success('提交成功');
          goBack();
        });
      }
    });
  };
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
