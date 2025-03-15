<template>
  <div class="item-title">
    <!-- <span class="flex-center">{{ id }}</span> -->
    <div class="flex-center">
      <div class="title">{{ title }}
        <span class="blue"></span>
      </div>
    </div>
  </div>
</template>

<script name="HomeTitle" setup>
  const props = defineProps({
    id: {
      type: String
    },
    title: {
      type: String,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .item-title {
    font-family: Source Han Sans CN;
    font-weight: bold;
    font-size: 48px;
    color: #222222;
    
  }
  .flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title{
    /* width:  calc(100% + 30px); */
    .blue {
      margin-top: -8px;
      display: block;
      width: 100%;
      height: 18px;
      background: #c6e5ffe0;
      top: 53px;
    }
  }
</style>
<!-- <template>
  <div class="item-title">
    <span>{{ id }}</span>
    <div>{{ title }}</div>
  </div>
</template>

<script name="HomeTitle" setup>
  const props = defineProps({
    id: {
      type: String
    },
    title: {
      type: String,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .item-title {
    font-family: Source Han Sans CN;
    font-weight: bold;
    font-size: 48px;
    color: #222222;
    position: relative;
    div {
      width: 240px;
      position: absolute;
      top: -60px;
      left: -120px;
      text-align: center;
    }
    span {
      display: block;
      width: 77px;
      height: 67px;
      font-weight: 600;
      font-size: 78px;
      color: #f2f2f2;
      line-height: 42px;
      position: absolute;
      left: -50px;
      bottom: 0px;
    }
    &::before {
      content: '';
      display: block;
      width: 190px;
      height: 18px;
      background: #c6e5ff;
      position: absolute;
      left: -97px;
      bottom: -2px;
    }
  }
</style> -->
