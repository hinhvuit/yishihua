<!-- 
  @FileDescription:审核详情
  @params:{}
  @Date:2024-06-04 15:26:33
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
    <el-form class="box" :model="info" ref="formRef" label-width="82px" :inline="false" v-if="info.state === 1">
      <div class="form-item">
        <div class="item-title">{{ title }}列管人员</div>
        <div class="item-context">
          <el-table :data="info.persons" style="width: 100%">
            <el-table-column type="index" label="序号" width="55" align="center" />
            <el-table-column prop="name" label="姓名" align="center" />
            <el-table-column prop="card" label="身份证号" align="center" />
          </el-table>
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">{{ title }}列管类型</div>
        <div class="item-context">
          <el-form-item label="类型：">
            <div class="context-info" v-if="info.applicationContext">
              <span v-if="info.applicationType == 0 || info.applicationType == 2">{{
                parkStore.getPark(info.park).name
              }}</span
              >{{ getListType(info.applicationType).label }}
            </div>
          </el-form-item>
          <el-form-item label="解除时间：" v-if="info.endTime">
            <div class="context-info">
              <span v-if="info.state == 2">{{ info.approves[info.approves.length - 1].singTime.slice(0, 10) }}</span>
              <span v-else>审核通过时间</span>
              至 {{ info.endTime }}
            </div>
          </el-form-item>
          <el-form-item label="列管等级：" v-if="info.controlType && info.applicationContext">
            <div class="context-info">
              {{ getLevel(info.applicationLevel).label }} ({{ getLevel(info.applicationLevel).meno }})
            </div>
          </el-form-item>
          <el-form-item label="列管类型：" v-if="info.controlType && getControl(info.controlType)">
            <div class="context-info">{{ getControl(info.controlType).name }}</div>
          </el-form-item>
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">{{ title }}列管原因</div>
        <div class="item-context">
          <el-form-item :label="`${title ? title : '列管'}原因：`">
            <div class="context-info">{{ info.applicationContext }}</div>
          </el-form-item>
          <el-form-item label="相关文件：" v-if="info.formFiles && info.formFiles.length > 0">
            <template v-for="item in info.formFiles">
              <el-image
                v-if="item.meno === 'pdf'"
                :src="pdf"
                style="width: 100px; height: 100px; margin: 0 10px"
                fit="contain"
                :lazy="true"
                @click="openFile(item.url)"
              ></el-image>
              <el-image
                v-if="item.meno === 'png'"
                :src="item.url"
                style="width: 100px; height: 100px; margin: 0 10px"
                fit="contain"
                :lazy="true"
                :preview-src-list="[item.url]"
              ></el-image>
            </template>
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
        <el-button v-if="info.state === 1" style="width: 80px; margin: 0 20px" type="primary" @click="signOff(true)"
          >同 意</el-button
        >
        <el-button v-if="info.state === 1" style="width: 80px; margin: 0 20px" type="danger" @click="signOff(false)"
          >驳 回</el-button
        >
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

<script setup name="DealtInfo">
  import ApprovalProcess from '@/components/ApprovalProcess/index';
  import pdf from '@/assets/images/pdf.jpg';
  import url from '@/assets/images/bannner2.jpg';
  import { getApplicationForm, getControlType } from '@/api/exclusion/public';
  import { openFile } from '@/api/public';
  import { getSignOff } from '@/api/exclusion/dealt';
  import useUserStore from '@/store/modules/user';
  import useParkStore from '@/store/modules/park';
  import useState from '@/hooks/useState';
  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();
  const parkStore = useParkStore();
  const { getListType, getLevel } = useState();

  const controlTypes = ref([]);
  getControlType().then((res) => {
    controlTypes.value = res.data;
  });
  function getControl(id) {
    return controlTypes.value.find((item) => item.id == id);
  }
  const dialogVisible = ref(false);
  const dialogTitle = ref('签核备注');
  const signData = ref([]);
  const data = reactive({
    info: {},
    subParams: {
      number: route.params.number,
      type: '',
      meno: ''
    },
    rule: {
      meno: [{ required: true, message: '请输入驳回原因', trigger: 'blur' }]
    }
  });

  const { subParams, info, rule } = toRefs(data);
  function signOff(flag) {
    subParams.value.meno = '';
    rule.value.meno[0].required = !flag;
    if (flag) {
      dialogTitle.value = '同意备注';
      subParams.value.type = 1;
    } else {
      dialogTitle.value = '驳回备注';
      subParams.value.type = 2;
    }
    dialogVisible.value = true;
  }

  function subSign() {
    proxy.$refs['subRef'].validate((valid) => {
      if (valid) {
        getSignOff(subParams.value).then((res) => {
          dialogVisible.value = false;
          proxy.$modal.msgSuccess('操作成功');
          router.replace('/dealt/index?type=ExclusionAdmin');
        });
      }
    });
  }
  getApplicationForm(route.params.number).then((res) => {
    info.value = res.data;
    if (res.data.state !== 1) {
      return router.replace(`/dealt/exclusionDetails/${route.params.number}?type=ExclusionAdmin`);
    }
    signData.value = res.data.approves.map((item) => {
      const { empName, empNo, email, state, applicationLevel, stopTime, singTime, meno } = item;
      return { empName, empNo, email, state, applicationLevel, stopTime, singTime, meno };
    });
  });
  function goBack() {
    router.replace('/dealt/index?type=ExclusionAdmin');
  }
  const title = computed(() => {
    return info.value.applicationType > 1 ? '解除' : '';
  });
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
        .context-info {
          color: #333;
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
