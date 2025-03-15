<!-- 
  @FileDescription:审核记录
  @params:{}
  @Date:2024-06-03 15:53:07
  @Author:LZW
-->
<template>
    <div style="margin-bottom: 20px">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
        <el-form-item prop="number">
          <el-input
            v-model="queryParams.number"
            placeholder="请输入单号"
            clearable
            style="width: 120px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入姓名"
            clearable
            style="width: 120px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item  prop="card">
          <el-input
            v-model="queryParams.card"
            placeholder="请输入身份证"
            clearable
            style="width: 200px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item prop="applicationType">
          <el-select v-model="queryParams.state" placeholder="签核状态" style="width: 120px">
            <template v-for="dict in signs">
              <el-option v-if="dict.id !== 1" :label="dict.label" :value="dict.value" />
            </template>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="列管类型" prop="applicationType">
          <el-select v-model="queryParams.applicationType" placeholder="列管类型" clearable style="width: 200px">
            <el-option v-for="dict in types" :key="dict.id" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item> -->
        <el-form-item style="width: 430px">
          <el-date-picker
            v-model="queryParams.time"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
  
      <el-table v-loading="loading" :data="listData">
        <el-table-column label="单号" align="center" key="number" prop="number" width="200"/>
        <el-table-column label="类型" align="center" key="applicationType" width="150">
          <template #default="scope">
            <span v-if="scope.row.applicationType == 0 || scope.row.applicationType == 2">{{
              parkStroe.getPark(scope.row.park).name
            }}</span
            >{{ getListType(scope.row.applicationType).label }}
          </template>
        </el-table-column>
        <el-table-column label="列管人员" align="center" key="nameCard" prop="nameCard"  :show-overflow-tooltip="true" />
        <el-table-column label="申请园区" align="center" key="park" prop="park" width="120">
          <template #default="scope"> {{ parkStroe.getPark(scope.row.park).name }}</template>
        </el-table-column>
        <el-table-column label="申请人" align="center" key="createBy" width="160">
          <template #default="scope"> {{ scope.row.createName }}({{ scope.row.createBy }}) </template>
        </el-table-column>
        <el-table-column label="申请时间" align="center" prop="createTime" width="160">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="签核状态" align="center" key="signStatus" width="85">
          <template #default="scope">
            <el-tag :type="getSign(scope.row.signStatus).type">{{ getSign(scope.row.signStatus).label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="签核时间" align="center" prop="signTime" width="160">
          <template #default="scope">
            <span>{{ parseTime(scope.row.signTime) }}</span>
          </template>
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
  
  <script setup name="DealtRecord">
    import { getDealtList } from '@/api/exclusion/dealt';
    import useState from '@/hooks/useState';
    import useParkStore from '@/store/modules/park';
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const parkStroe = useParkStore();
  
    const { signs, getSign, getListType } = useState();
  
    let listData = ref([]);
    let total = ref(0);
    let showSearch = ref(true);
    let loading = ref(false);
    const data = reactive({
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        time: null,
        state: 2
      }
    });
    let { queryParams } = toRefs(data);
  
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
      getDealtList(queryParams.value).then((res) => {
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
      proxy.resetForm('queryRef');
      queryParams.value.time = null;
    }
    function handleInfo(row) {
      router.push(`/dealt/exclusionDetails/${row.number}?type=ExclusionAdmin`);
    }
  </script>
  <style lang="scss" scoped></style>
  