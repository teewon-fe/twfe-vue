<template>
  <div class="tw-hfilter">
    <!-- 筛选按钮图标 -->
    <tw-ghost contract="#header-right">
      <a class="text-weaking"
        @click="visible=true">
        <slot name="header-icon">
          <i class="tw-ico xfilter ml-step"></i>
        </slot>
      </a>
    </tw-ghost>

    <!-- 弹出层 -->
    <van-popup
      v-model="visible"
      get-container=".tw-header"
      position="top">
      <div class="tw-popoup xfooter">
        <div class="tw-popoup-body"
          style="text-align: left">
          <slot></slot>
        </div>

        <div class="tw-popoup-footer">
          <div class="tw-popoup-footer-item">
            <a class="tw-btn xmain"
              @click="confirm">确认</a>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'tw-header-filter',

  data () {
    return {
      visible: false
    }
  },

  methods: {
    /**
    * 功能: 确认选择
    */
    confirm () {
      this.visible = false
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss">

</style>
