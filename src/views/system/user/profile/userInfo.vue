<template>
   <el-form ref="userRef" :model="form" :rules="rules" label-width="130px">
      <el-form-item :label="$t('public.Name')" prop="nickName">
         <el-input v-model="form.nickName" maxlength="30" />
      </el-form-item>
      <el-form-item :label="$t('public.PhoneNumber')" prop="phonenumber">
         <el-input v-model="form.phonenumber" maxlength="11" />
      </el-form-item>
      <el-form-item :label="$t('public.Email')" prop="email">
         <el-input v-model="form.email" maxlength="50" />
      </el-form-item>
      <!-- <el-form-item label="性别">
         <el-radio-group v-model="form.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
         </el-radio-group>
      </el-form-item> -->
      <el-form-item>
      <el-button type="primary" @click="submit">{{ $t('public.submit') }}</el-button>
      <el-button type="danger" @click="close">{{ $t('public.cancel') }}</el-button>
      </el-form-item>
   </el-form>
</template>

<script setup>
import { updateUserProfile } from "@/api/system/user";

const props = defineProps({
  user: {
    type: Object
  }
});

const { proxy } = getCurrentInstance();

const form = ref({});
const rules = ref({
  nickName: [{ required: true, message: proxy.$t('public.nameRemind'), trigger: "blur" }],
  email: [{ required: true, message: proxy.$t('public.emailRemind'), trigger: "blur" }, { type: "email", message: proxy.$t('public.emailFormat'), trigger: ["blur", "change"] }],
  phonenumber: [{ required: true, message: proxy.$t('public.phoneRemind'), trigger: "blur" }, 
  // { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }
],
});

/** 提交按钮 */
function submit() {
  proxy.$refs.userRef.validate(valid => {
    if (valid) {
      updateUserProfile(form.value).then(response => {
        proxy.$modal.msgSuccess(proxy.$t('public.Success'));
        props.user.phonenumber = form.value.phonenumber;
        props.user.email = form.value.email;
      });
    }
  });
};

/** 关闭按钮 */
function close() {
  proxy.$tab.closePage();
};

// 回显当前登录用户信息
watch(() => props.user, user => {
  if (user) {
    form.value = { nickName: user.nickName, phonenumber: user.phonenumber, email: user.email, sex: user.sex };
  }
},{ immediate: true });
</script>
