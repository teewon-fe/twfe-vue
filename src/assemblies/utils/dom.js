/**
 * 元素添加class
 * @param {Node} el
 * @param {String} className
 */
const addClass = function (el, className) {
  if (/\s/.test(className)) {
    throw new Error('className不能包含空格.')
  }

  let targetClass = el.getAttribute('class')
  let classReg = new RegExp('\\b' + className + '\\b')

  if (classReg.test(targetClass)) return

  targetClass = (targetClass + ' ' + className).replace(/^ /, '')
  el.setAttribute('class', targetClass)
}

/**
 * 元素移除class
 * @param {Node} el
 * @param {String} className
 */
const removeClass = function (el, className) {
  if (/\s/.test(className)) {
    throw new Error('className不能包含空格.')
  }

  let classReg = new RegExp('(\\s|\\b)' + className + '\\b')

  let targetClass = el.getAttribute('class').replace(classReg, '').replace(/ $/, '')
  el.setAttribute('class', targetClass)
}

/**
 * 切换class
 * @param {Node} el
 * @param {String} className
 */
const toggleClass = function (el, className) {
  let targetClass = el.getAttribute('class')

  if (targetClass.indexOf(className) !== -1) {
    removeClass(el, className)
    return 'remove'
  } else {
    addClass(el, className)
    return 'add'
  }
}

/**
 * 获取元素应用样式后的属性值
 * @param {Node} el
 * @param {String} className
 * @param {String} props
 */
const getToggleClassStyles = function (el, className, ...props) {
  const originalTransition = el.style.transition

  el.style.transition = 'none'
  toggleClass(el, className)

  const computedStyle = window.getComputedStyle(el)
  const value = {}

  props.forEach(function (prop) {
    value[prop] = computedStyle[prop]
  })

  toggleClass(el, className)
  el.style.transition = originalTransition

  /* eslint-disable no-unused-vars */
  const forceRepaint = el.offsetWidth

  return value
}

/**
 * 解决display:noen,width:auto,height:auto样式切换时不触发transition
 * @param {HTMLElement} el
 * @param {String} className
 * @param {Object} option
 * option.type 指定切换的类型，不指定时默认为toggle，可选的值为:toggle,add,remove
 * option.transitionClass 过渡状态时临时添加的过渡样式,在过渡开始时添加，完成时移除
 * option.widthAuto 指出需要解决width为 auto时的过渡效果
 * option.heightAuto 指出需要解决height为 auto时的过渡效果
 * option.startCallback 过渡开始时调用的函数
 * option.endCallback 过渡结束后调用的函数
 */
const toggleSpecialTransitionClass = function (el, className, option = {}) {
  let toggle = option.type

  const toggleFunction = function () {
    if (toggle === 'add') {
      addClass(el, className)
    } else if (toggle === 'remove') {
      removeClass(el, className)
    } else {
      toggle = toggleClass(el, className)
    }
  }

  typeof option.startCallback === 'function' && option.startCallback()

  if (el.style.transition !== undefined) {
    const stylePropName = 'tw' + className + (option.transitionClass || '')

    // 获取当前的dispaly,width,height三个样式值
    const current = {
      display: window.getComputedStyle(el).display,
      width: el.offsetWidth + 'px',
      height: el.offsetHeight + 'px'
    }

    // 保存或还原最初的style值
    if (typeof el[stylePropName] !== 'undefined') {
      el.setAttribute('style', el[stylePropName] || '')
    } else {
      el[stylePropName] = el.getAttribute('style')
    }

    // 获取切换className后的三个样式值
    const target = getToggleClassStyles(el, className, 'display', 'width', 'height')

    // 修改过渡开始时的辅助样式
    el.style.display = current.display === 'none' ? target.display : current.display
    if (option.widthAuto) el.style.width = current.width
    if (option.heightAuto) el.style.height = current.height
    /* eslint-disable no-unused-vars */
    const forceRepaint = el.offsetWidth

    // 设置下一帧时的辅助样式,以触发过渡
    const setNextFrame = function () {
      if (option.widthAuto) el.style.width = target.width
      if (option.heightAuto) el.style.height = target.height
    }

    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(setNextFrame)
    } else {
      setTimeout(setNextFrame, 17)
    }

    // 设置过渡中间样式
    if (typeof option.transitionClass === 'string') addClass(el, option.transitionClass)

    // 过渡结束调用函数
    el.removeEventListener('transitionend', el[stylePropName + 'end'])

    const end = function () {
      el.setAttribute('style', el[stylePropName] || '')
      removeClass(el, option.transitionClass)
      el.removeEventListener('transitionend', end)
      delete el[stylePropName]
      delete el[stylePropName + 'end']
      typeof option.endCallback === 'function' && option.endCallback(toggle)
    }

    el[stylePropName + 'end'] = end

    el.addEventListener('transitionend', end)
    toggleFunction()
  } else {
    toggleFunction()
    typeof option.endCallback === 'function' && option.endCallback(toggle)
  }
}

/**
 * 设置临时样式值
 * @param {HTMLElement} el 元素
 * @param {String} name 样式属性名称
 * @param {String} value 临时样式值
 * @param {Function} callback 设置临时样式完成后的回调函数
 */
const setTempStyle = function (el, name, value, callback) {
  const originalValue = el.style[name]
  el.style[name] = value
  callback()
  el.style[name] = originalValue
}

export {
  addClass,
  removeClass,
  toggleClass,
  setTempStyle,
  getToggleClassStyles,
  toggleSpecialTransitionClass
}
