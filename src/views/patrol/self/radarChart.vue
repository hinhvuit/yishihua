<!-- 
  @FileDescription: 雷达图
  @params:{}
  @Date:2024-10-09 18:35:36
  @Author:LZW
-->
<template>
  <div class="app-container box" >
    <div class="info" v-if="loading">
      <div class="item">
        <span class="label">园区</span>
        <span class="context">{{ useParkStore().getPark(data.park)?.name }}</span>
      </div>
      <div class="item">
        <span class="label">月份</span>
        <span class="context">{{ data.month }}</span>
      </div>
      <div class="item">
        <span class="label">园区安全主管</span>
        <span class="context">{{ data.parkBoss }}</span>
      </div>
      <div class="item">
        <span class="label">园区窗口</span>
        <span class="context">{{ data.parkWindow }}</span>
      </div>
      <div class="item">
        <span class="label">提交时间</span>
        <span class="context">{{ data.applyTime }}</span>
      </div>
    </div>
    <div class="chart" ref="chartDom" style="width: 1000px; height: 800px"></div>
  </div>
</template>

<script setup>
  import * as echarts from 'echarts';
  import { getSelfPatrolRadar } from '@/api/patrol';
  import useParkStore from '@/store/modules/park';
  const route = useRoute();
  const { proxy } = getCurrentInstance();
  const myData = ref({
    name: '',
    value: [],
    areaStyle: {
      color: 'rgba(112, 136, 207, 0.6)'
    }
  });
  const loading = ref(false);
  const data = ref();
  const indicator = ref([]);
  const chartDom = ref(null);
  let myChart = null;
  let option = {
    title: {
      text: ''
    },
    // legend: {
    //   data: ['Allocated Budget', 'Actual Spending']
    // },
    radar: {
      // shape: 'circle',
      indicator: indicator.value
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [myData.value]
      }
    ]
  };

  const renderChart = () => {
    myChart && myChart.dispose();
    myChart = echarts.init(chartDom.value);
    myChart.setOption(option);
  };

  const getData = async () => {
    const { data: res } = await getSelfPatrolRadar({ number: route.params.number });
    data.value = res;
    myData.value.name = useParkStore().getPark(res.park)?.name;
    res.radar.forEach((item) => {
      myData.value.value.push(Math.floor((item.count / item.total) * 100));
      indicator.value.push({ name: item.name, max: 100 });
    });
    renderChart();
    loading.value = true;
  };

  onMounted(() => {
    getData();
  });
  onUnmounted(() => {
    myChart && myChart.dispose();
  });
</script>
<style lang="scss" scoped>
  .box {
    display: flex;
    justify-content: space-between;
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-top: 100px;
      margin-left: 120px;
      .item {
        margin: 30px 0;
      }
      .label {
        display: inline-block;
        font-size: 24px;
        color: #666;
        width: 160px;
      }
      .context {
        font-size: 24px;
        color: #333;
        font-weight: 700;
      }
    }
  }
</style>
