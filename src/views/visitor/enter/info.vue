<!-- 
  @FileDescription: 访客信息录入
  @Date:2024-08-06 16:46:40
  @Author:LZW
-->

<template>
  <div class="tab-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
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
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain @click="importData">导入数据</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

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
      <!-- <el-table-column label="园区" align="center" key="createBy" prop="createBy" width="55" /> -->
      <el-table-column label="拜访对象" align="center" key="callName" width="220">
        <template #default="scope"> {{ scope.row.callName }}({{ scope.row.callNo }}) </template>
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

    <el-dialog v-model="dialogVisible" title="导入数据" width="60%" destroy-on-close :close-on-click-modal="false">
      <el-form :model="importForm" ref="importRef" :rules="rules" label-width="120px" :inline="false">
        <el-form-item label="访客信息" prop="excel">
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
          <el-button type="primary" size="default" @click="download" link>点击下载访客信息导入模版</el-button>
        </el-form-item>
        <el-form-item label="图片压缩包" prop="zip">
          <MyUpload
            :fileSizeMax="1024 * 50"
            :fileSizeMin="0"
            :fileType="['zip']"
            :limitNum="1"
            :returnType="'file'"
            @uploadChange="getZip"
        /></el-form-item>
        <el-form-item>
          <span style="color: #f56c6c">压缩包内请按照访客证件号命名访客照片，例如：123456789012345678.jpg</span>
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

<script setup name="VisitorEnterInfo">
  import { getVisitorList, downloadTemplate, importVisitor } from '@/api/visitor/enter';
  import MyUpload from '@/components/MyUpload';
  const { proxy } = getCurrentInstance();
  const router = useRouter();

  const total = ref(0);
  const loading = ref(false);
  const showSearch = ref(true);
  const listData = ref([]);
  const dialogVisible = ref(false);
  const senior = ref(false);
  const queryParams = ref({
    pageNum: 1,
    pageSize: 10,
    number: undefined, // 单号1
    visitorName: undefined, // 访客姓名
    visitorCard: undefined, // 证件号
    visitorPhone: undefined, // 访客手机号
    companyName: undefined, // 公司名称
    carNum: undefined, // 车牌号1
    createBy: undefined, // 导入人工号
    visitType: undefined, // 入场类型1
    visitMsg: undefined, // 入场事由1
    callName: undefined, // 拜访对象姓名
    callNo: undefined, // 拜访对象工号
    callPhone: undefined, // 拜访对象手机号
    callEmail: undefined, // 拜访对象邮箱
    callBgId: undefined, // 拜访对象事业群ID
    callBgName: undefined, // 拜访对象事业群
    callDept: undefined // 拜访对象事业处
  });
  const importForm = ref({
    excel: undefined,
    zip: undefined
  });
  const rules = ref({
    excel: [{ required: true, message: '请上传文件', trigger: 'blur' }]
  });

  const getList = async () => {
    loading.value = true;
    const data = await getVisitorList(queryParams.value);
    total.value = data.total;
    listData.value = data.rows;
    loading.value = false;
  };
  getList();
  const handleQuery = () => {
    getList();
  };
  const resetQuery = () => {
    proxy.resetForm('queryRef');
  };
  const importData = () => {
    importForm.value = { excel: undefined, zip: undefined };
    dialogVisible.value = true;
  };
  const download = async () => {
    proxy.download(downloadTemplate(), '', `访客信息导入模板${new Date().getTime()}.xlsx`);
  };
  const handleInfo = (row) => {
    router.push('/visitor/enter/' + row.id);
  };
  const getExcel = (e) => {
    importForm.value.excel = e[0]?.url;
  };
  const getZip = (e) => {
    importForm.value.zip = e[0]?.url;
  };
  const handleSubmit = () => {
    proxy.$refs['importRef'].validate(async (valid) => {
      if (valid) {
        const formData = new FormData();
        formData.append('excel', importForm.value.excel);
        formData.append('zip', importForm.value.zip);
        await importVisitor(formData);
        proxy.$modal.msgSuccess('导入成功');
        dialogVisible.value = false;
        getList();
      }
    });
  };

  console.log('初始化info页面');
  onActivated(() => {
    console.log('info进入缓存');
  });

  onDeactivated(() => {
    console.log('info离开缓存');
  });
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
