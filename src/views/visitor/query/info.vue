<!-- 
  @FileDescription: 访客资料查询
  @Date:2024-08-07 15:10:56
  @Author:LZW
-->
<template>
  <div class="tab-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <div class="senior-box">
        <div class="senior-item" v-if="!senior">
          <el-form-item prop="number">
            <el-input
              v-model.trim="queryParams.number"
              placeholder="单号"
              clearable
              style="width: 200px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="visitorName">
            <el-input
              v-model.trim="queryParams.visitorName"
              placeholder="访客姓名"
              clearable
              style="width: 200px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="visitorCard">
            <el-input
              v-model.trim="queryParams.visitorCard"
              placeholder="访客证件号"
              clearable
              style="width: 200px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="visitorPhone">
            <el-input
              v-model.trim="queryParams.visitorPhone"
              placeholder="访客手机号"
              clearable
              style="width: 200px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="companyName">
            <el-input
              v-model.trim="queryParams.companyName"
              placeholder="访客公司"
              clearable
              style="width: 200px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="carNum">
            <el-input
              v-model.trim="queryParams.carNum"
              placeholder="车牌号"
              clearable
              style="width: 200px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
        </div>
        <div class="senior-item" style="margin-left: 12px" v-else>
          <el-row :gutter="24">
            <el-form-item prop="number">
              <el-input
                v-model.trim="queryParams.number"
                placeholder="单号"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="visitType">
              <el-input
                v-model.trim="queryParams.visitType"
                placeholder="入场类型"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="visitMsg">
              <el-input
                v-model.trim="queryParams.visitMsg"
                placeholder="入场事由"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="carNum">
              <el-input
                v-model.trim="queryParams.carNum"
                placeholder="车牌号"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-row>
          <el-row :gutter="24">
            <el-form-item prop="visitorName">
              <el-input
                v-model.trim="queryParams.visitorName"
                placeholder="访客姓名"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="visitorCard">
              <el-input
                v-model.trim="queryParams.visitorCard"
                placeholder="访客证件号"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="visitorPhone">
              <el-input
                v-model.trim="queryParams.visitorPhone"
                placeholder="访客手机号"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="companyName">
              <el-input
                v-model.trim="queryParams.companyName"
                placeholder="访客公司"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-row>
          <el-row :gutter="24">
            <el-form-item prop="callName">
              <el-input
                v-model.trim="queryParams.callName"
                placeholder="拜访对象姓名"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="callNo">
              <el-input
                v-model.trim="queryParams.callNo"
                placeholder="拜访对象工号"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="callPhone">
              <el-input
                v-model.trim="queryParams.callPhone"
                placeholder="拜访对象手机号"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="callEmail">
              <el-input
                v-model.trim="queryParams.callEmail"
                placeholder="拜访对象邮箱"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-row>

          <el-row :gutter="24">
            <el-form-item prop="callBgId">
              <el-input
                v-model.trim="queryParams.callBgId"
                placeholder="拜访对象事业群ID"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="callBgName">
              <el-input
                v-model.trim="queryParams.callBgName"
                placeholder="拜访对象事业群"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="callDept">
              <el-input
                v-model.trim="queryParams.callDept"
                placeholder="拜访对象事业处"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="visitorType">
              <el-select v-model="queryParams.visitorType" placeholder="访客类型" clearable style="width: 200px">
                <el-option label="临时" :value="1"> </el-option>
                <el-option label="长期" :value="2"> </el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </div>
        <div class="search-btn">
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            <el-button type="primary" @click="senior = !senior" link>{{ senior ? '普通搜索' : '高级搜索' }}</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <el-table v-loading="loading" :data="listData">
      <el-table-column label="序号" align="center" type="index" width="55" />
      <el-table-column label="访客单号" align="center" key="number" prop="number" />
      <el-table-column label="访客" align="center" key="visitorName" width="220">
        <template #default="scope"> {{ scope.row.visitorName }}({{ scope.row.visitorCard }}) </template>
      </el-table-column>
      <el-table-column label="访客手机号" align="center" key="visitorPhone" prop="visitorPhone" width="180" />
      <el-table-column label="访客公司" align="center" key="companyName" prop="companyName" />
      <el-table-column label="车牌号" align="center" key="carNum" prop="carNum" width="120" />
      <el-table-column label="车辆类型" align="center" key="carType" prop="carType" width="120" />
      <el-table-column label="预约开始时间" align="center" key="startTime" prop="startTime" width="160" />
      <el-table-column label="预约结束时间" align="center" key="endTime" prop="endTime" width="160" />
      <el-table-column label="园区" align="center" key="park" prop="park" width="55">
        <template #default="scope">
          {{ getPark(scope.row.park)?.name }}
        </template>
      </el-table-column>
      <el-table-column label="拜访对象" align="center" key="callName" width="220">
        <template #default="scope"> {{ scope.row.callName }}({{ scope.row.callNo }}) </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="View" @click="handleInfo(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script setup name="VisitorQueryInfo">
  import { getInfoList } from '@/api/visitor/query';
  import { checkParams } from '@/utils';
  import useParkStore from '@/store/modules/park';
  const { getPark } = useParkStore();
  const { proxy } = getCurrentInstance();
  const router = useRouter();

  const total = ref(0);
  const loading = ref(false);
  const listData = ref([]);
  const senior = ref(false);
  const queryParams = ref({
    pageNum: 1,
    pageSize: 10,
    number: undefined, // 单号
    visitorName: undefined, // 访客姓名
    visitorCard: undefined, // 证件号
    visitorPhone: undefined, // 访客手机号
    companyName: undefined, // 公司名称
    carNum: undefined, // 车牌号
    createBy: undefined, // 导入人工号
    visitType: undefined, // 入场类型
    visitMsg: undefined, // 入场事由
    visitorPhone: undefined, // 访客手机号
    callName: undefined, // 拜访对象姓名
    callNo: undefined, // 拜访对象工号
    callPhone: undefined, // 拜访对象手机号
    callEmail: undefined, // 拜访对象邮箱
    callBgId: undefined, // 拜访对象事业群ID
    callBgName: undefined, // 拜访对象事业群
    callDept: undefined // 拜访对象事业处
  });

  const getList = async () => {
    loading.value = true;
    const data = await getInfoList(queryParams.value);
    total.value = data.total;
    listData.value = data.rows;
    loading.value = false;
  };
  const handleQuery = () => {
    let flag = checkParams(queryParams.value, ['pageNum', 'pageSize']);
    if (flag) {
      console.log(queryParams.value);
      getList();
    } else {
      proxy.$modal.msgError('至少输入一个查询条件');
    }
  };
  const resetQuery = () => {
    listData.value = [];
    proxy.resetForm('queryRef');
  };
  const handleInfo = (row) => {
    router.push('/visitor/query/' + row.id);
  };
</script>
<style lang="scss" scoped>
  .senior-box {
    display: flex;
    .search-btn {
      width: 280px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }
    .senior-item {
      flex: 1;
    }
  }
</style>
