/**
 * 从源对像中按点分隔获取属性值
 * @param {Object} source 源对象
 * @param {String} 点分隔字符串
 */
export default function (source, dotString) {
  let result = source
  let names = dotString.split('.')

  try {
    for (let i = 0; i < names.length; i++) {
      result = result[names[i]]
    }
  } catch (e) {
    result = undefined
  }

  return result
}
