<template>
  <a class="xtotop" :class="{xactive:visible}" @click="toTopHandler"><i class="tw-ico xtop"></i><span>返回顶部</span></a>
</template>

<script>
export default {
  name: 'tw-totop',
  data: function () {
    return {
      visible: false
    }
  },
  methods: {
    scrollHandler: function () {
      let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      if (scrollTop > 300) {
        this.visible = true
      } else {
        this.visible = false
      }
    },
    toTopHandler: function () {
      let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      let distance = scrollTop / 30

      let toScroll = function () {
        scrollTop -= distance
        window.scrollTo(0, scrollTop)
        if (scrollTop < 0) {

        } else {
          setTimeout(toScroll, 10)
        }
      }

      setTimeout(toScroll, 10)
    }
  },
  mounted: function () {
    window.addEventListener('scroll', this.scrollHandler)
  },
  dostroyed: function () {
    window.removeEventListener('scroll', this.scrollHandler)
  }
}
</script>
