<template>
  <div>
    <slot>collapse group.</slot>
  </div>
</template>

<script>
import { delegate } from '@utils/event'

export default {
  name: 'twCollapseGroup',
  props: {
    disableToggleSelf: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeCollapse: null
    }
  },
  methods: {
    initCollapses () {
      const vm = this
      const children = this.$children

      children.forEach((child) => {
        if (child.$options.name === 'twCollapse') {
          if (child.defaultOpen) vm.activeCollapse = child

          child.$on('show', () => {
            if (vm.activeCollapse && vm.activeCollapse !== child) {
              vm.activeCollapse.closeCollapse()
            }
          })

          child.$on('hide', () => {
            vm.activeCollapse === child && (vm.activeCollapse = null)
          })
        }
      })
    },
    initInactiveBtn () {
      const vm = this

      delegate(vm.$el, 'touchend.' + this._uid, '.jst-close', () => {
        const activeCollapse = vm.activeCollapse

        if (activeCollapse) {
          activeCollapse.closeCollapse()
          vm.activeCollapse = null
        }
      })
    }
  },
  mounted () {
    this.initCollapses()
    this.initInactiveBtn()
  }
}
</script>
