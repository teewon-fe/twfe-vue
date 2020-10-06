/**
 * 删除数组的某一项
 * @param {Array} arr 要删除元素的数组
 * @param {Any} item 要删除的数组项
 * @param {Boolean} all 相同的项是否全部删除, 默认只删除第一个找到的项
 */
export default function (arr, item, all) {
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
