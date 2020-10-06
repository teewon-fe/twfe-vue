<template>
  <a @click="back">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'tw-back',
  methods: {
    back () {
      // 从web页面返回到pad页面
      if (this.$route.meta.back) {
        this.$router.push(this.$route.meta.back)
      } else {
        this.$router.back()
      }
    }
  }
}
</script>
