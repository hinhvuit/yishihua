<!-- 
  @FileDescription: 访客信息详情
  @Date:2024-08-08 11:37:22
  @Author:LZW
-->
<template>
  <div class="app-container container-center">
    <el-form class="box" :model="form" ref="formRef" label-width="80px" :inline="true" v-loading="loading">
      <div class="form-item">
        <MyTitle title="访客信息" />
        <div class="item-context">
          <div class="context-line">
            <el-form-item label="姓名：">
              <div class="context-info">{{ form.visitorName }}</div>
            </el-form-item>
            <el-form-item label="性别：">
              <div class="context-info">{{ getSexType(form.visitorSex)?.label }}</div>
            </el-form-item>
            <el-form-item label="手机号：">
              <div class="context-info">{{ form.visitorPhone }}</div>
            </el-form-item>
          </div>
          <div class="context-line">
            <el-form-item label="证件类型：">
              <div class="context-info">{{ getCardType(form.visitorCardType)?.label }}</div>
            </el-form-item>
            <el-form-item label="证件号：">
              <div class="context-info">{{ form.visitorCard }}</div>
            </el-form-item>
            <el-form-item label="公司名称：">
              <div class="context-info">{{ form.companyName }}</div>
            </el-form-item>
          </div>
          <div class="context-line" v-if="form.visitorPhoto">
            <el-form-item label="照片：">
              <el-image
                :src="form.visitorPhoto"
                fit="contain"
                :preview-src-list="[form.visitorPhoto]"
                style="width: 100px; height: 100px; margin: 0 10px"
              ></el-image>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="form-item" v-if="form.carNum">
        <MyTitle title="随行车辆" />
        <div class="item-context">
          <div class="context-line">
            <el-form-item label="车牌号：">
              <div class="context-info">{{ form.carNum }}</div>
            </el-form-item>
            <el-form-item label="车型：">
              <div class="context-info">{{ form.carType }}</div>
            </el-form-item>
            <el-form-item label="车辆颜色：">
              <div class="context-info">{{ form.carColor }}</div>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="form-item">
        <MyTitle title="申请信息" />
        <div class="item-context">
          <div class="context-line">
            <el-form-item label="访客单号：">
              <div class="context-info">{{ form.number }}</div>
            </el-form-item>
            <el-form-item label="创建时间：">
              <div class="context-info">{{ form.applyTime }}</div>
            </el-form-item>
            <el-form-item label="园区名称：">
              <div class="context-info">{{ useParkStore().getPark(form.park)?.name }}</div>
            </el-form-item>
          </div>
          <div class="context-line">
            <el-form-item label="入厂类型：">
              <div class="context-info">{{ form.visitType }}</div>
            </el-form-item>
            <el-form-item label="来访时间：" style="flex: 2.1">
              <div class="context-info">{{ form.startTime }} 至 {{ form.endTime }}</div>
            </el-form-item>
          </div>
          <div class="context-line">
            <el-form-item label="入厂事由：">
              <div class="context-info">{{ form.visitMsg }}</div>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="form-item">
        <MyTitle title="拜访对象信息" />
        <div class="item-context">
          <div class="context-line">
            <el-form-item label="姓名：">
              <div class="context-info">{{ form.callName }}({{ form.callNo }})</div>
            </el-form-item>
            <el-form-item label="手机号：">
              <div class="context-info">{{ form.callPhone }}</div>
            </el-form-item>
            <el-form-item label="邮箱：">
              <div class="context-info">{{ form.callEmail }}</div>
            </el-form-item>
          </div>
          <div class="context-line">
            <el-form-item label="事业群ID：">
              <div class="context-info">{{ form.callBgId }}</div>
            </el-form-item>
            <el-form-item label="事业群：">
              <div class="context-info">{{ form.callBgName }}</div>
            </el-form-item>
            <el-form-item label="事业处：">
              <div class="context-info">{{ form.callDept }}</div>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="form-item" v-if="form.visitorDoors?.length">
        <MyTitle title="访客进出记录" />
        <div class="item-context">
          <div>
            <el-button
              type="primary"
              link
              size="default"
              @click="changeOrder('door')"
              >{{doorQuery.order == 'desc' ? '倒序' : '正序'}}</el-button
            >
          </div>
          <el-table :data="form.visitorDoors">
            <el-table-column label="园区" prop="park">
              <template #default="scope">{{ useParkStore().getPark(scope.row.park)?.name }} </template>
            </el-table-column>
            <el-table-column label="门岗名称" prop="door" />
            <el-table-column label="鉴权方式">
              <template #default="scope">{{ getAutType(scope.row.type)?.label }} </template>
            </el-table-column>
            <el-table-column label="出入类型">
              <template #default="scope">{{ getOutType(scope.row.outType)?.label }} </template>
            </el-table-column>
            <el-table-column label="出入时间" prop="time" />
          </el-table>
          <pagination
            v-show="doorTotal > 0"
            :total="doorTotal"
            v-model:page="doorQuery.pageNum"
            v-model:limit="doorQuery.pageSize"
            @pagination="getVisitor"
            :autoScroll="false"
          />
        </div>
      </div>
      <div class="form-item" v-if="form.visitorCars?.length">
        <MyTitle title="车辆进出记录" />
        <div class="item-context">
          <div>
            <el-button
              type="primary"
              link
              size="default"
              @click="changeOrder('car')"
              >{{carQuery.order == 'desc' ? '倒序' : '正序'}}</el-button
            >
          </div>
          <el-table :data="form.visitorCars">
            <el-table-column label="园区" prop="park">
              <template #default="scope">{{ useParkStore().getPark(scope.row.park)?.name }} </template>
            </el-table-column>
            <el-table-column label="门岗名称" prop="door" />
            <el-table-column label="车牌号" prop="carNum" />
            <el-table-column label="车型" prop="carType" />
            <el-table-column label="车辆颜色" prop="carColor" />
            <el-table-column label="出入类型">
              <template #default="scope">{{ getOutType(scope.row.type)?.label }} </template>
            </el-table-column>
            <el-table-column label="出入时间" prop="time" />
          </el-table>
          <pagination
            v-show="carTotal > 0"
            :total="carTotal"
            v-model:page="carQuery.pageNum"
            v-model:limit="carQuery.pageSize"
            @pagination="getVisitorCar"
            :autoScroll="false"
          />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup name="VisitorDetail">
  import MyTitle from '@/components/MyTitle';
  import { getVisitorDetail, getVisitorInOut, getVisitorCarInOut } from '@/api/visitor';
  import useParkStore from '@/store/modules/park';
  import { useSexType, useCardType, useOutType, useAutType } from './hooks';
  const { proxy } = getCurrentInstance();
  const route = useRoute();
  const { getSexType } = useSexType();
  const { getCardType } = useCardType();
  const { getOutType } = useOutType();
  const { getAutType } = useAutType();

  const form = ref({});
  const loading = ref(true);

  const doorQuery = ref({
    card: '',
    startTime: '',
    endTime: '',
    pageSize: 10,
    pageNum: 1,
    order: 'desc'
  });
  const doorTotal = ref(0);
  const carQuery = ref({
    car: '',
    startTime: '',
    endTime: '',
    pageSize: 10,
    pageNum: 1,
    order: 'desc'
  });
  const carTotal = ref(0);

  const getForm = async () => {
    const { data } = await getVisitorDetail(route.params.number);
    doorQuery.value.card = data.visitorCard;
    doorQuery.value.startTime = data.startTime;
    doorQuery.value.endTime = data.endTime;
    carQuery.value.car = data.carNum;
    carQuery.value.startTime = data.startTime;
    carQuery.value.endTime = data.endTime;
    if (data) {
      form.value = data;
      loading.value = false;
    } else {
      proxy.$message.error('获取访客信息失败');
    }
    getVisitor();
    getVisitorCar();
  };
  getForm();

  const getVisitor = async () => {
    const data = await getVisitorInOut(doorQuery.value);
    form.value.visitorDoors = data.rows;
    doorTotal.value = data.total;
  };
  const getVisitorCar = async () => {
    if(carQuery.value.car) {
      const data = await getVisitorCarInOut(carQuery.value);
      form.value.visitorCars = data.rows;
      carTotal.value = data.total;
    }
  };

  const changeOrder = (type) => {
    if (type === 'door') {
      doorQuery.value.order = doorQuery.value.order === 'desc' ? 'asc' : 'desc';
      doorQuery.value.pageNum = 1;
      doorQuery.value.pageSize = 10;
      getVisitor();
    } else if (type === 'car') {
      carQuery.value.order = carQuery.value.order === 'desc' ? 'asc' : 'desc';
      carQuery.value.pageNum = 1;
      carQuery.value.pageSize = 10;
      getVisitorCar();
    }
  };
</script>
<style lang="scss" scoped>
  .box {
    padding: 10px 35px;
    margin: 25px auto;
    background: #ffffff;
    box-shadow: 0px 0px 20px 0px rgba(153, 153, 153, 0.3);
    .form-item {
      width: 100%;
      background-color: #ffffff;
      .item-context {
        padding: 10px;
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
    }
  }
</style>
