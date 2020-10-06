import { position } from './el'

/**
 * 偏移量改变监视器
 * 用于控制元素可通过拖动相关控制点，改变尺寸，大小等
 */
export default class XYChanger {
  selectTargetEvent = null

  /**
   * @param {Object} option
   * target: 目标元素，即要控制的元素，可为元素本身或css选择器，必传
   * controler: 控制点相关有如下相关属性
      * elment: 控制元素，即控制点，可为元素本身或css选择器，默认自动生成
      * title: 要显示的title提示
      * container: 要把控制元素添加到哪个节点下，默认为body，当指定为'target'时，会做为目标元素的最后一个子元素
      * className: 要为自动生成的控制点额外添加的样式class
   * 回调函数
   * select：选中目标元素时触发
   * start：开始拖动时触发
   * update：拖动时会连续触发
   * end：结束拖动时触发
   * unselect：取消选中目标元素时触发
   */
  constructor (option = {}) {
    this._option = option

    let names = ['select', 'start', 'update', 'end', 'unselect']

    names.forEach(name => {
      if (typeof option[name] === 'function') {
        this[name] = option[name]
      }
    })

    let me = this

    const selectTarget = function () {
      if (me.select) {
        me.select(me.target)
      }

      me.genControlPoint(me.target)
    }

    if (typeof option.target === 'string') {
      // target为selector
      this.selectTargetEvent = function (event) {
        me.target = me.getTargetElement(event.target, option.target)

        if (me.target) {
          selectTarget()
        }
      }

      document.addEventListener('click', this.selectTargetEvent)
    } else if (option.target instanceof Element) {
      // target直接为元素
      option.target.addEventListener('click', function () {
        me.target = option.target
        selectTarget()
      })
    } else {
      throw new TypeError('option.target must be a css selector or a element.')
    }
  }

  genControlPoint (target) {
    let me = this
    let point = null
    let container = null
    let start = { x: 0, y: 0 }
    let pointIsAutoGen = false

    const computeControlPointOffset = function () {
      if (me._option.controler.container !== 'target') {
        const offset = position(target)

        point.style.top = offset.top + target.offsetHeight + 'px'
        point.style.left = offset.left + target.offsetWidth + 'px'
      }
    }

    const updateOffset = function (event) {
      let change = {
        x: event.pageX - start.x,
        y: event.pageY - start.y
      }

      if (me.update) {
        me.update(change, target)
      }

      if (me._option.controler.container === 'target') {
        if (!container.contains(point)) {
          container.appendChild(point)
        }
      }

      computeControlPointOffset()
    }

    const stopChangeOffset = function (event) {
      let end = {
        x: event.pageX - start.x,
        y: event.pageY - start.y
      }

      if (me.end) {
        me.end(end, target)
      }

      document.removeEventListener('mousemove', updateOffset)
      document.removeEventListener('mouseup', stopChangeOffset)
    }

    const startChangeOffset = function (event) {
      event.preventDefault()

      start.x = event.pageX
      start.y = event.pageY

      if (me.start) {
        me.start(start, target)
      }

      document.addEventListener('mousemove', updateOffset)
      document.addEventListener('mouseup', stopChangeOffset)
    }

    document.removeEventListener('click', this.unselectTarget, true)

    this.unselectTarget = function (evnet) {
      if (evnet === 'fromClear' || !point.contains(event.target)) {
        if (me.unselect) {
          me.unselect(target)
        }

        if (pointIsAutoGen && container.contains(point)) {
          container.removeChild(point)
        }

        document.removeEventListener('click', me.unselectTarget, true)
      }
    }

    if (this._option.controler.container instanceof Element) {
      container = this._option.controler.container
    } else if (this._option.controler.container === 'target') {
      container = target
    } else {
      container = document.body
    }

    if (typeof this._option.controler.element === 'string') {
      point = document.querySelector(this._option.controlElement)
    } else if (this._option.controler.element instanceof Element) {
      point = this._option.controler.element
    }

    if (!point) {
      point = document.createElement('i')
      container.appendChild(point)
      pointIsAutoGen = true
    }

    point.contentEditable = false
    point.className = 'tw-controlpoint ' + (this._option.controler.className || '')

    if (this._option.controler.title) {
      point.title = this._option.controler.title
    }

    if (this._option.controler.container === 'target') {
      point.classList.add('xinner')
    }

    computeControlPointOffset()

    point.addEventListener('click', function (e) { e.stopPropagation() })
    point.addEventListener('mousedown', startChangeOffset)
    document.addEventListener('click', this.unselectTarget, true)
  }

  getTargetElement (el, targetSelector) {
    const targets = document.querySelectorAll(targetSelector)

    let i, len

    for (i = 0, len = targets.length; i < len; i++) {
      if (targets[i].contains(el)) {
        return targets[i]
      }
    }

    return null
  }

  clear () {
    if (this.unselectTarget) {
      this.unselectTarget('fromClear')
    }
  }

  destroy () {
    if (this.selectTargetEvent) {
      document.removeEventListener('click', this.selectTargetEvent)
    }
  }
}
