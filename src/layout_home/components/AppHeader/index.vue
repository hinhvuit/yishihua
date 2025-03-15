<template>
  <header class="header">
    <div class="logo" @click="toHome">
      <el-image :src="logo" fit="fill" />
    </div>
    <div class="right-menu">
      <div class="menu-nav">
        <!-- <ul @click="navClick">
          <template v-for="item in menu">
            <li v-if="!item.nav" :data-menupath="item.path" :class="{ activeCss: active == item.path }">
              {{ item.meta.title }}
            </li>
          </template>
        </ul> -->
      </div>
      <div class="avatar-container" v-if="userStore.nickName">
        <el-dropdown
          @command="handleCommand"
          :disabled="!userStore.nickName"
          class="right-menu-item hover-effect"
          trigger="click"
        >
          <div class="avatar-wrapper">
            <div class="user-avatar">{{ userStore.nickName.slice(0, 1) }}</div>
            <div class="user-name">{{ userStore.nickName }}</div>
            <el-icon color="#fff"><ArrowDown /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/user/profile">
                <el-dropdown-item>{{$t('public.IndividualCenter')}} </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided command="logout">
                <span>{{$t('public.LogOut')}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="avatar-container" v-else>
        <el-button
          style="width: 166px; height: 48px; background: #f3f6fb; border-radius: 5px; font-size: 24px; color: #005bac"
          size="default"
          @click="toLogin"
          >{{$t('public.login')}}</el-button
        >
      </div>
      <div style="margin-top: 5px;">
        <langSelect style="font-size: 16px; color: #ffffff;"></langSelect>
      </div>
    </div>
  </header>
</template>

<script setup>
  import langSelect from '@/components/Language/Language.vue'
  import logo from '@/assets/images/logo.png';
  import { ElMessageBox } from 'element-plus';
  import useUserStore from '@/store/modules/user';
  import { trendsRouters } from '@/router';
  import { deepClone } from '@/utils';
  import usePermissionStore from '@/store/modules/permission';
  const userStore = useUserStore();
  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();
  // const menu = ref(deepClone(usePermissionStore().indexRouters));
  const menu = ref(deepClone(trendsRouters));

  const active = computed((r = route.path) => {
    let activeMenu = menu.value.find((item) => {
      return '/home' + item.path == r;
    });
    return activeMenu ? activeMenu.path : -1;
  });
  function navClick(e) {
    let path = e.target.dataset.menupath;
    router.push(`/home${path}`);
  }
  function handleCommand(command) {
    switch (command) {
      case 'setLayout':
        // setLayout();
        break;
      case 'logout':
        logout();
        break;
      default:
        break;
    }
  }
  function toHome() {
    router.push('/home/index');
    active.value = -1;
  }
  function toLogin() {
    if (userStore.nickName) return;
    router.push(`/login?redirect=${route.fullPath}`);
  }
  function logout() {
    ElMessageBox.confirm(proxy.$t('public.LogOutSystem'), proxy.$t('public.Tips'), {
      confirmButtonText:proxy.$t('public.sure'),
      cancelButtonText: proxy.$t('public.cancel'),
      type: 'warning'
    })
      .then(() => {
        userStore.logOut().then(() => {
          location.href = '/index';
        });
      })
      .catch(() => {});
  }
</script>

<style lang="scss" scoped>
  .header {
    position: absolute;
    top: 0;
    height: 106px;
    width: 100%;
    padding: 0 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 99;
    .logo {
      cursor: pointer;
    }
    .right-menu {
      display: flex;
      align-items: center;
      .menu-nav {
        margin-right: 20px;
        .activeCss {
          position: relative;
          &::before {
            content: '';
            position: absolute;
            top: 15px;
            left: 35%;
            width: 30%;
            border-bottom: 4px solid #ffffff;
          }
        }
        ul {
          display: flex;
          li {
            list-style-type: none;
            font-weight: 400;
            font-size: 24px;
            color: #ffffff;
            line-height: 57px;
            margin: 0 20px;
            position: relative;
            line-height: 1;
            transition: 0.2s all;
            cursor: pointer;
            &::before {
              content: '';
              position: absolute;
              top: 15px;
              left: 65%;
              width: 0;
              height: 100%;
              border-bottom: 4px solid #ffffff;
              transition: 0.2s all linear;
            }
            &:hover::before {
              width: 30%;
              left: 35%;
            }
            &:hover ~ li::before {
              left: 35%;
            }
          }
        }
      }
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;
          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }
      .right-menu-item.hover-effect:hover {
        background: none !important;
      }
      .avatar-container {
        margin-right: 40px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;
          display: flex;
          align-items: center;
          .user-name {
            margin: 0 15px;
            font-weight: 400;
            font-size: 20px;
            color: #ffffff;
          }
          .user-avatar {
            cursor: pointer;
            width: 52px;
            height: 52px;
            border-radius: 26px;
            font-size: 24px;
            font-weight: 600;
            text-align: center;
            line-height: 52px;
            background-color: #ffffff3e;
            color: #fff;
          }

          i {
            cursor: pointer;
            position: absolute;
            right: -15px;
            top: 19px;
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
