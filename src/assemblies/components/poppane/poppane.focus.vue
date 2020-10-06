<template>
  <div ref="poppane" class="tw-poppane" :class="['x' + placement]">
    <slot></slot>
  </div>
</template>

<script>
import { trigger, delegate, delegateOff } from '@utils/event'
import { addClass, removeClass, setTempStyle, toggleSpecialTransitionClass } from '@utils/dom'
import { placement } from '@utils/placement'

export default {
  isTwPoppane: true,
  name: 'twPoppane',
  props: {
    switch: {
      type: String,
      required: true
    },
    triggerEvent: {
      type: String,
      default: 'click'
    },
    placement: {
      type: String,
      default: 'auto'
    },
    positionElement: {
      type: String,
      default: 'auto'
    },
    relatedMinWidth: {
      type: String,
      default: '100%',
      validator (value) {
        return /^\d+(\.\d{1,5})?%$/.test(value)
      }
    },
    noArrow: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      switchEl: null,
      popLayer: null,
      eventTarget: null,
      created: false,
      open: false,
      hasOpenChildPoppane: false
    }
  },
  methods: {
    isSwitchElement (el) {
      let parent = el

      do {
        if (parent.twPopSwitch) {
          return true
        }
        parent = parent.parentNode
      } while (parent)

      return false
    },
    eachParent (callback, ...agrs) {
      let returnValue = null
      let parent = this.switchEl.parentNode

      while (parent) {
        if (parent.twPoppane) {
          returnValue = callback(parent.twPoppane, ...agrs)
          if (returnValue.break) break

          parent = parent.twPoppane.switchEl.parentNode
        } else {
          parent = parent.parentNode
        }
      }

      return returnValue !== null ? returnValue.value : false
    },
    isParentSwitchElement (eventTarget) {
      return this.eachParent((parentPoppane, eventTarget) => {
        if (parentPoppane.switchEl.contains(eventTarget)) {
          return {
            break: true,
            value: true
          }
        }

        return {
          break: false,
          value: false
        }
      }, eventTarget)
    },
    setParent (hasOpenChildPoppane) {
      const vm = this

      this.eachParent((parentPoppane, hasOpenChildPoppane) => {
        parentPoppane.hasOpenChildPoppane = hasOpenChildPoppane

        if (!hasOpenChildPoppane && !parentPoppane.switchEl.contains(vm.eventTarget) && (!vm.isSwitchElement(vm.eventTarget) || vm.isParentSwitchElement(vm.eventTarget) || !parentPoppane.$el.contains(vm.eventTarget))) {
          parentPoppane.closePoppane()
        }

        return { break: true }
      }, hasOpenChildPoppane)
    },
    getParent () {
      return this.eachParent((parentPoppane) => {
        return {
          break: true,
          value: parentPoppane
        }
      })
    },
    openPoppane () {
      toggleSpecialTransitionClass(this.$el, 'xopen', { type: 'add' })
      addClass(this.switchEl, 'xopen')
      this.open = true
      this.setParent(true)
    },
    closePoppane (event) {
      if (event) {
        this.eventTarget = event.target
        if (this.hasOpenChildPoppane) return
        if (this.switchEl.contains(event.target)) return
        if (this.$el.contains(event.target) && this.isSwitchElement(event.target)) return
      }

      toggleSpecialTransitionClass(this.$el, 'xopen', { type: 'remove' })
      removeClass(this.switchEl, 'xopen')
      this.open = false
      this.setParent(false)
      document.removeEventListener('click', this.closePoppane, true)
    },
    togglePoppane (switchEl, event) {
      this.switchEl = switchEl
      this.eventTarget = event.target

      if (!this.created) {
        document.body.appendChild(this.popLayer)
        this.created = true
      }

      if (!switchEl.twPopSwitch) {
        this.noArrow = true
        this.initSwitch()
        let parent = this.getParent()

        while (parent) {
          parent.hasOpenChildPoppane = true
          trigger(parent.switchEl, 'click')
          parent = parent.getParent()
        }
      }

      const poppaneEl = this.$el
      const positionEl = this.positionElement === 'auto' ? switchEl : this.positionElement
      let placementStyle

      // 计算位置坐标
      if (!/\bxopen\b/.test(poppaneEl.getAttribute('class'))) {
        setTempStyle(poppaneEl, 'visibility', 'hidden !important', () => {
          addClass(poppaneEl, 'xopen')
          placementStyle = placement(poppaneEl, positionEl, this.relatedMinWidth)[this.placement]
          removeClass(poppaneEl, 'xopen')
        })
      }

      for (const name in placementStyle) {
        this.$el.style[name] = placementStyle[name]
      }

      if (/\bxopen\b/.test(poppaneEl.getAttribute('class'))) {
        this.closePoppane()
      } else {
        this.openPoppane()
        if (this.triggerEvent === 'click') {
          document.addEventListener('click', this.closePoppane, true)
        } else {
          this.switchEl.addEventListener('blur', this.closePoppane)
        }
      }
    },
    initSwitch () {
      const switchEls = document.querySelectorAll(this.switch)
      let switchEl

      for (let i = 0; i < switchEls.length; i++) {
        switchEl = switchEls[i]

        if (!this.noArrow) {
          const arrow = document.createElement('i')
          arrow.setAttribute('class', 'tw-triangle ' + ({ a: 'xdown', t: 'xdown', r: 'xright', b: 'xdown', l: 'xleft' })[this.placement.substring(0, 1)])
          switchEl.appendChild(arrow)
          addClass(switchEl, 'x' + this.placement)
        } else {
          addClass(switchEl, 'xnoarrow')
        }

        switchEl.twPopSwitch = this
      }
    }
  },
  created () {
    if (this.triggerEvent === 'click') {
      delegate(document, 'click.' + this._uid, this.switch, this.togglePoppane)
    }
  },
  mounted () {
    const vm = this

    if (this.triggerEvent === 'focus') {
      const targets = document.querySelectorAll(this.switch)
      targets.forEach(target => {
        target.addEventListener('focus', function (event) {
          vm.togglePoppane(target, event)
        })
      })
    }

    const popLayer = document.createElement('div')
    popLayer.setAttribute('class', 'tw-poplayer')
    popLayer.appendChild(this.$el)
    this.popLayer = popLayer
    this.$el.twPoppane = this
    this.initSwitch()
  },
  beforeDestroy () {
    delegateOff(document, 'click.' + this._uid)
    this.created && document.body.removeChild(this.popLayer)
  }
}
</script>
