/**
 * 功能: 获取有子项类型的数组总共有多少项
 * @param {Array} tree 要统计的树或分支
 * @param {Boolean} type 统计类型，默认全部，'leaf'-仅统计叶子节点, 'branch'-仅统计分支节点
 * @param {String} childrenKey 子项包含在哪个key里面
 */
export function total (tree, type, childrenKey = 'children') {
  let total = 0

  const fn = function (tree) {
    tree.forEach(item => {
      if (type === 'leaf') {
        if (!Array.isArray(item[childrenKey])) {
          total++
        }
      } else if (type === 'branch') {
        if (Array.isArray(item[childrenKey])) {
          total++
        }
      } else {
        total++
      }

      if (Array.isArray(item[childrenKey])) {
        fn(item[childrenKey])
      }
    })
  }

  fn(tree)

  return total
}

/**
 * 功能: 按给定的值扁平化节点
 * @param {Array} tree 树或分支
 * @param {String} childrenKey 子项包含在哪个key里面
 */
export function nodes (tree, childrenKey = 'children') {
  let result = []

  const fn = function (tree) {
    tree.forEach(node => {
      result.push(node)

      if (Array.isArray(node[childrenKey])) {
        fn(node[childrenKey])
      }
    })
  }

  fn(tree)

  return result
}

/**
 * 功能: 按指定模式生成分支节点
 * @param {Array} tree 要统计的树或分支
 * @param {String, Array} levels 哪些层级,默认为所有,从0开始计数
 * @param {String} childrenKey 子项包含在哪个key里面
 */
export function branches (tree, levels, childrenKey = 'children') {
  let result = []

  const fn = function (tree, currentLevel = 0) {
    currentLevel += 1

    tree.forEach(node => {
      if (typeof levels !== 'undefined') {
        if (levels.includes(currentLevel) && Array.isArray(node[childrenKey])) {
          result.push(node)
        }
      } else {
        if (Array.isArray(node[childrenKey])) {
          result.push(node)
        }
      }

      if (Array.isArray(node[childrenKey])) {
        fn(node[childrenKey], currentLevel)
      }
    })
  }

  fn(tree)

  return result
}

/**
 * 功能: 按给定的值扁平化节点
 * @param {Array} tree 树或分支
 * @param {Array} values 扁平化节点的值
 * @param {String} key 指定的属性键值
 * @param {String} childrenKey 子项包含在哪个key里面
 */
export function flat (tree, values, key = 'id', childrenKey = 'children') {
  let result = []

  if (!Array.isArray(values)) {
    values = [values]
  }

  const fn = function (tree) {
    tree.forEach(node => {
      if (values.includes(node[key])) {
        result.push(node)
      }

      if (Array.isArray(node[childrenKey])) {
        fn(node[childrenKey])
      }
    })
  }

  fn(tree)

  return result
}
