<!-- 
  FileDescription:人脸识别-识别记录
  router:faceRecognitionRecord
  params:
  Date:2024-08-27 14:27:30
  Author:CZQ
 -->
 <template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="工号"
          clearable
          style="width: 200px"
          oninput="value=value.replace(/\s+/g,'')"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="姓名"
          clearable
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="card">
        <el-input
          v-model="queryParams.card"
          placeholder="证件号"
          clearable
          style="width: 200px"
          oninput="value=value.replace(/\s+/g,'')"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="empPhone">
        <el-input
          v-model="queryParams.empPhone"
          placeholder="手机号"
          clearable
          style="width: 200px"
          oninput="value=value.replace(/\s+/g,'')"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item prop="factoryName">
        <el-input
          v-model="queryParams.factoryName"
          placeholder="园区"
          clearable
          style="width: 200px"
          oninput="value=value.replace(/\s+/g,'')"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" style="width: 200px">
          <el-option
            v-for="item in statusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="operatorName">
        <el-input
          v-model="queryParams.operatorName"
          placeholder="操作人"
          clearable
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item prop="operatorNumber">
        <el-input
          v-model="queryParams.operatorNumber"
          placeholder="操作人工号"
          clearable
          style="width: 200px"
          oninput="value=value.replace(/\s+/g,'')"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="listData">
      <el-table-column label="工号" align="center" prop="number" />
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="性别" align="center" prop="empSex" />
      <el-table-column label="证件号" align="center" prop="card"  width="200px">
        <template #default="scope">
          {{ maskedIdCard(scope.row.card) }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" prop="empPhone" />
      <el-table-column label="园区" align="center" prop="factoryName" />
      <el-table-column label="状态" align="center" prop="status" >
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status == '1'">已查验</el-tag>
          <span v-else>未查验</span>
        </template>
      </el-table-column>
      <el-table-column label="识别照片" align="center" prop="recordTime" >
        <template #default="scope">
          <el-image
            :preview-teleported="true"
            :hide-on-click-modal="true"
            fit="contain"
            :lazy="true"  
            style="width: 100px; height: 100px"
            :src="scope.row.uploadImage" 
            :preview-src-list="[scope.row.uploadImage]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="证件照片" align="center" prop="recordTime" >
        <template #default="scope">
          <el-image
            :preview-teleported="true"
            :hide-on-click-modal="true"
            fit="contain"
            :lazy="true"  
            style="width: 100px; height: 100px"
            :src="scope.row.identifyImage" 
            :preview-src-list="[scope.row.identifyImage]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作园区" align="center" prop="regionName" />
      <el-table-column label="操作人" align="center" prop="operatorName" />
      <el-table-column label="操作人工号" align="center" prop="operatorNumber" />
      <el-table-column label="操作时间" align="center" prop="createTime" width="200px"/>

    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.page"
      v-model:limit="queryParams.size"
      @pagination="getList"
    />
  </div>
</template>

<script setup name="FaceRecognitionRecord">
  import { selectIdentifyPersonByPage } from '@/api/faceRecognition/record';
  import { getPark } from '@/utils/park';
  import useUserStore from '@/store/modules/user';
  const userStore = useUserStore();
  const { proxy } = getCurrentInstance();
  const total = ref(0);
  const loading = ref(false);
  const listData = ref([]);
  const queryParams = ref({
    operatorNumber: userStore.name, //工号
    type: 0,
    region: getPark(), // 默认当前园区
    page: 1,
    size: 10
  });
  const statusArr = ref([
    { value: '',label: '全部'},
    { value: '0',label: '未查验'},
    { value: '1',label: '已查验'},
  ]);

  const getList = async () => {
    loading.value = true;
    console.log("111122222",queryParams.value);
    const data = await selectIdentifyPersonByPage(queryParams.value);
    total.value = data.data.total;
    listData.value = data.data.records;
    loading.value = false;
    if(!data.data.total){
      proxy.$modal.msgError('未查询到相关数据');
    }
  };
  getList();
  const handleQuery = () => {
    getList();
  };
  const resetQuery = () => {
    proxy.resetForm('queryRef');
  };
  const maskedIdCard = (val) => {
    if (val) {
      const firstSix = val.substring(0, 6);
      const lastFour = val.substring(val.length - 4);
      return `${firstSix}******${lastFour}`;
    }
  };

</script>
<style lang="scss" scoped></style>