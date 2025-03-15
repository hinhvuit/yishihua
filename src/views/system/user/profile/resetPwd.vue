<template>
  <el-form ref="pwdRef" :model="user" :rules="rules" label-width="130px">
    <el-form-item :label="$t('public.OldPassword')" prop="oldPassword">
      <div>
        <el-input
          v-model="user.oldPassword"
          :placeholder="$t('public.OldPassword')"
          type="password"
          show-password
          style="width: 255px"
        />
      </div>
    </el-form-item>
    <el-form-item :label="$t('public.NewPassword')" prop="newPassword">
      <div>
        <el-input
          v-model="user.newPassword"
          :placeholder="$t('public.NewPassword')"
          type="password"
          show-password
          style="width: 255px"
        />
        <password-strength :password="user.newPassword" />
      </div>
    </el-form-item>
    <el-form-item :label="$t('public.NewPassword')" prop="confirmPassword">
      <div>
        <el-input
          v-model="user.confirmPassword"
          :placeholder="$t('public.passwordTips2')"
          type="password"
          show-password
          style="width: 255px"
        />
        <password-strength :password="user.confirmPassword" />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">{{ $t('public.submit') }}</el-button>
      <el-button type="danger" @click="close">{{ $t('public.cancel') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
  import PasswordStrength from '@/components/PasswordStrength';
  import { updateUserPwd } from '@/api/system/user';

  const { proxy } = getCurrentInstance();

  const user = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const equalToPassword = (rule, value, callback) => {
    if (user.newPassword !== value) {
      callback(new Error(proxy.$t('public.NewOldPasswordTips')));
    } else {
      callback();
    }
  };
  const rules = ref({
    oldPassword: [{ required: true, message: proxy.$t('public.OldPasswordRemind'), trigger: 'blur' }],
    newPassword: [
      { required: true, message: proxy.$t('public.NewPasswordRemind'), trigger: 'blur' },
      { min: 8, max: 16, message: proxy.$t('public.LongRemind'), trigger: 'blur' },
      { pattern: /[a-z]/, message: proxy.$t('public.LowercaseLetterRemind'), trigger: 'blur' },
      { pattern: /[A-Z]/, message: proxy.$t('public.CapitalLetterRemind'), trigger: 'blur' },
      { pattern: /\d/, message: proxy.$t('public.NumberRemind'), trigger: 'blur' },
      {
        pattern: /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·！#￥（——）：；“”‘、，|《。》？、【】[\]]/,
        message: proxy.$t('public.SpecialCharacterRemind'),
        trigger: 'blur'
      },
      { pattern: /^[^<>"'|\\]+$/, message: proxy.$t('public.illegalCharacters')+'：< > " \' \\\ |', trigger: 'blur' }
    ],
    confirmPassword: [
      { required: true, message: proxy.$t('public.NewPasswordRemind'), trigger: 'blur' },
      { required: true, validator: equalToPassword, trigger: 'blur' },
      { min: 8, max: 16, message: proxy.$t('public.LongRemind'), trigger: 'blur' },
      { pattern: /[a-z]/, message: proxy.$t('public.LowercaseLetterRemind'), trigger: 'blur' },
      { pattern: /[A-Z]/, message: proxy.$t('public.CapitalLetterRemind'), trigger: 'blur' },
      { pattern: /\d/, message: proxy.$t('public.NumberRemind'), trigger: 'blur' },
      {
        pattern: /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·！#￥（——）：；“”‘、，|《。》？、【】[\]]/,
        message: proxy.$t('public.SpecialCharacterRemind'),
        trigger: 'blur'
      },
      { pattern: /^[^<>"'|\\]+$/, message: proxy.$t('public.illegalCharacters')+'：< > " \' \\\ |', trigger: 'blur' }
    ]
  });

  /** 提交按钮 */
  function submit() {
    proxy.$refs.pwdRef.validate((valid) => {
      if (valid) {
        updateUserPwd(user.oldPassword, user.newPassword).then((response) => {
          user.oldPassword = '';
          user.newPassword = '';
          user.confirmPassword = '';
          proxy.$modal.msgSuccess(proxy.$t('public.Success'));
        });
      }
    });
  }
  /** 关闭按钮 */
  function close() {
    proxy.$tab.closePage();
  }
</script>

<style lang="scss" scoped>
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
</style>
