/**
 * 将数字转换为百分比字符
 * @param {Number} num 要转换的数字
 * @param {Number} decimal 保留几位小数
 * @param {Boolean} trimEnd0 是否去除尾随的0
 */
export default function (num, decimal, trimEnd0 = true) {
  num = num * 100

  if (decimal) {
    num = num.toFixed(decimal)
  }

  if (trimEnd0) {
    num = (num + '').replace(/\.0+/, '').replace(/(\.[1-9])0+/, '$1')
  }

  return num + '%'
}
