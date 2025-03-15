<!-- 
  @FileDescription:安全巡查审核记录
  @Date:2024-10-14 10:23:23
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
          placeholder="请输入操作人"
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
      <el-form-item prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="签核状态"
          clearable
          style="width: 200px"
        >
          <el-option v-for="dict in signStatusList" :key="dict.value" :label="dict.label" :value="dict.value" />
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
      <el-table-column label="类型" align="center" key="type">
        <template #default="scope">
          <span>{{ getType(scope.row.type)?.label }}</span>
        </template>
      </el-table-column>
      <el-table-column label="签核人" align="center" key="empName">
        <template #default="scope"> {{ scope.row.empName }}({{ scope.row.empNo }}) </template>
      </el-table-column>
      <el-table-column label="签核时间" align="center" prop="updateTime">
        <template #default="scope">
          <span>{{ parseTime(scope.row.singTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="签核结果" align="center" key="status" width="120">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 4" type="danger">驳回</el-tag>
          <el-tag v-if="scope.row.status == 3" type="success">同意</el-tag>
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

<script setup name="patrolSignRecord">
  import { patrolSignRecord } from '@/api/patrol/dealt';
  import { useType, useStatus, useSignStatus } from './useState';
  import { deepClone } from '@/utils';
  import useUserStore from '@/store/modules/user';
  import { onActivated } from 'vue';
  const { proxy } = getCurrentInstance();
  const router = useRouter();

  const { statusList, getStatus } = useStatus();
  const { typeList, getType } = useType();
  const { signStatusList, getSignStatus } = useSignStatus();

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
    patrolSignRecord(data).then((res) => {
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
    const { type, number } = row;
    switch (type) {
      case 1:
        // 发起巡查
        router.push(`/dealt/patrolStartDealt/${number}/${type}?type=PatrolAdmin`);
        break;
      case 2:
        // 中央巡查
        router.push(`/dealt/patrolCentreDealt/${number}/${type}?type=PatrolAdmin`);
        break;
      case 3:
        // 异常处理
        router.push(`/dealt/patrolAbnormalDealt/${number}/${type}?type=PatrolAdmin`);
        break;
      case 4:
        // 自检自查
        router.push(`/dealt/patrolSelfDealt/${number}/${type}?type=PatrolAdmin`);
        break;
      default:
        console.log(type);
    }
  }
</script>
<style lang="scss" scoped></style>
