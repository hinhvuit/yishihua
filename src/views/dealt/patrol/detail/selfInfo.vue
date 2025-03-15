<!-- 
  @FileDescription:自检自查签核
  @Date:2024-09-29 15:20:49
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
        <div class="item-title">基础信息</div>
        <div class="item-context">
          <el-form-item label="园区：">
            <div class="context-info">{{ useParkStore().getPark(data.park)?.name }}</div>
          </el-form-item>
          <el-form-item label="月份：">
            <div class="context-info">{{ data.month }}</div></el-form-item
          >
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">巡查内容</div>
        <div class="item-context">
          <div v-for="(item, index) of data.inspectionItemVOS" :key="index" style="margin: 10px 0">
            <div style="display: flex; justify-content: space-between; margin: 20px 0">
              <span> {{ item.itemName }}</span>
              <span>
                巡查结果：是：{{ item.startTask[0] }}；否：{{ item.startTask[1] }}；不适用：{{
                  item.startTask[2]
                }}</span
              >
            </div>
            <el-table
              border
              :data="item?.tableData"
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
              <el-table-column prop="patrolResult.result" label="巡查结果">
                <template #default="scope">
                  <div>{{ getCheckResult(scope.row.patrolResult.result)?.label }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="patrolResult.context" label="结果说明" />
              <el-table-column label="图片" width="240">
                <template #="scope">
                  <div v-for="(i, id) in scope.row.patrolResult.files">
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
                      :preview-teleported="true"
                    ></el-image>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="form-item" v-if="data.merits?.length">
        <div class="item-title">绩优案例</div>
        <div class="item-context">
          <div v-for="(item, index) in data.merits" style="padding-bottom: 0; margin: 10px 0">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
              <span>绩优案例{{ index + 1 }}</span>
            </div>
            <el-form-item label="条款：">
              <div>{{ item.title }}</div>
            </el-form-item>
            <el-form-item label="日期："> {{ item.time }} </el-form-item>
            <el-form-item v-if="parseInt(item.type) === 3" label="类型">
              {{ getMeritLevel(parseInt(item.meritType))?.label }}</el-form-item
            >
            <el-form-item label="案例说明：">
              <div>{{ item.contextOne }}</div>
            </el-form-item>
            <el-form-item v-if="parseInt(item.type) === 1 || parseInt(item.type) === 2" label="成效说明：">
              <div>{{ item.contextTow }}</div>
            </el-form-item>
            <el-form-item v-if="item.files.length > 0" label="文件：">
              <div v-for="(i, id) in item.files">
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
      </div>
      <div class="form-item" v-if="data.accidents?.length">
        <div class="item-title">事故案件</div>
        <div class="item-context">
          <div v-for="(item, index) in data.accidents" style="padding-bottom: 0; margin: 10px 0">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
              <span>事故案例{{ index + 1 }}</span>
            </div>
            <el-form-item label="类型">
              <div>{{ getAccident(parseInt(item.type))?.label }}</div>
            </el-form-item>
            <el-form-item label="条款">
              <div>{{ item.title }}</div>
            </el-form-item>
            <el-form-item label="日期：">{{ item.time }} </el-form-item>
            <el-form-item v-if="parseInt(item.type) === 1" label="事件人数："> {{ item.accidentCount }} </el-form-item>
            <el-form-item v-if="parseInt(item.type) === 2" label="损失金额：">
              {{ item.money }}
            </el-form-item>
            <el-form-item v-if="parseInt(item.type) === 3" label="死亡人数：">{{ item.deadCount }} </el-form-item>
            <el-form-item v-if="parseInt(item.type) === 3" label="受伤人数：">{{ item.injuredCount }} </el-form-item>
            <el-form-item label="事件说明：">
              <div>{{ item.contextOne }}</div>
            </el-form-item>
            <el-form-item v-if="parseInt(item.type) === 1" label="影响程度：">
              <div>{{ item.contextTow }}</div>
            </el-form-item>
            <el-form-item v-if="item.files.length > 0" label="文件：">
              <div v-for="(i, id) in item.files">
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

<script setup name="PatrolCentreInfo">
  import ApprovalProcess from '@/components/ApprovalProcess/index';
  import pdf from '@/assets/images/pdf.jpg';
  import url from '@/assets/images/bannner2.jpg';
  import { openFile } from '@/api/public';
  import { patrolSignDetail, patrolSign } from '@/api/patrol/dealt';
  import { useUserType, useMeritLevel, useAccident, useCheckResult } from '../useState';
  import useParkStore from '@/store/modules/park';
  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();

  const { getUserType } = useUserType();
  const { getMeritLevel } = useMeritLevel();
  const { getAccident } = useAccident();
  const { getCheckResult } = useCheckResult();

  const info = ref({});
  const data = ref({});
  const dialogVisible = ref(false);
  const dialogTitle = ref('签核备注');
  const signData = ref([]);

  const subParams = ref({
    number: null, //单号
    type: null, //1发起巡查 2中央巡查  3异常 4园区自查
    meno: null, //备注
    result: true
  });

  const rule = ref({
    meno: [{ required: true, message: '请输入驳回原因', trigger: 'blur' }]
  });

  patrolSignDetail({ number: route.params.number, type: route.params.type }).then((res) => {
    data.value = res.data;
    data.value.inspectionItemVOS = getTableData(res.data.inspectionItemVOS);
    subParams.value.number = res.data.number;
    subParams.value.type = route.params.type;
    signData.value = res.data.patrolApproves.map((item, index) => {
      let label = '';
      if (index === 0) {
        label = '巡查人';
      } else if (index === res.data.patrolApproves.length - 1) {
        label = '园区安全主管';
      } else {
        label = '审核人';
      }
      const { empName, empNo, empEmail, state, applicationLevel, stopTime, singTime, meno } = item;
      return {
        empName,
        empNo,
        email: empEmail,
        state,
        applicationLevel: item.signNode,
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
        patrolSign(subParams.value).then((res) => {
          dialogVisible.value = false;
          proxy.$modal.msgSuccess('操作成功');
          router.replace('/dealt/record?type=PatrolAdmin');
        });
      }
    });
  }

  function goBack() {
    router.replace('/dealt/record?type=PatrolAdmin');
  }

  // 判断是否为pdf
  function isPdf(url) {
    let arr = url.split('.');
    let type = arr[arr.length - 1];
    return type === 'pdf' ? true : false;
  }

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
      res.push({ ...item, tableData, merge, startTask });
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
