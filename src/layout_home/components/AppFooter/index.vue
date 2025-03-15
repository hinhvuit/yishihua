<template>
  <footer class="footer">
    <div class="footer-text mb20">{{$t('public.copyright')}}</div>
    <div class="footer-text">{{$t('public.google')}}</div>
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    width: 100%;
    height: 130px;
    background: #005aa8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .footer-text {
      text-align: center;
      min-width: 500px;
      font-size: 16px;
      color: #bebebe;
    }
  }
</style>
