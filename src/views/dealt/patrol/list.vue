<!-- 
  @FileDescription:安全巡查待审核列表
  @Date:2024-09-25 18:37:17
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
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item prop="updateBy">
        <el-input
          v-model="queryParams.updateBy"
          placeholder="请输入工号"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item> -->
      <el-form-item prop="type">
        <el-select
          v-model="queryParams.type"
          placeholder="类型"
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          style="width: 200px"
        >
          <el-option v-for="dict in typeList" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item style="width: 430px">
        <el-date-picker
          v-model="time"
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
      <el-table-column label="单号" align="center" key="number" prop="number" width="200" />
      <el-table-column label="园区" align="center" key="park">
        <template #default="scope">
          <span>{{ useParkStore().getPark(scope.row.park)?.name ? useParkStore().getPark(scope.row.park)?.name : '/' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="月份" align="center" key="month" prop="month" width="120">
        <template #default="scope">
          <span>{{ scope.row.month ? scope.row.month : '/' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" key="type">
        <template #default="scope">
          <span>{{ getType(scope.row.type)?.label ? getType(scope.row.type)?.label : '/' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作人" align="center" key="updateName">
        <template #default="scope">
          <span v-if="scope.row.updateName">{{ scope.row.updateName }}{{ scope.row.updateBy ? `(${scope.row.updateBy})` : '' }}</span>
          <span v-else>/</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" align="center" prop="updateTime">
        <template #default="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" key="status" width="120">
        <template #default="scope">
          <span v-if="scope.row.type === 2">{{ getStatus(scope.row.type, scope.row.patrolStatus)?.label }}</span>
          <span v-else>{{ getStatus(scope.row.type, scope.row.status)?.label }}</span>
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

<script setup name="patrolSignList">
  import { patrolSignList } from '@/api/patrol/dealt';
  import { useType, useStatus } from './useState';
  import { deepClone } from '@/utils';
  import useUserStore from '@/store/modules/user';
  import useParkStore from '@/store/modules/park';
  import { onActivated } from 'vue';
  const { proxy } = getCurrentInstance();
  const router = useRouter();

  const { statusList, getStatus } = useStatus();
  const { typeList, getType } = useType();

  let listData = ref([]);
  let total = ref(0);
  let showSearch = ref(true);
  let loading = ref(false);
  const time = ref(null);
  const data = reactive({
    queryParams: {
      pageNum: 1,
      pageSize: 10,
      updateBy: useUserStore().name
    }
  });
  let { queryParams } = toRefs(data);

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

  function getList() {
    loading.value = true;
    const data = deepClone(queryParams.value);
    if (data.type?.length) data.type = data.type.join(',');
    patrolSignList(data).then((res) => {
      total.value = res.total;
      listData.value = res.rows;
      loading.value = false;
    });
  }
  getList();
  function handleQuery() {
    getList();
  }
  onActivated(() => {
    getList();
  });
  function resetQuery() {
    proxy.resetForm('queryRef');
    queryParams.value.time = null;
  }
  function handleInfo(row) {
    const { type, number, status } = row;
    switch (type) {
      case 1:
        // 发起巡查
        router.push(`/dealt/patrolStartInfo/${number}/${type}?type=PatrolAdmin`);
        break;
      case 2:
        // 中央巡查
        router.push(`/dealt/patrolCentreInfo/${number}/${type}?type=PatrolAdmin`);
        break;
      case 3:
        if (status === 2) {
          router.push(`/dealt/abnormal/${number}?type=PatrolAdmin`);
          return;
        }
        // 异常处理
        router.push(`/dealt/patrolAbnormalInfo/${number}/${type}?type=PatrolAdmin`);
        break;
      case 4:
        if (status === 2 || status === 3) {
          router.push(`/dealt/self/${number}?type=PatrolAdmin`);
          return;
        }
        // 自检自查
        router.push(`/dealt/patrolSelfInfo/${number}/${type}?type=PatrolAdmin`);
        break;
      default:
        console.log(type);
    }
  }
</script>
<style lang="scss" scoped></style>
