<template>
  <div class="app-container">
    <div>
      <div class="min-box">
        <div class="min-box-tit">
          <div class="pl_20 col-222">{{$t('public.baseInformation')}}</div>
        </div>
        <div style="font-size: 14px; padding: 30px 20px">
          <el-row :gutter="20" class="mb_10">
            <el-col :span="6">
              <div class="flex align-items-center">
                <div class="col-666 wd_100" style="height:36px;line-height:36px">{{$t('public.staff')}}</div>
                <div class="col-333">
                  {{ visitorMain.receptionistName }}（{{
                    visitorMain.receptionistTel
                  }}）
                </div>
              </div>
            </el-col>
            <el-col :span="6" v-if="tit == '0'">
              <div class="flex align-items-center">
                <div class="col-666 wd_100">{{$t('public.vistorReason')}}</div>

                <el-select
                  v-model="visitorMain.enterFactoryReason"
                  :placeholder="$t('public.choose')"
                >
                  <el-option
                    v-for="item in sys_guest_reason"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6" v-if="tit == '1'">
              <div class="flex align-items-center">
                <div class="col-666 wd_100">{{$t('public.vistorReason')}}</div>

                <el-select
                  v-model="visitorMain.enterFactoryReason"
                  :placeholder="$t('public.choose')"
                >
                  <el-option
                    v-for="item in sys_vipguest_reason"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex align-items-center">
                <div class="col-666 wd_100">{{$t('public.vistorStartTime')}}</div>

                <el-date-picker
                  v-model="visitorMain.enterStartDate"
                  type="datetime"
                  :placeholder="$t('public.choose')"
                  value-format="YYYY-MM-DD HH:mm:ss"
                >
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex align-items-center">
                <div class="col-666 wd_100">{{$t('public.vistorEndTime')}}</div>

                <el-date-picker
                  v-model="visitorMain.enterEndDate"
                  type="datetime"
                  :placeholder="$t('public.choose')"
                  value-format="YYYY-MM-DD HH:mm:ss"
                >
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="flex align-items-center">
                <div class="col-666 wd_100" style="height:36px;line-height:36px">{{$t('public.remark')}}</div>
                <div class="col-333">
                  <el-input v-model="visitorMain.remarks" :placeholder="$t('public.enter')"></el-input>
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
        <div style="font-size: 14px; padding: 30px 20px">
          <div class="flex align-items-center">
            <div class="col-666 wd_100">{{$t('public.vistorCompany1')}}</div>
            <el-input
              v-model="visitorMain.companyName"
              :placeholder="$t('public.search')"
              disabled
              class="mr_10 wd_300"
            ></el-input>
            <div>
              <el-button type="primary" @click="searchCompanyDialogBtn"
                >{{$t('public.searchCompany')}}</el-button
              >
            </div>
          </div>
        </div>
      </div>

      <div
        class="min-box"
        v-if="visitorMain.visitorMainGuestVips.length == 0 && tit == 0"
      >
        <div class="min-box-tit">
          <div class="pl_20 col-222">{{$t('public.vistorInformation')}}</div>
        </div>
        <div style="height: 72px; line-height: 72px; font-size: 14px">
          <div class="pl_20">
            <el-button
              :icon="CirclePlus"
              link
              type="primary"
              @click="openDialog"
            >
            {{$t('public.addVisitor')}}</el-button
            >
          </div>
        </div>
      </div>
      <div
        class="min-box"
        v-if="visitorMain.visitorMainGuestVips.length == 0 && tit == 1"
      >
        <div class="min-box-tit">
          <div class="pl_20 col-222">{{$t('public.vistorInformation')}}</div>
        </div>
        <div style="height: 72px; line-height: 72px; font-size: 14px">
          <div class="pl_20">
            <el-button
              :icon="CirclePlus"
              link
              type="primary"
              @click="openDialog"
            >
            {{$t('public.addVIPVisitor')}}</el-button
            >
          </div>
        </div>
      </div>
      <div v-if="tit == 0">
        <div
          class="min-box"
          v-for="(item, index) in visitorMain.visitorMainGuestVips"
          :key="index"
        >
          <div class="min-box-tit">
            <div class="flex justify-content-between pl_20 pr_20 col-222">
              <div>{{$t('public.visitor')}}（{{ index + 1 }}）</div>
              <el-button
                type="text"
                style="color: #df5b4b"
                @click="deleBtn(index)"
                >{{$t('public.delete')}}</el-button
              >
            </div>
          </div>
          <div style="font-size: 14px; padding: 30px 20px">
            <div class="flex align-items-center">
              <div style="width: 900px">
                <div class="flex mb_10 align-items-center">
                  <div class="col-666 wd_100">{{$t('public.guestName')}}</div>
                  <div class="col-333">
                    {{ item.guestName }}（{{ item.guestPhone }}）
                  </div>
                </div>
                <div class="flex mb_10 align-items-center">
                  <div class="col-666 wd_100">{{$t('public.guestCard')}}</div>
                  <div class="col-333">
                    {{ item.guestCard }}
                  </div>
                </div>
                <div class="flex mb_10 align-items-center">
                  <div class="col-666 wd_100">{{$t('public.faceImage')}}</div>
                  <div style="height: 100px">
                    <face-img @img="imgs4(index, $event)" :imgUrls='item.faceImage' bucket="visitor-epidemic-prevention"></face-img>
                    <!-- <face-img @img="imgs4(index, $event)" :imgUrls='item.faceImage' :imgType="'header'" bucket="visitor-epidemic-prevention"></face-img> -->
                  </div>
                  <div style="font-size:12px;color:#777" class="ml_20">{{$t('public.faceImageTips1')}}<br>{{$t('public.faceImageTips2')}}<span style="color:#ff9800">{{$t('public.faceImageTips3')}}</span>{{$t('public.faceImageTips4')}}</div>
                </div>
                <div class="flex mb_10 align-items-center">
                  <div class="col-666 fs_14 wd_100">{{$t('public.vistorCar')}}</div>
                  <div class="col-333" style="width: 530px;">
                    <el-input
                      v-model="item.carNumber"
                      :placeholder="$t('public.carTips')"
                      clearable
                    ></el-input>
                  </div>
                </div>
                <!-- <div class="flex mb_10 fs_14 align-items-center">
                  <div class="col-666 wd_100">车牌颜色：</div>
                  <div class="col-333">
                    <el-select
                      v-model="item.carColor"
                      placeholder="非必填"
                    >
                      <el-option
                        v-for="item in carColors"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="flex mb_10 fs_14 align-items-center">
                  <div class="col-666 wd_100">车辆类型：</div>
                  <div class="col-333">
                    <el-select
                      v-model="item.carType"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="items in carTypes"
                        :key="items.id"
                        :label="items.label"
                        :value="items.label"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div> -->
                <div class="flex fs_14 align-items-center">
                  <div class="col-666 wd_100">{{$t('public.carImage')}}</div>
                  <div style="width: 100px; height: 100px" class="mr_20">
                    <face-img @img="img_car('车辆证件', $event,index)" :imgUrls='item.carCardImage' bucket="visitor-epidemic-prevention"></face-img>
                    <!-- <upload-file-pdf @img="img_car('车辆证件',$event,index)" :imgUrls='item.carCardImage'></upload-file-pdf>            -->
                  </div>
                  <div class="col-333 fs_12">{{$t('public.uploadCarImage')}}</div>
                </div>
              </div>
              <!-- <div class="flex">
                <div style="margin-right: 50px">
                  <div style="width: 100px; height: 100px" class="mb_10">
                    <face-img @img="imgs1(index, $event)" :imgUrls='visitorMain.visitorPreventEpidemics[index].resourcesOne'></face-img>
                  </div>
                  <div style="text-align: center">粤康码截图</div>
                </div>
                <div style="margin-right: 50px">
                  <div style="width: 100px; height: 100px" class="mb_10">
                    <face-img @img="imgs2(index, $event)" :imgUrls='visitorMain.visitorPreventEpidemics[index].resourcesTwo'></face-img>
                  </div>
                  <div style="text-align: center">行程卡截图</div>
                </div>
                <div style="margin-right: 50px">
                  <div style="width: 100px; height: 100px" class="mb_10">
                    <face-img @img="imgs3(index, $event)" :imgUrls='visitorMain.visitorPreventEpidemics[index].resourcesThree'></face-img>
                  </div>
                  <div style="text-align: center">核酸检测截图</div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <el-button
          class="el-icon-circle-plus-outline"
          type="text"
          @click="openDialog"
          v-if="visitorMain.visitorMainGuestVips.length != 0 && tit == 0"
        >
        {{$t('public.addVisitor')}}</el-button
        >
      </div>
      <div v-if="tit == 1">
        <div
          class="min-box"
          v-for="(item, index) in visitorMain.visitorMainGuestVips"
          :key="index"
        >
          <div class="min-box-tit">
            <div class="flex justify-content-between pl_20 pr_20 col-222">
              <div>{{$t('public.visitor')}}（{{ index + 1 }}）</div>
              <el-button
                type="text"
                style="color: #df5b4b"
                @click="deleVipBtn(index)"
                >{{$t('public.delete')}}</el-button
              >
            </div>
          </div>
          <div style="font-size: 14px; padding: 30px 20px">
            <div class="flex align-items-center">
              <div style="width:600px">
                <div class="flex mb_10">
                  <div class="col-666 wd_100">{{$t('public.guestName')}}</div>
                  <div class="col-333">
                    {{ item.guestName }}<span v-if="item.guestPhone!=''">（{{ item.guestPhone }}）</span>
                  </div>
                </div>
                <div class="flex mb_10 align-items-center">
                  <div class="col-666 wd_100">{{$t('public.faceImage')}}</div>
                  <div style="height: 100px">
                    <face-img @img="imgs4(index, $event)" :imgUrls='item.faceImage' bucket="visitor-epidemic-prevention"></face-img>
                    <!-- <face-img @img="imgs4(index, $event)" :imgUrls='item.faceImage' :imgType="'header'" bucket="visitor-epidemic-prevention"></face-img> -->
                  </div>
                  <div style="font-size:12px;color:#777" class="ml_20">{{$t('public.faceImageTips1')}}<br>{{$t('public.faceImageTips2')}}<span style="color:#ff9800">{{$t('public.faceImageTips3')}}</span>{{$t('public.faceImageTips4')}}</div>
                </div>
                <div class="flex mb_10 align-items-center">
                  <div class="col-666 fs_14 wd_100">{{$t('public.vistorCar')}}</div>
                  <div class="col-333">
                    <el-input
                      v-model="item.carNumber"
                      :placeholder="$t('public.carTips')"
                      clearable
                    ></el-input>
                  </div>
                </div>
                <!-- <div class="flex fs_14 align-items-center">
                  <div class="col-666 wd_100">车牌颜色：</div>
                  <div class="col-333">
                    <el-select
                      v-model="item.carColor"
                      placeholder="选择车牌颜色，无车不需要填写"
                    >
                      <el-option
                        v-for="item in carColors"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div> -->
              </div>
              <!-- <div class="flex">
                <div style="margin-right: 50px">
                  <div style="width: 100px; height: 100px" class="mb_10">
                    <face-img @img="imgs1(index, $event)" :imgUrls='visitorMain.visitorPreventEpidemics[index].resourcesOne'></face-img>
                  </div>
                  <div style="text-align: center">粤康码截图</div>
                </div>
                <div style="margin-right: 50px">
                  <div style="width: 100px; height: 100px" class="mb_10">
                    <face-img @img="imgs2(index, $event)" :imgUrls='visitorMain.visitorPreventEpidemics[index].resourcesTwo'></face-img>
                  </div>
                  <div style="text-align: center">行程卡截图</div>
                </div>
                <div style="margin-right: 50px">
                  <div style="width: 100px; height: 100px" class="mb_10">
                    <face-img @img="imgs3(index, $event)" :imgUrls='visitorMain.visitorPreventEpidemics[index].resourcesThree'></face-img>
                  </div>
                  <div style="text-align: center">核酸检测截图</div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <el-button
        style="margin-bottom: 10px;"
          :icon="CirclePlus"
          link
          type="primary"
          @click="openDialog"
          v-if="visitorMain.visitorMainGuestVips.length != 0 && tit == 1"
        >
        {{$t('public.addVIPVisitor')}}</el-button
        >
      </div>
      <div class="min-box">
        <div class="min-box-tit">
          <div class="pl_20 col-222">{{$t('public.approvalProcess')}}</div>
        </div>
        <div style="padding: 30px 0 30px 20px">
          <div>
            <approval @SignNodeFun="signNode" :isVIP="isVIP" />
          </div>
        </div>
      </div>
      <div class="flex mb_20">
        <el-button type="primary" @click="inviteVisitors()">{{$t('public.invite')}}</el-button>
      </div>
    </div>
    <el-dialog :title="$t('public.addVisitor')" v-model="dialogVisible" width="25%">
      <div>
        <div v-if="tit == 0">
          <!-- <div class="mb_10">仅能添加已注册公众号访客人员</div> -->
          <el-input class="mb_10" v-model="name" :placeholder="$t('public.visitorName')"></el-input>
          <el-input class="mb_10" v-model="phone" :placeholder="$t('public.visitorPhone')"></el-input>
          <el-input v-model="guestCard" :placeholder="$t('public.visitorCard')"></el-input>
        </div>
        <div v-if="tit == 1">
          <el-input
            v-model="vipName"
            :placeholder="$t('public.visitorVIPName')"
            class="mb_10"
          ></el-input>
          <el-input
            v-model="vipPhone"
            :placeholder="$t('public.visitorVIPPhone')"
          ></el-input>
        </div>
      </div>
      <template #footer>
        <span  class="dialog-footer">
          <el-button @click="dialogVisible = false">{{$t('public.cancel')}}</el-button>
          <el-button type="primary" @click="submitBtn">{{$t('public.sure')}}</el-button>
        </span>
      </template>
    </el-dialog>
    <search-company
      :searchCompanyDialog="searchCompanyDialog"
      @closeDialog="closeDialog"
    ></search-company>
    <!-- create弹窗提示 -->
    <!-- <el-dialog
      class="createDialog"
      :show-close="false"
      :visible.sync="createDialogVisible"
      width="536px">
      <div style="width:100%;height:100%;background:#fff;text-align: center;padding:55px 0">
        <div  style="color: #3B77E3;font-size: 32px;">
          <div class="createDialogP">客户 /政府官员 /紧急抢修</div>
          <div>申请通道</div>          
        </div>
        <div style="font-size: 22px;color: #222;padding: 25px 0;">(非特殊访客，请在临时访客通道申请)</div>
        <el-button type="primary" @click="createDialogVisible=false">我知道了</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script  setup name="visitorsInvite" >
import {CirclePlus} from "@element-plus/icons-vue";
import approval from "@/components/Approval/index.vue";
// import approvalProgress from "@/components/ApprovalProgress/index.vue";
import searchCompany from "@/components/SearchCompany/index.vue";
import faceImg from "@/components/FaceImg";
// import UploadFilePdf from "@/components/AddFile/UploadFilePdf.vue";
import { VIPUpload } from "@/api/india/visitors/invite.js";
import { getMainById } from "@/api/india/visitors/business.js";


import useUserStore from '@/store/modules/user';
import { getPark } from '@/utils/park';
// const name = useUserStore().name; //工号
// const nickName = useUserStore().nickName; //姓名
const park = getPark() // 默认当前园区
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const { sys_guest_reason } = proxy.useDict("sys_guest_reason");
const { sys_vipguest_reason } = proxy.useDict("sys_vipguest_reason");

const details = ref([]);
const dialogVisible = ref(false);
const searchCompanyDialog = ref(false);
const phone = ref(""); //手机号
const name = ref(""); //姓名
const guestCard = ref(""); //证件号
const visitorMain = ref({
  remarks:'',
  enterStartDate: "", //入厂时间
  enterEndDate: "", //出厂时间
  receptionistName: useUserStore().nickName, //拜访人姓名
  receptionistEmployeeNo: useUserStore().name, //拜访人工号
  receptionistTel: useUserStore().phone, //拜访人电话
  enterFactoryReason: "", //入厂事由
  companyName: "", //公司名称
  companyId: "", //公司id
  guardGuestInfoId: "", //申请人id
  visitorMainGuestVips: [],
  typeId: "1", //表单类型;（1web端 2微信端）
  vipType: "", //是否为vip访客; 2 vip访客 3受邀访客 4受邀访客（印度修改
  guardTemplate: {}, //签核流程）
  visitorPreventEpidemics: [
    // {
    //   resourcesOne:'',
    //   resourcesTwo:'',
    //   resourcesThree:''
    // }
  ],
});
const tit = ref(""); 
const visitorInfo = ref([]); 
const companyId = ref("");
const vipPhone = ref("");
const vipName = ref("");
// const isVIP = ref("");
const isVIP = ref("");


const createDialogVisible = ref(false);

const img_car = (type,value,index) => {
  if(type=='车辆证件'){
    return visitorMain.value.visitorMainGuestVips[index].carCardImage=value
  }
};
const deleVipBtn = (index) => {
  visitorMain.value.visitorMainGuestVips.splice(index, 1);
  visitorMain.value.visitorPreventEpidemics.splice(index, 1);
};
const deleBtn = (index) => {
  visitorMain.value.visitorMainGuestVips.splice(index, 1);
  visitorMain.value.visitorPreventEpidemics.splice(index, 1);
};
const imgs4 = (index, value) => {
  visitorMain.value.visitorMainGuestVips[index].faceImage = value;
};
const closeDialog = (val) => {
  searchCompanyDialog.value = false;
  if (!proxy.isNull(val)) {
    visitorMain.value.companyName = val.companyName;
    visitorMain.value.companyId = val.id;
  }
};
const openDialog = (val) => {
  vipPhone.value = "";
  vipName.value = "";
  phone.value = "";
  name.value = "";
  guestCard.value = "";
  dialogVisible.value = true;
};
const getList = (val) => {
  getMainById(val).then(response => {
    visitorMain.value.enterFactoryReason = response.data.enterFactoryReason
    visitorMain.value.enterStartDate = response.data.enterStartDate
    visitorMain.value.enterEndDate = response.data.enterEndDate
    visitorMain.value.remarks = response.data.remarks
    visitorMain.value.companyName = response.data.companyName
    visitorMain.value.companyId = response.data.companyId
    if (tit.value == '0') {
      visitorMain.value.visitorMainGuestVips = response.data.visitorGuestResults
      visitorMain.value.vipType = 4
      for (let index in response.data.visitorGuestResults) {
        visitorMain.value.visitorMainGuestVips[index].id = ''
        visitorMain.value.visitorMainGuestVips[index].guestName = response.data.visitorGuestResults[index].name
        visitorMain.value.visitorMainGuestVips[index].guestPhone = response.data.visitorGuestResults[index].phone
        visitorMain.value.visitorMainGuestVips[index].guestCard = response.data.visitorGuestResults[index].guestCard
        visitorMain.value.visitorMainGuestVips[index].carNumber = response.data.visitorGuestResults[index].carNumber
        visitorMain.value.visitorMainGuestVips[index].carCardImage = response.data.visitorGuestResults[index].inCarCardImage
        if (visitorMain.value.visitorMainGuestVips[index].carColor) {
          visitorMain.value.visitorMainGuestVips[index].carColor = Number(response.data.visitorGuestResults[index].carColor)

        }
      }
    }
    if (tit.value == '1') {
      visitorMain.value.vipType = 2
      visitorMain.value.visitorMainGuestVips = response.data.visitorGuestResults
      for (let index in response.data.visitorGuestResults) {
        visitorMain.value.visitorMainGuestVips[index].id = ''
        visitorMain.value.visitorMainGuestVips[index].guestName = response.data.visitorGuestResults[index].name
        visitorMain.value.visitorMainGuestVips[index].guestPhone = response.data.visitorGuestResults[index].phone
        visitorMain.value.visitorMainGuestVips[index].guestCard = response.data.visitorGuestResults[index].guestCard
        visitorMain.value.visitorMainGuestVips[index].carNumber = response.data.visitorGuestResults[index].carNumber
        if (visitorMain.value.visitorMainGuestVips[index].carColor) {
          visitorMain.value.visitorMainGuestVips[index].carColor = Number(response.data.visitorGuestResults[index].carColor)

        }
        visitorMain.value.visitorMainGuestVips[index].faceImage = response.data.visitorGuestResults[index].facePath
      }
    }
  })
};
const submitBtn = () => {
  if (tit.value == 0) {
    if (proxy.isNull(phone.value)) {
      return proxy.$message.error(proxy.$t('public.phoneRemind'));
    }
    if (proxy.isNull(name.value)) {
      return proxy.$message.error(proxy.$t('public.nameRemind'));
    }
    if (proxy.isNull(guestCard.value)) {
      return proxy.$message.error(proxy.$t('public.guestCardRemind'));
    }
    // 印度手机号可能和中国的不一样，暂时去除验证
    // if(IsPhone(this.phone)){
    //   return proxy.$message.error(proxy.$t('public.phoneFormat'));
    // }
    // if(isIdCard(this.guestCard)){
    //   return proxy.$message.error('证件号格式有误');
    // }

    visitorMain.value.visitorMainGuestVips.push({
      carNumber: "",
      carColor: "",
      guestName: name.value,
      guestPhone: phone.value,
      guestCard: guestCard.value,
      carType: '',
      carCardImage: ''
    });
    dialogVisible.value = false;

    // guardGuestInfoList(this.phone).then((Response) => {
    //   if (Response.data.length != 0) {
    //     for (let item of visitorMain.value.visitorMainGuestVips) {
    //       // console.log(item)
    //       if (this.phone == item.guestPhone) {
    //         return proxy.$message({
    //           message: "此人员已添加",
    //           type: "warning",
    //         });
    //       }
    //     }
    //     visitorMain.value.visitorMainGuestVips.push({
    //       carNumber: "",
    //       carColor: "",
    //       guardGuestInfoId: Response.data[0].id,
    //       guestName: Response.data[0].name,
    //       guestPhone: Response.data[0].phone,
    //       carType:'',
    //       carCardImage:''
    //     });

    //     visitorMain.value.visitorPreventEpidemics.push({
    //       resourcesOne: "",
    //       resourcesTwo: "",
    //       resourcesThree: "",
    //     });
    //     this.dialogVisible = false;
    //     return;
    //   }
    //   if (Response.data.length == 0) {
    //     this.$confirm(
    //       "未注册访客请联系TA在公众号注册访客后再提单, 是否继续?",
    //       "添加失败",
    //       {
    //         confirmButtonText: "知道了",
    //         cancelButtonText: proxy.$t('public.cancel'),
    //       }
    //     );
    //   } else {
    //     personnelInfoList(this.phone).then((Response) => {
    //       if (Response.rows.length != 0) {
    //         this.$confirm(
    //           "已注册员工/厂商不能再申请访客入厂，请知悉",
    //           "添加失败",
    //           {
    //             confirmButtonText: "知道了",
    //             cancelButtonText: proxy.$t('public.cancel'),
    //           }
    //         );
    //       }
    //     });
    //   }
    // });
  }
  if (tit.value == 1) {
    visitorMain.value.visitorMainGuestVips.push({
      carNumber: "",
      carColor: "",
      faceImage: "",
      guestName: vipName.value,
      guestPhone: vipPhone.value,
    });
    visitorMain.value.visitorPreventEpidemics.push({
      resourcesOne: "",
      resourcesTwo: "",
      resourcesThree: "",
    });
    dialogVisible.value = false;
  }
};
//获取签核节点
const signNode = (val) => {
  visitorMain.value.guardTemplate = val.examineData;
}
//邀请访客
const inviteVisitors = () => {
  console.log('visitorMain.remarks',visitorMain.value.remarks);
  if (tit.value == 0 && (visitorMain.value.enterFactoryReason == undefined || visitorMain.value.enterFactoryReason == null || visitorMain.value.enterFactoryReason == '')) {
    return proxy.$message.error(proxy.$t('public.enterReasonRemind'));
  }
  if (visitorMain.value.enterStartDate == undefined || visitorMain.value.enterStartDate == null || visitorMain.value.enterStartDate == '') {
    return proxy.$message.error(proxy.$t('public.enterStartDateRemind'));
  }
  if (visitorMain.value.enterEndDate == undefined || visitorMain.value.enterEndDate == null || visitorMain.value.enterEndDate == '') {
    return proxy.$message.error(proxy.$t('public.enterEndDateRemind'));
  }
  if (tit.value == 0 && (visitorMain.value.companyName == undefined || visitorMain.value.companyName == null || visitorMain.value.companyName == '')) {
    return proxy.$message.error(proxy.$t('public.companyNameRemind'));
  }
  if (tit.value == 0 && visitorMain.value.visitorMainGuestVips.length == 0) {
    return proxy.$message.error(proxy.$t('public.addVisitorRemind'));
  }
  if (tit.value == 1 && visitorMain.value.visitorMainGuestVips.length == 0) {
    return proxy.$message.error(proxy.$t('public.addVIPVisitorRemind'));
  }
  if (tit.value == 0) {
    for (let k = 0; k < visitorMain.value.visitorMainGuestVips.length; k++) {
      if (visitorMain.value.visitorMainGuestVips[k].faceImage == undefined || visitorMain.value.visitorMainGuestVips[k].faceImage == null || visitorMain.value.visitorMainGuestVips[k].faceImage == '') {
        return proxy.$message.error(proxy.$t('public.faceImageVisitorRemind'));
      }
    }
    for (let k = 0; k < visitorMain.value.visitorMainGuestVips.length; k++) {
      // if (visitorMain.value.visitorMainGuestVips[k].carNumber) {
      //   console.log('111',visitorMain.value.visitorMainGuestVips[k].carNumber);
      //   // return proxy.$message.error(proxy.$t('public.carNumberRemind'));
      // }
      if (visitorMain.value.visitorMainGuestVips[k].carNumber && !visitorMain.value.visitorMainGuestVips[k].carCardImage) {
        console.log('222',visitorMain.value.visitorMainGuestVips[k].carNumber);
        return proxy.$message.error(proxy.$t('public.carImageRemind'));
      }
      if (!visitorMain.value.visitorMainGuestVips[k].carNumber && visitorMain.value.visitorMainGuestVips[k].carCardImage) {
        console.log('111',visitorMain.value.visitorMainGuestVips[k].carNumber);
        // return proxy.$message.error(proxy.$t('public.carNumberRemind'));
      }
    }
  }
  // for(let k = 0;k<visitorMain.value.visitorPreventEpidemics.length;k++){

  //   if(visitorMain.value.visitorPreventEpidemics[k].resourcesOne==undefined||visitorMain.value.visitorPreventEpidemics[k].resourcesOne==null||visitorMain.value.visitorPreventEpidemics[k].resourcesOne==''){
  //     return proxy.$message.error('请上传粤康码截图');
  //   }
  //   if(visitorMain.value.visitorPreventEpidemics[k].resourcesTwo==undefined||visitorMain.value.visitorPreventEpidemics[k].resourcesTwo==null||visitorMain.value.visitorPreventEpidemics[k].resourcesTwo==''){
  //     return proxy.$message.error('请上传行程卡截图');
  //   } 
  //   if(visitorMain.value.visitorPreventEpidemics[k].resourcesThree==undefined||visitorMain.value.visitorPreventEpidemics[k].resourcesThree==null||visitorMain.value.visitorPreventEpidemics[k].resourcesThree==''){
  //     return proxy.$message.error('请上传核酸检测截图');
  //   }                
  // } 

  for (let item of visitorMain.value.guardTemplate.guardProcesses) {
    if (proxy.isNull(item.examineEmployeeno)) {
      return proxy.$message.error(item.examineTypeText + proxy.$t('public.workNumberRemind'));
    }
    if (proxy.isNull(item.examineName)) {
      return proxy.$message.error(item.examineTypeText + proxy.$t('public.nameRemind'));
    }
    if (item.isEmail == '0' && proxy.isNull(item.examineEmail)) {
      return proxy.$message.error(item.examineTypeText + proxy.$t('public.emailRemind'));
    }
    for (let items of item.subProcess) {
      if (proxy.isNull(items.examineEmployeeno)) {
        return proxy.$message.error(items.examineTypeText + proxy.$t('public.workNumberRemind'));
      }
      if (proxy.isNull(items.examineName)) {
        return proxy.$message.error(items.examineTypeText + proxy.$t('public.nameRemind'));
      }
      if (items.isEmail == '0' && proxy.isNull(items.examineEmail)) {
        return proxy.$message.error(items.examineTypeText + proxy.$t('public.emailRemind'));
      }
    }
  }
  if (tit.value == 0) {
    visitorMain.value.vipType = 4;
  }
  if (tit.value == 1) {
    visitorMain.value.vipType = 2;
    visitorMain.value.guardGuestInfoId = "2";
  }
  VIPUpload(JSON.stringify(visitorMain.value)).then((Response) => {
    let id = "";
    id = Response.data.business_key;
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
  });
}
const searchCompanyDialogBtn = () =>{
  searchCompanyDialog.value = true;
  console.log('searchCompanyDialog.value',searchCompanyDialog.value);
}

const getroute = () => {
  
  console.log('tit.value',tit.value);
  if (route.path.indexOf('/indiayqfk/visitors/invite') != -1) {
    console.log('11111');
    tit.value = '0';
    isVIP.value = '1';
  }
  if (route.path.indexOf('/indiayqfk/visitorsVip/invite') != -1) {
    console.log('22222');
    tit.value = '1';
    isVIP.value = '2';
  }
  
  if (route.query.id) {
    getList(route.query.id);
  }
}
onBeforeMount(() => {
  getroute();
})

// watch(
//   () => route.query.id,
//   (newVal, oldVal) => {
//     if (newVal && oldVal == undefined) {
//       getList(newVal);
//     }
//   },
//   () => route.query.tit,
//   (newVal, oldVal) => {
//     console.log('route.query.tit',route.query.tit);
//     tit.value = route.query.tit
//     if (tit.value == 0) { isVIP.value = '1' }
//     if (tit.value == 1) { isVIP.value = '2' }
//   },
// ) 


</script>


<style lang="scss" scoped>
.app-container {
  .min-box {
    margin-bottom: 20px;
    border: 1px solid #d7d7d7;
    border-radius: 4px;

    .min-box-tit {
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #d7d7d7;
      background: #f0f0f0;
      color: #222222;
    }
  }
}
.col-333 {
  color: #333;
}
.col-222 {
  color: #222;
}
.col-666 {
  color: #666;
}
::v-deep.createDialog .el-dialog{
  background: rgba($color: #ffffff00, $alpha: 0);
  border-radius: 10px;
}
::v-deep.createDialog .el-dialog__header{
  height: 0;
}
::v-deep.createDialog .el-dialog__body{
  width: 536px;
  height: 352px; 
  padding: 20px;
  background-image: url('../../../assets/img/tishibeijing.png');
}
.createDialogP::before,.createDialogP::after{
  content: url(../../../assets/img/xing.png);
  position: relative;
  bottom: 5px;
  margin: 0 8px;
  
}
</style>
