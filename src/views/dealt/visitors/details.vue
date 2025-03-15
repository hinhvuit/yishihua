<template>
  <div class="dealt-container">
    <div class="main-bg" :style="{ background: `url(${url})` }"></div>
    <div class="main">
      <el-page-header @back="goBack" style="margin: 10px 0;height: 50px;">
        <template #content>
          <span class="text-large font-600 mr-3">{{$t('public.AuditDetails')}} </span>
        </template>
      </el-page-header>
    </div>
    <div class="app-container">
          <div>
                <div class="min-box">
                  <div class="min-box-tit">
                    <div class="pl_20 col-222">{{$t('public.baseInformation')}}<span style="color:#D7D7D7"> （{{$t('public.documentNumber')}}{{details.mainNumber}}）</span></div>
                  </div>
                  <div style="font-size:14px;padding:30px 20px">
                    <el-row :gutter="20" class="mb_10">
                      <el-col :span="6">
                        <div class="flex">
                          <div class="col-666 wd_100">{{$t('public.staff')}}</div>
                          <div class="col-333">{{details.receptionistName}}</div>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="flex">
                          <div class="col-666 wd_100">{{$t('public.vistorReason')}}</div>
                          <div class="col-333">
                            {{details.enterFactoryReason}}
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="flex">
                          <div class="col-666 wd_100">{{$t('public.vistorStartTime')}}</div>
                          <div class="col-333">{{details.enterStartDate}}</div>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="flex">
                          <div class="col-666 wd_100">{{$t('public.vistorEndTime')}}</div>
                          <div class="col-333">{{details.enterEndDate}}</div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="flex align-items-center">
                          <div class="col-666 wd_100" style="height:36px;line-height:36px">{{$t('public.remark')}}</div>
                          <div class="col-333">
                            {{details.remarks}}
                          </div>
                        </div>
                      </el-col>
                    </el-row>                   
                  </div>
                </div>
                <div class="min-box">
                  <div class="min-box-tit">
                    <div class="pl_20 col-222">{{$t('public.vistorCompany')}}</div>
                  </div>                
                  <div style="font-size:14px;padding:30px 20px">
                    <div class="flex">
                      <div class="col-666 wd_100">{{$t('public.vistorCompany1')}}</div>
                      <div class="col-333">{{details.companyName}}</div>
                    </div>  
                  </div>
                </div>
                <div class="min-box" v-for="(item,index) in details.visitorGuests" :key="index">
                  <div class="min-box-tit">
                    <div class="pl_20">{{$t('public.visitor')}}（{{index+1}}）</div>
                  </div>
                  <div style="font-size:14px;padding:30px 20px">
                    <div  class="flex align-items-center">
                      <div >
                      <div class="flex align-items-center mb_10">
                          <div class="col-666 wd_100">{{$t('public.faceImage')}}</div>
                          <div>
                            <el-image
                              v-if="item.inFacePath"
                              style="width: 100px; height: 100px;border-radius: 6px;border: 1px dashed #d9d9d9;"
                              :src="item.inFacePath"
                              fit="cover"
                              :preview-src-list="[item.inFacePath]">
                              </el-image> 
                              <div v-else>{{ $t('public.thereIsNo') }}</div>                           
                          </div>
                        </div>
                        <div class="flex mb_10">
                          <div class="col-666 wd_100">{{$t('public.guestName')}}</div>
                          <div class="col-333">{{item.name}}<span v-if="item.phone">（{{item.phone}}）</span></div>
                        </div>
                        <div class="flex mb_10">
                          <div class="col-666 wd_100">{{$t('public.vistorCar')}}</div>
                          <div class="col-333">{{item.carNumber}}<span v-if="!item.carNumber">{{$t('public.thereIsNo')}}</span></div>
                        </div>
                        <!-- <div class="flex mb_10">
                          <div class="col-666 wd_100">车牌颜色：</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                          <div class="col-333">{{carColors(item.carColor)}}</div>
                        </div> -->  
                        <div class="flex mb_10" v-if="details.vipType==4&&item.carType">
                          <div class="col-666 wd_100">车辆类型：</div>
                          <div class="col-333">{{item.carType}}</div>
                        </div>
                        <div class="flex align-items-center" v-if="details.vipType==4&&item.carCardImage">
                          <div class="col-666 wd_100">{{$t('public.carImage')}}</div>
                          <pic-show :picUrl="item.carCardImage"></pic-show>
                        </div>                    
                      </div>
                      <!-- <div class="flex" v-if="imgList.length!=0"> -->
                      <!-- <div style="margin-right:50px">
                        <div class="mb_10">
                            <el-image
                            style="width: 100px; height: 100px;border-radius: 6px;border: 1px dashed #d9d9d9;"
                            :src="imgList[index].resourcesOne"
                            :preview-src-list="Object.values(imgList[index])"
                            fit="cover">
                            </el-image>
                        </div>
                        <div style="text-align:center">粤康码截图</div>
                      </div>
                      <div style="margin-right:50px">
                        <div class="mb_10">
                            <el-image
                            style="width: 100px; height: 100px;border-radius: 6px;border: 1px dashed #d9d9d9;"
                            :src="imgList[index].resourcesTwo"
                            :preview-src-list="Object.values(imgList[index])"
                            fit="cover">
                            </el-image>                        
                        </div>
                        <div style="text-align:center">行程卡截图</div>
                      </div>
                      <div style="margin-right:50px">
                        <div class="mb_10">
                            <el-image
                            style="width: 100px; height: 100px;border-radius: 6px;border: 1px dashed #d9d9d9;"
                            :src="imgList[index].resourcesThree"
                            :preview-src-list="Object.values(imgList[index])"
                            fit="cover">
                            </el-image>                           
                        </div>
                        <div style="text-align:center">核酸检测截图</div>
                      </div>  -->
                                                              
                      <!-- </div>   -->
                    </div>
                    <!-- 展示二维码 -->
                  <div v-if="details.status=='8'">
                    <el-button type="primary" @click="QrBtn(item.id,details.mainNumber)">{{$t('public.showCheckCode')}}</el-button>
                  </div>                    
                  </div>
  
                </div>
                <!-- <div class="min-box" v-for="(item,index) in details.visitorGuestList" :key="index">
                  <div class="min-box-tit">
                    <div class="pl_20 col-222">访客{{index+1}}</div>
                  </div>
                  <div style="height: 178px;font-size:14px">
                    <div  class="flex" style="padding:28px 0 25px 20px">
                      <div style="line-height: 40px;width:300px">
                        <div class="flex">
                          <div class="col-666">来访人：</div>
                          <div class="col-333">{{item.guestName}}</div>
                        </div>
                        <div class="flex">
                          <div class="col-666">随行车辆：</div>
                          <div class="col-333">{{item.carNumber}}</div>
                        </div>
                        <div class="flex">
                          <div class="col-666">车牌颜色：</div>
                          <div class="col-333">{{item.carColor}}</div>
                        </div>                    
                      </div>
                      <div class="flex">
                      <div style="margin-right:50px">
                        <div class="mb_10">
                            <el-image
                            style="width: 100px; height: 100px;border-radius: 6px;border: 1px dashed #d9d9d9;"
                            :src="imgList[index].resourcesOne"
                            fit="cover">
                            </el-image>                        
                        </div>
                        <div style="text-align:center">粤康码截图</div>
                      </div>
                      <div style="margin-right:50px">
                        <div class="mb_10">
                            <el-image
                            style="width: 100px; height: 100px;border-radius: 6px;border: 1px dashed #d9d9d9;"
                            :src="imgList[index].resourcesTwo"
                            fit="cover">
                            </el-image>                        
                        </div>                      
                        <div style="text-align:center">行程卡截图</div>
                      </div>
                      <div style="margin-right:50px">
                        <div class="mb_10">
                            <el-image
                            style="width: 100px; height: 100px;border-radius: 6px;border: 1px dashed #d9d9d9;"
                            :src="imgList[index].resourcesThree"
                            fit="cover">
                            </el-image>                        
                        </div>                     
                        <div style="text-align:center">核酸检测截图</div>
                      </div>                      
                      </div>  
                    </div>                    
                  </div>
                </div>               -->
                <div class="min-box" v-if="details.mainNumber!==null">
                  <div class="min-box-tit">
                    <div class="pl_20 col-222">{{$t('public.approvalProcess')}}</div>
                  </div>
                  <div style="padding:30px 0 30px 20px">
                    <div>
                      <approval-progress @getSignNode='getSignNode' :businessKey='route.params.id' ref="approvalProgressRef"></approval-progress>
                    </div>
                  </div>
  
                </div>
                <div class="flex mb_20" style="margin: 0 227px;">
                  <approval-btn @upDataSignNode='upDataSignNode' :businessKey='route.params.id' :businessType='"guest_business"'></approval-btn>
                </div>
                <div style="margin: 0 227px;" v-if="name == signNodes&&(details.status=='2'||details.status=='3'||details.status=='7')"><el-button type="primary" @click="aginBtn()">{{$t('public.againSubmit')}}</el-button></div>
              </div>
    </div>
    
    <el-dialog
      :title="$t('public.VisitorsRelease')"
      v-model="dialogVisible"
      width="500px"
      :before-close="handleClose">
      <div>
          <div class="flex justify-content-center text-center" >
              <div ref="qrCodeUrl" class="mb_20" style="pointer-events:none"></div>
          </div>
          <div class="flex justify-content-center">
              <div >{{$t('public.documentNumber')}}</div>
              <div>{{personId}}</div>
          </div>        
      </div>
    </el-dialog>
  </div>
</template>
<script setup name="VisitorsDetails">
import QRCode from "qrcodejs2-fix";

import url from '@/assets/images/bannner2.jpg';
import { getMainById,} from "@/api/india/visitors/business.js";
// import approval from "@/components/Approval/index.vue";
import approvalProgress from "@/components/ApprovalProgress/index.vue";
import PicShow from "@/components/AddFile/picShow.vue";
import useUserStore from '@/store/modules/user';
const name = useUserStore().name; //工号
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const details = ref([]);
const type = ref('');
const btnShow = ref(false);
const visitorMainConsolidationParm = ref({
  startTime:'',
  endTime:'',
  enterFactoryReason:'',
  guardTemplate:{}  
});
const status = ref('');
const resourcesisShow = ref('');
const imgList = ref([]);
const signNodes = ref('');
const dictId = ref('');
const personId = ref('');
const dialogVisible = ref(false);
const approvalProgressRef = ref(null);
function goBack() {
    router.replace(`/dealt/${route.query.type}?type=IndiaVisitors`);
  }
const aginBtn = () => {
  if (details.value.vipType == '4' || details.value.vipType == '1') {
    return router.push({ path: '/indiayqfk/visitors/invite', query: { id: details.value.mainNumber} })
  }
  if (details.value.vipType == '2') {
    return router.push({ path: '/indiayqfk/visitorsVip/invite', query: { id: details.value.mainNumber} })
  }
}
//更新节点
const upDataSignNode = () => {
  nextTick(()=>{
    approvalProgressRef.value.getSignProcessList(details.value.mainNumber)
  })
  getList(dictId.value)
};
const getImg = (item,index) => {
  let type=''
  if(details.value.vipType==2){
      type='main_guest_vip '
  }
  if(details.value.vipType==4||details.value.vipType==1){
      type='main_guest '
  }
  return
}
const getSignNode = (val) => {
  signNodes.value=val[0].employeeno;
  console.log('signNodes.value',signNodes.value);
  console.log('name.value',name);
  
}
const getList = (val) => {
  getMainById(val).then(response => {
    details.value = response.data
    details.value.visitorGuests = response.data.visitorGuestResults
    let promiseArr = details.value.visitorGuests.map((item, index) => {
      return getImg(item, index)
    })
    Promise.all(promiseArr).then(value => {
      imgList.value = value;
    }).catch()
  })
}
onMounted(() => {
  dictId.value = route.params.id;
  getList(dictId.value);
});

const handleClose = () => {
  dialogVisible.value = false;
  getList(dictId.value);
};
const qrCodeUrl = ref(null);

const QrBtn = (id, key) => {
  personId.value = key;
  dialogVisible.value = true;
  let QRval = { "id": id, "url": "https://fssafe.foxconn.com/Home/GuardReleaseDetails", "key": key }
  nextTick(() => {
    qrCodeUrl.value.innerHTML = "";
    new QRCode(qrCodeUrl.value, {
      text: JSON.stringify(QRval),
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  });
};

// watch(() => route.params.id,
//   (newVal, oldVal) => {
//     dictId.value = newVal;
//     getList(dictId.value); //
//   });


</script>


<style lang="scss" scoped>
.app-container{
  width: 100%;
  .min-box{
    margin: 0 227px;
    margin-bottom: 20px;
    border:1px solid #D7D7D7;
    border-radius: 4px;
    
    .min-box-tit{
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #D7D7D7;
      background: #F0F0F0;
      color: #222222;
      font-size: 16px;
    }
  }
}
.col-333{
  color: #333;
}
.col-222{
  color: #222;
}
.col-666{
  color: #666;
}
.dealt-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .main-bg {
      height: 106px;
      width: 1920px;
      background-repeat: no-repeat;
      background-size: 1920px 100%;
      background-origin: content-box;
    }
    .main {
      height: 50px;
      width: 1400px;
      margin: 0 auto;
      padding: 20px 0 0 0;
    }
  }
</style>