<!-- 
  @FileDescription: 车辆进出记录查询
  @Date:2024-08-07 15:10:56
  @Author:LZW
-->
<template>
  <div class="tab-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item prop="door">
        <el-input
          v-model.trim="queryParams.door"
          placeholder="门岗名称"
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
          style="width: 150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="carType">
        <el-input
          v-model.trim="queryParams.carType"
          placeholder="车辆类型"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="carColor">
        <el-input
          v-model.trim="queryParams.carColor"
          placeholder="车辆颜色"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model="queryParams.type" placeholder="进出类型" clearable style="width: 120px">
          <el-option v-for="item in outType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item style="width: 360px">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          value-format="YYYY-MM-DD HH:mm:ss"
          range-separator="-"
          start-placeholder="进出开始时间"
          end-placeholder="进出结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="listData">
      <el-table-column label="序号" align="center" type="index" width="55" />
      <el-table-column label="门岗名称" align="center" key="door" prop="door" />
      <el-table-column label="车牌号" align="center" key="carNum" prop="carNum" width="180" />
      <el-table-column label="车辆类型" align="center" key="carType" prop="carType" width="180" />
      <el-table-column label="车辆颜色" align="center" key="carColor" prop="carColor" width="120" />
      <el-table-column label="进出类型" align="center" key="type" prop="type" width="120">
        <template #default="scope"> {{ getOutType(scope.row.type)?.label }}</template>
      </el-table-column>
      <el-table-column label="进出时间" align="center" key="time" prop="time" width="160" />
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

<script setup name="VisitorQueryCar">
  import { getCarList } from '@/api/visitor/query';
  import { useOutType } from '../hooks';
  import { checkParams } from '@/utils';
  const { proxy } = getCurrentInstance();
  const { outType, getOutType } = useOutType();

  const total = ref(0);
  const loading = ref(false);
  const listData = ref([]);
  const time = ref([]);
  const queryParams = ref({
    pageNum: 1,
    pageSize: 10,
    door: undefined, // 门岗名称
    carNum: undefined, // 车牌号
    carType: undefined, // 车辆类型
    carColor: undefined, // 车辆颜色
    type: undefined, // 进出类型 1进 2出
    startTime: undefined, // 进出时间 -开始
    endTime: undefined // 进出时间 -结束
  });

  watch(
    () => time.value,
    (newValue, oldValue) => {
      if (!newValue || newValue.length === 0) {
        queryParams.value.startTime = '';
        queryParams.value.endTime = '';
      } else {
        queryParams.value.startTime = newValue[0];
        queryParams.value.endTime = newValue[1];
      }
    },
    { deep: true }
  );

  const getList = async () => {
    loading.value = true;
    const data = await getCarList(queryParams.value);
    total.value = data.total;
    listData.value = data.rows;
    loading.value = false;
  };
  const handleQuery = () => {
    let flag = checkParams(queryParams.value, ['pageNum', 'pageSize']);
    if (flag) {
      getList();
    } else {
      proxy.$modal.msgError('至少输入一个查询条件');
    }
  };
  const resetQuery = () => {
    time.value = [];
    listData.value = [];
    proxy.resetForm('queryRef');
  };
</script>
<style lang="scss" scoped></style>
