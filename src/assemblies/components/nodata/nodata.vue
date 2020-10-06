<template>
  <div class="tw-nodata">
    <img src="@images/nodata.png" />
    <div>
      <slot>暂无数据</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tw-nodata'
}
</script>

<style lang="scss">
@import "style";
</style>
