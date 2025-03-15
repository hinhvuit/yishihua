<template>
  <div class="app-container">
    <div class="min-box">
      <div class="min-box-tit">
        <div class="pl_20 col-222">{{$t('public.applyInformation')}}</div>
      </div>
      <div style="font-size: 14px; padding: 30px 20px">
        <el-row :gutter="20" class="mb_10">
          <el-col :span="6">
            <div class="flex align-items-center">
              <!-- <div class="wd_100 col-666">aaaaaaaaaaaaaaaa</div> -->
              <div class="wd_100 col-666">{{$t('public.applicant')}}</div>
              <div style="height: 36px; line-height: 36px">
                {{ nickName }}（{{ name }}）
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.phoneNumber')}}</div>
              <div>
                <el-input
                  style="width: 214px"
                  v-model="goodsInfo.tel"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>                
              <!-- <div style="height: 36px; line-height: 36px">{{ tel }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.landline')}}</div>
              <div>
                <el-input
                  style="width: 214px"
                  v-model="goodsInfo.landline"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.email')}}</div>
              <div>
                <el-input
                  style="width: 214px"
                  v-model="goodsInfo.mail"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.businessGroup')}}</div>
              <div style="height: 36px; line-height: 36px">
                {{goodsInfo.businessGroup}}
              </div>
            </div>
          </el-col> -->
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.department')}}</div>
              <div>
                <el-input
                  style="width: 214px"
                  v-model="goodsInfo.businessDivision"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>              
              <!-- <div style="height: 36px; line-height: 36px">
                {{goodsInfo.businessDivision}}
              </div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.businessDivision')}}</div>
              <div>
                <el-input
                  style="width: 214px"
                  v-model="goodsInfo.unit"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="min-box">
      <div class="min-box-tit">
        <div class="pl_20 col-222">{{$t('public.applyType')}}</div>
      </div>
      <div style="font-size: 14px; padding: 30px 20px">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.chooseType')}}</div>
              <div class="mr_20">
                <el-select v-model="goodsInfo.formType" :placeholder="$t('public.choose')">
                  <el-option
                    v-for="item in goods_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div class="col-666 fs_12">
                {{$t('public.doorTips')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="goodsInfo.formType == '4'" class="mt_10">
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.projectName')}}</div>
              <div>
                <el-input
                  style="width: 214px" 
                  v-model="goodsInfo.projectName"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.contractor')}}</div>
              <div>
                <el-input
                  style="width: 214px" 
                  v-model="goodsInfo.contractor"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-for="(item, index) in goodsInfo.goodsParams" :key="index">
      <div class="min-box">
        <div class="min-box-tit">
          <div class="flex justify-content-between pl_20 pr_20 col-222">
              <div class=" col-222">{{$t('public.materialInformation')}}</div>             
              <el-button
                v-if="index>0"
                link
                type="primary"
                style="color: #df5b4b"
                @click="deleBtn(index)"
                >{{$t('public.delete')}}</el-button
              >            
          </div>
          
        </div>
        <div style="font-size: 14px; padding: 30px 20px">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-row :gutter="20" class="mb_10">
                <el-col :span="8">
                  <div class="flex align-items-center">
                    <div class="wd_100 col-666">{{$t('public.classification')}}</div>
                    <div>
                      <el-input
                        style="width: 214px" 
                        v-model="item.goodsSort"
                        :placeholder="$t('public.enter')"
                        clearable
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="flex align-items-center">
                    <div class="wd_100 col-666">{{$t('public.ownership')}}</div>
                    <el-select
                      v-model="item.goodsAscription"
                      :placeholder="$t('public.choose')"
                    >
                      <el-option
                        v-for="item in goods_belong_to"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <!-- <div><el-input  v-model="item.goodsAscription" :placeholder="$t('public.enter')"></el-input></div> -->
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="flex align-items-center">
                    <div class="wd_100 col-666">{{$t('public.partNumber')}}</div>
                    <div>
                      <el-input 
                      style="width: 214px" 
                        v-model="item.goodsName"
                        :placeholder="$t('public.enter')"
                        clearable
                      ></el-input>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="mb_10">
                <el-col :span="8">
                  <div class="flex align-items-center">
                    <div class="wd_100 col-666">{{$t('public.brand')}}</div>
                    <div>
                      <el-input
                      style="width: 214px" 
                        v-model="item.goodsBrand"
                        :placeholder="$t('public.enter')"
                        clearable
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="flex align-items-center">
                    <div class="wd_100 col-666">{{$t('public.unit')}}</div>
                    <div>
                      <el-input
                      style="width: 214px" 
                        v-model="item.goodsUnit"
                        :placeholder="$t('public.enter')"
                        clearable
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="flex align-items-center">
                    <div class="wd_100 col-666">{{$t('public.quantity')}}</div>
                    <div>
                      <el-input
                      style="width: 214px" 
                        v-model="item.goodsNum"
                        :placeholder="$t('public.enter')"
                        clearable
                      ></el-input>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="flex align-items-center">
                    <div class="wd_100 col-666">{{$t('public.remark')}}</div>
                    <el-input 
                      type="textarea"
                      v-model="item.goodsRemarks"
                      :placeholder="$t('public.enter')"
                      style="width: 100%; max-width: 1010px"
                      class="flex-1"
                    ></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <div style="width: 100px">
                <div style="width: 100px; height: 100px">
                  <face-img @img="imgs(index, $event)" :imgUrls='item.goodsImage[0].imageUrl' bucket="goods"></face-img>
                </div>
                <div style="text-align: center; margin-top: 5px">
                  <div>{{$t('public.uploadGoodsIamge')}}</div>
                  <!-- <div>
                    <el-button link size="mini" class="fs_12"
                      >点击可微信扫码上传</el-button
                    >
                  </div> -->
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="mb_10">
      
      <el-button text type="primary" @click="addGoods()" :icon="CirclePlus"> {{$t('public.AddMaterial')}}</el-button>
    </div>
    <div class="min-box">
      <div class="min-box-tit">
        <div class="pl_20 col-222">{{$t('public.flow')}}</div>
      </div>
      <div style="font-size: 14px; padding: 30px 20px">
        <el-row :gutter="20" class="mb_10">
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.flowOut')}}</div>
              <el-select v-model="goodsInfo.goodsFlow" :placeholder="$t('public.choose')">
                <el-option
                  v-for="item in goods_flow"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.address')}}</div>
              <div>
                <el-input
                style="width: 214px" 
                  v-model="goodsInfo.goodsFlowAddress"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.releaseDoors')}}</div>
              <el-select v-model="goodsInfo.releaseDoor" :placeholder="$t('public.choose')">
                <el-option
                  v-for="item in doorArr" 
                  :key="item.id" 
                  :label="item.gateName" 
                  :value="item.gateName"  
                />
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mb_10">
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.releaseEndTime')}}</div>
              <el-date-picker
                v-model="goodsInfo.releaseEndTime"
                type="datetime"
                :placeholder="$t('public.chooseTime')"
                value-format="YYYY-MM-DD HH:mm:ss"
                :disabled-date="disabledDateFun"
              >
              </el-date-picker>
              <!-- <div><el-input  v-model="goodsInfo.releaseEndTime" :placeholder="$t('public.enter')"></el-input></div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.return')}}</div>

              <el-select v-model="goodsInfo.returnYesNo" :placeholder="$t('public.choose')">
                <el-option
                  v-for="(item, index) in isReturn"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>

              <!-- <div><el-input  v-model="goodsInfo.returnYesNo" :placeholder="$t('public.enter')"></el-input></div> -->
            </div>
          </el-col>
          <el-col :span="6" v-if="goodsInfo.returnYesNo==$t('public.yes')" :key="10">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.returnTime')}}</div>
              <el-date-picker
                v-model="goodsInfo.returnTime"
                type="datetime"
                :placeholder="$t('public.choose')"
                value-format="YYYY-MM-DD HH:mm:ss"
              >
              </el-date-picker>
              <!-- <div><el-input  v-model="goodsInfo.returnTime" :placeholder="$t('public.enter')"></el-input></div> -->
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="min-box">
      <div class="min-box-tit">
        <div class="pl_20 pr_20 col-222 flex justify-content-between">
          <div>{{$t('public.carryInfomation')}}</div>
          <div>
            <el-button link type="primary" @click="getPersonalInfo('2')"
              >{{$t('public.owner')}}</el-button
            >
          </div>
        </div>
      </div>
      <div style="font-size: 14px; padding: 30px 20px">
        <el-row :gutter="20" class="mb_10">
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.name')}}</div>
              <div>
                <el-input
                style="width: 214px" 
                  v-model="goodsInfo.takeName"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.phoneNumber')}}</div>
              <div>
                <el-input
                style="width: 214px" 
                  v-model="goodsInfo.takePhone"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.gender')}}</div>
              <el-select
                v-model="goodsInfo.takeGender"
                :placeholder="$t('public.choose')"
                clearable
              >
                <el-option
                  v-for="item in sex"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </div>
          </el-col> -->
          <!-- <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.cardType')}}</div>
              <el-select v-model="goodsInfo.takeCardType" :placeholder="$t('public.choose')">
                <el-option
                  v-for="item in sys_identity_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col> -->
        </el-row>
        <el-row :gutter="20" class="mb_10">
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.IdCard')}}</div>
              <div>
                <el-input
                style="width: 214px" 
                  v-model="goodsInfo.takeCard"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.phoneNumber')}}</div>
              <div>
                <el-button plain type="primary" @click="verifyBtn()"
                  >{{$t('public.checkPhoneNumber')}}</el-button
                >
              </div>
            </div>
          </el-col> -->
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.car')}}</div>
              <div>
                <el-button type="primary" plain @click="carShow = true"
                  >{{$t('public.addCar')}}</el-button
                >
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mb_10">
          <!-- <el-col :span="6" v-if="goodsInfo.takePhone != ''">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.phoneNumber')}}</div>
              <div style="height: 36px; line-height: 36px">
                {{ goodsInfo.takePhone }}{{$t('public.checked')}}
              </div>
            </div>
          </el-col> -->
          <el-col :span="18" v-if="carShow == true">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.car')}}</div>
              <div>
                <el-input
                style="width: 214px" 
                  :placeholder="$t('public.enter')"
                  v-model="goodsInfo.carNumber"
                  class="input-with-select"
                >
                  <!-- <el-select
                    style="width: 170px"
                    v-model="goodsInfo.carNumberColor"
                    slot="prepend"
                    :placeholder="$t('public.choose')"
                  >
                    <el-option
                      v-for="item in car_number_color"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select> -->
                </el-input>
                <el-button style="margin-left: 10px;" link type="danger" @click="deleteCar()">{{$t('public.delete')}}</el-button >
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="min-box">
      <div class="min-box-tit">
        <div class="pl_20 pr_20 col-222 flex justify-content-between">
          <div>{{$t('public.receiverInformation')}}</div>
          <div>
            <el-button link type="primary" @click="getPersonalInfo('1')"
              >{{$t('public.receiverOwnerInformation')}}</el-button
            >
          </div>
        </div>
      </div>
      <div style="font-size: 14px; padding: 30px 20px">
        <el-row :gutter="20" class="mb_10">
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.name')}}</div>
              <div>
                <el-input
                style="width: 214px" 
                  v-model="goodsInfo.receiverName"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.phoneNumber')}}</div>
              <div>
                <el-input
                style="width: 214px" 
                  v-model="goodsInfo.receiverPhone"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.gender')}}</div>
              <el-select
                v-model="goodsInfo.receiverGender"
                :placeholder="$t('public.choose')"
              >
                <el-option
                  v-for="item in sex"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </div>
          </el-col> -->
          <!-- <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.cardType')}}</div>
              <el-select
                v-model="goodsInfo.receiverCardType"
                :placeholder="$t('public.choose')"
              >
                <el-option
                  v-for="item in sys_identity_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col> -->
        </el-row>
        <el-row :gutter="20" class="mb_10">
          <el-col :span="6">
            <div class="flex align-items-center">
              <div class="wd_100 col-666">{{$t('public.IdCard')}}</div>
              <div>
                <el-input
                style="width: 214px" 
                  v-model="goodsInfo.receiverCard"
                  :placeholder="$t('public.enter')"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="min-box">
      <div class="min-box-tit">
        <div class="pl_20 col-222">{{$t('public.approvalProcess')}}</div>
      </div>
      <div style="font-size: 14px; padding: 30px 20px">
        <el-row :gutter="20" class="mb_10">
          <el-col :span="24">
            <div>
              <approval @SignNodeFun="signNode" :isVIP="isVIP" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div>
      <el-button type="primary" @click="submit()">{{$t('public.submit')}}</el-button>
    </div>

    <el-dialog
      :title="titles"
      v-model="dialogVisible"
      width="550px"
      :before-close="handleClose"
    >
      <div>
        <div class="flex align-items-center mb_10">
          <div class="wd_100 col-666">{{$t('public.phoneNumber')}}</div>
          <el-input
          style="width: 214px" 
            v-model="phone"
            :placeholder="$t('public.enter')"
            class="pr_10 flex-1"
          ></el-input>
          <el-button :type="disabled?'info':'primary'" :disabled="disabled" @click="getCode() ">{{btntext}}</el-button>
        </div>
        <div class="flex align-items-center">
          <div class="wd_100 col-666">{{$t('public.verificationCode')}}</div>
          <el-input
          style="width: 214px" 
            v-model="code"
            :placeholder="$t('public.enter')"
            class="flex-1"
          ></el-input>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">{{$t('public.cancel')}}</el-button>
          <el-button :type="phone&&code?'primary':'info'" :disabled="phone&&code?false:true" @click="handleConfirm()">{{$t('public.sure')}}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script  setup name="goodsApply">
import {CirclePlus} from "@element-plus/icons-vue";
import { isEmail,isNum,isNull } from "@/utils/public.js";
import faceImg from "@/components/FaceImg";
import approval from "@/components/Approval/index.vue";
import { form, getPersonByEmployNo,detail,gateList } from "@/api/india/goods/goods";
import { phoneNum, validatorCode,PeopleInfo } from "@/api/public/public";
import useUserStore from '@/store/modules/user';
import { getPark } from '@/utils/park';

const name = useUserStore().name; //工号
const nickName = useUserStore().nickName; //姓名
const park = getPark() // 默认当前园区
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const { goods_type } = proxy.useDict("goods_type");
const { goods_flow } = proxy.useDict("goods_flow");
const { goods_flow_address } = proxy.useDict("goods_flow_address");
// const { car_number_color } = proxy.useDict("car_number_color");
const { goods_belong_to } = proxy.useDict("goods_belong_to");

const doorArr = ref([]);
const disabled = ref(false);
const btntext = ref(proxy.$t('public.getVerificationCode'));
const isReturn = ref([
  { id: 1, name: proxy.$t('public.yes') },
  { id: 2, name: proxy.$t('public.no') },
]);
const isVIP = ref("12"); //签核模板
const goodsInfo = ref({
  //申请信息
  applyName: "",
  applyNo: "",
  tel: "",
  landline: "",
  mail: "",
  // businessGroup: this.$store.getters.group,
  // businessDivision: this.$store.getters.place,
  unit: "",

  //申请类型
  formType: "",
  projectName: "",
  contractor: "",

  //物品流向
  goodsFlow: "",
  goodsFlowAddress: "",
  releaseDoor: "",
  releaseEndTime: "",
  returnYesNo: "",
  returnTime: "",

  //车
  carType: "",
  carYesNo: "",
  carColor: "",
  carNumber: "",
  carNumberColor: "",

  //携带人信息
  takeName: "",
  takeGender: "",
  takeCardType: "",
  takeCard: "",
  takePhone: "",

  //接收人信息
  receiverName: "",
  receiverGender: "",
  receiverCardType: "",
  receiverCard: "",
  receiverPhone: "",

  //物品信息
  goodsParams: [
    {
      goodsSort: "",
      goodsAscription: "",
      goodsName: "",
      goodsBrand: "",
      goodsUnit: "",
      goodsNum: "",
      goodsRemarks: "",
      goodsImage: [
        {
          //图片信息
          imageUrl: "",
        },
      ],
    },
  ],
  guardTemplate: {},

  typeId: "1",
  takeCode: "",
});
const dialogVisible = ref(false);
const titles = ref("");
const phone = ref("");
const code = ref("");
const sex = ref([
  { id: 0, name: proxy.$t('public.man') },
  { id: 1, name: proxy.$t('public.woman') },
]);
const carShow = ref(false);
const disabledDateFun = (time) => {
  const day = -3600 * 1000 * 24 * 2;
  if (time.getTime() > new Date().getTime()) {
    return time.getTime() >= new Date()- day; //时间范围必须是时间戳
  } else {
    return time.getTime() < Date.now() - 8.64e7; //8.64e7就是一天的时间戳 24*60*60*1000 
  }
}


const getGoodsInfo = (id) => {
  detail(id).then(Response => {
    goodsInfo.value = Response.data
    goodsInfo.value.formType = Response.data.formType + ''
    goodsInfo.value.goodsFlow = Response.data.goodsFlow + ''
    goodsInfo.value.releaseDoor = Response.data.releaseDoor + ''
    // goodsInfo.value.takeCardType = Response.data.takeCardType + ''
    // goodsInfo.value.receiverCardType = Response.data.receiverCardType + ''
    goodsInfo.value.goodsParams = Response.data.goods
    for (let key in Response.data.goods) {
      goodsInfo.value.goodsParams[key].goodsAscription = Response.data.goods[key].goodsAscription + ''
    }
    if (goodsInfo.value.carNumber) {
      carShow.value = true
      goodsInfo.value.carNumberColor = Response.data.carNumberColor + ''
    }
  })
};
const deleBtn = (index) => {
  if(index>0){
    goodsInfo.value.goodsParams.splice(index, 1)
    proxy.$forceUpdate()
  }
};
const getPersonalInfo = (val) => {
  console.log('name',name);
  // getPersonByEmployNo(name.value).then((response) => {

  //   let { name, gender, identityCardType, identityCard, phone } =response.data;
  //   if (val == "1") {
  //     goodsInfo.value.receiverName = name;
  //     goodsInfo.value.receiverGender = (gender=="2"?proxy.$t('public.unknown'):(gender=="1"?proxy.$t('public.woman'):proxy.$t('public.man')));
  //     goodsInfo.value.receiverCardType = identityCardType;
  //     goodsInfo.value.receiverCard = identityCard;
  //     goodsInfo.value.receiverPhone = phone;
  //   }
  //   if (val == "2") {
  //     goodsInfo.value.takeName = name;
  //     goodsInfo.value.takeGender = (gender=="2"?proxy.$t('public.unknown'):(gender=="1"?proxy.$t('public.woman'):proxy.$t('public.man')));
  //     goodsInfo.value.takeCardType = identityCardType;
  //     goodsInfo.value.takeCard = identityCard;
  //     goodsInfo.value.takePhone = phone;
  //   }
  // });
  PeopleInfo(name).then((response) => {
    // console.log('response',response);
    // return
    let { empName, card, phone } =response.data;
    if (val == "1") {
      goodsInfo.value.receiverName = empName;
      goodsInfo.value.receiverCard = card;
      goodsInfo.value.receiverPhone = phone;
    }
    if (val == "2") {
      goodsInfo.value.takeName = empName;
      goodsInfo.value.takeCard = card;
      goodsInfo.value.takePhone = phone;
    }
  });
};
const handleConfirm = () => {
  if (titles.value == proxy.$t('public.phoneCheck')) {
    if (phone.value == "") {
      return proxy.$message.error(proxy.$t('public.phoneRemind'));
    }
    if (code.value == "") {
      return proxy.$message.error(proxy.$t('public.codeRemind'));
    }
    validatorCode(phone.value, code.value).then((Response) => {
      proxy.$message({
        message: Response.msg,
        type: "success",
      });
      goodsInfo.value.takePhone = phone.value;
      handleClose();
      phone.value = "";
      disabled.value = false;
      btntext.value = proxy.$t('public.getVerificationCode');
      clearInterval(timer)              
    });
  }
};
const getCode = () => {
  // countDown();//倒计时
  // return
  phoneNum(phone.value,'2').then((Response) => {
    countDown();//倒计时
  });
};
const countDown = () => {
  disabled.value = true
  let second = 60;
  const timer = setInterval(() => {
      btntext.value = `${second}${proxy.$t('public.getAgain')}`;
      second--;
      if (second == 0) {
        console.log('second',second);
        
          //1分钟后再次可以点击
          disabled.value = false;
          btntext.value = proxy.$t('public.getVerificationCode');
          clearInterval(timer)
      }
  }, 1000);    
};
const handleClose = () => {
  dialogVisible.value = false;
  code.value = "";
};
const verifyBtn = () => {
  dialogVisible.value = true;
  titles.value = proxy.$t('public.phoneCheck');
};
const deleteCar = () => {
  carShow.value = false;
  goodsInfo.value.carNumber = '';
};
const addGoods = () => {
  goodsInfo.value.goodsParams.push({
    goodsSort: "",
    goodsAscription: "",
    goodsName: "",
    goodsBrand: "",
    goodsUnit: "",
    goodsNum: "",
    goodsRemarks: "",
    goodsImage: [
      {
        //图片信息
        imageUrl: "",
      },
    ],
  });
  proxy.$forceUpdate();
};
const imgs = (index, value) => {
  console.log('value',value);
  let val = value.replace("blob:", "");
  goodsInfo.value.goodsParams[index].goodsImage[0].imageUrl = val;
};
const submit = () => {
  //申请信息
  if (isNull(goodsInfo.value.landline)) {
    return proxy.$message.error(proxy.$t('public.landlineRemind'));
  }
  if (isNull(goodsInfo.value.mail)) {
    return proxy.$message.error(proxy.$t('public.emailRemind'));
  }
  if (goodsInfo.value.mail != "" && isEmail(goodsInfo.value.mail)) {
    return proxy.$message.error(proxy.$t('public.emailFormat'));
  }
  if (isNull(goodsInfo.value.unit)) {
    return proxy.$message.error(proxy.$t('public.divisionRemind'));
  }
  if (isNull(goodsInfo.value.formType)) {
    return proxy.$message.error(proxy.$t('public.typeRemind'));
  }
  if (goodsInfo.value.formType == "4") {
    if (isNull(goodsInfo.value.projectName)) {
      return proxy.$message.error(proxy.$t('public.projectNameRemind'));
    }
    if (isNull(goodsInfo.value.contractor)) {
      return proxy.$message.error(proxy.$t('public.contractorRemind'));
    }
  }
  //物品信息                     
  for (let item of goodsInfo.value.goodsParams) {
    if (isNull(item.goodsSort)) {
      return proxy.$message.error(proxy.$t('public.sortRemind'));
    }
    if (isNull(item.goodsAscription)) {
      return proxy.$message.error(proxy.$t('public.ownershipRemind'));
    }
    if (isNull(item.goodsName)) {
      return proxy.$message.error(proxy.$t('public.PNRemind'));
    }
    if (isNull(item.goodsBrand)) {
      return proxy.$message.error(proxy.$t('public.brandRemind'));
    }
    if (isNull(item.goodsUnit)) {
      return proxy.$message.error(proxy.$t('public.divisionRemind'));
    }
    if (isNull(item.goodsNum)) {
      return proxy.$message.error(proxy.$t('public.quantityRemind'));
    }
    if (!isNum(item.goodsNum)) {
      return proxy.$message.error(proxy.$t('public.quantityFormat'));
    }
    if (isNull(item.goodsImage[0].imageUrl)) {
      return proxy.$message.error(proxy.$t('public.goodImageRemind'));
    }
  }
  //物品流向    
  if (isNull(goodsInfo.value.goodsFlow)) {
    return proxy.$message.error(proxy.$t('public.goodsFlowRemind'));
  }
  if (isNull(goodsInfo.value.goodsFlowAddress)) {
    return proxy.$message.error(proxy.$t('public.goodsFlowAddressRemind'));
  }
  if (isNull(goodsInfo.value.releaseDoor)) {
    return proxy.$message.error(proxy.$t('public.releaseDoorRemind'));
  }
  if (isNull(goodsInfo.value.releaseEndTime)) {
    return proxy.$message.error(proxy.$t('public.releaseEndTimeRemind'));
  }
  if (isNull(goodsInfo.value.returnYesNo)) {
    return proxy.$message.error(proxy.$t('public.returnYesNoRemind'));
  }
  if (goodsInfo.value.returnYesNo == proxy.$t('public.yes') && isNull(goodsInfo.value.returnTime)) {
    return proxy.$message.error(proxy.$t('public.returnTimeRemind'));
  }
  //携带人信息
  if (isNull(goodsInfo.value.takeName)) {
    return proxy.$message.error(proxy.$t('public.takeNameRemind'));
  }
  // if (isNull(goodsInfo.value.takeGender)) {
  //   return proxy.$message.error(proxy.$t('public.takeGenderRemind'));
  // }
  if (isNull(goodsInfo.value.takeCard)) {
    return proxy.$message.error(proxy.$t('public.takeCardRemind'));
  }
  if (isNull(goodsInfo.value.takePhone)) {
    return proxy.$message.error(proxy.$t('public.takePhoneRemind'));
  }
  //{{$t('public.receiverInformation')}}
  if (isNull(goodsInfo.value.receiverName)) {
    return proxy.$message.error(proxy.$t('public.receiverNameRemind'));
  }
  // if (isNull(goodsInfo.value.receiverGender)) {
  //   return proxy.$message.error(proxy.$t('public.receiverGenderRemind'));
  // }
  if (isNull(goodsInfo.value.receiverCard)) {
    return proxy.$message.error(proxy.$t('public.receiverCardRemind'));
  }
  if (isNull(goodsInfo.value.receiverPhone)) {
    return proxy.$message.error(proxy.$t('public.receiverPhoneRemind'));
  }
  console.log('goodsInfo.value.guardTemplate.guardProcesses',goodsInfo.value.guardTemplate.guardProcesses);
  for (let item of goodsInfo.value.guardTemplate.guardProcesses) {
    
    if (isNull(item.examineEmployeeno)) {
      return proxy.$message.error(item.examineTypeText + proxy.$t('public.workNumberRemind'));
    }
    if (isNull(item.examineName)) {
      return proxy.$message.error(item.examineTypeText + proxy.$t('public.nameRemind'));
    }
    if (item.isEmail == '0' && isNull(item.examineEmail)) {
      return proxy.$message.error(item.examineTypeText + proxy.$t('public.emailRemind'));
    }
    for (let items of item.subProcess) {
      if (isNull(items.examineEmployeeno)) {
        return proxy.$message.error(items.examineTypeText + proxy.$t('public.workNumberRemind'));
      }
      if (isNull(items.examineName)) {
        return proxy.$message.error(items.examineTypeText + proxy.$t('public.nameRemind'));
      }
      if (items.isEmail == '0' && isNull(items.examineEmail)) {
        return proxy.$message.error(items.examineTypeText + proxy.$t('public.emailRemind'));
      }
    }
  }



  if (
    // !goodsInfo.value.carNumberColor&&
    !goodsInfo.value.carNumber
  ) {
    goodsInfo.value.carYesNo = 2;
  } else {
    goodsInfo.value.carYesNo = 1;
  }

  goodsInfo.value.applyName = nickName;
  goodsInfo.value.applyNo = name;
  // goodsInfo.value.tel = tel;
  form(JSON.stringify(goodsInfo.value)).then((Response) => {
    let id = Response.data
    router.push({
      path: `/indiagoods/goods/details/${id}`,

    });
  });
};
const signNode = (val) => {
  console.log('signNode',val.examineData);
  
  goodsInfo.value.guardTemplate = val.examineData;
};

const getGateList = () => {
  gateList(park.value).then(Response => {
    doorArr.value = Response.data
  })
};
onMounted(() => {
  if (route.query.id) {
    getGoodsInfo(route.query.id);
  }
  getGateList();
});

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
.wd_100 {
  width: 130px;
}
</style>
