<template>
  <footer class="tw-footer">
    Copyright © 2008-{{currentYear}} 天闻数媒科技（北京）有限公司, All Rights Reserved&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版本号{{$app.appVersion}}
  </footer>
</template>
<script>
export default {
  name: 'tw-footer',
  data () {
    return {
      currentYear: this.$ui.dateFormat(new Date(), 'yyyy')
    }
  },

  created () {
    this.$ui.getServeTime.then(time => {
      this.currentYear = this.$ui.dateFormat(time, 'yyyy')
    })
  }
}
</script>
