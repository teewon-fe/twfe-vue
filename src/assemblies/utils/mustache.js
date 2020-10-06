/**
 * 功能: 用源对象的属性值，根据模板字符串生成一个新的字符串
 * @param {String} template 模板字符串
 * @param {Object} source 源对象
 */
export default function (template, source) {
  let keys = Object.keys(source)

  keys.forEach((item) => {
    template = template.replace(new RegExp(`{${item}}`, 'gi'), source[item])
  })

  return template
}
