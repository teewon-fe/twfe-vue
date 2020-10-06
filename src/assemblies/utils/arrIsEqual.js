/**
* 功能: 比较两个数组是否包含相同的元素
*/
export default function (arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false
  if (arr1 === arr2) return true
  if (arr1.length !== arr2.length) return false

  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) return false
  }

  return true
}
