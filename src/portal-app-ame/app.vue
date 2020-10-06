<template>
  <div id="app">
    <!-- 头部 -->
    <tw-header />

    <!-- 内容区 -->
    <router-view />

    <!-- 页脚 -->
    <tw-footer />
  </div>
</template>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'

export default {
  name: 'page-app',

  components: {
    'tw-header': Header,
    'tw-footer': Footer
  }
}
</script>
