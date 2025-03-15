<!-- 
  @FileDescription: 车辆进出记录查询
  @Date:2024-08-07 15:10:56
  @Author:LZW
-->
<template>
  <div class="tab-container">
    <div
      style="text-align: center; padding: 20% 0"
      v-if="formDataParams.updateBy == null"
    >
      <img src="@/assets/images/wuneirong.png" alt="" />
      <div style="font-size: 14px; color: #999">无内容</div>
      <div>
        <el-button
          type="primary"
          @click="handleInfo(formDataParams.bizKey)"
          style="margin-top: 10px"
          >完善园区信息</el-button
        >
      </div>
    </div>
    <div v-if="formDataParams.updateBy != null">
      <div style="margin-bottom: 10px">园区相关信息</div>
      <el-form label-position="left" :model="formDataParams" ref="formRef" :inline="true">
        <div
          style="
            border: 1px solid #ebebeb;
            border-radius: 5px;
            box-shadow: 1px 1px 10px 1px #ebebeb;
            padding: 15px 25px;
          "
        >
          <div>
            <div class="titl">概况</div>
            <div class="item-context">
              <div class="context-line">
                <el-form-item label="园区：">
                  <div class="context-info">{{ formDataParams.parkName }}</div>
                </el-form-item>
                <el-form-item label="占地面积：">
                  <div class="context-info" v-if="formDataParams.area">
                    {{ formDataParams.area }}平方千米
                  </div>
                </el-form-item>
                <el-form-item label="建筑性质：">
                  <div class="context-info">{{ formDataParams.buildType }}</div>
                </el-form-item>
              </div>
            </div>
          </div>
          <div>
            <div class="titl">楼栋数量</div>
            <div class="item-context">
              <div class="context-line">
                <el-form-item label="生产楼栋：">
                  <div class="context-info">{{ formDataParams.buildProduce }}</div>
                </el-form-item>
                <el-form-item label="宿舍：">
                  <div class="context-info">{{ formDataParams.buildDorm }}</div>
                </el-form-item>
                <el-form-item label="其他：">
                  <div class="context-info">{{ formDataParams.buildOther }}</div>
                </el-form-item>
              </div>
            </div>
          </div>
          <div>
            <div class="titl">一线出入口类型及数量</div>
            <div class="item-context" style="display: flex">
              <div class="context-line">
                <el-form-item label="海关闸口：" style="width: 800px">
                  <div class="context-info">{{ formDataParams.gateCustoms }}</div>
                </el-form-item>
                <el-form-item label="机动车：" style="width: 800px">
                  <div class="context-info">{{ formDataParams.gateVehicle }}</div>
                </el-form-item>
                <el-form-item label="人员：">
                  <div class="context-info">{{ formDataParams.gatePerson }}</div>
                </el-form-item>
              </div>
              <el-form-item label="混合：">
                <div class="context-info">{{ formDataParams.gateMix }}</div>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="titl">园区安全管理人力</div>
            <div class="item-context">
              <div class="context-line">
                <el-form-item label="公共区域：">
                  <div class="context-info">{{ formDataParams.personPublic }}</div>
                </el-form-item>
                <el-form-item label="生产区域：">
                  <div class="context-info">{{ formDataParams.personCustoms }}</div>
                </el-form-item>
                <el-form-item label="合计：">
                  <div class="context-info">
                    {{
                      Number(formDataParams.personPublic) +
                      Number(formDataParams.personCustoms)
                    }}
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>
          <div v-if="formDataParams.parkEpibolyList.length != 0">
            <div class="titl">保安状况</div>
            <div
              class="item-context"
              v-for="(item, index) of formDataParams.parkEpibolyList"
              :key="index"
            >
              <el-form-item label="公司全称：">
                <div class="context-info">{{ item.name }}</div>
              </el-form-item>
              <div class="context-line">
                <el-form-item label="公共区域岗位数：">
                  <div class="context-info">{{ item.publicPost }}</div>
                </el-form-item>
                <el-form-item label="公共区域人力：">
                  <div class="context-info">{{ item.publicPerson }}</div>
                </el-form-item>
              </div>
              <div class="context-line">
                <el-form-item label="宿舍区域岗位数：">
                  <div class="context-info">{{ item.dormPost }}</div>
                </el-form-item>
                <el-form-item label="宿舍区域人力：">
                  <div class="context-info">
                    {{ item.dormPerson }}
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>
          <div>
            <div class="titl">园区安全主管信息</div>
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
                  <div class="context-info" style="width: 150px">{{ item.phone }}</div>
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
            padding: 15px 25px;
            box-shadow: 1px 1px 10px 1px #ebebeb;
            margin-bottom: 10px;
          "
        >
          <div v-for="(item, index) of formDataParams.parkGroupList" :key="index">
            <div class="oodd">事业群{{ index + 1 }}</div>
            <div>
              <div class="titl">概况</div>
              <div class="item-context">
                <div class="context-line">
                  <el-form-item label="群名称：">
                    <div class="context-info">{{ item.groupName }}</div>
                  </el-form-item>
                  <el-form-item label="正式工：">
                    <div class="context-info">{{ item.employ }}</div>
                  </el-form-item>
                  <el-form-item label="派遣工：">
                    <div class="context-info">{{ item.epiboly }}</div>
                  </el-form-item>
                </div>
                <div class="context-line">
                  <el-form-item label="产品：">
                    <div class="context-info">{{ item.produce }}</div>
                  </el-form-item>
                  <el-form-item label="客户：">
                    <div class="context-info">{{ item.custom }}</div>
                  </el-form-item>
                  <el-form-item label="制程：">
                    <div class="context-info">{{ item.process }}</div>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div>
              <div class="titl">安保状况</div>
              <div class="item-context">
                <div
                  class="context-line"
                  v-for="(items, indexs) of item.parkGroupEpibolyList"
                  :key="index"
                >
                  <el-form-item label="公司全称：">
                    <div class="context-info">{{ items.name }}</div>
                  </el-form-item>
                  <el-form-item label="岗位数：">
                    <div class="context-info">{{ items.post }}</div>
                  </el-form-item>
                  <el-form-item label="人力：">
                    <div class="context-info">{{ items.person }}</div>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div>
              <div class="titl">生产安全主管信息</div>
              <div class="item-context">
                <div v-for="(sitem, index) of item.parkGroupPersonList" :key="index">
                  <div class="context-line" v-if="sitem.bizType == 1">
                    <el-form-item label="工号：">
                      <div class="context-info">{{ sitem.jobNo }}</div>
                    </el-form-item>
                    <el-form-item label="姓名：">
                      <div class="context-info">{{ sitem.username }}</div>
                    </el-form-item>
                    <el-form-item label="管理职：">
                      <div class="context-info">{{ sitem.post }}</div>
                    </el-form-item>
                    <el-form-item label="手机号：">
                      <div class="context-info" style="width: 150px">
                        {{ sitem.phone }}
                      </div>
                    </el-form-item>
                    <el-form-item label="座机号：">
                      <div class="context-info">{{ sitem.landline }}</div>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="titl">生产安全窗口信息</div>
              <div class="item-context" style="margin-bottom: 10px;">
                <div v-for="(sitem, index) of item.parkGroupPersonList" :key="index">
                  <div class="context-line" v-if="sitem.bizType == 2">
                    <el-form-item label="工号：">
                      <div class="context-info">{{ sitem.jobNo }}</div>
                    </el-form-item>
                    <el-form-item label="姓名：">
                      <div class="context-info">{{ sitem.username }}</div>
                    </el-form-item>
                    <el-form-item label="管理职：">
                      <div class="context-info">{{ sitem.post }}</div>
                    </el-form-item>
                    <el-form-item label="手机号：">
                      <div class="context-info" style="width: 150px">
                        {{ sitem.phone }}
                      </div>
                    </el-form-item>
                    <el-form-item label="座机号：">
                      <div class="context-info">{{ sitem.landline }}</div>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div v-if="formDataParams.updateBy">
      <div style="display: flex; margin: 10px 0px; align-items: center">
        <div style="width: 80px">操作人：</div>
        <div>{{ formDataParams.updateName }}（{{ formDataParams.updateBy }}）</div>
      </div>
      <div style="display: flex; margin: 10px 0px; align-items: center">
        <div style="width: 80px">操作时间：</div>
        <div>{{ formDataParams.updateTime }}</div>
      </div>
    </div>
    <el-button
      type="primary"
      @click="handleInfo(formDataParams.bizKey)"
      style="margin-top: 10px"
      v-if="formDataParams.updateBy"
      >去修改</el-button
    >
  </div>
</template>

<script setup>
import { getCarList } from "@/api/visitor/query";
import { checkParams } from "@/utils";

import MyTitle from "@/components/MyTitle";
const router = useRouter();
const { proxy } = getCurrentInstance();
import useUserstore from "@/store/modules/user";
import { listParkInfo } from "@/api/park/parkInfo";
const formDataParams = ref({
  door: "",
  bizKey: "", // 表单单号
  parkName: useUserstore().getNowPark().name, // 园区名称
  area: 0, // 占地面积
  buildType: "", // 建筑性质
  buildProduce: 0, // 生产楼栋
  buildDorm: 0, // 宿舍楼栋
  buildOther: 0, // 其他楼栋
  gateCustoms: 0, // 海关闸口出入口数量
  gateVehicle: 0, // 机动车出入口数量
  gatePerson: 0, // 人员出入口数量
  gateMix: 0, // 混合出入口数量
  personPublic: 0, // 公共区域
  personCustoms: 0, // 生产区域 // 园区安全主管人员列表
  parkEpibolyList: [
    {
      name: "",
      publicPost: 0,
      publicPerson: 0,
      dormPost: 0,
      dormPerson: 0,
    },
  ],
  parkManagerList: [], // 园区事业群列表
  parkGroupList: [
    {
      groupName: "", // 事业群名称
      employ: 0, // 正式工
      epiboly: 0, // 派遣工
      produce: "", // 产品
      custom: "", // 客户
      process: "", // 制程 // 外包公司列表
      parkGroupEpibolyList: [
        {
          name: "", // 公司名称
          post: 0, // 岗位数
          person: 0, // 人力
        },
      ], // 事业群人员列表
      parkGroupPersonList: [
        {
          bizType: 1, // 人员类型 [ 1：生产安全主管、2：生产安全窗口 ]
          username: "", // 名称
          jobNo: "", // 工号
          post: "", // 管理职位
          phone: "", // 手机号
          landline: "", // 座机号
        },
        {
          bizType: 2, // 人员类型 [ 1：生产安全主管、2：生产安全窗口 ]
          username: "", // 名称
          jobNo: "", // 工号
          post: "", // 管理职位
          phone: "", // 手机号
          landline: "", // 座机号
        },
      ],
    },
  ],
});

function handleInfo(id) {
  router.push(`/garden/edit/${id}`);
}
function detail(params) {
  listParkInfo({ parkKey: useUserstore().getNowPark().id }).then((res) => {
    formDataParams.value = res.data;
  });
}
detail();
</script>
<style lang="scss" scoped>
.tab-container {
  padding: 15px;
  width: 70vw;
}
.lineBox {
  display: flex;
  margin-bottom: 15px;
}
.item-context {
  padding: 10px 0;
  .context-line {
    display: flex;
    width: 800px;
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
