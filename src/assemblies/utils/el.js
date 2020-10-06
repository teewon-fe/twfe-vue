import upperCaseFirstLetter from './upper-case-first-letter'
export { placement } from './placement'

/**
 * 功能：获取一个元素相对于其最近的定位元素的偏移坐标
 * @param {Node} el 要计算的元素
 */
export function position (el) {
  let [x, y] = [0, 0]

  while (el) {
    x += el.offsetLeft
    y += el.offsetTop

    if ((el = el.offsetParent) && ['fixed', 'relative', 'absolute'].includes(window.getComputedStyle(el).position)) {
      break
    }
  }

  return {
    top: y,
    left: x
  }
}

/**
 * 功能：获取一个元素相对于其最近的定位元素的偏移坐标的中心点
 * @param {Node} el 要计算的元素
 */
export function positionCenter (el) {
  let offset = position(el)

  return {
    x: offset.left + el.offsetWidth / 2,
    y: offset.top + el.offsetHeight / 2
  }
}

/**
 * 功能：在元素上添加一个视图层定义的属性
 * @param {Node} el 要添加属性的元素
 * @param {Node} key 属性名称
 * @param {Node} value 属性值
 */
export const prop = {
  add (el, key, value) {
    Object.defineProperty(el, '_tw' + upperCaseFirstLetter(key), {
      value,
      configurable: true,
      enumerable: false
    })
  },

  get (el, key) {
    return el['_tw' + upperCaseFirstLetter(key)]
  },

  del (el, key) {
    delete el['_tw' + upperCaseFirstLetter(key)]
  }
}
