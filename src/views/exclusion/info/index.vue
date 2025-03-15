<!-- 
  @FileDescription:申请单详情
  @params:{}
  @Date:2024-06-04 15:27:28
  @Author:LZW
-->
<template>
  <div class="app-container container-center">
    <el-form class="box" :model="form" ref="formRef" label-width="82px" :inline="false">
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
        <el-button style="width: 200px; margin-top: 40px; margin-left: 10px; margin-bottom: 20px" type="primary" @click="router.go(-1)">返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup name="ExclusionApply">
  import ApprovalProcess from '@/components/ApprovalProcess/index';
  import pdf from '@/assets/images/pdf.jpg';
  import { getApplicationForm } from '@/api/exclusion/public';
  import { getControlType } from '@/api/exclusion/public';
  import { openFile } from '@/api/public';
  import useUserStore from '@/store/modules/user';
  import useParkStore from '@/store/modules/park';
  import useState from '@/hooks/useState';
  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();
  const parkStore = useParkStore();
  const { getListType, getLevel } = useState();

  getApplicationForm(route.params.number).then((res) => {
    info.value = res.data;
    signData.value = res.data.approves.map((item) => {
      const { empName, empNo, email, state, applicationLevel, stopTime, singTime, meno } = item;
      return { empName, empNo, email, state, applicationLevel, stopTime, singTime, meno };
    });
  });
  const controlTypes = ref([]);
  getControlType().then((res) => {
    controlTypes.value = res.data;
  });
  function getControl(id) {
    return controlTypes.value.find((item) => item.id == id);
  }
  const userStore = useUserStore();
  const data = reactive({
    form: {
      park: userStore.getNowPark().id,
      applicationContext: '',
      applicationType: '',
      persons: [{ name: '', card: '' }],
      approves: [
        {
          empName: userStore.nickName, //姓名
          empNo: userStore.name, //工号
          applicationLevel: '申请人', //节点固定  申请人、核准人、园区主管、大陆安全主管（申请全集团才可配置）
          email: ''
        },
        {
          empName: '',
          empNo: '',
          applicationLevel: '核准人',
          email: ''
        },
        {
          empName: '',
          empNo: '',
          applicationLevel: '园区主管',
          email: ''
        }
      ],
      files: []
    },
    info: {}
  });
  const signData = ref([]);
  // signDate= {
  //   empName // 姓名
  //   empNo // 工号
  //   email // 邮箱
  //   state // 签核状态
  //   applicationLevel // 节点名称
  //   stopTime // 停留时间 number 秒
  //   singTime // 签核时间
  //   meno     // 签核备注
  // }

  const { form, info } = toRefs(data);
  const title = computed(()=>{
    return info.value.applicationType > 1 ? '解除' : ''
  })
</script>
<style lang="scss" scoped>
  .box {
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
        :deep(.el-form-item){
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
        .approves {
          min-width: 180px;
          margin-right: 20px;
          .email {
            font-size: 12px;
            color: #333;
          }
          .approves-item {
            height: 20px;
          }
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
