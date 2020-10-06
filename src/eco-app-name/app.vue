<template>
  <div id="app"
    class="tw-app xfixheader xadmin"
    v-bottom="0">
    <!-- 头部 -->
    <tw-header />

    <!-- 内容区 -->
    <router-view />
 </div>
</template>

<script>
import Header from './components/header.vue'

export default {
  name: 'page-app',

  components: {
    'tw-header': Header
  }
}
</script>
