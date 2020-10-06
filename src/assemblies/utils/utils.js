
/**
 * 判断指定的vue节点是否有指定名称的祖先节点
 * @param {Vnode} vnode
 * vue节点
 * @param {String} name
 * 组件名称
 */
const hasAncestor = function (vnode, name) {
  let parent = vnode.$parent

  while (parent) {
    if (parent.$options.name === name) return true
    parent = parent.$parent
  }

  return false
}

const hasDescendant = function (vnode, name) {
  let parent = vnode.$parent

  while (parent) {
    if (parent.$options.name === name) return true
    parent = parent.$parent
  }

  return false
}

const copyPropChian = function (target, source, propchain) {
  const props = propchain.split('.')
  let targetChain = target
  let sourceChain = source

  for (let i = 0; i < props.length; i++) {
    sourceChain = sourceChain[props[i]]

    if (i === props.length - 1) {
      targetChain[props[i]] = sourceChain
    } else {
      if (!targetChain[props[i]]) targetChain[props[i]] = {}
      targetChain = targetChain[props[i]]
    }
  }

  return target
}

const assign = function (obj1, obj2) {
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      const element = obj2[key]
      if (typeof obj1[key] === 'undefined' || typeof element !== 'object' || element instanceof Array) {
        obj1[key] = element
      } else {
        assign(obj1[key], element)
      }
    }
  }
}

export {
  hasAncestor,
  hasDescendant,
  copyPropChian,
  assign
}
