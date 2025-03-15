<template>
   <div class="app-container">
      <el-row :gutter="20">
         <el-col :span="24" :xs="24">
            <el-card>
               <template v-slot:header>
                 <div class="clearfix">
                   <span>{{$t('public.PersonalData')}}</span>
                 </div>
               </template>
               <el-tabs v-model="activeTab">
                  <el-tab-pane :label="$t('public.PersonalData')" name="userinfo">
                     <userInfo :user="state.user" />
                  </el-tab-pane>
                  <el-tab-pane :label="$t('public.ChangePassword')" name="resetPwd">
                     <resetPwd />
                  </el-tab-pane>
               </el-tabs>
            </el-card>
         </el-col>
      </el-row>
   </div>
</template>

<script setup name="Profile">
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import { getUserProfile } from "@/api/system/user";

const activeTab = ref("userinfo");
const state = reactive({
  user: {},
  roleGroup: {},
  postGroup: {}
});

function getUser() {
  getUserProfile().then(response => {
    state.user = response.data;
    state.roleGroup = response.roleGroup;
    state.postGroup = response.postGroup;
  });
};

getUser();
</script>
