/**
 *  触发一个事件
 * @param {Node} el
 * @param {String} name
 * @param {Array} opts
 */
const trigger = function (el, name, ...opts) {
  let eventName

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }

  const evt = document.createEvent(eventName)

  // 兼容IE9
  if (typeof opts[0] === 'undefined') opts[0] = true
  if (typeof opts[1] === 'undefined') opts[1] = true

  evt.initEvent(name, ...opts)

  el.dispatchEvent
    ? el.dispatchEvent(evt)
    : el.fireEvent('on' + name, evt)

  return el
}

/**
 * 委托一个事件
 * @param {Node} target 目标
 * @param {String} eventName 事件名称,可以加后缀命名空间，如click.memu
 * @param {String, Element} source 被委托的元素，css选择器或Element
 * @param {Boolean} useCapture 是否用捕获模式
 * @param {Function} callback1 事件被委托元素触发时回调函数
 *  回调函数的第一个参数为委托元素本身,第二个参数为事件触发的event对象
 * @param {Function} callback2 事件被非委托元素触发时的回调函数
 *  回调函数的第一个参数为event对象
 */
const delegate = function (target, eventName, delegateElement, useCapture = false, callback1, callback2) {
  if (typeof useCapture === 'function') {
    callback2 = callback1
    callback1 = useCapture
    useCapture = false
  }

  if (!target.twEvents) {
    Object.defineProperty(target, 'twEvents', {
      value: {},
      enumerable: false
    })
  }

  if (!target.twEvents[eventName]) target.twEvents[eventName] = []

  const delegateFunction = function (event) {
    let elemets = []

    if (typeof delegateElement === 'string') {
      elemets = document.querySelectorAll(delegateElement)
    } else if (delegateElement instanceof Element) {
      if (delegateElement.nodeType === 1) {
        elemets.push(delegateElement)
      }
    } else {
      throw new TypeError('The delegated element must be a css selector or Element.')
    }

    let miss = true

    for (let i = 0; i < elemets.length; i++) {
      if (elemets[i].contains(event.target)) {
        miss = false
        callback1(elemets[i], event)
        break
      }
    }

    if (miss && callback2) {
      callback2(event)
    }
  }

  target.addEventListener(/^[a-z]*/.exec(eventName)[0], delegateFunction, useCapture)
  target.twEvents[eventName].push(delegateFunction)

  return target
}

/**
 * 注销一个委托事件
 * @param {Node} el 要注销委托事件的元素
 * @param {String} eventName 事件名称,可以加后缀命名空间，如click.memu
 */
const delegateOff = function (el, eventName, useCapture = false) {
  if (!el.twEvents) return
  if (!el.twEvents[eventName]) return

  el.twEvents[eventName].forEach(element => {
    el.removeEventListener(/^[a-z]*/.exec(eventName)[0], element, useCapture)
  })

  delete el.twEvents[eventName]
}

export {
  trigger,
  delegate,
  delegateOff
}
