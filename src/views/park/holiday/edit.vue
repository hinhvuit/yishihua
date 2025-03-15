<!-- 
  @FileDescription: 车辆进出记录查询
  @Date:2024-08-07 15:10:56
  @Author:LZW
-->
<template>
  <div class="tab-container">
    <div style="margin-bottom: 10px">园区相关信息</div>
    <el-form label-position="left" :model="formDataParams" ref="formRef" :inline="true">
      <div
        style="
          border: 1px solid #ebebeb;
          border-radius: 5px;
          box-shadow: 1px 1px 10px 1px #ebebeb;
          padding: 10px 25px 25px 25px;
        "
      >
        <div>
          <div class="titl">概况</div>
          <div style="margin-top: 10px">
            <div>
              <el-form-item prop="door" label="园区："
                >{{ formDataParams.parkName }}
              </el-form-item>
            </div>
          </div>
          <div class="titl" style="margin-top: -5px">园区安全主管信息</div>
          <div
            class="lineBox"
            style="margin-bottom: -20px"
            v-for="(item, index) of formDataParams.parkManagerList"
            :key="index"
          >
            <div
              style="padding: 15px 0 0px 0; display: flex; justify-content: space-between"
            >
              <div style="display: flex">
                <div>
                  <el-form-item
                    label-width="60px"
                    label="工号"
                    :prop="`parkManagerList[${index}].jobNo`"
                    :rules="{
                      required: true,
                      message: '该项不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="item.jobNo"
                      @blur="findPerson(item.jobNo)"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </el-form-item>
                </div>
                <div>
                  <el-form-item
                    :prop="`parkManagerList[${index}].username`"
                    label-width="60px"
                    label="姓名"
                    :rules="{
                      required: true,
                      message: '该项不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="item.username"
                      @blur="findPerson()"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </el-form-item>
                </div>
                <div>
                  <el-form-item
                    :prop="`parkManagerList[${index}].post`"
                    label-width="70px"
                    label="管理职"
                    :rules="{
                      required: true,
                      message: '该项不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input v-model="item.post" :disabled="true" placeholder="请输入" />
                  </el-form-item>
                </div>
                <div>
                  <el-form-item
                    label-width="70px"
                    label="手机号"
                    :prop="`parkManagerList[${index}].phone`"
                  >
                    <el-input
                      v-model="item.phone"
                      :disabled="true"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </div>
                <div>
                  <el-form-item
                    label-width="60px"
                    label="座机"
                    :prop="`parkManagerList[${index}].landline`"
                    :rules="{
                      required: true,
                      message: '该项不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input v-model="item.landline" placeholder="请输入" />
                  </el-form-item>
                </div>
              </div>
              <!-- <div>
                  <el-button type="danger" plain>删除</el-button>
                </div> -->
            </div>
          </div>
        </div>
      </div>
      <div style="margin: 15px 0 10px 0">事业群相关信息</div>
      <div
        style="
          border: 1px solid #ebebeb;
          border-radius: 5px;
          padding: 10px 25px 20px 25px;
          margin-bottom: 10px;
          box-shadow: 1px 1px 10px 1px #ebebeb;
        "
      >
        <div v-for="(item, index) of formDataParams.festGroupsList" :key="index">
          <div>
            <div class="oodd">
              事业群{{ index + 1 }}
              <div>
                <el-button type="danger" @click="delSYQ(index)" plain>删除</el-button>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between">
              <div style="display: flex">
                <div>
                  <el-form-item
                    label="群名称"
                    :prop="`festGroupsList[${index}].groupId`"
                    :rules="{
                      required: true,
                      message: '该项不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-cascader
                      v-model="item.groupId"
                      :options="Group"
                      placeholder="请选择"
                      style="width: 190px"
                      clearable
                      ref="groupref"
                      @change="handleChange(index)"
                    ></el-cascader>
                  </el-form-item>
                </div>
                <!-- <div>
                  <el-form-item
                    :prop="`festGroupsList[${index}].festDay`"
                    label="放假天数"
                    :rules="{
                      required: true,
                      message: '该项不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input v-model="item.festDay" placeholder="请输入" />
                  </el-form-item>
                </div> -->
              </div>
            </div>
          </div>
          <div v-for="(items, indexs) of item.festGroupsEpibolyList" :key="indexs">
            <div v-if="items.type == 2">
              <div style="margin-bottom: 10px; display: flex; align-items: center">
                <div class="titl">放假日期</div>
                <div style="margin-left: 5px; height: 15px; cursor: pointer">
                  <el-icon style="color: #f56c6c; font-size: 18px"
                    ><RemoveFilled @click="delAb(index, indexs)"
                  /></el-icon>
                </div>
              </div>
              <el-date-picker
                v-model="items.festTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="年/月/日"
                size="default"
              />
            </div>
            <div
              style="margin: 15px 0; display: flex; align-items: center"
              v-if="items.type == 2"
            >
              <div class="titl">安保状况</div>
            </div>

            <div
              style="
                border: 1px solid #efefef;
                box-shadow: 1px 1px 10px 1px #efefef;
                border-radius: 5px;
                padding: 20px 25px 10px 25px;
                margin-bottom: 10px;
              "
            >
              <div style="display: flex;justify-content:space-between;">
                <el-form-item
                  v-if="items.name != undefined"
                  label-width="80px"
                  :prop="`festGroupsList[${index}].festGroupsEpibolyList[${indexs}].name`"
                  label="公司全称"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="items.name"
                    style="width: 300px"
                    placeholder="请输入"
                  />
                </el-form-item>
                <div style="margin-top: -28px;margin-right: -30px; height: 15px; cursor: pointer">
                  <el-icon style="color: #f56c6c; font-size: 18px"
                    ><RemoveFilled @click="delAb(index, indexs)"
                  /></el-icon>
                </div>
              </div>

              <el-table
                v-if="items.name != undefined"
                style="width: 100%"
                :data="[items]"
                :header-cell-style="{ 'text-align': 'center' }"
              >
                <el-table-column prop="date" label="公共区域">
                  <el-table-column prop="state" label="开岗数量">
                    <template #default="scope">
                      <el-input
                        v-model="items.publicOpenPost"
                        type="number"
                        placeholder="请输入内容"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="city" label="上岗人力">
                    <template #default="scope">
                      <el-input
                        v-model="items.publicOnPost"
                        type="number"
                        placeholder="请输入内容"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="封岗数量">
                    <template #default="scope">
                      <el-input
                        v-model="items.publicClosePost"
                        type="number"
                        placeholder="请输入内容"
                      ></el-input> </template
                  ></el-table-column>
                </el-table-column>
                <el-table-column prop="date" label="生产区域">
                  <el-table-column prop="state" label="开岗数量">
                    <template #default="scope">
                      <el-input
                        v-model="items.produceOpenPost"
                        type="number"
                        placeholder="请输入内容"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="city" label="上岗人力">
                    <template #default="scope">
                      <el-input
                        v-model="items.produceOnPost"
                        type="number"
                        placeholder="请输入内容"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="封岗数量">
                    <template #default="scope">
                      <el-input
                        v-model="items.produceClosePost"
                        type="number"
                        placeholder="请输入内容"
                      ></el-input> </template
                  ></el-table-column>
                </el-table-column>
                <el-table-column prop="date" label="宿舍区域">
                  <el-table-column prop="state" label="开岗数量">
                    <template #default="scope">
                      <el-input
                        v-model="items.dormOpenPost"
                        type="number"
                        placeholder="请输入内容"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="city" label="上岗人力">
                    <template #default="scope">
                      <el-input
                        v-model="items.dormOnPost"
                        type="number"
                        placeholder="请输入内容"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="封岗数量">
                    <template #default="scope">
                      <el-input
                        v-model="items.dormClosePost"
                        type="number"
                        placeholder="请输入内容"
                      ></el-input> </template
                  ></el-table-column>
                </el-table-column>
              </el-table>
              <div
                style="display: flex; padding: 15px 0 0px 0"
                v-if="items.name != undefined"
              >
                <div>
                  <el-form-item
                    label="总封岗数"
                    :prop="`festGroupsList[${index}].festGroupsEpibolyList[${indexs}].countPost`"
                    :rules="{
                      required: true,
                      message: '该项不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="items.countPost"
                      type="number"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </div>
                <div>
                  <el-form-item
                    label="节约人力"
                    :prop="`festGroupsList[${index}].festGroupsEpibolyList[${indexs}].thriftPerson`"
                    :rules="{
                      required: true,
                      message: '该项不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="items.thriftPerson"
                      type="number"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </div>
                <div>
                  <el-form-item
                    label="节约成本"
                    :prop="`festGroupsList[${index}].festGroupsEpibolyList[${indexs}].thriftCost`"
                    :rules="{
                      required: true,
                      message: '该项不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="items.thriftCost"
                      type="number"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              margin: 10px 0 15px 0;
              cursor: pointer;
              width: 200px;
            "
            @click="addABcom(index)"
          >
            <el-icon size="25px" style="margin-right: 10px" color="#457AF6"
              ><CirclePlusFilled /></el-icon
            >添加安保公司
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              margin: 10px 0 25px 0;
              cursor: pointer;
              width: 200px;
            "
            @click="addFjday(index)"
          >
            <el-icon size="25px" style="margin-right: 10px" color="#457AF6"
              ><CirclePlusFilled /></el-icon
            >添加放假日期
          </div>
        </div>

        <el-button type="primary" @click="addSYQ" plain icon="Plus">添加事业群</el-button>
      </div>
    </el-form>
    <el-button type="primary" style="margin-top: 20px" @click="submit">提交</el-button>
    <el-dialog v-model="dialogVisible" :title="Tips" width="500">
      <span>{{ message }}</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="VisitorQueryCar">
import MyTitle from "@/components/MyTitle";
import { getCarList } from "@/api/visitor/query";
import { checkParams } from "@/utils";
import { useHolidayType } from "../hooks";
const router = useRouter();
const route = useRoute();
import { ref } from "vue";
const groupref = ref(null);
import { getEmpInfo } from "@/api/public";
import {
  getInfo,
  updateDayEdit,
  listByParkKey,
  querySecurityPersonInfoByJobNo,
  groupInfolist,
} from "@/api/park/parkInfo";
const { proxy } = getCurrentInstance();
import useUserstore from "@/store/modules/user";
const { outHoliday, getHolidayType } = useHolidayType();
let dialogVisible = ref(false);
let Tips = ref();
let Group = ref([]);
let message = ref();
const formDataParams = ref({
  bizKey: "", //表单单号
  parkName: useUserstore().getNowPark().name, //园区名称
  state: 1, //状态 [ -1：未提交、1：已提交、-2：未完成、2：已完成 ]
  parkManagerList: [
    {
      username: "", //姓名
      jobNo: "", //工号
      post: "", //职位
      phone: "", //手机号
      landline: "", //座机号
    },
  ], //园区安全管理人员列表
  festGroupsList: [
    {
      groupName: "", //事业群名称
      groupId: "",
      festDay: "", //放假天数
      festGroupsEpibolyList: [
        {
          festTime: "", //放假时间
          name: "", //公司名称
          publicOpenPost: 0, //公共开岗数量
          publicOnPost: 0, //公共上岗数量
          publicClosePost: 0, //公共封岗数量
          produceOpenPost: 0, //生产开岗数量
          produceOnPost: 0, //生产上岗数量
          produceClosePost: 0, //生产封岗数量
          dormOpenPost: 0, //宿舍开岗数量
          dormOnPost: 0, //宿舍上岗数量
          dormClosePost: 0, //宿舍封岗数量
          countPost: 0, //总岗位
          thriftPerson: 0, //节约人力
          thriftCost: 0, //节约成本
          type: 2, //节约成本
        },
      ], //节假日事业群—群外包信息列表
    },
  ], //节假日概况—事业群信息列表
});
function addSYQ() {
  formDataParams.value.festGroupsList.push({
    groupName: "", //事业群名称
    festDay: "", //放假天数
    groupId: "",
    festGroupsEpibolyList: [
      {
        festTime: "", //放假时间
        name: "", //公司名称
        publicOpenPost: 0, //公共开岗数量
        publicOnPost: 0, //公共上岗数量
        publicClosePost: 0, //公共封岗数量
        produceOpenPost: 0, //生产开岗数量
        produceOnPost: 0, //生产上岗数量
        produceClosePost: 0, //生产封岗数量
        dormOpenPost: 0, //宿舍开岗数量
        dormOnPost: 0, //宿舍上岗数量
        dormClosePost: 0, //宿舍封岗数量
        countPost: 0, //总岗位
        thriftPerson: 0, //节约人力
        thriftCost: 0, //节约成本
        type: 2,
      },
    ], //节假日事
  });
  console.log(formDataParams.value);
}
function addFjday(index) {
  formDataParams.value.festGroupsList[index].festGroupsEpibolyList.push({
    festTime: "", //放假时间
    name: "", //公司名称
    publicOpenPost: 0, //公共开岗数量
    publicOnPost: 0, //公共上岗数量
    publicClosePost: 0, //公共封岗数量
    produceOpenPost: 0, //生产开岗数量
    produceOnPost: 0, //生产上岗数量
    produceClosePost: 0, //生产封岗数量
    dormOpenPost: 0, //宿舍开岗数量
    dormOnPost: 0, //宿舍上岗数量
    dormClosePost: 0, //宿舍封岗数量
    countPost: 0, //总岗位
    thriftPerson: 0, //节约人力
    thriftCost: 0, //节约成本
    type: 2,
  });
}
function addABcom(index) {
  formDataParams.value.festGroupsList[index].festGroupsEpibolyList.push({
    name: "", //公司名称
    publicOpenPost: 0, //公共开岗数量
    publicOnPost: 0, //公共上岗数量
    publicClosePost: 0, //公共封岗数量
    produceOpenPost: 0, //生产开岗数量
    produceOnPost: 0, //生产上岗数量
    produceClosePost: 0, //生产封岗数量
    dormOpenPost: 0, //宿舍开岗数量
    dormOnPost: 0, //宿舍上岗数量
    dormClosePost: 0, //宿舍封岗数量
    countPost: 0, //总岗位
    thriftPerson: 0, //节约人力
    thriftCost: 0, //节约成本
    type: 1,
  });
}
function delSYQ(index) {
  formDataParams.value.festGroupsList.splice(index, 1);
}
function delAb(index, indexs) {
  formDataParams.value.festGroupsList[index].festGroupsEpibolyList.splice(indexs, 1);
}
function detail(params) {
  getInfo({ bizKey: route.params.number }).then((res) => {
    formDataParams.value = res.data;
    if (formDataParams.value.parkManagerList.length == 0) {
      querySecurityPersonInfoByJobNo({ parkKey: useUserstore().getNowPark().id }).then(
        (res) => {
          formDataParams.value.parkManagerList = [];
          res.data.forEach((item) => {
            formDataParams.value.parkManagerList.push({
              username: item.empName,
              jobNo: item.empNo, // 工号
              post: item.jobClass == null ? "无" : item.jobClass, // 管理职位
              phone: item.phone, // 手机号
            });
          });
        }
      );
    }

    for (let index = 0; index < formDataParams.value.festGroupsList.length; index++) {
      let arrList = [];
      formDataParams.value.festGroupsList[index].festGroupsEpibolyList = [];
      let keys = Object.keys(
        formDataParams.value.festGroupsList[index].festGroupsEpibolyListVO
      );
      for (let indexs = 0; indexs < keys.length; indexs++) {
        for (
          let indexss = 0;
          indexss <
          formDataParams.value.festGroupsList[index].festGroupsEpibolyListVO[keys[indexs]]
            .length;
          indexss++
        ) {
          arrList.push(
            formDataParams.value.festGroupsList[index].festGroupsEpibolyListVO[
              keys[indexs]
            ][indexss]
          );
        }
      }
      for (let indexs = 0; indexs < arrList.length; indexs++) {
        formDataParams.value.festGroupsList[index].festGroupsEpibolyList.push(
          arrList[indexs]
        );
      }
      for (
        let indexs = 0;
        indexs < formDataParams.value.festGroupsList[index].festGroupsEpibolyList.length;
        indexs++
      ) {
        if (
          formDataParams.value.festGroupsList[index].festGroupsEpibolyList.length == 1
        ) {
          formDataParams.value.festGroupsList[index].festGroupsEpibolyList[
            indexs
          ].type = 2;
        }
        if (
          formDataParams.value.festGroupsList[index].festGroupsEpibolyList[indexs + 1] !=
          undefined
        ) {
          if (indexs == 0) {
            formDataParams.value.festGroupsList[index].festGroupsEpibolyList[0].type = 2;
          }
          if (
            formDataParams.value.festGroupsList[index].festGroupsEpibolyList[indexs]
              .festTime ==
            formDataParams.value.festGroupsList[index].festGroupsEpibolyList[indexs + 1]
              .festTime
          ) {
            formDataParams.value.festGroupsList[index].festGroupsEpibolyList[
              indexs + 1
            ].type = 1;
          } else {
            formDataParams.value.festGroupsList[index].festGroupsEpibolyList[
              indexs + 1
            ].type = 2;
          }
        }
      }
    }
  });
  groupInfolist({ parkKey: useUserstore().getNowPark().id }).then((res) => {
    res.rows.forEach((element) => {
      if (element.sysGroupInfoList != null) {
        for (let index = 0; index < element.sysGroupInfoList.length; index++) {
          Group.value.push({
            label: element.sysGroupInfoList[index].groupName,
            value: element.sysGroupInfoList[index].id,
            children: [],
          });
          if (element.sysGroupInfoList[index].sysGroupInfoList != null) {
            for (
              let indexs = 0;
              indexs < element.sysGroupInfoList[index].sysGroupInfoList.length;
              indexs++
            ) {
              Group.value[index].children.push({
                label: element.sysGroupInfoList[index].sysGroupInfoList[indexs].groupName,
                value: element.sysGroupInfoList[index].sysGroupInfoList[indexs].id,
              });
            }
          }
        }
      }
    });
  });
}
detail();
function submit(params) {
  proxy.$refs["formRef"].validate((valid) => {
    if (!valid) return;

    formDataParams.value.festGroupsList.forEach((element) => {
      let count = 0;
      element.festGroupsEpibolyList.forEach((item, index) => {
        if (item.type == 1) {
          item.festTime = element.festGroupsEpibolyList[index - 1].festTime;
        } else {
          count++;
        }
      });
      element.festDay = count;
    });
    console.log(formDataParams.value);
    updateDayEdit(formDataParams.value).then((res) => {
      proxy.$modal.msgSuccess(res.msg);
      const obj = { path: "/garden/holidayInfo" };
      proxy.$tab.closeOpenPage(obj);
    });
  });
}
function findPerson(jobNo) {
  getEmpInfo(jobNo).then((res) => {
    formDataParams.value.parkManagerList[0].username = res.data.empName;
    formDataParams.value.parkManagerList[0].phone = res.data.phone;
  });
}
function handleChange(index) {
  formDataParams.value.festGroupsList[index].groupId =
    formDataParams.value.festGroupsList[index].groupId[
      formDataParams.value.festGroupsList[index].groupId.length - 1
    ];
  formDataParams.value.festGroupsList[index].groupName = groupref.value[
    index
  ].getCheckedNodes()[0].text;
}
</script>
<style lang="scss" scoped>
.tab-container {
  padding: 15px;
}
.lineBox {
  display: flex;
  margin-bottom: 15px;
}
.tipBox {
  cursor: pointer;
}
.tableBox {
  width: 100%;
}
td {
  border: 1px solid #999999;
  text-align: center;
  line-height: 40px;
  input {
    line-height: 40px;
    text-align: center;
    border: none;
  }
}
th {
  border: 1px solid #999999;
  line-height: 40px;
  background: #ebebeb;
}
.titl {
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  margin-top: 5px;
}
.oodd {
  margin-top: -10px;
  font-weight: 700;
  height: 50px;
  width: 100%;
  font-size: 15px;
  color: #222222;
  line-height: 50px;
  border-bottom: 1px solid #ebebeb;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 18px;
    left: -15px;
    border-bottom: 6px solid #ffffff;
    border-top: 6px solid #ffffff;
    border-left: 10px solid #156cff;
  }
}
</style>
