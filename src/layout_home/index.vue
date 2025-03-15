<template>
  <div class="home">
    <AppHeader></AppHeader>
    <div class="main">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="['DealtIndex', 'DealtRecord','Home']">
            <component v-if="!route.meta.link" :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script setup>
  import AppFooter from './components/AppFooter';
  import AppHeader from './components/AppHeader';
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
    .main {
      min-height: calc(100vh - 130px);
    }
  }
</style>
