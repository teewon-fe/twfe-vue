/**
 * 功能：将数值或数值数组转换为字母
 * @param {Number, Array} val 要转换的值
 */
export default function numToLetter (val) {
  if (Array.isArray(val)) {
    return val.map(item => String.fromCharCode(65 + parseInt(item)))
  } else {
    return String.fromCharCode(65 + parseInt(val))
  }
}
