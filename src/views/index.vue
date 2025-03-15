<template>
  <div class="app-container">
    <!-- <div class="box">
      <div class="box-item" @click="toExclusion">
        <div class="info">
          <div class="title">不受欢迎名单</div>
          <div class="num">
            <span>待签核</span>
            <div>{{ total }}</div>
          </div>
        </div>
        <el-image class="icon" :src="bushouhuanyingmindan" fit="" :lazy="true"></el-image>
        <div class="round">
          <div class="round1"></div>
          <div class="round2"></div>
          <div class="round3"></div>
        </div>
      </div>
      <div class="box-item" @click="toPatrol">
        <div class="info">
          <div class="title">安全巡查</div>
          <div class="num">
            <span>待签核</span>
            <div>{{ patrolSign }}</div>
          </div>
        </div>
        <el-image class="icon" :src="bushouhuanyingmindan" fit="fill" :lazy="true"></el-image>
        <div class="round">
          <div class="round1"></div>
          <div class="round2"></div>
          <div class="round3"></div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup name="Index">
  import bushouhuanyingmindan from '@/assets/images/bushouhuanyingmindan.png';
  import { getDealtList } from '@/api/exclusion/dealt';
  import { patrolSignList } from '@/api/patrol/dealt';
  import useUserStore from '@/store/modules/user';
  const userStore = useUserStore();
  const router = useRouter();
  function toExclusion() {
    router.push('/dealt/index?type=ExclusionAdmin');
  }
  const toPatrol = () =>{
    router.push('/dealt/index?type=PatrolAdmin');
  }

  const total = ref(0);
  // getDealtList({ pageNum: 1, pageSize: 1000, time: null, state: 1 }).then((res) => {
  //   total.value = res.data.total;
  // });

  // const patrolSign = ref(0);
  // patrolSignList({ pageNum: 1, pageSize: 10, updateBy: userStore.name }).then((res) => {
  //   patrolSign.value = res.total;
  // })
</script>

<style scoped lang="scss">
  .box {
    padding: 10px;
    display: flex;
    .box-item {
      width: 380px;
      height: 222px;
      margin: 0 10px;
      background: linear-gradient(135deg, #007bfe 0%, #6eb4ff 100%);
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      .icon {
        position: absolute;
        bottom: 25px;
        right: 20px;
        z-index: 99;
      }
      .info {
        color: #fff;
        height: 100%;
        padding: 30px 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-weight: 400;
          font-size: 26px;
        }
        .num {
          font-weight: 400;
          font-size: 48px;
          span {
            font-weight: 400;
            font-size: 18px;
          }
        }
      }
      .round {
        position: absolute;
        top: 20px;
        right: -100px;
        height: 300px;
        width: 300px;
        .round1 {
          position: absolute;
          width: 300px;
          height: 300px;
          background: #f6f9ff;
          border-radius: 50%;
          opacity: 0.1;
        }
        .round2 {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 260px;
          height: 260px;
          background: #f6f9ff;
          border-radius: 50%;
          opacity: 0.15;
        }
        .round3 {
          position: absolute;
          top: 40px;
          left: 40px;
          width: 220px;
          height: 220px;
          background: #f6f9ff;
          border-radius: 50%;
          opacity: 0.2;
        }
      }
    }
  }
</style>
