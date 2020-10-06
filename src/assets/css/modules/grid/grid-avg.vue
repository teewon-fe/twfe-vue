<template>
  <!-- pc端平分为5列, pad横屏时为4列, pad坚屏时为3列, 手机横屏时为2列, 手机坚屏时1列 -->
  <div class="tw-grid xpc5 xlpad4 xpad3 xlphone2 xphone1">
    <div class="tw-grid-col">1</div>
    <div class="tw-grid-col">2</div>
    <div class="tw-grid-col">3</div>
    <div class="tw-grid-col">4</div>
    <div class="tw-grid-col">5</div>
  </div>
</template>

<style lang="scss" scoped>
  .tw-grid {
    margin: 15px 0;
  }

  .tw-grid-col {
    height: 100px;
    border: 1px dashed #ccc;
  }
</style>
