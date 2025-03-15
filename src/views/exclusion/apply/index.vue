<!-- 
  @FileDescription:申请列管
  @params:{}
  @Date:2024-06-01 14:28:27
  @Author:LZW
-->
<template>
  <div class="app-container container-center">
    <el-form class="box" :model="form" ref="formRef" label-width="80px" :inline="false">
      <div class="form-item">
        <my-title title="列管人员">
          <template v-slot:right>
            <el-button type="primary" link size="default" @click="importPerson">批量导入</el-button>
          </template>
        </my-title>
        <div class="item-context">
          <div>
            <template v-for="(item, index) in form.persons">
              <div class="item-flex">
                <el-form-item
                  label="姓名"
                  style="margin-right: 20px"
                  :prop="`persons[${index}].name`"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur'
                  }"
                >
                  <el-input
                    v-myTrim="'part'"
                    style="width: 250px"
                    v-model="form.persons[index].name"
                    placeholder="请输入姓名"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="身份证号"
                  style="margin-right: 20px"
                  :prop="`persons[${index}].card`"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur'
                  }"
                >
                  <el-input
                    v-myTrim
                    style="width: 250px"
                    v-model="form.persons[index].card"
                    placeholder="请输入身份证号或相关有效证件号"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    v-if="index || form.persons.length > 1"
                    type="danger"
                    link
                    size="default"
                    @click="remPerson(index)"
                    >删除</el-button
                  >
                </el-form-item>
              </div>
            </template>
            <el-button class="add_user_btn" type="primary" link size="default" @click="addPerson">添加人员</el-button>
          </div>
        </div>
      </div>
      <div class="form-item">
        <my-title title="列管类型" />
        <div class="item-context">
          <el-form-item
            label="类型"
            prop="applicationType"
            :rules="{
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }"
          >
            <el-radio-group v-model="form.applicationType" @change="changeType">
              <!-- <el-radio style="width: 200px" :label="0" border>{{ nowPark }}列管</el-radio> -->
              <el-radio style="width: 200px" :label="1" border>全集团列管</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="列管等级"
            prop="applicationLevel"
            :rules="{
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }"
          >
            <el-radio-group v-model="form.applicationLevel">
              <el-radio style="width: 200px" :label="item.value" border v-for="item in levels" :key="item.id"
                >{{ item.label
                }}<span style="padding-left: 6px; font-size: 12px">列管时长：{{ item.meno }}</span></el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="列管类型"
            prop="applicationLevel"
            :rules="{
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }"
          >
            <el-select
              v-model="form.controlType"
              placeholder="请选择列管类型"
              clearable
              filterable
              style="width: 432px"
            >
              <el-option v-for="item in controlTypes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="form-item">
        <my-title title="列管原因" />
        <div class="item-context">
          <el-form-item
            label="列管原因"
            prop="applicationContext"
            :rules="{
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              v-myTrim="'part'"
              v-model="form.applicationContext"
              type="textarea"
              :rows="3"
              placeholder="请输入列管原因"
            ></el-input>
          </el-form-item>
          <el-form-item label="相关文件" prop="applicationContext">
            <MyUpload :fileSizeMax="1024 * 2" :fileSizeMin="0" @uploadChange="getFile"> </MyUpload>
          </el-form-item>
        </div>
      </div>
      <div class="form-item">
        <my-title title="签核流程" />
        <div class="item-context">
          <!-- 申请人 -->
          <div style="display: flex">
            <el-form-item
              :label="form.approves[0].applicationLevel"
              :rules="{
                required: true,
                message: '该项不能为空',
                trigger: 'blur'
              }"
            >
              <div style="width: 122px">{{ form.approves[0].empName }}({{ form.approves[0].empNo }})</div>
            </el-form-item>
            <el-form-item
              prop="approves[0].email"
              :rules="[
                {
                  required: true,
                  message: '该项不能为空',
                  trigger: 'blur'
                },
                {
                  type: 'email',
                  message: '邮箱格式错误',
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-input v-myTrim style="width: 400px" v-model="form.approves[0].email" placeholder="邮箱"></el-input>
            </el-form-item>
          </div>
          <!-- 申请人 -->
          <!-- 审核人 -->
          <div style="display: flex; align-items: center" v-for="(item, index) in form.approves[1]">
            <el-form-item
              :label="item.applicationLevel"
              :prop="`approves[1][${index}].empNo`"
              :rules="{
                required: true,
                message: '该项不能为空',
                trigger: 'blur'
              }"
            >
              <el-input
                v-myTrim
                v-model="item.empNo"
                placeholder="工号"
                @change="getUserInfo(item.empNo, index)"
              ></el-input>
            </el-form-item>
            <el-form-item
              label-width="10px"
              :prop="`approves[1][${index}].empName`"
              :rules="{
                required: true,
                message: '该项不能为空',
                trigger: 'blur'
              }"
            >
              <el-input v-myTrim="'part'" v-model="item.empName" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item
              label-width="10px"
              :prop="`approves[1][${index}].email`"
              :rules="[
                {
                  required: true,
                  message: '该项不能为空',
                  trigger: 'blur'
                },
                {
                  type: 'email',
                  message: '邮箱格式错误',
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-input v-myTrim style="width: 197px" v-model="item.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                size="default"
                link
                @click="remSHR(index)"
                v-if="index || form.approves[1].length > 1"
                >删除审核人</el-button
              >
            </el-form-item>
          </div>
          <div style="height: 30px">
            <el-button class="add_user_btn" type="primary" size="default" link @click="addSHR">添加审核人</el-button>
          </div>
          <!-- 审核人 -->
          <!-- 园区安全主管 -->
          <div style="display: flex">
            <el-form-item
              label-width="110px"
              :label="form.approves[2].applicationLevel"
              prop="approves[2].empName"
              :rules="{
                required: true,
                message: '该项不能为空',
                trigger: 'blur'
              }"
            >
              <el-select
                v-model="selectParkAdmin"
                placeholder="选择园区安全主管"
                style="width: 160px"
                @change="adminChange(selectParkAdmin, 'park')"
              >
                <el-option :label="`${item.name}(${item.no})`" :value="item.id" v-for="item in parkAdmin" />
              </el-select>
            </el-form-item>
            <el-form-item
              label-width="10px"
              prop="approves[2].email"
              :rules="[
                {
                  required: true,
                  message: '该项不能为空',
                  trigger: 'blur'
                },
                {
                  type: 'email',
                  message: '邮箱格式错误',
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-input v-myTrim style="width: 400px" v-model="form.approves[2].email" placeholder="请输入邮箱">
              </el-input>
            </el-form-item>
          </div>
          <!-- 园区安全主管 -->
          <!-- 大陆安全主管 -->
          <div style="display: flex" v-if="form.applicationType === 1 && form.approves.length > 3">
            <el-form-item
              label-width="110px"
              :label="form.approves[3].applicationLevel"
              prop="approves[3].empName"
              :rules="{
                required: true,
                message: '该项不能为空',
                trigger: 'blur'
              }"
            >
              <el-select
                v-model="selectAllAdmin"
                placeholder="选择大陆安全主管"
                style="width: 160px"
                @change="adminChange(selectAllAdmin, 'admin')"
              >
                <el-option :label="`${item.name}(${item.no})`" :value="item.id" v-for="item in allAdmin" />
              </el-select>
            </el-form-item>
            <el-form-item
              label-width="10px"
              prop="approves[3].email"
              :rules="[
                {
                  required: true,
                  message: '该项不能为空',
                  trigger: 'blur'
                },
                {
                  type: 'email',
                  message: '邮箱格式错误',
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-input v-myTrim style="width: 400px" v-model="form.approves[3].email" placeholder="请输入邮箱">
              </el-input>
            </el-form-item>
          </div>
          <!-- 大陆安全主管 -->
        </div>
      </div>

      <el-form-item label-width="0">
        <el-button
          style="width: 200px; margin-top: 40px; margin-left: 10px; margin-bottom: 20px"
          type="primary"
          @click="onSubmit"
          >提 交</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" v-model="upload.open" width="400px" append-to-body>
      <el-upload
        ref="uploadRef"
        :limit="1"
        accept=".xlsx, .xls"
        :disabled="upload.isUploading"
        :auto-upload="false"
        :on-change="fileChange"
        drag
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip text-center">
            <div class="el-upload__tip"><el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据</div>
            <span>仅允许导入xls、xlsx格式文件。</span>
            <!-- <span class="el-upload__tip">单次最多支持解析200条数据</span> -->
            <el-link
              type="primary"
              :underline="false"
              style="font-size: 12px; vertical-align: baseline"
              @click="importTemplate"
              >下载模板</el-link
            >
          </div>
        </template>
      </el-upload>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitFileForm">确 定</el-button>
          <el-button @click="upload.open = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="ExclusionApply">
  import MyTitle from '../components/MyTitle.vue';
  import { ElMessageBox } from 'element-plus';
  import * as XLSX from 'xlsx';
  import { getEmpInfo, getParkAdmin, getAdmin } from '@/api/public';
  import { applyExclusion, applyCheck } from '@/api/exclusion/apply';
  import { getControlType } from '@/api/exclusion/public';
  import { identityCodeValid } from '@/utils';
  import MyUpload from '@/components/MyUpload';
  import useUserStore from '@/store/modules/user';
  import { deepClone } from '@/utils';
  import useState from '@/hooks/useState';

  const { levels, getLevel } = useState();
  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();

  const controlTypes = ref([]);
  getControlType().then((res) => {
    res.data.forEach((item) => {
      if (item.name !== '集团人资政策限制之离职员工。' && item.name !== '历史列管类型') {
        controlTypes.value.push(item);
      }
    });
  });
  const userStore = useUserStore();
  const parkAdmin = ref([]); // 园区管理员
  const allAdmin = ref([]); // 安全主管
  const selectParkAdmin = ref('');
  const selectAllAdmin = ref('');
  const nowPark = computed(() => userStore.getNowPark().name);
  const data = reactive({
    form: {
      park: userStore.getNowPark().id,
      applicationContext: '',
      applicationType: 1, //类型 0当前园区列管  1全集团列管 2当前园区解除 3全集团解除
      applicationLevel: '', //受控等级 1 一级 2二级  3三级
      controlType: '', //管控类型
      persons: [{ name: '', card: '' }],
      approves: [
        {
          empName: userStore.nickName, //姓名
          empNo: userStore.name, //工号
          applicationLevel: '申请人', //节点 申请人、审核人、园区安全主管、大陆安全主管（申请全集团才可配置）
          email: userStore.email //邮箱
        },
        [
          {
            empName: '',
            empNo: '',
            applicationLevel: '审核人',
            email: ''
          }
        ],
        {
          empName: '',
          empNo: '',
          applicationLevel: '园区安全主管',
          email: ''
        }
      ],
      files: []
    }
  });

  const { form } = toRefs(data);
  /*** 人员导入参数 */
  const upload = reactive({
    // 上传文件
    file: null,
    // 是否显示弹出层
    open: false,
    // 弹出层标题
    title: '列管人员批量导入',
    // 是否禁用上传
    isUploading: false,
    // 是否更新已经存在的用户数据
    updateSupport: 0
  });

  // 身份证格式校验
  function checkCard(userList) {
    let res = userList
      .map((item) => {
        return { name: item.name, card: item.card, ...identityCodeValid(item.card) };
      })
      .filter((item) => item.type === 'ERROR');
    return res;
  }
  function extractData() {
    let data = deepClone(form.value);
    data.approves.forEach((item, index) => {
      if (Array.isArray(item)) {
        data.approves.splice(index, 1, ...item);
      }
    });
    return data;
  }
  // 提交
  function onSubmit() {
    proxy.$refs['formRef'].validate((valid) => {
      proxy.$modal.loading('正在提交数据，请稍后...');
      if (!valid) return proxy.$modal.closeLoading();
      let checkList = checkCard(form.value.persons).map((item) =>
        h('div', null, `${item.name}:${item.card} - ${item.msg}`)
      );
      if (checkList.length) {
        ElMessageBox({
          title: '提示',
          message: h('div', null, [
            h('div', null, '以下人员身份证验证失败，点击确认后将提交申请'),
            h('div', { style: 'margin: 5px 0' }, checkList)
          ])
        })
          .then(() => {
            return applyCheck(extractData()).then((res) => {
              if (res.data.length) {
                let msgList = res.data.map((item) => h('div', null, `${item.name}:${item.card} - ${item.msg}`));
                ElMessageBox({
                  title: '提示',
                  message: h('div', null, [
                    h('div', null, '以下人员已有管控记录，点击确认后将提交申请'),
                    h('div', null, msgList)
                  ])
                }).then(() => {
                  applyExclusion(extractData()).then((res) => {
                    proxy.$modal.closeLoading();
                    proxy.$modal.msgSuccess('提交成功');
                    proxy.$tab.closePage({ path: route.fullPath }).then(() => {
                      router.push({ path: '/exclusion/list' });
                    });
                  });
                });
                proxy.$modal.closeLoading();
              } else {
                applyExclusion(extractData())
                  .then((res) => {
                    proxy.$modal.closeLoading();
                    proxy.$modal.msgSuccess('提交成功');
                    proxy.$tab.closePage({ path: route.fullPath }).then(() => {
                      router.push({ path: '/exclusion/list' });
                    });
                  })
                  .catch(() => {
                    proxy.$modal.closeLoading();
                  });
              }
            });
          })
          .catch(() => {
            proxy.$modal.closeLoading();
          });
      } else {
        applyCheck(extractData()).then((res) => {
          if (res.data.length) {
            let msgList = res.data.map((item) => h('div', null, `${item.name}:${item.card} - ${item.msg}`));
            ElMessageBox({
              title: '提示',
              message: h('div', null, [
                h('div', null, '以下人员已有管控记录，点击确认后将提交申请'),
                h('div', null, msgList)
              ])
            }).then(() => {
              applyExclusion(extractData())
                .then((res) => {
                  proxy.$modal.closeLoading();
                  proxy.$modal.msgSuccess('提交成功');
                  proxy.$tab.closePage({ path: route.fullPath }).then(() => {
                    router.push({ path: '/exclusion/list' });
                  });
                })
                .catch(() => {
                  proxy.$modal.closeLoading();
                });
            });
            proxy.$modal.closeLoading();
          } else {
            applyExclusion(extractData())
              .then((res) => {
                proxy.$modal.closeLoading();
                proxy.$modal.msgSuccess('提交成功');
                proxy.$tab.closePage({ path: route.fullPath }).then(() => {
                  router.push({ path: '/exclusion/list' });
                });
              })
              .catch(() => {
                proxy.$modal.closeLoading();
              });
          }
        });
      }
    });
  }

  function remPerson(index) {
    form.value.persons.splice(index, 1);
  }
  function addPerson() {
    form.value.persons.push({ name: '', card: '' });
  }
  function remSHR(index) {
    form.value.approves[1].splice(index, 1);
  }
  function addSHR() {
    form.value.approves[1].push({ applicationLevel: '审核人', empName: '', empNo: '', email: '' });
  }
  // 获取文件
  function getFile(e) {
    form.value.files = e;
  }
  // 列管类型修改
  function changeType(e) {
    let obj = {
      empName: '',
      empNo: '',
      applicationLevel: '大陆安全主管',
      email: ''
    };
    if (e === 0 && form.value.approves.length > 3) {
      form.value.approves.pop(obj);
      selectAllAdmin.value = '';
    } else if (e === 1 && form.value.approves.length < 4) {
      form.value.approves.push(obj);
    }
  }
  // changeType(1);
  // 获取人员信息
  function getUserInfo(empNo, index = null) {
    if (!empNo) return;
    getEmpInfo(empNo).then((res) => {
      setSHR(index, res.data);
    });
    function setSHR(id, data) {
      if (data) {
        form.value.approves[1][id].empName = data.empName;
        form.value.approves[1][id].empNo = data.empNo;
        form.value.approves[1][id].email = data.email;
      } else {
        form.value.approves[1][id].empName = '';
        form.value.approves[1][id].empNo = '';
        form.value.approves[1][id].email = '';
        proxy.$modal.msgError('未查询到该员工在职信息');
      }
    }
  }
  // 获取大陆安全主管
  getAdmin().then((res) => {
    allAdmin.value = res.data.map((item) => {
      return { id: item.id, name: item.empName, no: item.empNo, email: item.email };
    });
  });
  // 获取主管信息
  getParkAdmin().then((res) => {
    parkAdmin.value = res.data.map((item) => {
      return { id: item.id, name: item.empName, no: item.empNo, email: item.email };
    });
  });
  function adminChange(id, type) {
    if (type === 'park') {
      let admin = parkAdmin.value.find((item) => {
        return item.id === id;
      });
      form.value.approves[2].empName = admin.name;
      form.value.approves[2].empNo = admin.no;
      form.value.approves[2].email = admin.email;
    } else {
      let admin = allAdmin.value.find((item) => {
        return item.id === id;
      });
      form.value.approves[3].empName = admin.name;
      form.value.approves[3].empNo = admin.no;
      form.value.approves[3].email = admin.email;
    }
  }
  // 批量导入人员
  function importPerson() {
    proxy.$refs['uploadRef'] && proxy.$refs['uploadRef'].clearFiles();
    upload.file = null;
    upload.open = true;
  }
  // 下载模板操作
  function importTemplate() {
    let a = document.createElement('a');
    let evt = document.createEvent('MouseEvents');
    a.download = '批量上传模版';
    a.href = '/file/批量上传模版.xlsx';
    evt.initEvent('click', true, true);
    a.dispatchEvent(evt);
    window.URL.revokeObjectURL(a.href);
  }
  function fileChange(uploadFile, uploadFiles) {
    upload.file = uploadFile.raw;
  }
  /** 提交上传文件 */
  async function submitFileForm() {
    if (!upload.file) return proxy.$modal.msgError('请先选择文件');
    proxy.$modal.loading('正在解析文件...');
    const data = await changeExcel(upload.file);
    if (upload.updateSupport) {
      form.value.persons = data;
    } else if (form.value.persons.length === 1 && !form.value.persons[0].name && !form.value.persons[0].card) {
      form.value.persons = data;
    } else {
      form.value.persons = form.value.persons.concat(...data);
    }
    proxy.$modal.closeLoading();
    proxy.$refs['uploadRef'].clearFiles();
    upload.file = null;
    upload.open = false;
  }
  // excel文件解析成json
  function changeExcel(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (ev) => {
        const workbook = XLSX.read(ev.target.result, {
          type: 'binary'
        });
        const wsname = workbook.SheetNames[0];
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
        resolve(dealExcel(ws));
      };
    });
  }
  // 将表头转换为对应属性名
  function dealExcel(ws) {
    let keymap = {
      // 序号: 'id',
      姓名: 'name',
      证件号: 'card'
    };
    const result = [];
    ws.forEach((sourceObj) => {
      let res = {};
      Object.keys(sourceObj).map((keys) => {
        let newKey = keymap[keys];
        if (newKey) res[newKey] = sourceObj[keys];
      });
      Object.keys(res).length && result.push(res);
    });
    return result;
  }
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
      .item-context {
        padding: 10px;
        :deep(.el-form-item__label) {
          color: #666;
          font-weight: normal;
          justify-content: start;
        }
      }
      .item-flex {
        display: flex;
      }
    }
    .add_user_btn {
      position: relative;
      margin-left: 100px;
      &::after {
        content: '';
        display: block;
        width: 30px;
        height: 30px;
        position: absolute;
        left: -20px;
        top: 0;
        background: url('../../../assets/images/tianjia.png') no-repeat;
      }
    }
  }
</style>
