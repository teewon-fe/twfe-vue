<template>
  <transition
    :enter-active-class="'tw-slider ' + direction"
    enter-class="xenter-from"
    enter-to-class="xenter-to"
    :leave-active-class="'tw-slider ' + direction"
    leave-class="xleave-from"
    leave-to-class="xleave-to">
      <router-view />
  </transition>
</template>

<script>
export default {
  name: 'tw-router-view',

  props: ['include', 'exclude'],

  data () {
    return {
      direction: 'xnext'
    }
  },

  watch: {
    $route (to, from) {
      this.direction = to.meta.level < from.meta.level ? 'xprev' : 'xnext'

      // disable animation if the route level is the same.
      if (to.meta.level === from.meta.level) this.direction = 'xdisabled'

      // disable animation if the noAnimate is true
      if (to.meta.noAnimation || from.meta.noAnimation) this.direction = 'xdisabled'
    }
  }
}
</script>
