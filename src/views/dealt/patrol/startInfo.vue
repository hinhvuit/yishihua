<!-- 
  @FileDescription: 发起巡查
  @Date:2024-09-25 19:24:34
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
    <el-form class="box" :model="info" ref="formRef" label-width="82px" :inline="false">
      <div class="form-item">
        <div class="item-title">巡查计划</div>
        <div class="item-context">
          <el-form-item label="园区：">
            <div class="context-info">{{ useParkStore().getPark(data.park)?.name }}</div>
          </el-form-item>
          <el-form-item label="巡查时间：">
            <div class="context-info">{{ data.startTime }} 至 {{ data.endTime }}</div></el-form-item
          >
          <el-form-item label="备注：">
            <div class="context-info">{{ data.meno ? data.meno : '无' }}</div></el-form-item
          >
          <el-form-item v-if="data.files?.length" label="相关文件：">
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
      <div class="form-item">
        <div class="item-title">巡查人员</div>
        <div class="item-context">
          <el-form-item v-for="(item, index) in data.peoples" :label="`巡查${index + 1}：`">
            <div class="context-info">
              {{ item.empName }}-{{ item.empNo }}-{{ item.empEmail }}
              <el-tag v-if="item.isLog" type="success"> 记录人</el-tag>
            </div></el-form-item
          >
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">巡查主管</div>
        <div class="item-context">
          <el-form-item label="巡查主管：">
            <div class="context-info">
              {{ data.patrolName }}-{{ data.patrolBy }}-{{ data.patrolEmail }}
            </div></el-form-item
          >
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">园区窗口</div>
        <div class="item-context">
          <el-form-item label="园区窗口：">
            <div class="context-info">{{ data.parkName }}-{{ data.parkBy }}-{{ data.parkEmail }}</div></el-form-item
          >
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">签核流程</div>
        <div class="item-context">
          <ApprovalProcess :signData="signData"></ApprovalProcess>
        </div>
      </div>

      <el-form-item label-width="0">
        <el-button style="width: 80px; margin: 0 20px" type="primary" @click="signOff(true)">同 意</el-button>
        <el-button style="width: 80px; margin: 0 20px" type="danger" @click="signOff(false)">驳 回</el-button>
        <el-button style="width: 80px; margin: 0 20px" type="primary" @click="goBack">返 回</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="1000px"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <el-form :model="subParams" ref="subRef" :inline="true" :rules="rule">
        <el-form-item prop="meno">
          <el-input
            v-model="subParams.meno"
            placeholder="请输入备注"
            clearable
            type="textarea"
            :rows="3"
            style="width: 960px"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="subSign">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="PatrolStartInfo">
  import ApprovalProcess from '@/components/ApprovalProcess/index';
  import pdf from '@/assets/images/pdf.jpg';
  import url from '@/assets/images/bannner2.jpg';
  import { openFile } from '@/api/public';
  import { patrolSignDetail, patrolSign } from '@/api/patrol/dealt';
  import { useUserType } from './useState';
  import useParkStore from '@/store/modules/park';
  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();

  const { getUserType } = useUserType();

  const info = ref({});
  const data = ref({});
  const dialogVisible = ref(false);
  const dialogTitle = ref('签核备注');
  const signData = ref([]);

  const subParams = ref({
    number: null, //单号
    type: null, //1发起巡查 2巡查  3异常
    meno: null, //备注
    result: true
  });

  const rule = ref({
    meno: [{ required: true, message: '请输入驳回原因', trigger: 'blur' }]
  });

  patrolSignDetail({ number: route.params.number, type: route.params.type }).then((res) => {
    data.value = res.data;
    subParams.value.number = res.data.number;
    subParams.value.type = route.params.type;
    signData.value = res.data.patrolApproves.map((item) => {
      const { empName, empNo, empEmail, state, applicationLevel, stopTime, singTime, meno } = item;
      return {
        empName,
        empNo,
        email: empEmail,
        state,
        applicationLevel: getUserType(route.params.type, applicationLevel)?.label,
        stopTime,
        singTime,
        meno
      };
    });
  });

  function signOff(flag) {
    subParams.value.meno = '';
    rule.value.meno[0].required = !flag;
    if (flag) {
      dialogTitle.value = '同意备注';
      subParams.value.result = flag;
    } else {
      dialogTitle.value = '驳回备注';
      subParams.value.result = flag;
    }
    dialogVisible.value = true;
  }
  // 签核
  function subSign() {
    proxy.$refs['subRef'].validate((valid) => {
      if (valid) {
        if (!subParams.value.meno) subParams.value.meno = '同意';
        patrolSign(subParams.value).then((res) => {
          dialogVisible.value = false;
          proxy.$modal.msgSuccess('操作成功');
          router.replace('/dealt/index?type=PatrolAdmin');
        });
      }
    });
  }

  function goBack() {
    router.replace('/dealt/index?type=PatrolAdmin');
  }

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
    width: 1400px;
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
