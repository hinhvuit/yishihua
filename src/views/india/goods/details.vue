<template>
  <div class="app-container">
      <div class="min-box">
        <div class="min-box-tit flex justify-content-between pl_20 pr_20" >
          <div class=" col-222">{{$t('public.applyInformation')}}<span style="color:#D7D7D7">（{{$t('public.documentNumber')}}{{goodsInfo.formNumber}}）</span></div>
          <div>{{$t('public.applyTime')}}{{goodsInfo.createTime}}</div>
        </div>
        <div style="font-size: 14px; padding:30px 20px">
            <el-row :gutter="20" class="mb_10">
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.applicant')}}</div>
                        <div class="col-333">{{goodsInfo.applyName}}（{{goodsInfo.applyNo}}）</div>
                    </div>                                                           
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.phoneNumber')}}</div>
                        <div class="col-333">{{goodsInfo.tel}}</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.landline')}}</div>
                        <div class="col-333">{{goodsInfo.landline}}</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.email')}}</div>
                        <div class="col-333">{{goodsInfo.mail}}</div>
                    </div>
                </el-col>                                
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.businessGroup')}}</div>
                        <div class="col-333">{{goodsInfo.businessGroup}}</div>
                    </div>                                                      
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.department')}}</div>
                        <div class="col-333">{{goodsInfo.businessDivision}}</div>
                    </div>                                                      
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.businessDivision')}}</div>
                        <div class="col-333">{{goodsInfo.unit}}</div>
                    </div>                                                      
                </el-col>                                
            </el-row>            
        </div>
      </div>
      <div class="min-box">
        <div class="min-box-tit flex justify-content-between pl_20 pr_20" >
          <div class=" col-222">{{$t('public.applyType')}}</div>
        </div>
        <div style="font-size: 14px; padding:30px 20px">
            <el-row :gutter="10" class="mb_10">
                <el-col :span="24">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.chooseType')}}</div>
                        <div class="col-333 wd_200"><dict-tag :options="goods_type" :value="goodsInfo.formType"/></div>
                    </div>                                                           
                </el-col>                                               
            </el-row>
            <el-row :gutter="20" v-if="goodsInfo.formType=='4'">
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.projectName')}}</div>
                        <div class="col-333">{{goodsInfo.projectName}}</div>
                    </div>                                                      
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.contractor')}}</div>
                        <div class="col-333">{{goodsInfo.contractor}}</div>
                    </div>                                                      
                </el-col>                               
            </el-row>            
        </div>
      </div>
      <div class="min-box" v-for="(item,index) in goodsInfo.goods" :key="index+'a'">
        <div class="min-box-tit flex justify-content-between pl_20 pr_20" >
          <div class=" col-222">{{$t('public.materialInformation')}}（{{index+1}}）</div>
        </div>
        <div style="font-size: 14px; padding:30px 20px">
            <el-row :gutter="20" >
                <el-col :span="18">
                    <el-row :gutter="10" class="mb_10">
                <el-col :span="8">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.classification')}}</div>
                        <div class="col-333 wd_200">{{item.goodsSort}}</div>
                    </div>                                                           
                </el-col>  
                <el-col :span="8">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.ownership')}}</div>
                        <div class="col-333 wd_200"><dict-tag :options="goods_belong_to" :value="item.goodsAscription"/></div>
                        <!-- <div class="col-333 wd_200">{{item.goodsAscription}}</div> -->
                    </div>                                                           
                </el-col> 
                <el-col :span="8">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.partNumber')}}</div>
                        <div class="col-333 wd_200">{{item.goodsName}}</div>
                    </div>                                                           
                </el-col>                                                                              
                    </el-row>
                    <el-row :gutter="10" class="mb_10">
                <el-col :span="8">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.brand')}}</div>
                        <div class="col-333 wd_200">{{item.goodsBrand}}</div>
                    </div>                                                           
                </el-col>  
                <el-col :span="8">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.unit')}}</div>
                        <div class="col-333 wd_200">{{item.goodsUnit}}</div>
                    </div>                                                           
                </el-col> 
                <el-col :span="8">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.quantity')}}</div>
                        <div class="col-333 wd_200">{{item.goodsNum}}</div>
                    </div>                                                           
                </el-col>                                                                              
                    </el-row>  
                    <el-row :gutter="10" class="mb_10">
                <el-col :span="24">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.remark')}}</div>
                        <div class="col-333 wd_200">{{item.goodsRemarks}}</div>
                    </div>                                                           
                </el-col>                                                                              
                    </el-row>                       
                </el-col>
                <el-col :span="6">
                    <div class="flex flex-column align-items-center">
                        <el-image
                          style="width: 100px; height: 100px;border-radius: 6px;border: 1px dashed #d9d9d9;"
                          :src="item.goodsImage[0].inImageUrl"
                          :preview-src-list="[item.goodsImage[0].inImageUrl]"
                          fit="cover">
                        </el-image>
                        <div class="mt_10">{{$t('public.goodsIamge')}}</div>
                    </div>
 
                </el-col>
            </el-row>
                   
        </div>
      </div>   
      <div class="min-box">
        <div class="min-box-tit pl_20 pr_20" >
          <div class=" col-222">{{$t('public.flow')}}</div>
        </div>
        <div style="font-size: 14px; padding:30px 20px">
            <el-row :gutter="20" class="mb_10">
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.flowOut')}}</div>
                        <div class="col-333"><dict-tag :options="goods_flow" :value="goodsInfo.goodsFlow"/></div>
                    </div>                                                           
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.address')}}</div>
                        <div class="col-333">{{goodsInfo.goodsFlowAddress}}</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.releaseDoors')}}</div>
                        <!-- <div class="col-333">{{ changeGate(goodsInfo.releaseDoor) }}</div> -->
                        <div class="col-333">{{ goodsInfo.releaseDoor }}</div>
                    </div>
                </el-col>                              
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.releaseEndTime')}}</div>
                        <div class="col-333">{{goodsInfo.releaseEndTime}}</div>
                    </div>                                                      
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.return')}}</div>
                        <div class="col-333">{{goodsInfo.returnYesNo}}</div>
                    </div>                                                      
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.returnTime')}}</div>
                        <div class="col-333" v-if="goodsInfo.returnYesNo!=$t('public.no')">{{goodsInfo.returnTime}}</div>
                        <div class="col-333" v-else>{{$t('public.thereIsNo')}}</div>
                    </div>                                                      
                </el-col>                                
            </el-row>            
        </div>
      </div>  
      <div class="min-box">
        <div class="min-box-tit pl_20 pr_20" >
          <div class=" col-222">{{$t('public.carryInfomation')}}</div>
        </div>
        <div style="font-size: 14px; padding:30px 20px">
            <el-row :gutter="20" class="mb_10">
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.name')}}</div>
                        <div class="col-333">{{goodsInfo.takeName}}</div>
                    </div>                                                           
                </el-col>
                <!-- <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.gender')}}</div>
                        <div class="col-333">{{goodsInfo.takeGender}}</div>
                    </div>
                </el-col> -->
                <!-- <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.cardType')}}</div>
                        <div class="col-333"><dict-tag :options="sys_identity_type" :value="goodsInfo.takeCardType"/></div>
                    </div>
                </el-col>                               -->
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.IdCard')}}</div>
                        <div class="col-333">{{butyNum(goodsInfo.takeCard,btnShown)}}</div>
                    </div>                                                      
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.phoneNumber')}}</div>
                        <div class="col-333">{{goodsInfo.takePhone}}</div>
                    </div>                                                      
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.car')}}</div>
                        <div class="col-333 flex" v-if="goodsInfo.carNumber"><dict-tag :options="car_number_color" :value="goodsInfo.carNumberColor"/>{{goodsInfo.carNumber}}</div>
                        <div class="col-333 flex" v-else>{{$t('public.thereIsNo')}}</div>
                    </div>                                                      
                </el-col>                                
            </el-row>            
        </div>
      </div>
      <div class="min-box">
        <div class="min-box-tit pl_20 pr_20" >
          <div class=" col-222">{{$t('public.receiverInformation')}}</div>
        </div>
        <div style="font-size: 14px; padding:30px 20px">
            <el-row :gutter="20" class="mb_10">
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.name')}}</div>
                        <div class="col-333">{{goodsInfo.receiverName}}</div>
                    </div>                                                           
                </el-col>
                <!-- <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.gender')}}</div>
                        <div class="col-333">{{goodsInfo.receiverGender}}</div>
                    </div>
                </el-col> -->
                <!-- <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.cardType')}}</div>
                        <div class="col-333"><dict-tag :options="sys_identity_type" :value="goodsInfo.receiverCardType"/></div>
                    </div>
                </el-col>                               -->
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.IdCard')}}</div>
                        <div class="col-333">{{butyNum(goodsInfo.receiverCard,btnShown)}}</div>
                    </div>                                                      
                </el-col>
                <el-col :span="6">
                    <div class="flex align-items-center">
                        <div class="wd_100 col-666">{{$t('public.phoneNumber')}}</div>
                        <div class="col-333">{{goodsInfo.receiverPhone}}</div>
                    </div>                                                      
                </el-col>
            </el-row>            
        </div>
      </div>
      <!-- <div v-for="(item,index) in signNode" :key="index+'b'">
        <div class="min-box" v-if="item.signType=='6'&& item.employeeno==name&&item.signStatus=='1'">
          <div class="min-box-tit pl_20 pr_20 flex justify-content-between" >
            <div class=" col-222">资安查验照片</div>
          </div>
          <div style="font-size: 14px; padding:30px 20px" class="flex align-items-center">
              <div class="wd_100 col-666">上传照片：</div> 
                <div><add-file :fileInfo="zianImages" @zianImgs='zianImgs'></add-file></div>   
          </div>
        </div>  
      </div>
      <div v-if="goodsInfo.discussImage!=undefined&&goodsInfo.discussImage.length!=0">
        <div class="min-box">
          <div class="min-box-tit pl_20 pr_20 flex justify-content-between" >
            <div class=" col-222">资安查验照片</div>
          </div>
          <div style="font-size: 14px; padding:30px 20px" class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.checkImage')}}</div> 
              <div class="flex" v-for="(item,index) in goodsInfo.discussImage" :key="index+'c'">
                    <div style="margin-right:20px">
                        <el-image
                          style="width: 100px; height: 100px;border-radius: 6px;border: 1px dashed #d9d9d9;"
                          :src="item.inImageUrl"
                          :preview-src-list="[item.inImageUrl]"
                          fit="cover">
                        </el-image>                            
                    </div>                                              
              </div> 
                   
          </div>
        </div>  
      </div> -->

      <div v-if="goodsInfo.examineImage!=undefined&&goodsInfo.examineImage.length!=0">
        <div class="min-box">
          <div class="min-box-tit pl_20 pr_20 flex justify-content-between" >
            <div class=" col-222">{{$t('public.doorCheckImage')}}</div>
          </div>
          <div style="font-size: 14px; padding:30px 20px">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="flex align-items-center">
                            <div class="wd_100 col-666">{{$t('public.checker')}}</div>
                            <div class="col-333">{{goodsInfo.checkName}}（{{goodsInfo.checkNo}}）</div>
                        </div>                                                      
                    </el-col>
                    <el-col :span="6">
                        <div class="flex align-items-center">
                            <div class="wd_100 col-666">{{$t('public.checkTime')}}</div>
                            <div class="col-333">{{goodsInfo.checkTime}}</div>
                        </div>                                                      
                    </el-col>
                    <el-col :span="6">
                        <div class="flex align-items-center">
                            <div class="wd_100 col-666">{{$t('public.checkStatus')}}</div>
                            <div class="col-333"><dict-tag :options="goods_status" :value="goodsInfo.formStatus"/> </div>
                        </div>                                                      
                    </el-col>                    
                    <el-col :span="6">
                        <div class="flex align-items-center">
                            <div class="wd_100 col-666">{{$t('public.checkDetails')}}</div>
                            <div class="col-333">{{goodsInfo.checkReason}}</div>
                        </div>                                                      
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                    <div  class="flex align-items-center pt_10">
                        <div class="wd_100 col-666">{{$t('public.checkImage')}}</div> 
                        <div class="flex" v-for="(item,index) in goodsInfo.examineImage" :key="index+'d'">
                            <div style="margin-right:20px">
                                <el-image
                                  style="width: 100px; height: 100px;border-radius: 6px;border: 1px dashed #d9d9d9;"
                                  :src="item.inImageUrl"
                                  :preview-src-list="[item.inImageUrl]"
                                  fit="cover">
                                </el-image>                            
                            </div>                                              
                        </div> 
                    </div>
                    </el-col>

                </el-row>
                   
          </div>
        </div>  
      </div>
      <div v-if="goodsInfo.goodSecurity!=undefined&&goodsInfo.goodSecurity!=''&&goodsInfo.goodSecurity!=null">
        <div class="min-box">
          <div class="min-box-tit pl_20 pr_20 flex justify-content-between" >
            <div class=" col-222">安管查验照片</div>
          </div>
          <div style="font-size: 14px; padding:30px 20px">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="flex align-items-center">
                            <div class="wd_100 col-666">{{$t('public.checker')}}</div>
                            <div class="col-333">{{goodsInfo.goodSecurity.name}}（{{goodsInfo.goodSecurity.no}}）</div>
                        </div>                                                      
                    </el-col>
                    <el-col :span="6">
                        <div class="flex align-items-center">
                            <div class="wd_100 col-666">{{$t('public.checkTime')}}</div>
                            <div class="col-333">{{goodsInfo.goodSecurity.createTime}}</div>
                        </div>                                                      
                    </el-col>
                    <el-col :span="6">
                        <div class="flex align-items-center">
                            <div class="wd_100 col-666">{{$t('public.checkStatus')}}</div>
                            <div class="col-333"><dict-tag :options="goods_status" :value="goodsInfo.formStatus"/> </div>
                        </div>                                                      
                    </el-col>                      
                    <el-col :span="6">
                        <div class="flex align-items-center">
                            <div class="wd_100 col-666">{{$t('public.checkDetails')}}</div>
                            <div class="col-333">{{goodsInfo.goodSecurity.reason}}</div>
                        </div>                                                      
                    </el-col>
                </el-row>
                <el-row>
                    <div  class="flex align-items-center pt_10">
                        <div class="wd_100 col-666">{{$t('public.checkImage')}}</div> 
                        <div class="flex" v-for="(item,index) in goodsInfo.examineSecurityImage" :key="index">
                            <div style="margin-right:20px">
                                <el-image
                                  style="width: 100px; height: 100px;border-radius: 6px;border: 1px dashed #d9d9d9;"
                                  :src="item.inImageUrl"
                                  :preview-src-list="[item.inImageUrl]"
                                  fit="cover">
                                </el-image>                            
                            </div>                                              
                        </div> 
                    </div>
                </el-row>
                   
          </div>
        </div>  
      </div>
      <div class="min-box">
        <div class="min-box-tit pl_20 pr_20" >
          <div class=" col-222">{{$t('public.approvalProcess')}}</div>
        </div>
        <div style="font-size: 14px; padding:30px 20px">
            <el-row :gutter="20" class="mb_10">
                <el-col :span="24">    
                  <div>
                    <approval-progress @getSignNode='getSignNode' :businessKey='route.params.id' ref="approvalProgressRef"></approval-progress>
                  </div>                                                                          
                </el-col>                                        
            </el-row>            
        </div>
      </div>
      <div>
          <approval-btn @getBtnShow='getBtnShown' @upDataSignNode='upDataSignNode' :node='node' :zianImages='zianImages' :businessKey='route.params.id' :businessType='"goods_business"'></approval-btn>
      </div>   
      <div v-if="goodsInfo.formStatus=='0'">
          <el-button type="primary" @click="QrBtn(goodsInfo.id,goodsInfo.formNumber)">{{$t('public.showCheckCode')}}</el-button>
      </div>
      <div>
        <el-button type="primary" v-if="name==signNodes&&(goodsInfo.formStatus==2)" @click="againSubmit()">{{$t('public.againSubmit')}}</el-button>
      </div> 
      <el-dialog
        :title="$t('public.materialRelease')"
        v-model="dialogVisible"
        width="500px"
        :before-close="handleClose">
        <div>
            <div class="flex justify-content-center text-center" >
                <div ref="qrCodeUrl" class="mb_20" style="pointer-events:none"></div>
            </div>
            <div class="flex justify-content-center">
                <div >{{$t('public.documentNumber')}}</div>
                <div>{{goodsInfo.formNumber}}</div>
            </div>        
        </div>
      </el-dialog>                                              
  </div>
</template>

<script  setup name="goodsDetails" >
import QRCode from "qrcodejs2-fix";
import {detail,savePicture,gateList} from '../../../api/india/goods/goods'
import approvalProgress from "../../../components/ApprovalProgress/index.vue";
// import AddFile from "../../../components/AddFile/AddFile.vue";
import useUserStore from '@/store/modules/user';
import { getCurrentInstance, nextTick, onMounted } from 'vue';
import { getPark } from '@/utils/park';
// 获取页面的实例对象
const qrCodeUrl = ref(null);
const approvalProgressRef = ref(null);
const name = useUserStore().name; //工号
const park = getPark() // 默认当前园区
const doorArr = ref([]);

const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const { goods_type } = proxy.useDict("goods_type");
const { goods_flow } = proxy.useDict("goods_flow");
const { goods_flow_address } = proxy.useDict("goods_flow_address");
const { car_number_color } = proxy.useDict("car_number_color");
const { goods_status } = proxy.useDict("goods_status");
const { goods_belong_to } = proxy.useDict("goods_belong_to");

const id = ref('');
// const id = computed(() => { return route.params.id })
const goodsInfo = ref({});
const signNode = ref({});
const zianImages = ref([]);
const node = ref('');
const dialogVisible = ref(false);
const signNodes = ref('');
const btnShown = ref(false);


const getBtnShown = (val) => {
  btnShown.value = val;
};
const againSubmit = () => {
  console.log('id.value',id.value);
  
  router.push({path:'/indiawpfx/goods/apply',query: { id:id.value }})
};
const handleClose = () => {
  dialogVisible.value = false;
  getGoodsInfo(id.value);
};

const QrBtn = (id,key) => {
    
    dialogVisible.value = true;
    let QRval ={"id":id,"url":"https://fssafe.foxconn.com/Home/GuardReleaseDetails","key":key}
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
const getSignNode = (val) => {
  signNode.value = val
  
  signNode.value.map((item, index) => {
    signNodes.value = val[0].employeeno

    
    if (item.signTypeRemark == '资安核准人' && item.signStatus == '1' && name.value == item.employeeno) {
      node.value = 'zian'
    }
  })
};
//更新节点
const upDataSignNode = () => {
  signNode.value.map((item, index) => {
    if (item.signTypeRemark == '资安核准人' && item.signStatus == '1') {
      getZianImg(item, index)
    }
  })
  nextTick(()=>{
    approvalProgressRef.value.getSignProcessList(goodsInfo.value.formNumber)
  })
  getGoodsInfo(id.value)
};
//资安审核图片
const zianImgs = (value) => {
  zianImages.value = value.map((item) => {
    return {
      imageUrl: item.showUrl,
    };
  });   
};
const getGoodsInfo = (id) => {
    // console.log('id',id);
  detail(id).then(Response=>{
   goodsInfo.value = Response.data
  })
};
const getZianImg = () => {
  let data = {
    goodsAndFormId: goodsInfo.value.id,
    goodsImage: zianImages.value
  }
  savePicture(JSON.stringify(data)).then(response => {
    if (response.code != 200) {
      return
    }
    getGoodsInfo(route.params.id)
  })
};

const getGateList = () => {
  gateList(park.value).then(Response => {
    doorArr.value = Response.data
  })
};
getGateList();
const changeGate = (val) => {
  if (doorArr.value.length == 0 || !val) {
    return  
  } 
  let doorInfo = doorArr.value.find(item => item.id == val)
  return doorInfo.gateName
}
onMounted(() => {
  id.value = route.params.id;
  getGoodsInfo(id.value);
});

// watch(
//   () => route.params.id,
//   (newVal, oldVal) => {
//     id.value = newVal;
//     if (newVal && oldVal == undefined) {
//       getGoodsInfo(newVal);
//     }
//   },
// //   () => id.value,
// //   (newVal, oldVal) => {
// //     console.log('id',newVal);
// //     // id.value = newVal;
// //     if (newVal) {
// //       getGoodsInfo(newVal);
// //     }
// //   },
//   { immediate: true }
// );


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
</style>