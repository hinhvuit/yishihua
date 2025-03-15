<template>
  <div>
    <div class="app-container">
      <el-row :gutter="24" class="ml_10 mr_10">
        <el-col :span="24">
          <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('public.materialRelease')" name="first">
            </el-tab-pane>
            <el-tab-pane :label="$t('public.myRecord')" name="second">
            </el-tab-pane>
          </el-tabs> -->
          <div>
            <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="80px">
              <el-form-item prop="takeName">
                <el-input v-model="queryParams.takeName" :placeholder="$t('public.carrierName')" clearable
                  class="mr_10 wd_200" @keyup.enter.native="handleQuery" />
              </el-form-item>
              <el-form-item prop="takeCard">
                <el-input v-model="queryParams.takeCard" :placeholder="$t('public.carrierIdCard')"
                  oninput="value=value.replace(/\s+/g,'')" clearable class="mr_10 wd_200"
                  @keyup.enter.native="handleQuery" />
              </el-form-item>
              <el-form-item prop="formType">
                <el-select v-model="queryParams.formType" :placeholder="$t('public.choose')">
                  <el-option v-for="item in goods_type" :key="item.value" :label="item.label"
                    :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item prop="logType"  v-if="activeName == 'second'">
                <el-select v-model="queryParams.logType" :placeholder="$t('public.choose')">
                  <el-option v-for="item in logTypes" :key="item.id" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="signResult" v-if="activeName == 'second'">
                <el-select v-model="queryParams.signResult" :placeholder="$t('public.choose')" >
                  <el-option v-for="item in signResults" :key="item.value" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="activeName == 'first'">
                <div class="block mr_10">
                  <el-date-picker v-model="time" type="datetimerange" :range-separator="$t('public.to')"
                    :start-placeholder="$t('public.ApplyStartTime')" :end-placeholder="$t('public.ApplyEndTime')"
                    value-format="YYYY-MM-DD HH:mm:ss">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item v-if="activeName == 'second'">
                <div class="block mr_10">
                  <el-date-picker v-model="time" type="datetimerange" :range-separator="$t('public.to')"
                    :start-placeholder="$t('public.ReleaseStartTime')" :end-placeholder="$t('public.ReleaseEndTime')"
                    value-format="YYYY-MM-DD HH:mm:ss">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleQuery" key="1">{{ $t('public.Query') }}</el-button>
                <el-button @click="resetQuery" key="2">{{ $t('public.Reset') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="mb_10">
            <el-button v-if='activeName == "first"' type="primary" plain 
              @click="handleAdd">{{ $t('public.apply') }}</el-button>
          </div>
          <div v-if="activeName == 'first'">
            <el-table :data="dataList" style="width: 100%" key="1" v-loading="loading">
              <el-table-column prop="formNumber" :label="$t('public.number')">
              </el-table-column>
              <!-- <el-table-column
                            prop="记录类型"
                            :label="$t('public.RecordsType')">
                        </el-table-column> -->
              <el-table-column :label="$t('public.type')">
                <template #default="scope">
                  <div>
                    <dict-tag :options="goods_type" :value="scope.row.formType" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="applyName" :label="$t('public.Applicant')">
              </el-table-column>
              <el-table-column prop="takeName" :label="$t('public.carrierName')">
              </el-table-column>
              <el-table-column prop="receiverName" :label="$t('public.Receiver')">
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('public.ApplyTime')">
              </el-table-column>
              <!-- <el-table-column
                            prop="releaseEndTime"
                            :label="$t('public.ReleaseTime')">
                        </el-table-column> -->
              <el-table-column :label="$t('public.Status')">
                <template #default="scope">
                  <div>
                    <dict-tag :options="goods_status" :value="scope.row.formStatus" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('public.OperatingTime')">
              </el-table-column>
              <el-table-column :label="$t('public.Operating')">
                <template #default="scope">
                  <div>
                    <el-button link type="primary"
                      @click="jumpDetails(scope.row)">{{ $t('public.fkStatus7') }}</el-button>
                    <el-button link type="primary" @click="jumpDetails(scope.row)">{{ $t('public.Details')
                      }}</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else>
            <el-table key="2" :data="dataList" style="width: 100%" v-loading="loading">
              <el-table-column prop="formNumber" :label="$t('public.number')">
              </el-table-column>
              <el-table-column prop="logType" :label="$t('public.RecordsType')">
              </el-table-column>
              <el-table-column :label="$t('public.type')">
                <template #default="scope">
                  <div>
                    <dict-tag :options="goods_type" :value="scope.row.formType" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="applyNameNo" :label="$t('public.Applicant')">
              </el-table-column>
              <el-table-column prop="takeNameCard" :label="$t('public.carrierName')">
              </el-table-column>
              <el-table-column prop="receiverNameCard" :label="$t('public.Receiver')">
              </el-table-column>
              <el-table-column prop="formCreateTime" :label="$t('public.ApplyTime')">
              </el-table-column>
              <el-table-column prop="checkTime" :label="$t('public.ReleaseTime')">
              </el-table-column>
              <el-table-column :label="$t('public.Status')">
                <template #default="scope">
                  <div>
                    {{ Result(scope.row.signResult) }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="logCreateTime" :label="$t('public.OperatingTime')">
              </el-table-column>
              <el-table-column :label="$t('public.Operating')">
                <template #default="scope">
                  <div>
                    <el-button link type="primary" @click="jumpDetails(scope.row)"
                      v-if="activeName == 'first'">{{ $t('public.fkStatus7') }}</el-button>
                    <el-button link type="primary" @click="jumpDetails(scope.row)">{{ $t('public.Details')
                      }}</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize" @pagination="getList" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup name="GoodsList">
import { ref } from 'vue'
import { reviewedList, formListLog } from '@/api/india/goods/goods'
import useUserStore from '@/store/modules/user';
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const { goods_status } = proxy.useDict("goods_status");
const { goods_type } = proxy.useDict("goods_type");
const loading = ref(true);
const total = ref(0);
const activeName = ref('second');
const queryParams = ref({
  takeName: '',
  takeCard: '',
  formType: '',
  startCreateTime: '',
  endCreateTime: '',
  applyNo: '',
  pageNum: 1,
  pageSize: 10,

  employeeNo: '',
  logType: '',
  signResult: '',
  endLogCreateTime: '',
  startCheckTime: '',
  endCheckTime: ''
});
const time = ref(null);
const dataList = ref([]);
const logTypes = ref([
  { id: 1, name: proxy.$t('public.ApplyRecords') },
  { id: 2, name: proxy.$t('public.fkRecordTypes1') }
]);
const signResults = ref([
  { id: 0, name: proxy.$t('public.signResults0') },
  { id: 1, name: proxy.$t('public.signResults1') },
  { id: 2, name: proxy.$t('public.signResults2') }
]);

watch(
  () => time.value,
  (newValue, oldValue) => {
    if (!newValue || newValue.length === 0) {
      if (activeName.value == 'first') {
        queryParams.value.startCreateTime = '';
        queryParams.value.endCreateTime = '';
      }
      if (activeName.value == 'second') {
        queryParams.value.startCheckTime = '';
        queryParams.value.endCheckTime = '';
      }
    } else {
      if (activeName.value == 'first') {
        queryParams.value.startCreateTime = newValue[0];
        queryParams.value.endCreateTime = newValue[1]; 
      }
      if (activeName.value == 'second') {
        queryParams.value.startCheckTime = newValue[0];
        queryParams.value.endCheckTime = newValue[1]; 
      }
    }
  },
  { deep: true }
);

// watch(
//   () => activeName.value,
//   (newValue, oldValue) => {
//     console.log('newValue',newValue);
//     getList();
//   }
// )

const Result = (val) => {
  if (val == 0) return proxy.$t('public.signResults0')
  if (val == 1) return proxy.$t('public.signResults1')
  if (val == 2) return proxy.$t('public.signResults2')
};
const handleClick = (tab) => {
  activeName.value = tab.paneName;
  proxy.resetForm('queryForm');
  queryParams.value.pageNum = 1;
  dataList.value = []
  console.log('dataList.value',dataList.value);
  
  getList();
};
const handleAdd = () => {
 router.push({ path: '/indiagoods/goods/apply' })
};
const jumpDetails = (row) => {
  const id = row.formNumber
  router.push({ path: `/dealt/goods/details/${id}`,query: { type:'record' } })
};
//搜索
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList()
};
//重置
const resetQuery = () => {
  proxy.resetForm('queryForm');
  time.value = []
  setTimeout(()=>{
    handleQuery();
  })
 
};
const getList = () => {
  console.log('activeName.value',activeName.value);
  console.log(queryParams.value)
  loading.value = true;
  queryParams.value.applyNo = useUserStore().name;
  if (activeName.value == 'first') {
    reviewedList(JSON.stringify(queryParams.value)).then(Response => {
      loading.value = false
      dataList.value = Response.rows
      total.value = Response.total
    })
  }
  if (activeName.value == 'second') {
        let data = {
          employeeNo: queryParams.value.applyNo,
          takeName: queryParams.value.takeName,
          takeCard: queryParams.value.takeCard,
          logType: queryParams.value.logType,
          formType: queryParams.value.formType,
          signResult: queryParams.value.signResult,
          startCheckTime: queryParams.value.startCheckTime,
          endCheckTime: queryParams.value.endCheckTime,
          pageNum: queryParams.value.pageNum,
          pageSize: queryParams.value.pageSize,

        }         
        formListLog(JSON.stringify(data)).then(Response => {
          loading.value = false
          dataList.value = Response.rows
          total.value = Response.total
        })
      }
};
getList();

</script>

<style scoped>
::v-deep .el-tabs__item {
  font-size: 16px;

}
</style>