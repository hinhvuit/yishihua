<!-- 首页 -->
<template>
  <main class="main">
    <div class="main-bg" :style="{ background: `url(${top})` }">
      <div class="bg-text">
        <div>{{$t('public.foxconn')}}</div>
        <span>{{$t('public.title1')}}{{ getNowFormatDate() }}</span>
      </div>
    </div>
    <div class="pending" v-if="userStore.nickName">
      <div class="pend-user">{{ userStore.nickName }}{{$t('public.welcome')}} </div>
      <div class="pend-line"></div>
      <div class="pend-info" @click="toIndex" v-if="language == 'zh'">
        您有 <span>{{ total + patrolSign }}</span> 笔待签核申请，其中访客业务
        <span>{{ total }}</span> 笔，物品放行 <span>{{ patrolSign }}</span> 笔，请及时处理!
      </div>
      <div class="pend-info" @click="toIndex" v-if="language == 'en'">
        You have <span>{{ total + patrolSign }}</span> application(s) to be approved,including
        <span>{{ total }}</span> for Visitors and <span>{{ patrolSign }}</span> for Material Release.Please deal with them in time!
      </div>
    </div>
    <div class="pending" v-else>
      <div class="pend-user">{{$t('public.title2')}}</div>
      <div class="pend-line"></div>
      <div class="no-login">
        {{$t('public.click')}}
        <el-button style="font-size: 24px; color: #005bac" link @click="toLogin">【{{$t('public.Login')}}】</el-button>
        {{$t('public.view')}} 
      </div>
    </div>
    <div class="tabs">
      <div class="tabs-top">
        <ParkSelect />
        <div class="tabs-line"></div>
        <div class="tabs-nav">
          <div class="scroll-box" ref="listDiv">
            <template v-for="item in menu">
              <span v-if="!item.nav" :data-menupath="item.path" :class="{ activeCss: active?.path == item.path }"
                class="nav-item" @click="navClick">{{ item.meta.title }}</span>
            </template>
          </div>
          <el-icon class="arrow-right" @click="aaa" >
            <DArrowRight />
          </el-icon>
        </div>
        <div></div>
      </div>
      <div class="tabs-box">
        <template v-for="(item, index) in myRouter?.children">
          <div class="tabs-box-item" v-if="item.meta.isHome" @click="toRouter(item.path)">
            <el-image :src="getAssetsFile(`${item.meta.image}.png`)"></el-image>
            <span>{{ item.meta.title }}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="fwgg bg-b">
      <HomeTitle id="01" :title="$t('public.SecurityDynamics')"></HomeTitle>
      <div class="carousel">
        <el-carousel height="400px" :interval="4000" type="card">
          <el-carousel-item v-for="item in fwgg" :key="item.id" @click="openFile(item.fileUrl)">
            <el-image class="carousel-image" :src="item.smallFileUrl" fit="fill" :lazy="true"></el-image>
            <div class="carousel-text">
              <div class="carousel-title">
                {{ item.title }}
              </div>
              <div class="carousel-time">{{ item.showTime }}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- <div class="jsgx">
      <HomeTitle id="02" title="技术共享"></HomeTitle>
      <div class="jsgx-box">
        <template v-for="item in jsgx">
          <div class="app-item">
            <app-item @click="toInfo(item.fid)" :imgUrl="item.fileMain.coverUrl" :name="item.fileMain.fName"
              :park="useParkStore().getPark(parseInt(item.fileMain.fPid))?.name" :pList="item.fileMain.empowerParkList"
              :lList="item.fileMain.devLanguageList" :cList="item.fileMain.clientList"></app-item>
          </div>
        </template>
      </div>
      <el-button type="info" text bg size="large" @click="router.push('/home/share')">更多 >></el-button>
    </div> -->
    <div class="zcwj bg-b">
      <HomeTitle id="03" :title="$t('public.PolicyDocument')"></HomeTitle>
      <div class="zcwj-table">
        <el-table :data="zzcw" style="width: 1380px">
          <el-table-column type="index" :label="$t('public.SerialNumber')" align="center" width="125" />
          <el-table-column prop="title" :label="$t('public.FlieName')" width="600" header-align="center" />
          <el-table-column prop="indexType" :label="$t('public.type')" align="center" width="230" />
          <el-table-column prop="createTime" :label="$t('public.UpdateTime')" align="center" width="230" />
          <el-table-column :label="$t('public.Operating')" align="center" >
            <template #default="scope">
              <el-button type="primary" link size="default" @click="openFile(scope.row.fileUrl)">{{ $t('public.Preview') }}</el-button>
              <el-button type="primary" link size="default" @click="downloadFile(scope.row.fileUrl)">{{ $t('public.Download') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" small layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="tableTotal" />
      </div> 
    </div>
    <div class="czwj"> 
      <div class="file-title">
        <div class="file-title-text">{{ $t('public.OperationInstruction') }}</div>
      </div>
      <div class="file">
        <div class="file-item">
          <div v-for="item in cczy" class="url-item" @click="openFile(item.fileUrl)">
            <p>{{ item.title }}</p>
          </div>
          <img class="mark-left" src="@/assets/images/left.png" />
          <img class="mark-right" src="@/assets/images/rigth.png" />
        </div>
      </div>
    </div>
    <!-- <div class="lxfs bg-b">
      <div class="lxfs-box">
        <div class="phone">
          <div class="phone-left">
            <div class="aqzc-logo">
              <el-image :src="logo" fit="fill" :lazy="true" style="width: 94px; height: 94px"></el-image>
            </div>
            <div class="aqzc-left">
              <div class="aqzc-phone">
                <span>7*24小时服务电话</span>
                <div>560-64653</div>
              </div>
              <div class="aqzc-emil">
                <span>反馈建议</span>
                <div>aq-jsyf01@mail.foxconn.com</div>
              </div>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="code">
          <el-image :src="ewm" fit="fill" :lazy="true" style="width: 245px; height: 245px"></el-image>
          <div>安全总处微信公众号</div>
        </div>
      </div>
    </div> -->
  </main>
</template>

<script setup name="Home">
import { getApplicationEnterGuestPage} from "@/api/india/visitors/business.js";
import { reviewedList } from '@/api/india/goods/goods'
import logo from '@/assets/images/logo_1.png';
import ewm from '@/assets/images/ewm.png';
import top from '@/assets/images/top.jpg';
import { getDealtList, getFileList } from '@/api/exclusion/dealt';
import { patrolSignList } from '@/api/patrol/dealt';
import { selectBanner } from '@/api/share';
import { openFile } from '@/api/public';
import { trendsRouters } from '@/router';
import AppItem from '@/components/AppItem/index';
import HomeTitle from './components/HomeTitle.vue';
import { ElNotification } from 'element-plus';
import ParkSelect from './components/ParkSelect/index.vue';
import useUserStore from '@/store/modules/user';
import usePermissionStore from '@/store/modules/permission';
import { deepClone, getAssetsFile } from '@/utils';
import useParkStore from '@/store/modules/park';
import { getToken, setToken } from '@/utils/auth';
useParkStore().getAllPark();

const { proxy } = getCurrentInstance();
const userStore = useUserStore();
const usePermission = usePermissionStore();
const router = useRouter();
const route = useRoute();

const total = ref(0);
// userStore.nickName &&
//   getDealtList({ pageNum: 1, pageSize: 10, time: null, state: 1 }).then((res) => {
//     total.value = res.data.total;
//   });
// JSON.stringify(queryParams.value)
// queryParams.value.employeeNo = useUserStore().name
userStore.nickName &&
  getApplicationEnterGuestPage({
    pageCount:1, pageSize:1000, status:'7',
    employeeNo: userStore.name,
  }).then(response => {
    total.value = response.total
    })

const patrolSign = ref(0);
userStore.nickName &&
  reviewedList({
    pageNum: 1,pageSize: 10,
  }).then(Response => {
    patrolSign.value = Response.total
  })
// userStore.nickName &&
//   patrolSignList({ pageNum: 1, pageSize: 10, updateBy: userStore.name }).then((res) => {
//     patrolSign.value = res.total;
//   });

const tableTotal = ref(0);
const queryData = ref({
  pageNum: 1,
  pageSize: 10,
  type: 2
});
const fwgg = ref([]);
const zzcw = ref([]);
const cczy = ref([]);
const cjwt = ref([]);
const jsgx = ref([]);
let fileTypeList = [
  { pageNum: 1, pageSize: 5, type: 1 },
  { pageNum: 1, pageSize: 10, type: 3 }
  // { pageNum: 1, pageSize: 7, type: 4 }
];

Promise.all([
  ...fileTypeList.map((item) => {
    return getFileList(item);
  }),
  // selectBanner()
]).then((res) => {
  fwgg.value = res[0].data.records;
  cczy.value = res[1].data.records;
  // cjwt.value = res[2].data.records;
  // jsgx.value = res[2].data.slice(0, 4);
});

function getTable() {
  getFileList(queryData.value).then((res) => {
    tableTotal.value = res.data.total;
    zzcw.value = res.data.records;
  });
}
function handleSizeChange(val) {
  queryData.value.pageSize = val;
  getTable();
}
function handleCurrentChange(val) {
  queryData.value.pageNum = val;
  getTable();
}
getTable();
function toIndex() {
  router.push('/dealt/index');
}
function toLogin() {
  if (userStore.nickName) return;
  router.push(`/login?redirect=${route.fullPath}`);
}
const language = ref('')
function getNowFormatDate() {
  language.value = localStorage.locale;
  console.log("localStorage.locale",localStorage.locale);
  if (localStorage.locale == "zh") {
    let date = new Date(),
      year = date.getFullYear(), //获取完整的年份(4位)
      month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
      strDate = date.getDate(); // 获取当前日(1-31)
    if (month < 10) month = `0${month}`; // 如果月份是个位数，在前面补0
    if (strDate < 10) strDate = `0${strDate}`; // 如果日是个位数，在前面补0
    return `${year}年${month}月${strDate}日`;
  }
  if (localStorage.locale == "en") {
    let date = new Date();
        // 使用toLocaleDateString方法格式化日期
        let formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    return formattedDate;
  }

}
function downloadFile(url) {
  location.href = url;
}
function toInfo(id) {
  router.push({
    path: '/home/shareInfo/' + id
  });
}

const menu = ref(deepClone(trendsRouters));
const active = ref(menu.value[0]);
const myRouter = computed(() => filterRouter(deepClone(trendsRouters), active.value.name));
const permissionRouter = computed(() => filterRouter(deepClone(usePermission.indexRouters), active.value.name));

function navClick(e) {
  let path = e.target.dataset.menupath;
  active.value = menu.value.filter((item) => item.path === path)[0];
  let token=getToken()
  // if(path==="/safe/index"){
  //   window.open(`http://10.46.75.120:443/safe/login?token=${token}`, '_blank')
  // }
  // if(path==="/acust/index"){
  //   window.open(`https://safe.efoxconn.com/?token=${token}&country=YD`, '_blank')
  // }
}


function filterRouter(routers, name) {
  const res = routers.find((item) => {
    return name === item.name;
  });
  if (res && res.children && res.children.length > 0) {
    res.children = res.children.filter((item) => {
      return item.meta.isHome;
    });
    return res;
  }
  return res;
}

function toRouter(path) {
  let token=getToken()
  console.log('path11222', path);
  if (!userStore.nickName) {
    ElNotification({
      title: proxy.$t('public.Tips'),
      message: proxy.$t('public.pleaseLogin'),
      type: 'warning'
    });
    return;
  }

  if (!permissionRouter.value) {
    ElNotification({
      title: proxy.$t('public.Tips'),
      message: proxy.$t('public.NoParkPermission'),
      type: 'warning'
    });
    return;
  }

  let result = myRouter.value.children.find((item) => {
    if (item.path === path) {
      return item;
    }
  });
  if (result.redirect) {
    router.push(result.redirect);
  } else {
    console.log('myRouter.value.path', myRouter.value.path);
    if (myRouter.value.path == '/safe') {
      return window.open(`http://10.46.75.120:443/safe/login?token=${token}`, '_blank')
    }
    if (myRouter.value.path == '/acust') {
      return window.open(`https://safe.efoxconn.com/?token=${token}&country=YD`, '_blank')
    }
    router.push(`${myRouter.value.path}/${path}`);
  }
}

onMounted(() => {
  setScroolFun();
});
const listDiv = ref();
/*容器绑定鼠标滚轮事件*/
function setScroolFun() {
  //绑定的容器
  // this.documentObj = document.getElementById('jjListDiv'); // 获取DOM元素节点
  // 添加监听事件（不同浏览器，事件方法不一样，所以可以作判断，也可以如下偷懒）
  listDiv.value.addEventListener('DOMMouseScroll', handlerMouserScroll, false); //滚轮事件
  listDiv.value.addEventListener('mousewheel', handlerMouserScroll, false); //滚轮事件
}
function handlerMouserScroll(event) {
  console.log('event', event);
  //获取滚轮跨距，兼容获取方式
  let detail = event.wheelDelta || event.detail || event.wheelDeltaY;
  /*反向*/
  let moveForwardStep = -1;
  /*正向*/
  let moveBackStep = 1;
  let step = 0;
  //如果跨步大于0，表明正向跨步，将跨步放大100倍，改变滑动速度，如果跨步小于0，表明反向跨步，将跨步放大500倍，改变滑动速度
  step = detail > 0 ? moveForwardStep * 80 : moveBackStep * 80;
  /*覆盖当前滚动条的位置,单位是像素，叠增或剃减*/
  listDiv.value.scrollLeft = listDiv.value.scrollLeft + step;

  //平滑值(越小越慢，不能小于等于0)
  let slipNum = 0.8;
  //末尾值（越小，则越平稳，越大越仓促）
  let endNum = 5;
  /*递减步伐值*/
  let decreasingPaceNum = step;
  /*速度*/
  let paceNum = 60;

  /*效果一*/
  // let t = setInterval(() => {
  //   if (Math.abs(decreasingPaceNum) < endNum) {
  //     clearInterval(t);
  //     return;
  //   }
  //   decreasingPaceNum = decreasingPaceNum * slipNum;
  //   listDiv.value.scrollLeft = listDiv.value.scrollLeft + decreasingPaceNum;
  // }, paceNum);

  /*效果二*/
  for (let i = 1; Math.abs(decreasingPaceNum) > endNum; i++) {
    decreasingPaceNum = decreasingPaceNum * slipNum;
    setTimeout(() => {
      listDiv.valuescrollLeft = listDiv.value.scrollLeft + decreasingPaceNum;
    }, i * paceNum);
  }
}
const scrollLeftDefault = ref(0);
const scrollLeftBoolen = ref(true);
function aaa() {
  console.log("listDiv.value",listDiv.value.scrollLeft);
  //默认增加
  if (scrollLeftBoolen.value ) {
    listDiv.value.scrollLeft = listDiv.value.scrollLeft + 200;
    console.log('滚动条自增', listDiv.value.scrollLeft);
    if (listDiv.value.scrollLeft == scrollLeftDefault.value) {
      console.log('最大值');
      scrollLeftBoolen.value = false;
    }
  }
  if (!scrollLeftBoolen.value ) {
    listDiv.value.scrollLeft = listDiv.value.scrollLeft - 200;
    if (listDiv.value.scrollLeft <= 0) {
      scrollLeftBoolen.value = true;
    }
  }
  scrollLeftDefault.value = listDiv.value.scrollLeft;
  console.log('上次默认值',scrollLeftDefault.value);
  
}

</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;

  .main-bg {
    height: 500px;
    width: 1920px;
    background-repeat: no-repeat;
    background-size: 1920px 100%;
    background-origin: content-box;
    display: flex;
    justify-content: center;
    align-items: center;

    .bg-text {
      color: #ffffff;
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;

      div {
        font-size: 68px;
        margin-bottom: 20px;
      }

      span {
        font-size: 32px;
      }
    }
  }

  .pending {
    position: absolute;
    top: 415px;
    width: 1000px;
    height: 180px;
    padding: 32px 0 32px 0;
    background: #ffffff;
    box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .pend-user {
      font-weight: 400;
      font-size: 32px;
      color: #292929;
      text-align: center;
    }

    .pend-line {
      width: 130px;
      height: 3px;
      background: #005aa8;
    }

    .no-login {
      font-size: 24px;
      color: #292929;
      display: flex;
      align-items: baseline;
    }

    .pend-info {
      padding: 0 20px;
      font-weight: 400;
      font-size: 24px;
      color: #292929;
      cursor: pointer;

      span {
        font-size: 36px;
        color: #fa8801;
      }
    }
  }

  .tabs {
    width: 100%;
    padding-top: 180px;
    padding-bottom: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .tabs-top {
      width: 1000px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .tabs-line {
        height: 48px;
        background: #378eef;
        border: 2px solid #f2f2f2;
        margin: 0 20px;
      }

      .tabs-nav {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .scroll-box {
          width: 730px;
          white-space: nowrap;
          overflow: auto;
          scrollbar-width: none;
          /* firefox */
          -ms-overflow-style: none;
          /* IE 10+ */
          overscroll-behavior: contain;

          &::-webkit-scrollbar {
            display: none;
            /* Chrome Safari */
          }

          .nav-item {
            display: inline-block;
            padding: 15px 30px;
            font-size: 24px;
            border-radius: 30px;
            cursor: pointer;
          }

          .activeCss {
            color: #fff;
            background-color: #005bac;
          }
        }

        .arrow-right {
          margin-top: 5px;
          cursor: pointer;
        }
      }
    }

    .tabs-box {
      width: 1200px;
      margin-top: 50px;
      height: 250px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .tabs-box-item {
        flex: 1;
        height: 250px;
        margin: 0 20px;
        background: #ffffff;
        border-radius: 7px;
        box-shadow: #33333310 0px 0px 23px 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &:hover {
          box-shadow: #33333333 0px 0px 23px 0px;
        }

        span {
          margin-top: 25px;
          font-size: 22px;
          color: #333333;
        }
      }
    }
  }

  .fwgg {
    width: 100%;
    padding-top: 120px;
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .carousel {
      width: 1480px;
      margin-top: 65px;

      :deep(.el-carousel__container) {
        margin-bottom: 10px;
      }

      .el-carousel__item {
        background: #ffffff;
        box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.08);

        .carousel-image {
          width: 100%;
          height: 280px;
        }

        .carousel-text {
          box-sizing: border-box;
          height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 25px;

          .carousel-title {
            font-weight: 400;
            font-size: 26px;
            color: #363d4f;
            line-height: 31px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .carousel-time {
            font-weight: 400;
            font-size: 16px;
            color: #6d7783;
            line-height: 21px;
          }
        }
      }
    }
  }

  .jsgx {
    width: 100%;
    padding-top: 120px;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .jsgx-box {
      width: 1480px;
      margin-top: 60px;
      margin-bottom: 30px;
      display: flex;
      justify-content: center;

      .app-item {
        margin-right: calc(40px / 3);

        &:last-child {
          margin-right: 0px;
        }
      }
    }
  }

  .zcwj {
    width: 100%;
    padding-top: 120px;
    padding-bottom: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .zcwj-table {
      width: 1480px;
      margin-top: 70px;
      padding: 50px 50px 30px 50px;
      background: #ffffff;
      box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.08);

      .pagination {
        margin-top: 30px;

        :deep.el-pagination {
          justify-content: end;
        }
      }
    }
  }

  .czwj {
    width: 100%;
    padding: 75px 0 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .file-title {
      width: 1480px;
      border-bottom: 1px solid #005bac;
      display: flex;
      justify-content: center;

      .file-title-text {
        font-weight: 400;
        font-size: 24px;
        color: #ffffff;
        line-height: 55px;
        text-align: center;
        width: 350px;
        height: 50px;
        background: #005bac;
        position: relative;

        &::before {
          content: '';
          display: block;
          border-top: 25px solid #005bac;
          border-bottom: 25px solid #005bac;
          border-left: 25px solid #fff;
          position: absolute;
          left: -25px;
          top: 0;
        }

        &::after {
          content: '';
          display: block;
          border-top: 25px solid #005bac;
          border-bottom: 25px solid #005bac;
          border-right: 25px solid #fff;
          position: absolute;
          right: -25px;
          top: 0;
        }
      }
    }

    .file {
      display: flex;

      .file-item {
        width: 1250px;
        background: #ffffff;
        margin: 60px;
        box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.08);
        position: relative;
        padding: 65px 0;
        padding-left: 110px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .url-item {
          width: 555px;
          font-weight: 400;
          font-size: 22px;
          color: #333333;
          height: 38px;
          line-height: 38px;
          position: relative;

          p {
            cursor: pointer;
            margin: 0;
          }

          &::before {
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            background: #005aa8;
            border-radius: 50%;
            position: absolute;
            left: -20px;
            top: 14px;
          }
        }

        .mark-right {
          position: absolute;
          right: 60px;
          bottom: -15px;
        }

        .mark-left {
          position: absolute;
          left: 60px;
          top: -15px;
        }
      }
    }
  }

  .lxfs {
    width: 100%;
    height: 390px;
    display: flex;
    justify-content: center;
    align-items: center;

    .lxfs-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1470px;

      .line {
        width: 3px;
        height: 74px;
        background: #5b5b5b;
        margin: 0 120px;
      }

      .phone {
        flex: 1;

        .phone-left {
          display: flex;
          padding-left: 130px;

          .aqzc-logo {
            width: 94px;
            height: 94px;
            border-radius: 47px;
            overflow: hidden;
          }

          .aqzc-left {
            margin-left: 30px;

            .aqzc-phone {
              margin-bottom: 40px;

              span {
                font-weight: 400;
                font-size: 21px;
                color: #222222;
                line-height: 32px;
              }

              div {
                font-weight: 400;
                font-size: 46px;
                color: #222222;
                line-height: 53px;
                margin-top: 6px;
              }
            }

            .aqzc-emil {
              span {
                font-weight: 400;
                font-size: 24px;
                color: #101010;
                line-height: 32px;
              }

              div {
                font-weight: 600;
                font-size: 24px;
                color: #005aa8;
                line-height: 48px;
                margin-top: 10px;
              }
            }
          }
        }
      }

      .code {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;

        div {
          font-weight: bold;
          font-size: 18px;
          color: #353535;
          margin-top: 20px;
        }
      }
    }
  }
}

.main :deep(.el-table) {
  border: 1px solid #2c7be5;

  .el-table__header-wrapper,
  .el-table__fixed-header-wrapper {
    th {
      background-color: #2c7be5 !important;
      color: #515a6e;
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      height: 48px !important;
      border-right: 1px solid #fff;
      border-left: none;
      border-top: none;
      border-bottom: none;
    }

    th:last-child {
      border-right: none;
    }
  }

  tr,
  td {
    background-color: #f4f8fc;
    font-size: 14px;
    border: 0px;
    min-height: 48px;
    border: none !important;
  }
}
</style>
