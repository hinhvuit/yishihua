<template>
  <div class="login">
    <div class="box">
      <div class="login-box">
        <div class="login-type">
          <span>{{$t('public.PasswordLogin')}}</span>
          <el-image :src="selectEwm" fit="fill"></el-image>
        </div>
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
          <el-form-item prop="username">
            <span class="item-title">{{$t('public.AccountInformation')}}</span>
            <el-input
              v-model="loginForm.username"
              type="text"
              size="large"
              auto-complete="off"
              :placeholder="$t('public.Enteaccount')"
            >
              <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <span class="item-title">{{$t('public.AccountPassword')}}</span>
            <el-input
              v-model="loginForm.password"
              type="password"
              size="large"
              auto-complete="off"
              show-password
              :placeholder="$t('public.PasswordTips')"
              @keyup.enter="handleLogin"
            >
              <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code" v-if="captchaEnabled">
            <span class="item-title">{{$t('public.verificationCode')}}</span>
            <div class="code-box">
              <el-input
                v-model="loginForm.code"
                size="large"
                auto-complete="off"
                :placeholder="$t('public.VerificationCode')"
                style="width: 57%"
                @keyup.enter="handleLogin"
              >
                <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
              </el-input>
              <div class="login-code">
                <img :src="codeUrl" @click="getCode" class="login-code-img" />
              </div>
            </div>
          </el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 0px 0px">{{$t('public.RememberThePassword')}}</el-checkbox>
          <div style="float: right; margin-top: 5px">
            <router-link class="link-type" :to="'/home/index'">{{$t('public.ReturnHome')}}</router-link>
          </div>
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              class="login-btn"
              type="primary"
              style="width: 100%"
              @click.prevent="handleLogin"
            >
              <span v-if="!loading">{{$t('public.login')}}</span>
              <span v-else>{{$t('public.Logining')}}</span>
            </el-button>
          </el-form-item>
          <div class="xx-link">
            <el-button type="primary" size="default" link @click="xxLogin">相信登录 >></el-button>
          </div>
        </el-form>
      </div>
    </div>

    <!--  底部  -->
    <div class="el-login-footer">
      <span></span>
    </div>
  </div>
</template>

<script setup>
  import selectEwm from '@/assets/images/erweima.png';
  import { getCodeImg, xiangXinLogin } from '@/api/login';
  import Cookies from 'js-cookie';
  import { encrypt, decrypt } from '@/utils/jsencrypt';
  import useUserStore from '@/store/modules/user';

  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();
  const { proxy } = getCurrentInstance();

  const loginForm = ref({
    username: '',
    password: '',
    rememberMe: false,
    code: '',
    uuid: ''
  });

  const loginRules = {
    username: [{ required: true, trigger: 'blur', message: proxy.$t('public.PleaseInputAccount') }],
    password: [{ required: true, trigger: 'blur', message: proxy.$t('public.PleaseInputPassword') }],
    code: [{ required: true, trigger: 'change', message: proxy.$t('public.PleaseInputCode') }]
  };

  const codeUrl = ref('');
  const loading = ref(false);
  // 验证码开关
  const captchaEnabled = ref(true);
  // 注册开关
  const register = ref(false);
  const redirect = ref(undefined);

  watch(
    route,
    (newRoute) => {
      redirect.value = newRoute.query && newRoute.query.redirect;
    },
    { immediate: true }
  );

  function handleLogin() {
    proxy.$refs.loginRef.validate((valid) => {
      if (valid) {
        loading.value = true;
        // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
        if (loginForm.value.rememberMe) {
          Cookies.set('username-ssp', loginForm.value.username, { expires: 30 });
          Cookies.set('password-ssp', encrypt(loginForm.value.password), { expires: 30 });
          Cookies.set('rememberMe-ssp', loginForm.value.rememberMe, { expires: 30 });
        } else {
          // 否则移除
          Cookies.remove('username-ssp');
          Cookies.remove('password-ssp');
          Cookies.remove('rememberMe-ssp');
        }
        // 调用action的登录方法
        userStore
          .login(loginForm.value)
          .then(() => {
            const query = route.query;
            const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
              if (cur !== 'redirect') {
                acc[cur] = query[cur];
              }
              return acc;
            }, {});
            router.push({ path: redirect.value || '/', query: otherQueryParams });
          })
          .catch(() => {
            loading.value = false;
            // 重新获取验证码
            if (captchaEnabled.value) {
              getCode();
            }
          });
      }
    });
  }

  function getCode() {
    getCodeImg().then((res) => {
      captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
      if (captchaEnabled.value) {
        codeUrl.value = 'data:image/gif;base64,' + res.img;
        loginForm.value.uuid = res.uuid;
      }
    });
  }

  function getCookie() {
    const username = Cookies.get('username-ssp');
    const password = Cookies.get('password-ssp');
    const rememberMe = Cookies.get('rememberMe-ssp');
    loginForm.value = {
      username: username === undefined ? loginForm.value.username : username,
      password: password === undefined ? loginForm.value.password : decrypt(password),
      rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
    };
  }

  function xxLogin() {
    const state = route.query.redirect ? route.query.redirect : '/home/index';
    xiangXinLogin(state).then((res) => {
      // window.open(res.data);
      location.assign(res.data);
    });
  }

  getCode();
  getCookie();
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url('../assets/images/login-background.jpg');
    background-size: cover;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }
  .box {
    display: flex;
    .title-box {
      width: 547px;
      height: 722px;
      padding-top: 110px;
      background: #0f5ed7;
      border-radius: 0px 0px 0px 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .title-line {
        width: 42px;
        height: 16px;
        background: linear-gradient(180deg, #1df6fd 0%, rgba(0, 123, 254, 0) 100%);
        position: absolute;
        top: 30px;
        left: 40px;
      }
      .title-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #ffffff;
        font-size: 36px;
        div {
          margin-top: 12px;
          margin-bottom: 60px;
          font-size: 48px;
        }
      }
    }
    .login-box {
      width: 593px;
      height: 552px;
      background: #ffffff;
      border-radius: 20px;
      padding-top: 15px;
      .login-type {
        width: 390px;
        margin: 0 auto;
        padding: 0 5px 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        span {
          font-weight: 600;
          font-size: 20px;
          color: #0c1d2f;
          position: relative;
          &::after {
            content: '';
            display: inline-block;
            width: 75px;
            height: 6px;
            background: linear-gradient(0deg, #007bfe 0%, rgba(0, 123, 254, 0) 100%);
            position: absolute;
            left: 2px;
            bottom: 2px;
          }
        }
      }
    }
  }

  .login-form {
    width: 390px;
    margin: 0 auto;
    margin-top: 10px;
    ::v-deep(.el-input__inner::placeholder) {
      font-size: 13px;
    }
    .el-form-item {
      margin-bottom: 12px;
    }
    .el-input {
      height: 58px;
      background: #f8f8fa;
      border-radius: 6px;
      border: 2px solid #eeeeee;
      font-size: 16px;
      input {
        height: 58px;
        background: #f8f8fa;
        border-radius: 6px;
        border: 2px solid #eeeeee;
        font-size: 16px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 0px;
    }
    .item-title {
      font-weight: 400;
      font-size: 16px;
      color: #999999;
      margin-left: 5px;
    }
    .login-btn {
      margin-top: 20px;
      height: 58px;
      font-size: 20px;
      color: #ffffff;
    }
    .xx-link {
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }

  .link-type {
    font-size: 14px;
    color: #005aa8;
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .code-box {
    display: flex;
  }
  .login-code {
    width: 33%;
    height: 58px;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .el-login-footer {
    height: 58px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }
  .login-code-img {
    height: 58px;
    padding-left: 12px;
  }
</style>
