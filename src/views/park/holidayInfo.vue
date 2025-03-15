<!-- 
  @FileDescription: 车辆进出记录查询
  @Date:2024-08-07 15:10:56
  @Author:LZW
-->
<template>
  <div class="tab-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item prop="bizKey">
        <el-input
          v-model.trim="queryParams.bizKey"
          placeholder="单号"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="festYear">
        <el-select v-model="queryParams.festYear" placeholder="请选择年份" clearable>
          <el-option
            v-for="item in outyear"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="festName">
        <el-select v-model="queryParams.festName" placeholder="请选择节假日" clearable>
          <el-option
            v-for="item in outHoliday"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="state">
        <el-select v-model="queryParams.state" placeholder="请选择状态" clearable>
          <el-option
            v-for="item in statusType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="listData">
      <el-table-column label="单号" align="center" key="bizKey" prop="bizKey" />
      <el-table-column label="年份" align="center" key="festYear" prop="festYear" />
      <el-table-column
        label="提交截至时间"
        align="center"
        key="deadline"
        prop="deadline"
      />
      <el-table-column label="节假日名称" align="center" key="festName" prop="festName" />
      <el-table-column label="状态" align="center" key="type" prop="type">
        <template #default="scope">
          <el-tag
            :type="
              scope.row.state == 1
                ? ''
                : scope.row.state == -1
                ? 'warning'
                : scope.row.state == -2
                ? 'info'
                : 'success'
            "
            >{{ getStatusType(scope.row.state)?.label }}</el-tag
          ></template
        >
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="primary"
            v-if="scope.row.state == -1"
            link
            @click="handleInfo(scope.row.bizKey, '/garden/holiday/edit')"
            >马上填写提交</el-button
          >
          <el-button
            type="danger"
            v-if="scope.row.state == 1"
            link
            @click="handleInfo(scope.row.bizKey, '/garden/holiday/edit')"
            >修改</el-button
          >
          <el-button
            type="primary"
            link
            v-if="scope.row.state == 4 || scope.row.state == 1 || scope.row.state == 2"
            @click="handleInfo(scope.row.bizKey, '/garden/holiday/detail')"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script setup name="VisitorQueryCar">
import { getCarList } from "@/api/visitor/query";
import { useStstusType } from "./hooks";
import { checkParams } from "@/utils";
const { proxy } = getCurrentInstance();
const { statusType, getStatusType } = useStstusType();
import { useHolidayType, useyearType } from "./hooks";
const { outHoliday, getHolidayType } = useHolidayType();
const { outyear, getyearType } = useyearType();
import useUserstore from "@/store/modules/user";
import { getHolidaylist } from "@/api/park/parkInfo";
const total = ref(0);
const loading = ref(false);
const router = useRouter();
const listData = ref([]);
const time = ref([]);
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  bizKey: "",
  parkName: "", // 门岗名称
  state: "", // 车牌号
  updateBy: "", // 车辆类型
  startTime: "", // 车辆颜色
  endTime: "", // 进出类型 1进 2出
  startTime: "", // 进出时间 -开始
  festName: "", // 进出时间 -结束
  parkKey: useUserstore().getNowPark().id,
});

watch(
  () => time.value,
  (newValue, oldValue) => {
    if (!newValue || newValue.length === 0) {
      queryParams.value.startTime = "";
      queryParams.value.endTime = "";
    } else {
      queryParams.value.startTime = newValue[0];
      queryParams.value.endTime = newValue[1];
    }
  },
  { deep: true }
);

const getList = async () => {
  loading.value = true;
  const data = await getHolidaylist(queryParams.value);
  total.value = data.total;
  listData.value = data.rows;
  loading.value = false;
};
const handleQuery = () => {
  getList();
};
const resetQuery = () => {
  time.value = [];
  proxy.resetForm("queryRef");
};
function handleInfo(id, path) {
  console.log(path);

  router.push(`${path}/${id}`);
}
getList();
</script>
<style lang="scss" scoped>
.tab-container {
  padding: 15px;
}
</style>
