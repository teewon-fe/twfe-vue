<template>
  <div id="app">
    <!-- 头部 -->
    <tw-header v-if="!$route.meta.noHeader"
      class="xsearch">
      <tw-back slot="left"
        class="tw-header-backbtn">
      </tw-back>
      <i class="tw-ico xmlogo"
        v-if="$route.meta.showLogo"></i>
      <span v-else>{{$app.title.text}}</span>
    </tw-header>

    <!-- 路由页 -->
    <router-view/>

    <!-- 页脚 -->
    <tw-footer>
    </tw-footer>
  </div>
</template>

<script>
export default {
  name: 'page-app'
}
</script>
