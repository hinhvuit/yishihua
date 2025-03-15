<!-- 
  @FileDescription: 重置密码页面
  @Date:2024-08-03 11:07:21
  @Author:LZW
-->
<template>
  <div class="box">
    <div class="my-div">
      <div class="title">{{$t('public.FirstLogin')}}</div>
      <div class="line"></div>
      <el-form class="form-box" ref="formRef" :model="form" label-width="140px" :rules="rules">
        <el-form-item :label="$t('public.OldPassword')" prop="oldPassword">
          <div>
            <el-input
              v-model="form.oldPassword"
              type="password"
              show-password
              :placeholder="$t('public.PasswordTips')"
              style="width: 520px"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item :label="$t('public.NewPassword')" prop="newPassword">
          <div>
            <el-input
              v-model="form.newPassword"
              type="password"
              show-password
              :placeholder="$t('public.passwordTips1')"
              style="width: 520px"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item :label="$t('public.NewPassword')" prop="confirmPassword">
          <div>
            <el-input
              v-model="form.confirmPassword"
              type="password"
              show-password
              :placeholder="$t('public.passwordTips2')"
              style="width: 520px"
            ></el-input>
          </div>
        </el-form-item>
        <div class="btn-group">
          <el-button class="btn" type="primary" @click="submitForm('formRef')">{{ $t('public.submit') }}</el-button>
          <el-button class="btn" type="danger" @click="loginOut">退出</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup name="ResetPwd">
  import { updateUserPwd } from '@/api/system/user';
  import useUserStore from '@/store/modules/user';
  const { proxy } = getCurrentInstance();
  const router = useRouter();

  const form = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const equalToPassword = (rule, value, callback) => {
    if (form.value.newPassword !== value) {
      callback(new Error('两次输入的密码不一致'));
    } else {
      callback();
    }
  };

  const rules = ref({
    oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
    newPassword: [
      { required: true, message: '新密码不能为空', trigger: 'blur' },
      { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' },
      { pattern: /[a-z]/, message: '需要包含小写字母', trigger: 'blur' },
      { pattern: /[A-Z]/, message: '需要包含大写字母', trigger: 'blur' },
      { pattern: /\d/, message: '需要包含数字', trigger: 'blur' },
      {
        pattern: /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·！#￥（——）：；“”‘、，|《。》？、【】[\]]/,
        message: '需要包含特殊字符',
        trigger: 'blur'
      },
      { pattern: /^[^<>"'|\\]+$/, message: '不能包含非法字符：< > " \' \\\ |', trigger: 'blur' }
    ],

    confirmPassword: [
      { required: true, message: '确认密码不能为空', trigger: 'blur' },
      { required: true, validator: equalToPassword, trigger: 'blur' },
      { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' },
      { pattern: /[a-z]/, message: '需要包含小写字母', trigger: 'blur' },
      { pattern: /[A-Z]/, message: '需要包含大写字母', trigger: 'blur' },
      { pattern: /\d/, message: '需要包含数字', trigger: 'blur' },
      {
        pattern: /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·！#￥（——）：；“”‘、，|《。》？、【】[\]]/,
        message: '需要包含特殊字符',
        trigger: 'blur'
      },
      { pattern: /^[^<>"'|\\]+$/, message: '不能包含非法字符：< > " \' \\\ |', trigger: 'blur' }
    ]
  });

  const submitForm = (formName) => {
    proxy.$refs[formName].validate((valid) => {
      if (valid) {
        const { oldPassword, newPassword } = form.value;
        updateUserPwd(oldPassword, newPassword).then(() => {
          proxy.$modal.msgSuccess('修改成功');
          router.replace('/home/index');
        });
      } else {
        return false;
      }
    });
  };

  const loginOut = () => {
    useUserStore()
      .logOut()
      .then(() => {
        location.href = import.meta.env.BASE_URL;
      });
  };
</script>
<style lang="scss" scoped>
  .box {
    height: 100%;
    background-image: url('../../assets/images/login-background.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .my-div {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      width: 693px;
      height: 428px;
      background-color: #fff;
      padding: 20px;
      border-radius: 20px;
      .title {
        width: 100%;
        padding: 0 0 0 20px;
        font-size: 20px;
        font-weight: bold;
        color: #0c1d2f;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 20px;
          bottom: 0;
          width: 181px;
          height: 6px;
          background: linear-gradient(0deg, #007bfe 0%, rgba(0, 123, 254, 0) 100%);
        }
      }
      .line {
        width: 538px;
        height: 1px;
        background: #e6e6e6;
        margin: 20px 0;
      }
      .form-box {
        padding: 20px;
        padding: 10px;
        .el-input {
          height: 48px;
        }
        :deep(.el-form-item) {
          margin-bottom: 28px;
          .el-form-item__error {
            margin: 5px 0;
          }
          .el-form-item__label {
            color: #666;
            font-weight: normal;
            justify-content: start;
            font-size: 16px;
            height: 48px;
            line-height: 48px;
          }
          .el-input__inner::placeholder {
            font-size: 14px;
          }
        }
        .btn-group {
          width: 100%;
          display: flex;
          justify-content: start;
          margin-top: 40px;
          padding-left: 90px;
          .btn {
            width: 120px;
            height: 48px;
            font-size: 14px;
            border-radius: 6px;
          }
        }
      }
      .tip {
        display: flex;
        flex-direction: column;
        width: 320px;
        margin-top: 20px;
        font-size: 14px;
        padding-left: 15px;
        color: #999;
        span {
          margin-top: 5px;
        }
        span:first-child {
          color: #f65c6c;
        }
      }
    }
  }
</style>
