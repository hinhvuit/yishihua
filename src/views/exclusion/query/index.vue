<!-- 
  @FileDescription:查询列表
  @params:{}
  @Date:2024-05-31 10:52:58
  @Author:LZW
-->
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item prop="name">
        <el-input
          v-myTrim="'part'"
          v-model="queryParams.name"
          placeholder="请输入查询条件(姓名)"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="card">
        <el-input
          v-myTrim
          v-model="queryParams.card"
          placeholder="请输入查询条件(身份证号)"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item style="width: 430px">
        <el-date-picker
          v-model="queryParams.time"
          type="datetimerange"
          value-format="YYYY-MM-DD HH:mm:ss"
          range-separator="-"
          start-placeholder="查询开始日期"
          end-placeholder="查询结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain @click="handleVisible">查询</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="listData">
      <el-table-column label="序号" align="center" type="index" width="55" />
      <el-table-column label="查询结果" align="center">
        <template #default="scope">
          <div v-for="item in JSON.parse(scope.row.result)">
            {{ item.name }} - {{ item.card }} {{ item.map.park }}{{ item.map.result }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="查询条件(姓名)" align="center" key="name" prop="name" width="220" />
      <el-table-column label="查询条件(证件)" align="center" key="card" prop="card" width="220" />
      <el-table-column label="查询人" align="center" key="createBy" width="220">
        <template #default="scope"> {{ scope.row.createName }}({{ scope.row.createBy }}) </template>
      </el-table-column>
      <el-table-column label="查询时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="60%" destroy-on-close :close-on-click-modal="false">
      <el-form :model="userQueryParams" ref="userQueryRef" :inline="true" v-if="showDialogSearch">
        <el-form-item prop="name">
          <el-input
            v-myTrim="'part'"
            v-model="userQueryParams.name"
            placeholder="请输入姓名"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item prop="card">
          <el-input v-myTrim v-model="userQueryParams.card" placeholder="请输入身份证" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQueryUser" :disabled="isDisabled">查询</el-button>
          <span style="margin-left: 20px; color: #3e3e3e">请输入姓名或者身份证号再查询</span>
        </el-form-item>
      </el-form>
      <el-table v-loading="dialogDoading" :data="userData">
        <el-table-column align="center" type="index" width="30" />
        <el-table-column label="类型" align="center" key="applicationType" width="160">
          <template #default="scope"> {{ scope.row.map.park }}{{ scope.row.map.result }} </template>
        </el-table-column>
        <el-table-column label="姓名" align="center" key="name" prop="name" width="90" />
        <el-table-column label="身份证号" align="center" key="card" prop="card" width="165" />
        <!-- <el-table-column label="原因" align="center" key=" reason" prop="reason"/> -->
        <el-table-column label="列管类型" align="center" key="type" prop="map.type" width="290" />
        <el-table-column label="列管等级" align="center" key="level" prop="map.level" width="85" />
        <el-table-column label="列管时间" align="center" prop="map">
          <template #default="scope">
            <span v-if="scope.row.map.result === '未管控'"></span>
            <span v-else-if="scope.row.endTime"
              >{{ parseTime(scope.row.startTime) }} 至 {{ parseTime(scope.row.endTime) }}</span
            >
            <span v-else>永久</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="申请园区" align="center" key="park" prop="park" width="100">
          <template #default="scope">{{ parkStroe.getPark(scope.row.park).name }}</template>
        </el-table-column> -->
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup name="ExclusionQuery">
  import { getExclusionPeople, getQueryList } from '@/api/exclusion/query';
  import useState from '@/hooks/useState';
  import useParkStore from '@/store/modules/park';
  const { proxy } = getCurrentInstance();
  const parkStroe = useParkStore();

  const { getListType } = useState();
  const listData = ref([]);
  const total = ref(0);
  const showSearch = ref(true);
  const loading = ref(false);
  const dialogVisible = ref(false);
  const showDialogSearch = ref(true);
  const dialogDoading = ref(false);
  const dialogTitle = ref('人员查询');
  const userData = ref([]);
  const data = reactive({
    queryParams: {
      pageNum: 1,
      pageSize: 10,
      time: null
    },
    userQueryParams: {
      pageNum: 1,
      pageSize: 1000
    }
  });
  const { queryParams, userQueryParams } = toRefs(data);
  const isDisabled = computed(() => {
    if (userQueryParams.value.name || userQueryParams.value.card) return false;
    return true;
  });
  watch(
    () => queryParams.value.time,
    (newValue, oldValue) => {
      if (!newValue || newValue.length === 0) {
        queryParams.value.start = '';
        queryParams.value.end = '';
      } else {
        queryParams.value.start = newValue[0];
        queryParams.value.end = newValue[1];
      }
    },
    { deep: true }
  );

  function getList() {
    loading.value = true;
    getQueryList(queryParams.value).then((res) => {
      total.value = res.data.total;
      listData.value = res.data.records;
      loading.value = false;
    });
  }
  getList();
  function handleQuery() {
    getList();
  }
  function resetQuery() {
    queryParams.value.time = null;
    proxy.resetForm('queryRef');
  }
  function resetDialog() {
    proxy.resetForm('userQueryRef');
    userQueryParams.value = {
      pageNum: 1,
      pageSize: 1000
    };
    userData.value = [];
  }
  function handleVisible() {
    resetDialog();
    dialogTitle.value = '人员查询';
    dialogVisible.value = true;
    showDialogSearch.value = true;
  }
  function handleQueryUser() {
    dialogDoading.value = true;
    getExclusionPeople(userQueryParams.value).then((res) => {
      userData.value = res.data.records;
      dialogDoading.value = false;
    });
  }

  function handleInfo(row) {
    resetDialog();
    dialogTitle.value = '查询详情';
    dialogVisible.value = true;
    showDialogSearch.value = false;
    userData.value = JSON.parse(row.result);
  }
</script>
<style lang="scss" scoped></style>
