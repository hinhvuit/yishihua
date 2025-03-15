<template>
  <div >
      <el-row :gutter="24" v-if="formData.examineData!=''">
        <el-col :span="24">
          <div v-for="(item,index) in formData.examineData.guardProcesses" :key="index">
            <div class="flex mb_10 flex-center">
              <div class="wd_100 " style="color:#666;font-size: 14px;">{{item.examineTypeText}}</div>
              <div class=" flex mr_20 centerbotm">
                  <div class="cent_input mr_10" v-if="item.examineTypeText!=$t('public.informationAudition')">
                    <!-- :disabled='item.examineTypeText=="申请"||item.examineTypeText=="接洽"?true:false'                  -->
                    <el-input
                      style="width: 202px;"
                      v-if="item.examineType < 5 && item.examineType != 1"
                      :placeholder="$t('public.workNumber')"  
                      :disabled='item.examineType==3||item.examineType==4?true:false'                 
                      v-model.trim="item.examineEmployeeno"
                      @input="onInputChange(index)"
                      @blur="sign(item.examineEmployeeno,index,item.examineType)"                    
                    ></el-input>
                    <el-select style="width: 202px;" v-else v-model="value[index]"  filterable :placeholder="$t('public.choose')" :key="index" value-key="id"
                    @change="changeArr(index)"
                    @focus="querySignPersonArr(index,item.examineType)">               
                      <el-option
                        v-for="(item,indexs) of personArr[index]"
                        :key="indexs"
                        :label= toString(item.signPersonelName,item.signPersonelEmployno,item.signPersonelEmail)
                        :value="item">
                      </el-option>
                    </el-select>
                  </div>          
                  <div class="cent_input mr_10" v-if="item.examineType < 5 && item.examineType != 1">
                    <!-- <div v-if="item.examineTypeText=='接洽'" class="fontsingleline">{{item.examineName}}</div> -->
                    <el-input
                     
                      style="width: 202px;"
                      :placeholder="$t('public.Name')"
                      disabled
                      v-model="item.examineName"
                    ></el-input>
                    
                  </div>
                  <div >
                    <div v-if="item.examineType < 5 && item.examineType != 1">
                      <div class="cent_input" v-if="item.isEmail == 0">
                        <el-input
                          style="width: 300px;"
                          :placeholder="$t('public.Email')"
                          v-model.trim="item.examineEmail"
                          oninput="value=value.replace(/\s+/g,'')"
                          :disabled='item.examineEmailState==1'
                        >
                        </el-input>
                      </div>                  
                    </div>
                    <div v-else>
                      <div class="cent_input" v-if="item.isEmail == 0">
                        <el-input
                        style="width:514px;"
                          :placeholder="$t('public.Email')"
                          v-model="item.examineEmail"
                          :disabled='item.examineEmailState==1'
                        >
                        </el-input>
                      </div>                  
                    </div>
                  </div>
              </div>                     
            </div>

            <div v-if="item.subProcess.length != 0">
              <div
                v-for="(itemCustom, index_1) in item.subProcess"
                :key="index_1"
                class="flex mb_10"
              >
                <!-- <div class="wd_100 fontsingleline pr_10">
                  <el-input
                    v-model="itemCustom.examineTypeText"
                    disabled
                    placeholder="请输入"
                  ></el-input>
                </div> -->
                <div class="wd_100">
                  <el-input style="width:90px" v-model="itemCustom.examineTypeText" placeholder="节点名称"></el-input>
                </div>
                <div class=" flex justify-content-between mr_20 centerbotm">
                  <div class="flex">
                  
                  <div class="cent_input mr_10" v-if="itemCustom.examineTypeText!='接洽人'">
                    <el-input
                    style="width: 202px;"
                      :placeholder="$t('public.workNumber')" 
                      @input="onInputChange1(index,index_1)"             
                      v-model.trim="itemCustom.examineEmployeeno"
                      @blur="sign(itemCustom.examineEmployeeno,index,itemCustom.examineType,index_1,'add')"                                    
                    ></el-input>
                  </div>      
                  <!-- :disabled="itemCustom.examineTypeText=='接洽人'"     -->
                  <div class="cent_input mr_10">
                    <el-input
                    style="width: 202px;"
                      :placeholder="$t('public.Name')"
                      disabled
                      v-model="itemCustom.examineName"
                    ></el-input>
                  </div>
                  <div class="cent_input" v-if="itemCustom.isEmail == 0">
                    <el-input
                    style="width: 300px;"
                      :placeholder="$t('public.Email')"
                      v-model="itemCustom.examineEmail"
                      :disabled='item.examineEmailState==1'
                    >
                    </el-input>
                  </div>               
                  </div> 
                </div>
                <div
            class="fontsingleline redfont cursor"
            @click="delCustomExamine(index, index_1)"
          >
          {{$t('public.delete')}}
                </div>
              </div>
            </div>

            <div v-if="item.isAddExamineType==0&&item.subProcess.length<item.isAddExamineTypeMaxNumber">
              <div class="flex mb_10" >
                <div class="wd_100"></div>
                <div style="color:#409EFF;font-size:14px" class="cursor" @click="addNodeClick(index)">
                  <el-button link type="primary" :icon="CirclePlus"> {{$t('public.AddNode')}}</el-button>
                  
                </div>                 
              </div>
            </div> 
            <!-- 添加节点 -->

          </div>
        </el-col>     
      </el-row>

  </div>
</template>

<script  setup name="approval">
import {CirclePlus} from "@element-plus/icons-vue";
import { getTemplate,selectPersonByEmployNo,querySignPerson } from '../../api/public/approval'
import { PeopleInfo } from "@/api/public/public";

const { proxy } = getCurrentInstance();

const formData = ref({
  examineData:{}
})
const indexs = ref('');
const personArr = ref([]);
const personArrAll = ref([]);
const value = ref([]);
const props = defineProps({
  isVIP: {
    type: String
  },
});
const emit = defineEmits(['SignNodeFun'])
watch(formData,(newVal, oldVal) => {
  console.log('formData',formData);
    emit("SignNodeFun", newVal);
  },
  { deep: true }
);
watch(props.isVIP, (newVal, oldVal) => {
  console.log('props.isVIP',props.isVIP);
  template();
});


const onInputChange = (val) => {
  formData.value.examineData.guardProcesses[val].examineEmployeeno= formData.value.examineData.guardProcesses[val].examineEmployeeno.toUpperCase();
};
const onInputChange1 = (val,index_1) => {
  formData.value.examineData.guardProcesses[val].subProcess[index_1].examineEmployeeno= formData.value.examineData.guardProcesses[val].subProcess[index_1].examineEmployeeno.toUpperCase();
};
const changeArr = (index) => {
  formData.value.examineData.guardProcesses[index].examineEmployeeno = value.value[index].signPersonelEmployno
  formData.value.examineData.guardProcesses[index].examineName = value.value[index].signPersonelName
  formData.value.examineData.guardProcesses[index].examineEmail = value.value[index].signPersonelEmail
};
const querySignPersonArr = (index,type) => {
  personArr.value[index] = personArrAll.value[index]
};
const toString = (name, id, email) => {
  if (name == '' && id == '') {
    return ''
  }
  return name + '(' + id + ')';
};
const sign = (employNo, index, type, index_1, tet) => {
  PeopleInfo(employNo, type).then(response => {
    if (tet == 'add') {
      formData.value.examineData.guardProcesses[index].subProcess[index_1].examineName = response.data.empName
      formData.value.examineData.guardProcesses[index].subProcess[index_1].examineEmail = response.data.email
    } else {
      formData.value.examineData.guardProcesses[index].examineName = response.data.empName
      formData.value.examineData.guardProcesses[index].examineEmail = response.data.email

    }
  }).catch(res => {
    if (tet == 'add') {
      formData.value.examineData.guardProcesses[index].subProcess[index_1].examineName = ''
      formData.value.examineData.guardProcesses[index].subProcess[index_1].examineEmail = ''
    } else {
      formData.value.examineData.guardProcesses[index].examineEmployeeno = ''
      formData.value.examineData.guardProcesses[index].examineName = ''
      formData.value.examineData.guardProcesses[index].examineEmail = ''
    }
  })
};
const addNodeClick = (index) => {
  indexs.value = index
  formData.value.examineData.guardProcesses[indexs.value].subProcess.push({
    createBy: null,
    createTime: null,
    delFlag: null,
    examineEmail: '',
    examineEmployeeno: '',
    examineName: '',
    examineType: 2,
    examineTypeText: proxy.$t('public.Approve'),
    isAddExamineType: "1",
    isAddExamineTypeMaxNumber: null,
    isAddExamineTypeMinNumber: null,
    isEmail: "0",
    isUpExaminePeople: "1",
    params: {},
    placeholderText: "开发者",
    processId: null,
    processSort: null,
    remark: null,
    searchValue: null,
    state: null,
    subProcess: [],
    templateId: 1,
    updateBy: null,
    updateTime: null
  })
};
const delCustomExamine = (wid, nid) => {
  formData.value.examineData.guardProcesses[wid].subProcess.splice(nid, 1);
};
const template = () => {
  value.value = [];
  getTemplate(props.isVIP).then(response => {
    formData.value.examineData = response.data
    for (let index = 0; index < response.data.guardProcesses.length; index++) {
      if (response.data.guardProcesses[index].examineTypeText == proxy.$t('public.apply') || response.data.guardProcesses[index].examineTypeText == proxy.$t('public.Consult')) {
        // response.data.guardProcesses[index].examineEmail=this.$store.state.user.isEmail
      }
      value.value.push('');
      personArr.value.push([]);
      personArrAll.value.push([]);
      if (response.data.guardProcesses[index].examineType > 4 || response.data.guardProcesses[index].examineType == 1) {
        querySignPerson(response.data.guardProcesses[index].examineType).then(res => {
          if (res.code != 200) {
            return this.$message.error(res.$message);
          }
          personArrAll.value[index] = res.rows
        })
      }

    }
  })
};
template();



</script>

<style>

</style>