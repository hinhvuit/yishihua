<!-- 
  @FileDescription:园区自检自查
  @Date:2024-09-29 09:12:54
  @Author:LZW
-->

<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="单号"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable style="width: 200px">
          <el-option v-for="dict in statusList[3]" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>

      <el-form-item style="width: 380px">
        <el-date-picker
          v-model="time"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="操作开始时间"
          end-placeholder="操作结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="listData">
      <el-table-column label="单号" align="center" key="number" prop="number" />
      <el-table-column label="月份" align="center" key="month" prop="month" />
      <el-table-column label="操作人" align="center">
        <template #default="scope">
          <div v-if="scope.row.updateName">{{ scope.row.updateName }}{{ scope.row.updateBy ? `(${scope.row.updateBy})` : '' }}</div>
          <div v-else>/</div>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" align="center" key="updateTime">
        <template #default="scope"> {{ scope.row.updateTime ? scope.row.updateTime : '/' }} </template>
      </el-table-column>
      <el-table-column label="状态" align="center" key="status" prop="status">
        <template #default="scope">
          <div>{{ getStatus(4, parseInt(scope.row.status))?.label }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            v-if="scope.row.status == 2 || scope.row.status == 3"
            type="primary"
            link
            icon="View"
            @click="handelStart(scope.row)"
            >开始自查</el-button
          >
          <el-button
            v-if="
              scope.row.status == 1 ||
              scope.row.status == 3 ||
              scope.row.status == 5 ||
              scope.row.status == 6 ||
              scope.row.status == 7
            "
            type="primary"
            link
            icon="View"
            @click="handleRadar(scope.row)"
            >雷达图</el-button
          >
          <el-button
            v-if="scope.row.status !== 2 && scope.row.status !== 3"
            type="primary"
            link
            icon="View"
            @click="handelInfo(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      :pageSizes="[10, 20, 30, 50, 100]"
    />
  </div>
</template>

<script setup>
  import { getSelfPatrolRecord } from '@/api/patrol';
  import { useStatus } from '@/views/dealt/patrol/useState';
  import useUserStore from '@/store/modules/user';
  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();
  const { statusList, getStatus } = useStatus();
  const showSearch = ref(true);
  const loading = ref(false);
  const time = ref(null);
  const listData = ref([]);
  const total = ref(0);

  const queryParams = ref({
    number: '',
    type: '',
    start: '',
    end: '',
    // updateBy: useUserStore().name,
    pageSize: 10,
    pageNum: 1
  });
  watch(
    () => time.value,
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

  const getList = async () => {
    loading.value = true;
    const { rows, total: totals } = await getSelfPatrolRecord(queryParams.value);
    loading.value = false;
    listData.value = rows;
    total.value = totals;
  };
  getList();
  const resetQuery = () => {
    time.value = null;
    proxy.resetForm('queryRef');
  };
  const handleQuery = () => {
    getList();
  };

  const handelStart = (row) => {
    router.push({ path: `/patrol/add/self/${row.number}` });
  };
  const handelInfo = (row) => {
    router.push({ path: `/patrol/info/self/${row.number}` });
  };
  const handleRadar = (row) => {
    router.push('/patrol/info/chart/self/' + row.number);
  };
</script>
<style lang="scss" scoped>
  .previewBox {
    display: flex;
    line-height: 30px;
    .tit {
      width: 100px;
    }
  }
</style>
