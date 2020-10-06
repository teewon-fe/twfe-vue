/**
 * 类弹出面板需实现的属性
 */
import { addClass } from '@utils/dom'

export default {
  props: {
    noArrow: {
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
    handleSwitchStyle () {
      const switchEls = document.querySelectorAll(this.switch)

      switchEls.forEach(element => {
        if (!this.noArrow) {
          const arrow = document.createElement('i')
          arrow.setAttribute('class', 'tw-triangle ' + ({ a: 'xdown', t: 'xdown', r: 'xright', b: 'xdown', l: 'xleft' })[this.placement.substring(0, 1)])
          element.appendChild(arrow)
          addClass(element, 'x' + this.placement)
        } else {
          addClass(element, 'xnoarrow')
        }
      })
    }
  },
  mounted () {
    const popLayer = document.createElement('div')
    popLayer.setAttribute('class', 'tw-poplayer')
    popLayer.appendChild(this.$el)
    this.popLayer = popLayer
    this.$el.twPoppane = this
    this.handleSwitchStyle()
  },
  beforeDestroy () {
    this.created && document.body.removeChild(this.popLayer)
  },
  watch: {
    switchEl (value, oldvalue) {
      oldvalue && delete oldvalue.twSwitch
      value.twSwitch = this
    }
  }
}
