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
          padding: 10px 25px 20px 25px;
          box-shadow: 1px 1px 10px 1px #ebebeb;
        "
      >
        <div>
          <div class="titl">概况</div>
          <div>
            <div>
              <el-form-item prop="door" label="园区："
                >{{ formDataParams.parkName }}
              </el-form-item>
            </div>
          </div>
          <div class="titl" style="margin-top: -5px">园区安全主管信息</div>
          <div class="item-context">
            <div
              class="context-line"
              v-for="(item, index) of formDataParams.parkManagerList"
              :key="index"
            >
              <el-form-item label="工号：">
                <div class="context-info">{{ item.jobNo }}</div>
              </el-form-item>
              <el-form-item label="姓名：">
                <div class="context-info">{{ item.username }}</div>
              </el-form-item>
              <el-form-item label="管理职：">
                <div class="context-info">{{ item.post }}</div>
              </el-form-item>
              <el-form-item label="手机号：">
                <div class="context-info">{{ item.phone }}</div>
              </el-form-item>
              <el-form-item label="座机号：">
                <div class="context-info">{{ item.landline }}</div>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div style="margin: 10px 0">事业群相关信息</div>
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
              
            </div>
            <div style="display: flex; justify-content: space-between;margin-bottom: -30px;">
              <div style="display: flex">
                <div>
                  <el-form-item label="群名称：" label-width="85px">
                    {{ item.groupName }}
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="放假天数：">
                    {{ item.festDay }}
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(items, indexs) of item.festGroupsEpibolyList" :key="indexs">
            <div v-if="items.type == 2" style="margin: 20px 0 -20px 0;">
              <el-form-item color="#000" label="放假日期：" label-width="85px">
                {{ items.festTime }}
              </el-form-item>
            </div>
            <div
              style="
                display: flex;
                margin:0px 0 10px 0;
                align-items: center;
                justify-content: space-between;
              "
              v-if="items.type == 2"
            >
              <div class="titl" style="font-size: 14px;color:#606266">安保状况：</div>
            </div>
            <div
              style="
                border: 1px solid #efefef;
                box-shadow: 1px 1px 10px 1px #efefef;
                border-radius: 5px;
                padding: 10px 25px 0px 25px;
                margin-bottom: 10px;
              "
            >
              <el-form-item v-if="items.name != undefined" label="公司名称："
                >{{ items.name }}
              </el-form-item>

              <el-table
                v-if="items.name != undefined"
                style="width: 100%; margin-top: -10px"
                :data="[{}]"
                :header-cell-style="{ 'text-align': 'center' }"
              >
                <el-table-column prop="date" label="公共区域">
                  <el-table-column prop="state" label="开岗数量">
                    <template #default="scope">
                      <div style="text-align: center">{{ items.publicOpenPost }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="city" label="上岗人力">
                    <template #default="scope">
                      <div style="text-align: center">{{ items.publicOnPost }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="封岗数量">
                    <template #default="scope"
                      ><div style="text-align: center">{{ items.publicClosePost }}</div>
                    </template></el-table-column
                  >
                </el-table-column>
                <el-table-column prop="date" label="生产区域">
                  <el-table-column prop="state" label="开岗数量">
                    <template #default="scope">
                      <div style="text-align: center">{{ items.produceOpenPost }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="city" label="上岗人力">
                    <template #default="scope">
                      <div style="text-align: center">{{ items.produceOnPost }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="封岗数量">
                    <template #default="scope">
                      <div style="text-align: center">
                        {{ items.produceClosePost }}
                      </div></template
                    ></el-table-column
                  >
                </el-table-column>
                <el-table-column prop="date" label="宿舍区域">
                  <el-table-column prop="state" label="开岗数量">
                    <template #default="scope">
                      <div style="text-align: center">{{ items.dormOpenPost }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="city" label="上岗人力">
                    <template #default="scope">
                      <div style="text-align: center">{{ items.dormOnPost }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="封岗数量">
                    <template #default="scope">
                      <div style="text-align: center">{{ items.dormClosePost }}</div>
                    </template></el-table-column
                  >
                </el-table-column>
              </el-table>
              <div
                style="display: flex; padding: 10px 0 0px 0"
                v-if="items.name != undefined"
              >
                <div>
                  <el-form-item label="总封岗数:">
                    {{ items.countPost }}
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="节约人力:">
                    {{ items.thriftPerson }}
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="节约成本:">{{ items.thriftCost }} </el-form-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <el-button type="primary" style="margin-top: 20px" @click="submit">关闭</el-button>
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
import { getCarList } from "@/api/visitor/query";
import { checkParams } from "@/utils";
import { useHolidayType } from "../hooks";
import MyTitle from "@/components/MyTitle";
const router = useRouter();
const route = useRoute();
import { getInfo, updateDayEdit } from "@/api/park/parkInfo";
const { proxy } = getCurrentInstance();
import useUserstore from "@/store/modules/user";
const { outHoliday, getHolidayType } = useHolidayType();
let dialogVisible = ref(false);
let Tips = ref();
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
      festDay: 1, //放假天数
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
        },
      ], //节假日事业群—群外包信息列表
    },
  ], //节假日概况—事业群信息列表
});
function addSYQ() {
  formDataParams.value.festGroupsList.push({
    groupName: "", //事业群名称
    festDay: 1, //放假天数
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
      },
    ], //节假日事
  });
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
      console.log(arrList);

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
            formDataParams.value.festGroupsList[index].festGroupsEpibolyList[
              indexs
            ].type = 2;
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
}
detail();
function submit(params) {
  const obj = { path: "/garden/holidayInfo" };
  proxy.$tab.closeOpenPage(obj);
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
.item-context {
  padding: 10px 0;
  .context-line {
    display: flex;
    justify-content: space-between;
  }
  :deep(.el-form-item) {
    flex: 1;
    margin-bottom: 0;
  }
  :deep(.el-form-item__label) {
    color: #666;
    font-weight: normal;
    justify-content: start;
    padding-right: 5px;
  }
  .context-info {
    color: #333;
    height: 100%;
  }
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
