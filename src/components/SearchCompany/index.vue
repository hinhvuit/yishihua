<template>
  <el-dialog
    :title="$t('public.chooseCompany')"
    v-model="searchCompanyDialog1"
    width="40%"
    :before-close="handleClose">
    <div class="pd_20">
      <div class="flex mb_30">
        <el-input v-model="companyName" :placeholder="$t('public.enter')" class="mr_20" ></el-input><el-button type="primary" @click="getCompanyList()">{{$t('public.searchBtn')}}</el-button>
      </div>
      <div>
        <div v-for="(item, index) in dataList" :key="index" class="txt" @click="closec(item)">{{item.companyName}}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {companyList} from '../../api/public/searchCompany'
export default {
    name:'searchCompany',
    props:{
      searchCompanyDialog:{
        type:Boolean,
        default:false
      },
      type:{
        type:String,
        default:''
      }
    },
    data(){
        return{
          searchCompanyDialog1:false,
          companyName:'',
          companyType:'',
          dataList:[]
        }
    },
    methods: {
        handleClose(){
          this.$emit('closeDialog')
          this.companyName=''
          this.dataList=[]
        },
        getCompanyList(){
          this.companyType=''
          if(this.type=='5'){ this.companyType='0'}
          if(this.type=='4'){ this.companyType='1'}
          companyList(this.companyName,this.companyType).then(Response=>{
            this.dataList=Response.rows
          })
        },
        closec(val){
          this.$emit('closeDialog',val)
        }
    },
    watch:{
      searchCompanyDialog(newValue,oldValue){
        console.log('newValue',newValue);
        console.log('oldValue',oldValue);
        this.searchCompanyDialog1 = newValue
        console.log('this.searchCompanyDialog1',this.searchCompanyDialog1);
        
      }
    },
    created() {
      //   console.log(this.type)
    },
}
</script>

<style scoped lang="scss">
/* ::v-deep .el-dialog__header {
  background-color: rgba(72, 119, 231, 1);
}
::v-deep .el-dialog__header .el-dialog__title {
    color: #ffffff;
    font-size: 20px;
  }
::v-deep .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
    font-size: 20px;
  } */
.txt{
  padding: 15px 0;
  border-bottom: 1px solid rgb(224, 224, 224);
}
</style>