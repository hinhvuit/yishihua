<!-- 
  @FileDescription: 开始自检自查
  @Date:2024-09-29 10:10:55
  @Author:LZW
-->
<template>
  <div class="app-container box">
    <el-form :model="formData" ref="formRef" :inline="false" label-width="90px">
      <!-- 基础信息 -->
      <div class="form-item">
        <div class="item-title">基础信息</div>
        <div class="item-context">
          <el-form-item label="园区">
            {{ useParkStore().getPark(patrolData.park)?.name }}
          </el-form-item>
          <el-form-item label="月份"> {{ patrolData.month }}</el-form-item>
        </div>
      </div>
      <!-- 巡查内容 -->
      <div class="form-item">
        <div class="item-title">巡查内容</div>
        <div class="item-context">
          <div v-for="(item, index) of formData.inspectionItemVOS" :key="index" style="margin: 10px 0">
            <div class="line">
              <div class="line-s" @click="item.zhankai = !item.zhankai">
                <div class="flex-bw" style="cursor: pointer">
                  <div>{{ item.itemName }}</div>
                  <div class="flex">
                    <div style="margin-right: 15px">总数：{{ item.tableData.length }}</div>
                    <div style="margin-right: 15px">待巡查：{{ item.awaitTask }}</div>
                    <div>
                      已巡查：{{ item.startTask.reduce((pre, cur) => pre + cur, 0) }}（是：{{
                        item.startTask[0]
                      }}；否：{{ item.startTask[1] }}；不适用：{{ item.startTask[2] }}）<span
                        ><el-icon style="font-size: 12px"
                          ><ArrowRightBold v-if="item.zhankai == false" /><ArrowDownBold v-else /></el-icon
                      ></span>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <div style="margin-top: 10px" v-show="item.zhankai != false">
              <el-table
                border
                :data="item.tableData"
                row-key="id"
                ref="tableRef"
                :highlight-current-row="true"
                :span-method="(params) => objectSpanMethod(params, item.merge, ['type', 'description'])"
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }"
              >
                <el-table-column prop="type" label="类型" />
                <el-table-column prop="description" label="细分类型" />
                <el-table-column prop="itemName" label="条款" />
                <el-table-column prop="patrolResult.result" label="巡查结果" width="230">
                  <template #default="scope">
                    <div>
                      <el-form-item
                        :prop="`inspectionItemVOS[${index}].tableData[${scope.$index}].patrolResult.result`"
                        :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
                        label-width="0px"
                        style="margin-bottom: 20px"
                      >
                        <el-radio-group
                          v-model="item.tableData[scope.$index].patrolResult.result"
                          @change="(value) => changePatrolResult(value, index, scope.row)"
                        >
                          <el-radio v-for="i in checkResultList" :key="i.value" :label="i.value">{{
                            i.label
                          }}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div class="last-result" v-if="getCheckResult(parseInt(scope.row.latelyResult))?.label">
                        最近一次自查结果：{{ getCheckResult(parseInt(scope.row.latelyResult))?.label }}
                      </div>
                      <div class="last-result" v-else>最近一次自查结果：无</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="patrolResult.context" label="结果说明">
                  <template #default="scope">
                    <div>
                      <el-form-item
                        :prop="`inspectionItemVOS[${index}].tableData[${scope.$index}].patrolResult.context`"
                        :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
                        label-width="0px"
                        style="margin-bottom: 20px"
                      >
                        <el-input v-model="item.tableData[scope.$index].patrolResult.context" placeholder="请输入"   type="textarea" />
                      </el-form-item>
                      <div class="last-result" v-if="scope.row.latelyMeno">
                        最近一次自查结果：{{ scope.row.latelyMeno }}
                      </div>
                      <div class="last-result" v-else>最近一次自查结果：无</div>
                    </div>
                  </template></el-table-column
                >
                <el-table-column label="图片">
                  <template #="scope">
                    <div>
                      <MyUpload
                        :fileSizeMax="10 * 1024"
                        :fileSizeMin="0"
                        :isShowTip="false"
                        :fileType="['png', 'jpg', 'jpeg', 'pdf']"
                        :urlList="item.tableData[scope.$index].patrolResult.files"
                        @uploadChange="
                          (file) => {
                            item.tableData[scope.$index].patrolResult.files = file;
                          }
                        "
                      >
                      </MyUpload>
                    </div>
                    <div>
                      <div v-for="(i, id) in scope.row.latelyImage">
                        <el-image
                          v-if="isPdf(i.fileUrl)"
                          :src="pdf"
                          fit="contain"
                          @click="openFile(i.fileUrl)"
                          style="width: 30px; height: 30px; margin-right: 10px; cursor: pointer"
                          :preview-teleported="true"
                        ></el-image>
                        <el-image
                          v-else
                          :src="i.fileUrl"
                          fit="contain"
                          style="width: 30px; height: 30px; margin-right: 10px; cursor: pointer"
                          :preview-src-list="[i.fileUrl]"
                          :preview-teleported="true"
                        ></el-image>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <!-- 绩优案例 -->
      <div class="form-item">
        <div class="item-title">绩优案例</div>
        <div class="item-context">
          <div v-for="(item, index) in formData.merits" class="line" style="padding-bottom: 20px; margin: 10px 0">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
              <span>绩优案例{{ index + 1 }}</span>
              <el-button type="danger" link @click="remItem('merit', index)">删除案例项</el-button>
            </div>
            <el-form-item label="条款">
              <div>{{ item.title }}</div>
            </el-form-item>
            <el-form-item
              :prop="`merits[${index}].time`"
              label="日期"
              :rules="{ required: true, message: '请选择日期', trigger: 'change' }"
              style="margin-bottom: 20px"
            >
              <el-date-picker
                v-model="item.time"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择日期"
                :disabled-date="disabledDate"
              />
            </el-form-item>
            <el-form-item
              v-if="item.type === 3"
              :prop="`merits[${index}].meritType`"
              label="类型"
              :rules="{ required: true, message: '请选择类型', trigger: 'change' }"
              style="margin-bottom: 20px"
            >
              <el-select
                v-model="item.meritType"
                placeholder="请选择绩优类型"
                clearable
                filterable
                style="width: 220px"
              >
                <el-option v-for="item in meritLevelList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="`merits[${index}].contextOne`"
              label="案例说明"
              :rules="{ required: true, message: '请输入案例说明', trigger: 'blur' }"
              style="margin-bottom: 20px"
            >
              <el-input v-model="item.contextOne" :rows="5" type="textarea" placeholder="案例说明" />
            </el-form-item>
            <el-form-item
              v-if="item.type === 1 || item.type === 2"
              :prop="`merits[${index}].contextTow`"
              label="成效说明"
              :rules="{ required: true, message: '请输入成效说明', trigger: 'blur' }"
              style="margin-bottom: 20px"
            >
              <el-input v-model="item.contextTow" :rows="5" type="textarea" placeholder="成效说明" />
            </el-form-item>
            <el-form-item :prop="`merits[${index}].files`" label="文件">
              <MyUpload
                :fileSizeMax="10 * 1024"
                :fileSizeMin="0"
                :isShowTip="false"
                :fileType="['png', 'jpg', 'jpeg', 'pdf']"
                :urlList="item.files"
                @uploadChange="
                  (file) => {
                    item.files = file;
                  }
                "
              >
              </MyUpload>
            </el-form-item>
          </div>
          <div style="margin: 10px 0">
            <el-button type="primary" link @click="addItem('merit')">添加绩优案例</el-button>
          </div>
        </div>
      </div>
      <!-- 事故案例 -->
      <div class="form-item">
        <div class="item-title">事故案件</div>
        <div class="item-context">
          <div v-for="(item, index) in formData.accidents" class="line" style="padding-bottom: 20px; margin: 10px 0">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
              <span>事故案例{{ index + 1 }}</span>
              <el-button type="danger" link @click="remItem('accident', index)">删除案例项</el-button>
            </div>
            <el-form-item label="类型">
              <div>{{ getAccident(parseInt(item.type))?.label }}</div>
            </el-form-item>
            <el-form-item label="条款">
              <div>{{ item.title }}</div>
            </el-form-item>
            <el-form-item
              :prop="`accidents[${index}].time`"
              label="日期"
              :rules="{ required: true, message: '请选择日期', trigger: 'change' }"
              style="margin-bottom: 20px"
            >
              <el-date-picker
                v-model="item.time"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择日期"
                :disabled-date="disabledDate"
              />
            </el-form-item>
            <el-form-item
              v-if="item.type === 1"
              :prop="`accidents[${index}].accidentCount`"
              label="事件人数"
              :rules="{ required: true, message: '请输入事件人数', trigger: 'change' }"
              style="margin-bottom: 20px"
            >
              <el-input-number
                v-model="item.accidentCount"
                :step="1"
                :min="0"
                step-strictly
                placeholder="事件人数"
                style="width: 220px"
              />
            </el-form-item>
            <el-form-item
              v-if="item.type === 2"
              :prop="`accidents[${index}].money`"
              label="损失金额"
              :rules="{ required: true, message: '请输入损失金额', trigger: 'change' }"
              style="margin-bottom: 20px"
            >
              <el-input-number v-model="item.money" :step="1000" :min="0" :precision="0" style="width: 220px" />
              <span style="margin-left: 20px"> 当前金额属于 50万以上/10-50万/3千-10万 范围</span>
            </el-form-item>
            <el-form-item
              v-if="item.type === 3"
              :prop="`accidents[${index}].deadCount`"
              label="死亡人数"
              :rules="{ required: true, message: '请输入死亡人数', trigger: 'change' }"
              style="margin-bottom: 20px"
            >
              <el-input-number
                v-model="item.deadCount"
                :step="1"
                :min="0"
                step-strictly
                placeholder="死亡人数"
                style="width: 220px"
              />
            </el-form-item>
            <el-form-item
              v-if="item.type === 3"
              :prop="`accidents[${index}].injuredCount`"
              label="受伤人数"
              :rules="{ required: true, message: '请输入受伤人数', trigger: 'change' }"
              style="margin-bottom: 20px"
            >
              <el-input-number
                v-model="item.injuredCount"
                :step="1"
                :min="0"
                step-strictly
                placeholder="受伤人数"
                style="width: 220px"
              />
            </el-form-item>
            <el-form-item
              :prop="`accidents[${index}].contextOne`"
              label="事件说明"
              :rules="{ required: true, message: '请输入事件说明', trigger: 'blur' }"
              style="margin-bottom: 20px"
            >
              <el-input v-model="item.contextOne" :rows="5" type="textarea" placeholder="事件说明" />
            </el-form-item>
            <el-form-item
              v-if="item.type === 1"
              :prop="`accidents[${index}].contextTow`"
              label="影响程度"
              :rules="{ required: true, message: '请输入影响程度', trigger: 'blur' }"
              style="margin-bottom: 20px"
            >
              <el-input v-model="item.contextTow" :rows="5" type="textarea" placeholder="影响程度" />
            </el-form-item>
            <el-form-item :prop="`accidents[${index}].files`" label="文件">
              <MyUpload
                :fileSizeMax="10 * 1024"
                :fileSizeMin="0"
                :isShowTip="false"
                :fileType="['png', 'jpg', 'jpeg', 'pdf']"
                :urlList="item.files"
                @uploadChange="
                  (file) => {
                    item.files = file;
                  }
                "
              >
              </MyUpload>
            </el-form-item>
          </div>
          <div style="margin: 10px 0">
            <el-button type="primary" link @click="addItem('accident')">添加事故案例</el-button>
          </div>
        </div>
      </div>
      <!-- 签核流程 -->
      <div class="form-item">
        <div class="item-title">签核流程</div>
        <div class="item-context">
          <el-form-item
            :prop="`patrolApproves[0].empEmail`"
            label="巡查人："
            label-width="120px"
            :rules="{ required: true, message: `巡查人邮箱不能为空`, trigger: 'blur' }"
          >
            <span style="margin-right: 20px"
              >{{ formData.patrolApproves[0].empName }}({{ formData.patrolApproves[0].empNo }})</span
            >
            <el-input v-model="formData.patrolApproves[0].empEmail" placeholder="邮箱" style="width: 220px"></el-input>
          </el-form-item>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 10px;
              max-width: 600px;
            "
            v-for="(item, index) of formData.patrolApproves"
            :key="index"
          >
            <el-form-item
              v-if="index != 0 && index != formData.patrolApproves.length - 1"
              :prop="`patrolApproves[${index}].empNo`"
              :label="`审核${index}：`"
              label-width="120px"
              :rules="{
                required: true,
                trigger: 'change',
                validator: (rule, value, callback) => validateSH(rule, value, callback, index)
              }"
              style="margin-bottom: 10px"
              ><div style="display: flex">
                <el-input
                  style="margin-right: 10px; width: 220px"
                  v-model="item.empNo"
                  placeholder="工号"
                  clearable
                  @blur="getUserInfo(item.empNo, index)"
                ></el-input>
                <el-input
                  style="margin-right: 10px; width: 220px"
                  v-model="item.empName"
                  placeholder="姓名"
                  clearable
                ></el-input>
                <el-input
                  style="margin-right: 10px; width: 220px"
                  v-model="item.empEmail"
                  placeholder="邮箱"
                  clearable
                ></el-input>
                <el-button type="danger" link @click="delUser(index)">删除</el-button>
              </div>
            </el-form-item>
          </div>
          <div style="margin-bottom: 10px; margin-left: 117px">
            <el-button type="primary" link @click="addUser">新增审核人</el-button>
          </div>
          <el-form-item
            label="园区安全主管："
            label-width="120px"
            :prop="`patrolApproves[${formData.patrolApproves.length - 1}].empNo`"
            :rules="{
              required: true,
              trigger: 'change',
              validator: (rule, value, callback) =>
                validateAQ(rule, value, callback, formData.patrolApproves.length - 1)
            }"
          >
            <el-select
              v-model="formData.patrolApproves[formData.patrolApproves.length - 1].empNo"
              placeholder="选择园区安全主管"
              clearable
              filterable
              @change="(val) => getAdmin(val)"
            >
              <el-option
                v-for="item in parkAdminList"
                :key="item.empNo"
                :label="`${item.empName}(${item.empNo})`"
                :value="item.empNo"
              >
              </el-option>
            </el-select>
            <el-input
              v-if="formData.patrolApproves[formData.patrolApproves.length - 1].empNo"
              v-model="formData.patrolApproves[formData.patrolApproves.length - 1].empEmail"
              placeholder="邮箱"
              clearable
              style="width: 220px; margin-left: 10px"
            ></el-input>
          </el-form-item>
        </div>
      </div>

      <div v-if="patrolData.status === 2 || patrolData.status === 3">
        <el-button type="primary" style="font-size: 16px; margin-top: 10px" @click="handleSave" plain>保存草稿</el-button>
        <el-button type="primary" style="font-size: 16px; margin-top: 10px" @click="handleSubmit">提交</el-button>
      </div>
      <div v-else>
        <el-button type="primary" style="font-size: 16px; margin-top: 10px" @click="handleBack">返回</el-button>
      </div>
    </el-form>

    <!-- 新增案例弹窗 -->
    <el-dialog v-model="addVisible" :title="addTitle" width="600px" append-to-body :close-on-click-modal="false">
      <div class="mb-2 ml-4">
        <el-radio-group v-model="addRadio" style="display: flex; flex-direction: column; align-items: start">
          <el-radio v-for="item in addList" :key="item.label" :label="item.value"> {{ item.label }}</el-radio>
        </el-radio-group>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubAdd"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import MyUpload from '@/views/dealt/patrol/MyUpload/index.vue';
  import {
    useStatus,
    useMerit,
    useMeritLevel,
    useAccident,
    useCheckResult,
    useUserType
  } from '@/views/dealt/patrol/useState';
  import pdf from '@/assets/images/pdf.jpg';
  import { openFile } from '@/api/public';
  import useParkStore from '@/store/modules/park';
  import useUserStore from '@/store/modules/user';
  import { getInfoByNumberAndType, getTemporary, savePatrol, startSelfPatrol } from '@/api/patrol';
  import { getEmpInfo, getParkAdmin } from '@/api/public';
  import { deepClone } from '@/utils';

  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();
  const { statusList, getStatus } = useStatus();
  const { meritList, getMerit } = useMerit();
  const { meritLevelList, getMeritLevel } = useMeritLevel();
  const { accidentList, getAccident } = useAccident();
  const { checkResultList, getCheckResult } = useCheckResult();
  const { userTypeList, getUserType } = useUserType();

  const queryParams = ref({
    number: route.params.number,
    type: 4
  });
  const addType = ref('merit');
  const addTitle = ref('添加绩优案例');
  const addList = ref([]);
  const addVisible = ref(false);
  const addRadio = ref(1);

  // 初始数据
  const patrolData = ref({});
  // 表单提交数据
  const formData = ref({
    id: null, //必传 ID
    number: null, //单号
    park: null, //园区
    startTime: null, //时间
    endTime: null, //时间
    // 巡查内容 检查项 第四级节点
    inspectionItemVOS: [],
    //绩优案例
    merits: [],
    //事故案例
    accidents: [],
    //签核流程 按流程图顺序传
    patrolApproves: [
      { empName: useUserStore().nickName, empNo: useUserStore().name, empEmail: useUserStore().email },
      { empName: '', empNo: '', empEmail: '' }
    ]
  });

  const parkAdminList = ref([]);
  const merit = {
    title: null, //标题
    type: null, //类型 对应标题即可
    time: null, //时间
    meritType: null, //类型为3时选择使用   1县  2地级市/市  3省级  4国家级
    contextOne: null,
    contextTow: null,
    files: []
  };

  const accident = {
    type: null, //类型 对应标题即可
    title: null, //标题
    time: null, //时间
    accidentCount: null, //事件人数
    money: null, //损失金额
    deadCount: null, //死亡人数
    injuredCount: null, //受伤人数
    contextOne: null,
    contextTow: null
  };
  const validateSH = (rule, value, callback, index) => {
    const tip = {
      empName: '姓名不能为空',
      empNo: '工号不能为空',
      empEmail: '邮箱不能为空'
    };
    let flag = 0;
    const obj = formData.value.patrolApproves[index];
    const arr = Object.keys(obj);
    for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        callback(new Error(tip[arr[i]]));
        break;
      } else {
        flag++;
      }
    }
    flag === 3 && callback();
  };
  const validateAQ = (rule, value, callback, index) => {
    const obj = formData.value.patrolApproves[index];
    if (!value) {
      callback(new Error('请选择园区安全主管'));
    } else if (!obj.empEmail) {
      callback(new Error('园区安全主管邮箱不能为空'));
    } else {
      callback();
    }
  };

  // 判断是否为pdf
  function isPdf(url) {
    let arr = url.split('.');
    let type = arr[arr.length - 1];
    return type === 'pdf' ? true : false;
  }

  let days = null;
  // 初始化数据
  function init() {
    getInfoByNumberAndType(queryParams.value).then((res) => {
      patrolData.value = res.data;
      res.data.inspectionItemVOS.forEach((element) => {
        element.zhankai = false;
      });
      const { id, endTime, startTime, number, park, status } = patrolData.value;
      const month = patrolData.value.month;
      days = [getFirstDayOfMonth(month), getLastDayOfMonth(month)];
      if (status === 3) {
        formData.value.patrolApproves = res.data.patrolApproves.map((item) => {
          return {
            empName: item.empName,
            empNo: item.empNo,
            empEmail: item.empEmail
          };
        });
      }
      function getData() {
        patrolData.value.merits.length > 0 && formData.value.merits.push(...patrolData.value.merits);
        patrolData.value.accidents.length > 0 && formData.value.accidents.push(...patrolData.value.accidents);
        formData.value.inspectionItemVOS = getTableData(deepClone(res.data.inspectionItemVOS));
        formData.value.id = id;
        formData.value.endTime = endTime;
        formData.value.startTime = startTime;
        formData.value.number = number;
        formData.value.park = park;
        if (status === 3) {
          formData.value.patrolApproves = res.data.patrolApproves.map((item) => {
            return {
              empName: item.empName,
              empNo: item.empNo,
              empEmail: item.empEmail
            };
          });
        }
      }
      getSave(id).catch(() => {
        getData();
      });
    });
  }
  init();

  function getFirstDayOfMonth(dateStr) {
    const date = new Date(dateStr);
    date.setDate(1);
    return date.toISOString().slice(0, 10);
  }

  function getLastDayOfMonth(dateStr) {
    const date = new Date(dateStr);
    date.setMonth(date.getMonth() + 1, 0);
    return date.toISOString().slice(0, 10);
  }

  function disabledDate(time) {
    const startTime = new Date(days[0]).getTime();
    const endTime = new Date(days[1]).getTime();
    const currentTime = time.getTime();
    return currentTime < startTime - 24 * 3600000 || currentTime > endTime;
  }

  getParkAdmin().then((res) => {
    parkAdminList.value = res.data.map((item) => {
      return {
        empName: item.empName,
        empNo: item.empNo,
        empEmail: item.email
      };
    });
  });
  const getAdmin = (val) => {
    if (!val) return;
    const { empName, empNo, empEmail } = parkAdminList.value.find((item) => item.empNo === val);
    const index = formData.value.patrolApproves.length - 1;
    formData.value.patrolApproves[index].empNo = empNo;
    formData.value.patrolApproves[index].empName = empName;
    formData.value.patrolApproves[index].empEmail = empEmail;
  };

  // 新增案例项
  const addItem = (type) => {
    switch (type) {
      case 'merit':
        addTitle.value = '添加绩优案例';
        addType.value = 'merit';
        addList.value = meritList;
        addVisible.value = true;
        addRadio.value = 1;
        break;
      case 'accident':
        addTitle.value = '添加事故案例';
        addType.value = 'accident';
        addList.value = accidentList;
        addVisible.value = true;
        addRadio.value = 1;
        break;
      default:
        break;
    }
  };

  const handleSubAdd = () => {
    if (addType.value === 'merit') {
      const obj = deepClone(merit);
      obj.title = getMerit(addRadio.value)?.label;
      obj.type = addRadio.value;
      formData.value.merits.push(obj);
    } else {
      const obj = deepClone(accident);
      obj.title = getAccident(addRadio.value)?.meno;
      obj.type = addRadio.value;
      formData.value.accidents.push(obj);
    }
    addVisible.value = false;
  };

  // 删除案例项
  const remItem = (type, index) => {
    switch (type) {
      case 'merit':
        formData.value.merits.splice(index, 1);
        break;
      case 'accident':
        formData.value.accidents.splice(index, 1);
        break;
      default:
        break;
    }
  };

  const changePatrolResult = (val, index, row) => {
    taskCountChange(index);
  };

  // 巡查内容总数变化
  const taskCountChange = (index) => {
    let arr = [0, 0, 0];
    formData.value.inspectionItemVOS[index].tableData.forEach((item) => {
      if (item.patrolResult.result) {
        arr[item.patrolResult.result - 1] += 1;
      }
    });
    const len = formData.value.inspectionItemVOS[index].tableData.length;
    formData.value.inspectionItemVOS[index].awaitTask = len - arr.reduce((a, b) => a + b, 0);
    formData.value.inspectionItemVOS[index].startTask = arr;
  };

  const addUser = () => {
    let index = formData.value.patrolApproves.length - 1;
    formData.value.patrolApproves.splice(index, 0, { empNo: '', empName: '', empEmail: '' });
  };

  const delUser = (index) => {
    formData.value.patrolApproves.splice(index, 1);
  };

  const getUserInfo = (empNo, index = null) => {
    if (!empNo) return;
    getEmpInfo(empNo).then((res) => {
      setSHR(index, res.data);
    });
    function setSHR(id, data) {
      if (data) {
        formData.value.patrolApproves[id].empName = data.empName;
        formData.value.patrolApproves[id].empNo = data.empNo;
        formData.value.patrolApproves[id].empEmail = data.email;
      } else {
        formData.value.patrolApproves[id].empName = '';
        formData.value.patrolApproves[id].empNo = '';
        formData.value.patrolApproves[id].empEmail = '';
        proxy.$modal.msgError('未查询到该员工在职信息');
      }
    }
  };

  // 暂存
  const handleSave = () => {
    savePatrol({ mainId: formData.value.id, context: JSON.stringify(formData.value) }).then((res) => {
      router.replace('/patrol/selfPatrol');
    });
  };
  // 获取暂存
  const getSave = (id) => {
    return new Promise((resolve, reject) => {
      getTemporary(id).then((res) => {
        if (res.data?.context) {
          proxy.$modal
            .confirm('是否获取上次已保存的草稿')
            .then(() => {
              formData.value = JSON.parse(res.data.context);
              formData.value.inspectionItemVOS = getTableData(formData.value.inspectionItemVOS);
              formData.value.patrolApproves = [
                { empName: useUserStore().nickName, empNo: useUserStore().name, empEmail: useUserStore().email },
                { empName: '', empNo: '', empEmail: '' }
              ];
              resolve();
            })
            .catch(() => {
              // savePatrol({ mainId: patrolData.value.id, context: '' });
              reject();
            });
        } else {
          return reject();
        }
      });
    });
  };

  // 提交
  const handleSubmit = () => {
   
    proxy.$refs.formRef.validate((valid, valids) => {
      if (valid) {
        for (let index = 0; index < formData.value.patrolApproves.length; index++) {
          if(index==0){
            formData.value.patrolApproves[index].signNode="巡查人"
          }else if(index==formData.value.patrolApproves.length-1){
            formData.value.patrolApproves[index].signNode="园区安全主管"
          }else{
            formData.value.patrolApproves[index].signNode="审核人"
          }
        }
        let data = deepClone(formData.value);
        data.inspectionItemVOS = [];
        formData.value.inspectionItemVOS
          .map((item) => item.tableData)
          .forEach((item) => {
            data.inspectionItemVOS.push(...item);
          });

        startSelfPatrol(data).then((res) => {
          savePatrol({ mainId: patrolData.value.id, context: '' });
          router.replace('/patrol/selfPatrol');
        });
      } else {
        if (Object.keys(valids)[0]) {
          const validItem = Object.keys(valids)[0].split('.')[0];
          const regex = /\d+/g;
          const index = validItem.match(regex);
          const params = validItem.replace(`[${index}]`, '');
          if (params === 'inspectionItemVOS' && !formData.value.inspectionItemVOS[index].zhankai) {
            formData.value.inspectionItemVOS[index].zhankai = true;
          }
          proxy.$nextTick(() => {
            proxy.$refs['formRef'].scrollToField(Object.keys(valids)[0]);
          });
        }
      }
    });
  };
  // 返回
  const handleBack = () => {
    router.replace('/patrol/selfPatrol');
  };

  // 获取合并行数组
  const tableRowMerge = (data, rowName, otherRowName) => {
    const idArray = [];
    let idPos = 0;
    for (let i = 0; i < data.length; i++) {
      // 如果当 i == 0 说明数据是第一行, 需要重新赋值
      if (i == 0) {
        // idArray.push(1) 说明这一行数据被显示出来
        idArray.push(1);
        // idPos = 0 重置当前的计数器
        idPos = 0;
      }
      // 说明不是从第一行开始遍历的
      else {
        if (otherRowName) {
          //主行之外的 另一行合并
          if (data[i][rowName] == data[i - 1][rowName] && data[i][otherRowName] == data[i - 1][otherRowName]) {
            // 如果相同就需要将 idArray 的数据自加
            idArray[idPos] += 1;
            // 同时需要将 idArray push一个0 表示下一行不用显示
            idArray.push(0);
          }
          // 说明 当前的数据和上一行的指定数据不同
          else {
            // idArray.push(1) 说明当前一行的数据需要显示
            idArray.push(1);
            // 重新给计数器赋值
            idPos = i;
          }
        } else {
          // 判断当前的指定数据是否和之前的指定数据值相同
          if (data[i][rowName] == data[i - 1][rowName]) {
            // 如果相同就需要将 idArray 的数据自加
            idArray[idPos] += 1;
            // 同时需要将 idArray push一个0 表示下一行不用显示
            idArray.push(0);
          }
          // 说明 当前的数据和上一行的指定数据不同
          else {
            // idArray.push(1) 说明当前一行的数据需要显示
            idArray.push(1);
            // 重新给计数器赋值
            idPos = i;
          }
        }
      }
    }
    return idArray;
  };

  // 将初始数据进行转换
  const getTableData = (data) => {
    const res = [];
    // 遍历一级节点
    data.forEach((item) => {
      const tableData = [];
      let startTask = [0, 0, 0];
      let awaitTask = null;
      // 遍历二级节点
      item.childs.forEach((child) => {
        // 遍历三级节点
        if (child?.childs) {
          child.childs.forEach((val) => {
            // 遍历四级节点
            val.childs.forEach((v) => {
              if (!v.patrolResult) {
                v.patrolResult = { result: null, context: null, files: [] };
              } else if (v.patrolResult.result) {
                startTask[v.patrolResult.result - 1] += 1;
              }
              const obj = {
                type: child.itemName,
                description: val.itemName,
                ...v
              };
              tableData.push(obj);
            });
          });
        }
      });
      let merge = {};
      merge.type = tableRowMerge(tableData, 'type');
      merge.description = tableRowMerge(tableData, 'type', 'description');
      awaitTask = tableData.length - startTask.reduce((a, b) => a + b);
      res.push({ ...item, tableData, merge, startTask, awaitTask });
    });
    return res;
  };

  // 合并单元格
  const objectSpanMethod = ({ row, column, rowIndex, columnIndex }, merge, arr) => {
    // level列
    if (column.property === arr[0]) {
      // rowMergeArr[rowIndex] 取出当前存放行的合并状态
      const rowSpan = merge[arr[0]][rowIndex];
      // 判断当前的 列是否需要显示
      const colSpan = rowSpan > 0 ? 1 : 0;
      return {
        rowspan: rowSpan,
        colspan: colSpan
      };
    }
    // level列之后的 type列
    if (column.property === arr[1]) {
      // rowMergeArr[rowIndex] 取出当前存放行的合并状态
      const rowSpan = merge[arr[1]][rowIndex];
      // 判断当前的 列是否需要显示
      const colSpan = rowSpan > 0 ? 1 : 0;
      return {
        rowspan: rowSpan,
        colspan: colSpan
      };
    }
  };
</script>
<style lang="scss" scoped>
  .line {
    border: 1px solid #ebebeb;
    box-shadow: 1px 1px 5px 1px #ebebeb;
    border-radius: 5px;
    padding: 15px;
    .line-s {
      font-size: 14px;
      color: #333;
    }
  }
  .item-context {
    padding: 10px;
    .context-line {
      display: flex;
      justify-content: space-between;
    }
    :deep(.el-form-item) {
      flex: 1;
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
      height: 100%;
    }
  }
  .hide-table-header ::v-deep(.el-table__header-wrapper) {
    display: none;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .flex-bw {
    display: flex;
    justify-content: space-between;
  }
  .tabBox {
    margin-top: 20px;
    justify-content: space-between;
    div {
      text-align: center;
      border: 1px solid #eaedf4;
      width: 30%;
      background: #f8f8f9;
      line-height: 40px;
    }
  }
  .tabval {
    border: 1px solid #eaedf4;
  }
  .last-result {
    width: 100%;
    font-size: 12px;
    color: #999;
    text-align: left;
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
