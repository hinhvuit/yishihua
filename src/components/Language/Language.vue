<template>
    <el-dropdown  @command="handleSetLanguage" class="hover-effect" >
      <div style="display: flex;align-items: center;justify-content: center;">
        <div style="font-size: 20px;">{{seleceLanguage}}</div>
        <div>
          <el-icon class="el-icon--right" style="font-size: 18px;margin-left:10px;margin-top: 3px;">
            <arrow-down />
          </el-icon>
        </div>
      </div> 
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh" :disabled="language==='zh'">简体中文</el-dropdown-item>
          <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
          <el-dropdown-item command="vi" :disabled="language==='vi'">Tiếng Việt</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
</template>

<script>

export default {
  name: 'langSelect',
  data() {
    return {
      //多园区
      language: localStorage.getItem('locale'),
    }
  },
  created() {
    console.log(localStorage.getItem('locale'));
    if(!localStorage.getItem('locale')){
      const langArr=['zh','en','vi']
      const navLang = navigator.language.substring(0, 2)
      const locale1=langArr.indexOf(navLang)==-1?'zh':navLang
      localStorage.setItem('locale',locale1)
      this.language=locale1
      this.$i18n.locale=locale1
    }
  },
  computed: {
    seleceLanguage: function () {
      if (this.language == 'zh') return '简体中文'
      if (this.language == 'en') return 'English'
      if (this.language == 'vi') return 'Tiếng Việt'
    }
  },
  methods: {
    handleSetLanguage(newval){
      console.log('newval',newval);
      this.language=newval
      this.$i18n.locale = newval
      localStorage.setItem('locale',newval)
      setTimeout(() => {
        location.reload();
      }, 500);
    },
  }
}
</script>

<style lang="scss" scoped>
.hover-effect {
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.hover-effect:hover {
  background: none !important;
}
:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}
</style>