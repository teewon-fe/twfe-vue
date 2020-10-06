/**
 * 功能：切换数组元素
 * @param {Array} arr 要切换元素的数组
 * @param {any} val 要切换的值
 */
export function toggle (arr, val) {
  var index = arr.indexOf(val)

  if (index === -1) {
    arr.push(val)
  } else {
    arr.splice(index, 1)
  }

  return arr
}

/**
* 功能: 比较两个数组是否包含相同的元素
*/
export function equal (arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false
  if (arr1 === arr2) return true
  if (arr1.length !== arr2.length) return false

  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) return false
  }

  return true
}

/**
 * 功能: 删除数组的某一项
 * @param {Array} arr 要删除元素的数组
 * @param {Any} item 要删除的数组项
 * @param {Boolean} all 相同的项是否全部删除, 默认只删除第一个找到的项
 */
export function del (arr, item, all) {
  if (all) {
    while (arr.includes(item)) {
      arr.splice(arr.indexOf(item), 1)
    }
  } else {
    if (arr.includes(item)) {
      arr.splice(arr.indexOf(item), 1)
    }
  }

  return arr
}

/**
 * 功能: 按模式获取数组中的对象
 * @param {Array} arr 查找项的数组
 * @param {Object} mode 匹配模式
 * @param {Boolean} isInclude 是否开启模糊查找
 * @param {Boolean} all 是否找到匹配模式全部的项，默认只找到第一项
 * @return {Array} 返回找到的结果数组，默认只包含一项，启用all后，有可能包含多项
 */
export function findMode (arr, mode, isInclude, all = false) {
  let keys = Object.keys(mode)
  let result = []

  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i]

    for (var j = 0; j < keys.length; j++) {
      let matching = isInclude
        ? (!`${curr[keys[j]]}`.includes(mode[keys[j]]))
        : mode[keys[j]] !== curr[keys[j]]

      if (matching) {
        break
      }
    }

    if (j === keys.length) {
      result.push(curr)

      if (!all) {
        return result
      }
    }
  }

  return result
}

/**
 * 功能: 返回索引
 * @param {Array} arr 查找项的数组
 * @param {Object} mode 匹配模式
 * @param {Boolean} isInclude 是否开启模糊查找
 * @return {Array} 返回找到的结果数组，默认只包含一项，启用all后，有可能包含多项
 */
export function indexMode (arr, mode, isInclude) {
  let keys = Object.keys(mode)

  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i]

    for (var j = 0; j < keys.length; j++) {
      let matching = isInclude
        ? (!`${curr[keys[j]]}`.includes(mode[keys[j]]))
        : mode[keys[j]] !== curr[keys[j]]

      if (matching) {
        break
      }
    }

    if (j === keys.length) {
      return i
    }
  }

  return -1
}

/**
 * 功能: 数组是否有指定的匹配模式项
 * @param {Array} arr 查找匹配模式的数组
 * @param {Object} mode 匹配模式
 * @param {Boolean} isInclude 是否开启模糊查找
 */
export function hasMode (arr, mode, isInclude) {
  return findMode(arr, mode, isInclude).length > 0
}
