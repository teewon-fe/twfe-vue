/**
 * 功能: 移除一个对象中属性为空字符串、null、undefined、空数组的属性
 * @param {Object} source 源对象，或源数组
 * @param {Array} primaryEmptyObj 原生的空对象
 */
export function shake (source, primaryEmptyObj = [undefined, '', null]) {
  let result

  if (typeof source === 'object') {
    if (source === null) {
      return null
    } else {
      result = source instanceof Array ? [] : {}
    }
  } else {
    return source
  }

  let keys = Object.keys(source)
  let length = keys.length

  for (let i = 0; i < length; i++) {
    let curr = source[keys[i]]

    if (primaryEmptyObj.includes(curr)) continue

    if (curr instanceof Array) {
      let length = curr.length

      if (length === 0) {
        continue
      } else {
        let arr = []

        for (let i = 0; i < length; i++) {
          arr.push(shake(curr[i]))
        }

        curr = arr
      }
    } else {
      if (typeof curr === 'object') {
        curr = shake(curr)
      }
    }

    result[keys[i]] = curr
  }

  return result
}
