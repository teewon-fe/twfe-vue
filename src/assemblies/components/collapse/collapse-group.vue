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
    },
    beforeLeave: Function
  },
  data () {
    return {
      activeCollapse: null,
      activeIndex: 0
    }
  },
  methods: {
    initCollapses () {
      const vm = this
      const children = this.$children

      children.forEach((child, index) => {
        if (child.$options.name === 'twCollapse') {
          child.beforeLeave = this.beforeLeave
          child.groupIndex = index
          child.group = this

          if (child.defaultOpen) {
            vm.activeCollapse = child
            this.activeIndex = index
          }

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

    activeTab (index) {
      this.$children.forEach((child, childIndex) => {
        if (index === childIndex) {
          child.toggle()
        }
      })
    },

    initInactiveBtn () {
      const vm = this

      delegate(vm.$el, 'click.' + this._uid, '.jst-close', () => {
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
