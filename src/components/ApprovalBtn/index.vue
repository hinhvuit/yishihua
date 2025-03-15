<template>
  <div v-if="btnShow==true"> 
    <div class="flex mb_20">
      <div class="mr_20">
        <el-button type="primary" @click="check('同意',1)">{{$t('public.Agree')}}</el-button>
        <el-button type="danger" @click="check('驳回',2)">{{$t('public.Refuse')}}</el-button>
      </div>
    </div>
    <el-dialog
      :title="$t('public.ApprovalOpinion')"
      v-model="dialogShow"
      width="500px"
      :before-close="handleClose"      
      :class="{ 'headerColor': text=='驳回', 'headerColor1': text=='同意' }">
      <div>
          <div class="flex">
              <div class="wd_100">{{$t('public.mReason')}} </div>
              <el-input type="textarea" v-model="remark" :placeholder="$t('public.enter')"></el-input>
          </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="sign('2')" v-if="text=='驳回'">{{$t('public.Refuse')}}</el-button>
          <el-button type="primary" @click="sign('1')" v-if="text=='同意'">{{$t('public.sure')}}</el-button>
        </span>
      </template>
    </el-dialog>          
  </div>
</template>

<!-- <script>
import {isShow,examine,querySignCount,businessIsShow} from "@/api/visitors/business.js";

export default {
    name:'approvalBtn',
    data() {
        return {
            text:'',
            remark:'',
            dialogShow:false,
            btnShow:false,
            type:''
        }
    },
    props:{
        businessKey:{
            type:String,
            default:''
        },
        businessType:{
            type:String,
            default:''
        },
        node:{
            type:String,
            default:''          
        },
        zianImages:{
            type:Array,
            default: ()=>[]        
        },
        cardType:{
            type:String,
            default:''  
        }

    }, 
    watch:{
        businessKey(newVal,oldVal){
            this.getBtnShow(newVal)
        }
    },
    methods: {
      check(val,type){
        this.text=val
        this.remark=''
        this.dialogShow=true
      },
      getBtnShow(){
        if(this.businessKey){
            if(this.cardType){
              if(this.cardType==='0'){this.type='vehicle_business'}
              if(this.cardType==='1'){this.type='license_business'}
            }else{
              this.type=this.businessType
            }            
            isShow(this.businessKey).then(response=>{
              this.btnShow=response.data
              emit("getBtnShow",this.btnShow); 
              if(response.data==true){
                if(!this.isNull(this.type)){
                  businessIsShow(this.businessKey,this.type).then(res=>{
                    this.btnShow=res.data
                    emit("getBtnShow",this.btnShow); 
                  })
                }
              }
            })
        }

      }, 
      sign(val){
        emit("beforeSignFun");
        if(val=='2'&&this.remark==''){
          return this.$message.error("请说明驳回原因");
        }
        if(val=='1'&&this.node=='zian'&&this.zianImages!=undefined&&this.zianImages.length==0){
          return this.$message.error("请上传资安查验图片");
        }
        examine('H261377',this.businessKey,val,this.remark,this.businessType).then(response=>{    
          if (response.code == 200) {
            if (val == 1) {
              emit("AgreeFun"); 
            }
            if (val == 2) {
              emit("RefuseFun"); 
            }
          }

          this.dialogShow=false           
          this.getBtnShow()
          emit('upDataSignNode')  
          if(this.$route.path.includes('/LayoutReception')){        
            this.continueSign(this.type)     
          }
        })           
      },
      continueSign(val){
          querySignCount(val).then(response=>{
            if(val===''||val==undefined||val==null){
              for(let item of response.data){
                if(item.count>0){
                  return this.message(item.businessTypeDesc,item.count,item.businessKey)
                }
              }
            }else{
              if(response.data[0].count>0){
                // return this.message(response.data[0].businessTypeDesc,response.data[0].count,response.data[0].businessKey)
              }else{
                this.continueSign()
              }
            }

          }) 
      },
      message(text,num,id){
            this.$confirm(`${text}还有${num}笔单待签，是否前往签单？`, '提示', {
              confirmButtonText: this.$t('public.sure'),
              confirmButtonText: this.$t('public.cancel'),
              type: 'warning'
            }).then(() => {
              if(text=='访客业务'){
                return this.$router.push(`/LayoutReception/visitors/business-children/index/${id}`)
              }
              if(text=='物品业务'){
                return this.$router.push(`/LayoutReception/goods/manage-apply/details/${id}`)
              }
              if(text=='车证业务'){
                return this.$router.push(`/LayoutReception/vehicle/detail/${id}`)
              }
              if(text=='驻厂证业务'){
                return this.$router.push(`/LayoutReception/credentials/detail/${id}`)
              }
            }).catch(() => {         
            });                
      },
      handleClose(){
        this.dialogShow=false
      }     
    },
    created() {
        this.getBtnShow()
    },
}
</script> -->

<script  setup name="approvalBtn">
import {isShow,examine,businessIsShow} from "@/api/india/visitors/business.js";
import useUserStore from '@/store/modules/user';
const name = useUserStore().nickName;
const { proxy } = getCurrentInstance();

const text = ref('');
const remark = ref('');
const dialogShow = ref(false);
const btnShow = ref(false);
const type = ref('');

const props = defineProps({
  businessKey: {
    type: String,
    default:''
  },
  businessType: {
    type: String,
    default:''
  },
  node: {
    type: String,
    default:''
  },
  zianImages:{
    type:Array,
    default: ()=>[]        
  },
  cardType: {
    type: String,
    default:''
  },
});
const emit = defineEmits(['getBtnShow','beforeSignFun','AgreeFun','RefuseFun','upDataSignNode']);

watch(props.businessKey, (newVal, oldVal) => {
  getBtnShow(newVal);
});
const check = (val,type) => {
  text.value = val;
  remark.value = '';
  dialogShow.value = true;
};
const getBtnShow = () => {
  if (props.businessKey) {
    if (props.cardType) {
      if (props.cardType === '0') { type.value = 'vehicle_business' }
      if (props.cardType === '1') { type.value = 'license_business' }
    } else {
      type.value = props.businessType
    }
    isShow(props.businessKey).then(response => {
      btnShow.value = response.data
      emit("getBtnShow", btnShow.value);
      if (response.data == true) {
        if (!type.value) {
          businessIsShow(props.businessKey, type.value).then(res => {
            btnShow.value = res.data
            emit("getBtnShow", btnShow.value);
          })
        }
      }
    })
  }
};
const sign = (val) => {
  emit("beforeSignFun");
  if(val=='2'&&remark.value==''){
    return proxy.$message.error("请说明驳回原因");
  }
  examine(name.value,props.businessKey,val,remark.value,props.businessType).then(response=>{    
    if (response.code == 200) {
      if (val == 1) {
        emit("AgreeFun"); 
      }
      if (val == 2) {
        emit("RefuseFun"); 
      }
    }
    dialogShow.value = false;       
    getBtnShow()
    emit('upDataSignNode')  
  })  
};
const handleClose = () => {
  dialogShow.value = false;
};
getBtnShow();



</script>

<style scoped>
::v-deep.headerColor .el-dialog__header{
    background-color: #ff4949;
}
::v-deep.headerColor1 .el-dialog__header{
    background-color: #457af6;
}
</style>