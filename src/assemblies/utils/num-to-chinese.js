
let chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', ' 九']
let chnUnitChar = ['', '十', '百', '千']
let chnUnitSection = ['', '万', '亿', '万亿', '亿亿']

// 节内转换算法
function SectionToChinese (section) {
  let strIns = ''
  let chnStr = ''
  let unitPos = 0
  let zero = true
  while (section > 0) {
    var v = section % 10
    if (v === 0) {
      if (!zero) {
        zero = true
        chnStr = chnNumChar[v] + chnStr
      }
    } else {
      zero = false
      strIns = chnNumChar[v]
      strIns += chnUnitChar[unitPos]
      chnStr = strIns + chnStr
    }
    unitPos++
    section = Math.floor(section / 10)
  }
  return chnStr
}

/**
* 将阿拉伯数字转化为中文数字
 * @param {Number} num 要转换的数字
*/
export default function (num) {
  let unitPos = 0
  let strIns = ''; let chnStr = ''
  let needZero = false

  if (num === 0) {
    return chnNumChar[0]
  }
  while (num > 0) {
    var section = num % 10000
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr
    }
    strIns = SectionToChinese(section)
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0]
    chnStr = strIns + chnStr
    needZero = (section < 1000) && (section > 0)
    num = Math.floor(num / 10000)
    unitPos++
  }
  return chnStr
}
