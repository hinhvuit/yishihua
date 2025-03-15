<!-- 园区选择组件 -->
<template>
  <!-- <el-select class="park-select" v-model="park" placeholder="请选择园区" filterable @change="parkChange">
    <el-option v-for="item in userStore.parks" :key="item.id" :label="item.name" :value="item.id"> </el-option>
  </el-select> -->
  <div class="park-select">
    <!-- <input type="text" :disabled="true" :value="park ? park : '暂无园区'" />
    <el-button class="btn" type="primary" size="default" @click="showClick"
      ><el-icon size="25"><ArrowDownBold /></el-icon
    ></el-button>

    <el-dropdown
      class="dropdown"
      ref="dropdown"
      trigger="contextmenu"
      style="margin-right: 30px; overflow-y: auto"
      max-height="300px"
      @command="parkChange"
    >
      <span>Dropdown</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in userStore.parks"
            :key="item.id"
            :command="{ id: item.id, name: item.name }"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown> -->

    <el-dropdown @command="parkChange" placement="bottom-end">
      <div class="park-box">
        <span>{{ park }}</span>
        <div class="triangle"></div>
      </div>
      <template #dropdown v-if="userStore.parks.length">
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in userStore.parks"
            :key="item.id"
            :command="{ id: item.id, name: item.name }"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup name="ParkSelect">
  import { getPark, setPark } from '@/utils/park';
  import { refreshDefaultPark } from '@/api/public';
  import useUserStore from '@/store/modules/user';
  const userStore = useUserStore();
  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();

  const park = computed(() => {
    let res = userStore.parks.find((item) => {
      return item.id == parseInt(getPark());
    });
    return res ? res.name : proxy.$t('public.NoIndustrial'); 
  });
  async function parkChange(val) {
    if (park.value == val.name) return;
    setPark(val.id);
    proxy.$modal.loading(proxy.$t('public.SwitchPark'));
    await refreshDefaultPark();
    setTimeout(() => {
      location.reload();
    }, 500);
  }
</script>
<style lang="scss" scoped>
  .park-select {
    display: flex;
    align-items: center;
    position: relative;
    .park-box {
      width: 286px;
      height: 58px;
      background: #f5f7f9;
      border-radius: 29px;
      font-size: 24px;
      color: #333333;
      line-height: 58px;
      padding: 0 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .triangle {
        border-left: 6px solid #f5f7f9;
        border-right: 6px solid #f5f7f9;
        border-top: 10px solid #3774e6;
      }
      &:hover .triangle {
        transform: rotate(180deg);
      }
    }
  }
  // .example-showcase .el-dropdown-link {
  //   cursor: pointer;
  //   color: var(--el-color-primary);
  //   display: flex;
  //   align-items: center;
  // }
</style>
