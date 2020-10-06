<template>
  <div class="tw-collapse">
    <slot>collapse self.</slot>
  </div>
</template>

<script>
import { delegate, delegateOff } from '@utils/event'
import { addClass, removeClass, toggleSpecialTransitionClass } from '@utils/dom'

export default {
  name: 'twCollapse',
  props: {
    defaultOpen: {
      type: Boolean,
      default: false
    },
    switch: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      switchEl: null,
      beforeLeave: null,
      group: null,
      groupIndex: -1
    }
  },
  methods: {
    openCollapse () {
      const vm = this
      toggleSpecialTransitionClass(this.$el, 'xopen', {
        type: 'add',
        transitionClass: 'xtoggling',
        heightAuto: true,
        endCallback () {
          vm.$emit('shown')
          if (vm.$parent.$options.name === 'twCollapseGroup') {
            vm.$parent.activeCollapse = vm
          }
        }
      })
      addClass(this.switchEl, 'xopen')
    },
    closeCollapse () {
      const vm = this
      toggleSpecialTransitionClass(this.$el, 'xopen', {
        type: 'remove',
        transitionClass: 'xtoggling',
        heightAuto: true,
        endCallback () {
          vm.$emit('hidden')
        }
      })
      removeClass(this.switchEl, 'xopen')
    },
    toggleCollapse (switchEl) {
      this.switchEl = switchEl

      // 折叠组禁用切换自身功能
      const activeIsMe = this.$parent.$options.name === 'twCollapseGroup' && this === this.$parent.activeCollapse
      if (activeIsMe && this.$parent.disableToggleSelf) return

      if (/\bxopen\b/.test(this.$el.getAttribute('class'))) {
        this.$emit('hide')
        this.closeCollapse()
      } else {
        let preHandler

        if (typeof this.beforeLeave === 'function') {
          preHandler = this.beforeLeave(this.groupIndex, this.group.activeIndex)

          if (preHandler === false) {
            preHandler = Promise.reject(new Error('false'))
          } else if (!(preHandler instanceof Promise)) {
            preHandler = Promise.resolve(preHandler)
          }
        } else {
          preHandler = Promise.resolve(true)
        }

        preHandler.then(() => {
          this.$emit('show')
          this.openCollapse()
          if (this.group) {
            this.group.activeIndex = this.groupIndex
          }
        }).catch(e => {
          // noop
        })
      }
    },
    toggle () {
      let elemets = document.querySelectorAll(this.switch)

      for (let i = 0; i < elemets.length; i++) {
        this.toggleCollapse(elemets[i])
      }
    }
  },
  created () {
    delegate(document, 'click.' + this._uid, this.switch, true, this.toggleCollapse)
  },
  mounted () {
    if (this.defaultOpen) {
      this.toggle()
    }
  },
  beforeDestroy () {
    delegateOff(document, 'click.' + this._uid, true)
  }
}
</script>

<style lang="scss">
  @import "collapse.scss";
</style>
