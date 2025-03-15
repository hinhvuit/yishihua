<!-- 
  @FileDescription: 异常记录
  @Date:2024-09-27 19:19:31
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
          <el-option v-for="dict in statusList[2]" :key="dict.value" :label="dict.label" :value="dict.value" />
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
      <el-table-column label="巡查园区" align="center" key="parkName" prop="parkName">
        <template #default="scope">
          <div>{{ useParkStore().getPark(scope.row.park)?.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="巡查开始时间" align="center" key="startTime" prop="startTime" />
      <el-table-column label="巡查结束时间" align="center" key="endTime" prop="endTime" />
      <el-table-column label="类别" align="center" key="category" prop="category" />
      <el-table-column label="类型" align="center" key="categoryTow" prop="categoryTow" />
      <el-table-column label="细分类型" align="center" key="categoryThree" prop="categoryThree" />
      <el-table-column label="记录人" align="center">
        <template #default="scope">
          <div>{{ scope.row.logEmpName }}({{ scope.row.logEmpNo }})</div>
        </template>
      </el-table-column>
      <el-table-column label="记录时间" align="center" key="logTime" prop="logTime" />
      <el-table-column label="状态" align="center" key="status" prop="status">
        <template #default="scope">
          <div>{{ getStatus(3, parseInt(scope.row.status))?.label }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button v-if="scope.row.status === 2" type="primary" link icon="View" @click="handelUpdate(scope.row)"
            >修改</el-button
          >
          <el-button v-else type="primary" link icon="View" @click="handelInfo(scope.row)">详情</el-button>
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
  import { getAbnormalRecord } from '@/api/patrol';
  import { useStatus } from '@/views/dealt/patrol/useState';
  import useParkStore from '@/store/modules/park';
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
    updateBy: useUserStore().name,
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
    const { rows, total: totals } = await getAbnormalRecord(queryParams.value);
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

  const handelInfo = (row) => {
    router.push({ path: `/patrol/info/abnormal/${row.number}` });
  };
  const handelUpdate = (row) => {
    router.push({ path: `/patrol/add/abnormal/${row.number}` });
  }
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
