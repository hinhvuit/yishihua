<!-- 
  @FileDescription: 人员进出记录查询
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
      <el-form-item prop="type">
        <el-select v-model="queryParams.type" placeholder="鉴权方式" clearable style="width: 120px">
          <el-option v-for="item in autType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="outType">
        <el-select v-model="queryParams.outType" placeholder="进出类型" clearable style="width: 120px">
          <el-option v-for="item in outType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item prop="cardType">
        <el-select v-model="queryParams.cardType" placeholder="证件类型" clearable style="width: 120px">
          <el-option v-for="item in cardType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item> -->
      <el-form-item prop="card">
        <el-input
          v-model.trim="queryParams.card"
          placeholder="证件号"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
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
      <el-table-column label="鉴权方式" align="center" key="type" prop="type" width="150">
        <template #default="scope"> {{ getAutType(scope.row.type)?.label }} </template>
      </el-table-column>
      <el-table-column label="进出类型" align="center" key="outType" prop="outType" width="150">
        <template #default="scope"> {{ getOutType(scope.row.outType)?.label }} </template>
      </el-table-column>
      <!-- <el-table-column label="证件类型" align="center" key="cardType" prop="cardType" width="150">
        <template #default="scope"> {{ getCardType(scope.row.cardType)?.label }} </template>
      </el-table-column> -->
      <el-table-column label="证件号" align="center" key="card" prop="card" />
      <el-table-column label="进出时间" align="center" key="time" prop="time" />
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

<script setup name="VisitorQueryUser">
  import { getUserList } from '@/api/visitor/query';
  import { useCardType, useAutType, useOutType } from '../hooks';
  import { checkParams } from '@/utils';
  const { proxy } = getCurrentInstance();
  const { cardType, getCardType } = useCardType();
  const { autType, getAutType } = useAutType();
  const { outType, getOutType } = useOutType();

  const total = ref(0);
  const loading = ref(false);
  const listData = ref([]);
  const time = ref([]);
  const queryParams = ref({
    pageNum: 1,
    pageSize: 10,
    door: undefined, //门岗
    type: undefined, //1刷脸 2刷卡
    outType: undefined, //1进 2出
    card: undefined, //证件号
    cardType: undefined, //证件类型 1身份证、2护照、3港澳通行证、4香港通行证、5台胞证
    startTime: undefined, //进出时间-开始
    endTime: undefined //进出时间-结束
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
    const data = await getUserList(queryParams.value);
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
