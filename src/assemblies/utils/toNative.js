/**
 * 将值转换为原生值
 * @param {*} value 值
 * @param {*} type 目标类型
 */

export default function (value, type) {
  if (type === 'boolen') {
    return Boolean(value)
  } else if (type === 'number') {
    return Number(value)
  } else if (type === 'string') {
    return String(value)
  } else {
    return value
  }
}
