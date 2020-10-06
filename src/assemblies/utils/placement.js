/**
 * 返回两个元素间位置相关的信息
 * @param {Element,String} el 目标元素
 * @param {Element} relatedElement 参照元素， 当需要在相同的节点中返回位置信息时， relatedElement应为element的祖先元素
 */
const placement = function (el, relatedElement, relatedWidth) {
  if (typeof relatedElement === 'string') {
    relatedElement = document.querySelector(relatedElement)
  }

  if (relatedElement.nodeType !== 1) throw new TypeError('位置参照元素为空，请检查指定的元素或选择器是否正确。')

  const isdescendant = relatedElement.contains(el)
  let elWidth = el.offsetWidth
  const elHeight = el.offsetHeight
  const relatedRect = relatedElement.getBoundingClientRect()
  const minWidth = relatedWidth ? relatedRect.width * parseFloat(relatedWidth) / 100 : 0

  if (elWidth < minWidth) elWidth = minWidth
  const overallWidth = relatedRect.left + relatedRect.width + elWidth
  const overallHeight = relatedRect.top + relatedRect.height + elHeight

  /* eslint-disable */
  const placements = [
    'top-left',
    'top-center',
    'top-right',
    'rig-httop',
    'right-center',
    'right-bottom',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'left-top',
    'left-center',
    'left-bottom'
  ]

  let matrix = {}

  if (isdescendant) {
    // 生成父子关系时的位置信息
    placements.forEach(function (item) {
      matrix[item] = {}

      if(minWidth) {
        matrix[item].minWidth = minWidth + 'px'
      }

      if (/^top/.test(item)) {
        matrix[item].bottom = relatedRect.height + 'px'
      }

      if (/^right/.test(item)) {
        matrix[item].left = '100%'
      }

      if (/^bottom/.test(item)) {
        matrix[item].top = relatedRect.height + 'px'
      }

      if (/^left/.test(item)) {
        matrix[item].left = -elWidth + 'px'
      }

      if (/top$/.test(item)) {
        matrix[item].top = 0
      }

      if (/right$/.test(item)) {
        matrix[item].right = 0
      }

      if (/bottom$/.test(item)) {
        matrix[item].bottom = 0
      }

      if (/left$/.test(item)) {
        matrix[item].left = 0
      }

      if (/center$/.test(item)) {
        if (/^(top|bottom)/.test(item)) {
          matrix[item].left = (relatedRect.width - elWidth) / 2 + 'px'
        } else {
          matrix[item].top = (relatedRect.height - elHeight) / 2 + 'px'
        }
      }
    })

    matrix.auto = {}

    if (overallHeight > window.innerHeight && relatedRect.top > elHeight) {
      matrix.auto.bottom = relatedRect.height + 'px'
    }

    if (overallWidth > window.innerWidth && relatedRect.left + relatedRect.width > elWidth) {
      matrix.auto.right = 0
    }
  } else {
    // 生成非父子关系时的位置信息(即element将直接放置在body中)
    const relatedTop = window.pageYOffset + relatedRect.top
    const relatedLeft = window.pageXOffset + relatedRect.left

    placements.forEach(function (item) {
      matrix[item] = {}

      if(minWidth) {
        matrix[item].minWidth = minWidth  + 'px'
      }

      if (/^top/.test(item)) {
        matrix[item].top = relatedTop - elHeight + 'px'
      }

      if (/^right/.test(item)) {
        matrix[item].left = relatedLeft + relatedRect.width + 'px'
      }

      if (/^bottom/.test(item)) {
        matrix[item].top = relatedTop + relatedRect.height + 'px'
      }

      if (/^left/.test(item)) {
        matrix[item].left = relatedLeft - elWidth + 'px'
      }

      if (/top$/.test(item)) {
        matrix[item].top = relatedTop + 'px'
      }

      if (/right$/.test(item)) {
        matrix[item].left = relatedLeft + relatedRect.width - elWidth + 'px'
      }

      if (/bottom$/.test(item)) {
        matrix[item].top = relatedTop + relatedRect.height - elHeight + 'px'
      }

      if (/left$/.test(item)) {
        matrix[item].left = relatedLeft + 'px'
      }

      if (/center$/.test(item)) {
        if (/^(top|bottom)/.test(item)) {
          matrix[item].left = relatedLeft + relatedRect.width / 2 - elWidth / 2 + 'px'
        } else {
          matrix[item].top = relatedTop + relatedRect.height / 2 - elHeight / 2 + 'px'
        }
      }
    })

    matrix.auto = {
      top: relatedTop + relatedRect.height + 'px',
      left: relatedLeft + 'px',
      bottom: ''
    }

    if (overallHeight > window.innerHeight && relatedRect.top > elHeight) {
      matrix.auto.top = relatedTop - elHeight + 'px'
      matrix.auto.bottom = 'auto'
    }

    if (overallWidth > window.innerWidth && relatedRect.left + relatedRect.width > elWidth) {
      matrix.auto.left = relatedLeft + relatedRect.width - elWidth + 'px'
    }
  }

  if(minWidth) {
    matrix.auto.minWidth = minWidth  + 'px'
  }

  return matrix
}

export {
  placement
}
