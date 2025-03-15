<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :span="24" :xs="24">
      <div class="ml_10 mr_10">
        <el-tabs v-model="activeName" @tab-click='handleClick'>
          <el-tab-pane v-for="(item,index) in editableTabs" :key="index" :label="item.name" :name="item.id">           
          </el-tab-pane>
        </el-tabs>
        <div>
            <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" v-if="activeName==0||activeName==1">
              <el-form-item  prop="guestName">
                <el-input
                  v-model="queryParams.guestName"
                  :placeholder="$t('public.visitorName')"
                  clearable
                  class="mr_10 wd_200"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item  prop="guestCard">
                <el-input
                  v-model="queryParams.guestCard"
                  :placeholder="$t('public.visitorCard')"
                  oninput="value=value.replace(/\s+/g,'')"
                  clearable
                  class="mr_10 wd_200"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item  prop="vipType">
                <el-select v-model="queryParams.vipType" :placeholder="$t('public.VisitorType')" class="mr_10 wd_200">
                  <el-option v-for="(item,index) in vipTypes" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  prop="status" v-if="activeName=='0'">
                <el-select v-model="queryParams.status" :placeholder="$t('public.StatusType')" class="mr_10 wd_200">
                  <el-option v-for="(item,index) in Status" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  prop="record" v-if="activeName=='1'">
                <el-select v-model="queryParams.record" :placeholder="$t('public.RecordsType')" class="mr_10 wd_200">
                  <el-option v-for="(item,index) in recordTypes" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>               
              <el-form-item  v-if="activeName=='0'">
                <el-date-picker
                  v-model="time"
                  type="datetimerange"
                  :range-separator="$t('public.to')"
                  :start-placeholder="$t('public.VisitStartTime')"
                  :end-placeholder="$t('public.VisitEndTime')"
                  value-format="YYYY-MM-DD HH:mm:ss">
                </el-date-picker>
              </el-form-item>              
              <el-form-item>
                <el-button type="primary"  @click="handleQuery" key="1">{{ $t('public.Query') }}</el-button>
                <el-button  @click="resetQuery" key="2">{{ $t('public.Reset') }}</el-button>
              </el-form-item>
            </el-form>   
            <el-row :gutter="10" class="mb8" v-if="activeName=='0'">
              <el-col :span="1.5">
                <!-- <el-button
                  type="primary"
                  plain
                  size="mini"
                  @click="mergeBtn"
                >并单接待</el-button> -->
                <el-button
                  type="primary"
                  plain
                  @click="inviteSubmit(0)"
                >{{$t('public.inviteVisitors')}}</el-button>
                <el-button
                  type="primary"
                  plain
                @click="inviteSubmit(1)"
                >{{$t('public.inviteVIPVisitors')}}</el-button>                                
              </el-col>
            </el-row>       
            <div v-if="activeName==0">
                <el-table  :data="dataList" v-loading="loading">
                    <el-table-column :label="$t('public.number')" prop="mainNumber"/>
                    <el-table-column :label="$t('public.VisitorType')">
                      <template #default="scope">
                        <span>{{vipType(scope.row.vipType)}}</span>
                      </template> 
                    </el-table-column>
                    <el-table-column :label="$t('public.Applicant')"  prop="receptionistNameNo" key="8"/>
                    <el-table-column :label="$t('public.visitor')" show-overflow-tooltip prop="names">
                    </el-table-column>
                    <el-table-column :label="$t('public.VistorReason')" prop="enterFactoryReason" >
                    </el-table-column>
                    <el-table-column :label="$t('public.PersonVisited')" prop="receptionistNameNo"/>
                    <!-- <el-table-column label="被访人部门" /> -->
                    <el-table-column :label="$t('public.ApplyTime')" prop="createTime" key="2" />
                    <el-table-column :label="$t('public.VisitStartTime')" prop="enterStartDate" key="3" />
                    <el-table-column :label="$t('public.VisitEndTime')" prop="enterEndDate" key="4"/>                    
                    <el-table-column :label="$t('public.StatusType')">
                      <template #default="scope">
                        <span>{{statusType(scope.row.status)}}</span>
                      </template>                       
                    </el-table-column>
                    <el-table-column :label="$t('public.Operating')">  
                      <template #default="scope">
                        <el-button link type="primary" @click="detail(scope.row,'audit')" v-if="activeName=='0'&&scope.row.status==7">{{ $t('public.Approve') }}</el-button>
                        <el-button link type="primary" @click="detail(scope.row,'detail')">
                              <span>{{ $t('public.Details') }}</span>
                        </el-button>
                      </template>                   
 
                    </el-table-column>                 
                </el-table>
            </div>
            <div v-if="activeName==1">
                <el-table  :data="recordData" v-loading="loading">
                    <el-table-column :label="$t('public.number')" prop="formNo"/>
                    <el-table-column :label="$t('public.RecordsType')" prop="recordType" key="10">
                    </el-table-column>
                    <el-table-column :label="$t('public.VisitorType')"  key="1">  
                      <template #default="scope">
                        <span>{{vipType(scope.row.guestType)}}</span>
                      </template>                                          
                    </el-table-column>
                    <el-table-column :label="$t('public.Applicant')"  prop="submitter" key="9"/>
                    <el-table-column :label="$t('public.visitor')" show-overflow-tooltip prop="guest" key="12">
                    </el-table-column>
                    <el-table-column :label="$t('public.VistorReason')" prop="reason" key="13"/>
                    <el-table-column :label="$t('public.PersonVisited')" prop="PersonVisited" key="14"/>
                    <!-- <el-table-column label="被访人部门" prop="intervieweeDept" key="15"/>                     -->
                    <el-table-column :label="$t('public.StatusType')" prop="type"  key="11"> 
                      <!-- <template #default="scope">
                        <span>{{statusType(scope.row.state)}}</span>
                      </template>                                             -->
                    </el-table-column>
                    <el-table-column :label="$t('public.OperatingTime')" prop="operateTime" key="5"/>
                    <el-table-column :label="$t('public.Operating')">  
                      <template #default="scope">
                        <el-button link type="primary" @click="detail(scope.row,'detail')">
                              <span>{{ $t('public.Details') }}</span>
                        </el-button>
                      </template>                    
                    </el-table-column>                 
                </el-table>
            </div> 
                <pagination
                  v-show="total>0"
                  :total="total"
                  v-model:page="queryParams.pageCount"
                  v-model:limit="queryParams.pageSize"
                  @pagination="getList"
                />

        </div>
      </div>
      </el-col>
    </el-row>

    <!-- 并单接待 -->
    <!-- <el-dialog :title="title" :visible.sync="openMerge" width="80%"  append-to-body>
      <div>
        <div class="mb_20">仅支持同个公司访客并单</div>
        <el-table ref="mergeDialog" :data="dataList" class="mb_20" @selection-change="handleSelectionChange" @select-all="onSelectAll">
          <el-table-column  type="selection" :selectable="selectable"></el-table-column>
          <el-table-column property="companyName" label="公司名" disabled></el-table-column>
          <el-table-column property="number" label="单号" disabled></el-table-column>
          <el-table-column label="类型">
            <template #default="scope">
              <span>{{vipType(scope.row.vipType)}}</span>
            </template> 
          </el-table-column>
          <el-table-column property="guestName" label="提单人"></el-table-column>
          <el-table-column  label="访客">
              <template #default="scope">
                <span v-for="(item,index) in scope.row.visitorGuestList" :key="index">{{item.guestName}}<span v-if="scope.row.visitorGuestList[index+1]!=null"> , </span></span>
              </template>            
          </el-table-column>
          <el-table-column property="enterFactoryReason" :label="$t('public.VistorReason')" ></el-table-column>
          <el-table-column property="receptionistName" :label="$t('public.PersonVisited')"></el-table-column>
          <el-table-column property="controlName" label="被访人部门"></el-table-column>
          <el-table-column property="controlName" :label="$t('public.ApplyTime')"></el-table-column>
          <el-table-column property="enterStartDate" label="到访时间"></el-table-column>
          <el-table-column property="enterEndDate" label="离开时间"></el-table-column>
        </el-table>  
        <div>已选择：{{mergeCount}}</div>      
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">
              <span>选定以上访客单</span>
          </el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog> -->

    <!-- 邀请来访 -->
    <!-- <el-dialog  :visible.sync="openInvite" append-to-body>
      <div> 
        <div style="margin-top:95px;">
          <p style="font-size:22px;text-align:center" class="mb_20"><span style="color:#FC7B24;">访客</span><span>预约需准备</span></p>
          <p style="font-size:16px;color:#222;text-indent:2em">由于疫情需要，访客预约需准备粤康码截图、行程卡截图、核酸记录截图（须有24小时核酸记录） </p>
          
        </div>
        <el-button round @click="inviteSubmit" style="width:100%;margin-top:60px;">我已准备好，继续邀请</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script setup name="VisitorsList">
import { getApplicationEnterGuestPage,consolidation,consolidationSubmit,getByEmployeeId,visitorBusinessLogList } from "@/api/india/visitors/business.js";
import useUserStore from '@/store/modules/user';
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const editableTabs = ref([
  {
    id: '0',
    name: proxy.$t('public.fkyw'),
  },
  {
    id: '1',
    name: proxy.$t('public.myRecord'),
  }
])
const loading = ref(true);
const activeName = ref('0');
const total = ref(0);
const queryParams = ref({
  pageCount: 1,//当前页
  pageSize: 10,//分页数量
  guestName: '',//访客姓名
  guestCard:'',//访客证件号
  vipType:'',//访客类型 1 普通访客 2 vip访客 3邀请访客
  status:'',//状态;（0已完成 1待办理 2待审核 3被驳回 4员工回退 5取消预约 6待生效 7已生效 8已过期）
  
  enterStartDate:'',//入场时间
  enterEndDate:'',//出场时间
  employeeNo:'',
  record:''//记录类型
});
const time = ref(null);
const dataList = ref([]);
const recordData = ref([]);
const recordTypes = ref([
  // { id: 0, name: proxy.$t('public.fkRecordTypes0') },
  { id: 1, name: proxy.$t('public.fkRecordTypes1') },
  { id: 2, name: proxy.$t('public.fkRecordTypes2') }
]);
const vipTypes = ref([
  // {id:1,name:'普通访客'},
  {id:2,name:proxy.$t('public.inviteVIPVisitors')},
  {id:4,name:proxy.$t('public.inviteVisitors')}
]);
const Status = ref([
  {id:1,name:proxy.$t('public.fkStatus1')},
  {id:2,name:proxy.$t('public.fkStatus2')},
  {id:3,name:proxy.$t('public.fkStatus3')},
  {id:4,name:proxy.$t('public.fkStatus4')},
  {id:5,name:proxy.$t('public.fkStatus5')},
  {id:6,name:proxy.$t('public.fkStatus6')},
  {id:7,name:proxy.$t('public.fkStatus7')},
]);

watch(
  () => time.value,
  (newValue, oldValue) => {
    console.log('time.newValue', newValue);
    if (!newValue || newValue.length === 0) {
      queryParams.value.enterStartDate = '';
      queryParams.value.enterEndDate = '';
    } else {
      console.log(2222222);
      queryParams.value.enterStartDate = newValue[0];
      queryParams.value.enterEndDate = newValue[1];
    }
  },
  { deep: true }
);

const detail = (val,titType) => {
  let id = ''
  if (activeName.value == 0) {
    id = val.mainNumber
  }
  if (activeName.value == 1) {
    id = val.formNo
  }
  if (route.path.indexOf('/indiayqfk/visitors') != -1) {
      router.push({
        path: `/indiayqfk/visitors/details/${id}`,
      });
    }
    if (route.path.indexOf('/indiayqfk/visitorsVip') != -1) {
      router.push({
        path: `/indiayqfk/visitorsVip/details/${id}`,
      });
    }
}

const vipType = (val) => {
  if(val==1) return '普通访客'
  if(val==2) return proxy.$t('public.inviteVIPVisitors')
  if(val==3) return proxy.$t('public.inviteVisitors') 
  if(val==4) return proxy.$t('public.inviteVisitors')  
}
const statusType = (val) => {
  switch(val){
    case '0': return proxy.$t('public.fkStatus0');
    case '1': return proxy.$t('public.fkStatus1');
    case '2': return proxy.$t('public.fkStatus2');
    case '3': return proxy.$t('public.fkStatus3');
    case '4': return proxy.$t('public.fkStatus4');
    case '5': return proxy.$t('public.fkStatus5');
    case '6': return proxy.$t('public.fkStatus6');
    case '7': return proxy.$t('public.fkStatus7');
  }
}
const inviteSubmit = (tit) => {
  if(tit==0){
    router.push({ path: '/indiayqfk/visitors/invite' })
  }
  if(tit==1){ 
    router.push({ path: '/indiayqfk/visitorsVip/invite' })
  }
}
const handleClick = (tab) => {
  activeName.value = tab.paneName;
  proxy.resetForm('queryForm');
  queryParams.value.pageCount = 1;
  dataList.value = []
  getList();
};
//搜索
const handleQuery = () => {
  console.log('queryParams.value',queryParams.value);
  queryParams.value.pageCount = 1;
  getList()
};
//重置
const resetQuery = () => {
  time.value = null
  proxy.resetForm('queryForm');
  setTimeout(()=>{
    handleQuery();
  })
};
const getList = () => {
  loading.value = true
  if (activeName.value == '0') {
    queryParams.value.employeeNo = useUserStore().name
    getApplicationEnterGuestPage(JSON.stringify(queryParams.value)).then(response => {
      loading.value = false
      dataList.value = response.rows
      total.value = response.total
    })
  }
  if (activeName.value == '1') {
    let datas = {
      recordType: queryParams.value.record,//记录类型
      guestType: queryParams.value.vipType,//访客类型
      guest: queryParams.value.guestName,//访客类型
      state: queryParams.value.status,//状态
      identityNo: queryParams.value.guestCard,
      pageNum: queryParams.value.pageCount,
      pageSize: queryParams.value.pageSize,
      employeeNo: useUserStore().name,
      terminationName: '',
      PersonVisited: '',
    }
    visitorBusinessLogList(JSON.stringify(datas)).then(response => {
      loading.value = false
      recordData.value = response.rows
      total.value = response.total
    })
  }
};
getList();



</script>

<style scoped>
::v-deep .el-dialog {
  background-color: transparent; 
  border-radius: 10px;
  width: 430.7px;
}
::v-deep .el-icon-close:before{
  content:''
}
::v-deep .el-dialog__header{
  height: 0;
}
::v-deep .el-dialog__body{
  background-image: url('../../../assets/img/fangyizhence.png');
  width: 430.7px;
  height: 367.8px;
  padding: 30px 60px;

}
::v-deep .el-dialog__footer{
  height: 0;
  padding: 0;
}
::v-deep .el-tabs__item{
    font-size: 16px;
    
}
::v-deep .el-tabs--top .el-tabs__item.is-top:nth-child(2) .el-icon-close{
    display: none;
}
::v-deep .el-tabs--top .el-tabs__item.is-top:nth-child(3) .el-icon-close{
    display: none;
}

</style>