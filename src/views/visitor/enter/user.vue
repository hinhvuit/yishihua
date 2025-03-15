<!-- 
  @FileDescription: 人员进出记录录入
  @Date:2024-08-06 16:46:40
  @Author:LZW
-->

<template>
  <div class="tab-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
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
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain @click="importData">导入数据</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

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
        <template #default="scope"> {{ getCardType(scope.row.cardType)?.label }}  </template>
      </el-table-column> -->
      <el-table-column label="证件号" align="center" key="card" prop="card" width="220" />
      <el-table-column label="进出时间" align="center" key="time" prop="time" width="160" />
      <el-table-column label="操作人" align="center" key="createBy" width="180">
        <template #default="scope"> {{ scope.row.createName }}({{ scope.row.createBy }}) </template>
      </el-table-column>
      <el-table-column label="操作时间" align="center" key="createTime" prop="createTime" width="160" />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog v-model="dialogVisible" title="导入数据" width="60%" destroy-on-close :close-on-click-modal="false">
      <el-form :model="importForm" ref="importRef" :rules="rules" label-width="120px" :inline="false">
        <el-form-item label="记录信息" prop="excel">
          <MyUpload
            :fileSizeMax="1024 * 2"
            :fileSizeMin="0"
            :fileType="['xlsx', 'xls']"
            :limitNum="1"
            :returnType="'file'"
            @uploadChange="getExcel"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="download" link>点击下载人员进出记录导入模版</el-button>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="VisitorEnterUser">
  import { getUserList, downloadUserTemplate, importUser } from '@/api/visitor/enter';
  import MyUpload from '@/components/MyUpload';
  import { useCardType, useAutType, useOutType } from '../hooks';
  const { proxy } = getCurrentInstance();
  const { cardType, getCardType } = useCardType();
  const { autType, getAutType } = useAutType();
  const { outType, getOutType } = useOutType();

  const total = ref(0);
  const loading = ref(false);
  const showSearch = ref(true);
  const listData = ref([]);
  const dialogVisible = ref(false);
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
  const importForm = ref({
    excel: undefined
  });
  const rules = ref({
    excel: [{ required: true, message: '请上传文件', trigger: 'blur' }]
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
  getList();
  const handleQuery = () => {
    getList();
  };
  const resetQuery = () => {
    time.value = [];
    proxy.resetForm('queryRef');
  };
  const importData = () => {
    importForm.value = { excel: undefined };
    dialogVisible.value = true;
  };
  const download = async () => {
    proxy.download(downloadUserTemplate(), '', `人员进出记录导入模板${new Date().getTime()}.xlsx`);
  };
  const getExcel = (e) => {
    importForm.value.excel = e[0]?.url;
  };
  const handleSubmit = () => {
    proxy.$refs['importRef'].validate(async (valid) => {
      if (valid) {
        const formData = new FormData();
        formData.append('excel', importForm.value.excel);
        await importUser(formData);
        proxy.$modal.msgSuccess('导入成功');
        dialogVisible.value = false;
        getList();
      }
    });
  };
</script>
<style lang="scss" scoped></style>
