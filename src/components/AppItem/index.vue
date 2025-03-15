<!-- 
  @FileDescription:首页app卡片
  @params:{
    imgUrl: 图片地址
    name: 系统名称
    park: 开发园区
    pList: 赋能园区
    lList: 开发语言
    cList: 客户端
  }
  @Date:2024-04-16 10:12:49
  @Author:LZW
-->
<template>
  <div class="card">
    <div class="top">
      <el-image class="top_img" :src="imgUrl" fit="cover" loading="lazy"></el-image>
      <div class="tag">{{ park }}</div>
    </div>
    <div class="bottom">
      <div class="name">{{ name }}</div>
      <div class="list">
        <div class="pList">
          <el-image
            style="margin-right: 10px;"
            :src="geduan"
            fit="contain"
          ></el-image>
          <p>{{ pList.join('、') }}</p>
        </div>
        <div class="lList">
          <el-image
            style="margin-right: 10px;"
            :src="yuyan"
            fit="contain"
          ></el-image>
          <p>{{ lList.join('、') }}</p>
        </div>
        <div class="cList">
          <el-image
            style="margin-right: 10px;"
            :src="fenxiang"
            fit="contain"
          ></el-image>
          <p>{{ cList.join('、') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Card">
import geduan from '@/assets/images/geduan.png'
import yuyan from '@/assets/images/yuyan.png'
import fenxiang from '@/assets/images/fenxiang.png'

  const { proxy } = getCurrentInstance();

  const props = defineProps({
    imgUrl: {
      type: String,
      default: 'http://10.173.205.107:9000/banner/TI20240416081723045.png'
    },
    name: {
      type: String,
      default: '标题'
    },
    park: {
      type: String,
      default: '龙华'
    },
    pList: {
      type: Array,
      default: () => []
    },
    lList: {
      type: Array,
      default: () => []
    },
    cList: {
      type: Array,
      default: () => []
    }
  });
</script>
<style lang="scss" scoped>
  .card {
    border: 1px solid #d7d7d78c;
    width: 360px;
    height: 380px;
    /* background-color: #f3f5f7; */
    background-color: #FFFFFF;
    border-radius: 2px;
    overflow: hidden;
    .top {
      position: relative;
      .top_img {
        width:calc(100% - 2 * 15px) ;
        margin: 15px 15px 5px;
        /* height: calc(290px * 9 / 16); */
        height: 200px;
      }
      .tag {
        position: absolute;
        bottom: 20px;
        right: 35px;
        height: 25px;
        padding: 0 6px;
        line-height: 25px;
        background-color: rgba(0, 0, 0, 0.226);
        color: #fff;
        font-size: 12px;
        text-align: center;
        border-radius: 3px;
      }
    }
    .bottom {
      width: 100%;
      // height: calc(260px - 290px * 9 / 16);
      display: flex;
      flex-direction: column;
      padding-left: 15px;
      justify-content: space-between;
      cursor: pointer;
      color: #666666;
      .name {
        font-size: 28px;
        margin-bottom: 5px; 
        margin-top: 5px;
        color: #363D4F;
      }
      .list {
        font-size: 18px;
        color: #6D7783;
        div {
          display: flex;
          align-items: center;
          p {
            margin: 4px 0 4px 3px;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
