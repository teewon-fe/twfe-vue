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
    trigger: {
      type: String,
      default: 'click,hover'
    },
    selfCloseSwitch: {
      type: String,
      default: ''
    },
    useCapture: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'auto'
    },
    positionElement: {
      type: String,
      default: 'auto'
    },
    widthAsPositionElement: {
      type: Boolean,
      default: false
    },
    containerElement: {
      type: String,
      default: 'body'
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
    },
    layerClass: {
      type: String,
      default: ''
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

  computed: {
    isClicked () {
      return /\bhover\b/.test(this.trigger) ? /\bclick\b/.test(this.trigger) && ('ontouchstart' in window) : true
    },
    isHovered () {
      return /\bhover\b/.test(this.trigger)
    },
    container () {
      return this.containerElement ? this.containerElement : 'body'
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
      const vm = this
      vm.$emit('show')

      toggleSpecialTransitionClass(this.$el, 'xopen', {
        type: 'add',
        endCallback () {
          vm.$emit('shown')
        }
      })
      addClass(this.switchEl, 'xopen')
      this.open = true
      this.setParent(true)
    },

    closePoppane (event, event2) {
      const vm = this
      vm.$emit('hide')

      if (this.trigger === 'click' && this.selfCloseSwitch) {
        if (event && !event2 && (this.$el.contains(event.target) ||
          this.switchEl.contains(event.target))) {
          return
        }
      } else {
        if (event) {
          this.eventTarget = event.target
          if (this.hasOpenChildPoppane) return
          if (event.type === 'click' && this.switchEl.contains(event.target)) return
          if (event.type === 'mouseleave' && (this.popLayer.contains(event.relatedTarget) || this.switchEl.contains(event.relatedTarget))) return
          if (this.$el.contains(event.target) && this.isSwitchElement(event.target)) return
        }
      }

      toggleSpecialTransitionClass(this.$el, 'xopen', {
        type: 'remove',
        endCallback () {
          vm.$emit('hidden')
        }
      })
      removeClass(this.switchEl, 'xopen')
      this.open = false
      this.setParent(false)
      this.switchEl.blur()
      if (this.isClicked) document.removeEventListener('click', this.closePoppane, true)
      if (this.isHovered) {
        this.$el.removeEventListener('mouseleave', this.closePoppane, true)
        this.switchEl.removeEventListener('mouseleave', this.closePoppane, true)
        delegate(document, 'mousemove.' + this._uid, this.switch, this.useCapture, this.togglePoppane)
      }
    },

    togglePoppane (switchEl, event) {
      if (/\bhover\b/.test(this.trigger)) delegateOff(document, 'mousemove.' + this._uid, this.useCapture)

      this.switchEl = switchEl
      this.eventTarget = event.target
      if (!this.created) {
        document.querySelector(this.container).appendChild(this.popLayer)
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
      if ((!/\bxopen\b/.test(poppaneEl.getAttribute('class'))) || this.$el.switchEl !== switchEl) {
        if (this.$el.switchEl) {
          removeClass(this.$el.switchEl, 'xopen')
        }

        setTempStyle(poppaneEl, 'visibility', 'hidden !important', () => {
          addClass(poppaneEl, 'xopen')
          placementStyle = placement(poppaneEl, positionEl, this.relatedMinWidth)[this.placement]
          removeClass(poppaneEl, 'xopen')
        })
      }

      for (const name in placementStyle) {
        this.$el.style[name] = placementStyle[name]
      }

      if (this.positionElement !== 'auto' && this.widthAsPositionElement) {
        this.$el.style.width = document.querySelector(this.positionElement).offsetWidth + 'px'
      }

      if (/\bxopen\b/.test(poppaneEl.getAttribute('class'))) {
        this.closePoppane()
      } else {
        this.openPoppane()
        if (this.isClicked) document.addEventListener('click', this.closePoppane, true)
        if (this.isHovered) {
          poppaneEl.addEventListener('mouseleave', this.closePoppane, true)
          this.switchEl.addEventListener('mouseleave', this.closePoppane, true)
        }
      }

      poppaneEl.switchEl = switchEl
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
    if (!this.disabled) {
      if (this.isClicked) delegate(document, 'click.' + this._uid, this.switch, this.useCapture, this.togglePoppane)
      if (this.isHovered) delegate(document, 'mousemove.' + this._uid, this.switch, this.useCapture, this.togglePoppane)
    }
  },

  mounted () {
    const popLayer = document.createElement('div')
    popLayer.setAttribute('class', `tw-poplayer ${this.layerClass}`)
    popLayer.appendChild(this.$el)
    this.popLayer = popLayer
    this.$el.twPoppane = this
    this.initSwitch()

    if (this.trigger === 'click' && this.selfCloseSwitch) {
      delegate(document, 'click.' + this._uid, this.selfCloseSwitch, this.closePoppane)
    }
  },

  beforeDestroy () {
    if (this.isClicked) delegateOff(document, 'click.' + this._uid, this.useCapture)
    if (this.isHovered) delegateOff(document, 'mousemove.' + this._uid, this.useCapture)
    if (this.trigger === 'click' && this.selfCloseSwitch) {
      delegateOff(document, 'click.' + this._uid, this.closePoppane)
    }

    const container = document.querySelector(this.container)
    this.created && container && container.removeChild(this.popLayer)
  },

  watch: {
    disabled (value) {
      if (value) {
        if (this.isClicked) {
          delegateOff(document, 'click.' + this._uid, this.useCapture)
          document.removeEventListener('click', this.closePoppane, true)
        }

        if (this.isHovered) {
          delegateOff(document, 'mousemove.' + this._uid, this.useCapture)
          this.$el.removeEventListener('mouseleave', this.closePoppane, true)
          this.switchEl.removeEventListener('mouseleave', this.closePoppane, true)
        }

        if (this.trigger === 'click' && this.selfCloseSwitch) {
          delegateOff(document, 'click.' + this._uid, this.closePoppane)
        }
      } else {
        if (this.isClicked) delegate(document, 'click.' + this._uid, this.switch, this.useCapture, this.togglePoppane)
        if (this.isHovered) delegate(document, 'mousemove.' + this._uid, this.switch, this.useCapture, this.togglePoppane)
        if (this.trigger === 'click' && this.selfCloseSwitch) {
          delegate(document, 'click.' + this._uid, this.selfCloseSwitch, this.closePoppane)
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import "poppane.scss";
</style>
