/**
 * 功能：将url的查询参数生成对象
 */
export default function () {
  let result = {}
  let href = window.location.href
  let queryArr = href.substr(href.indexOf('?') + 1).split('&')

  queryArr.forEach(q => {
    let item = q.split('=')
    result[item[0].trim()] = item[1] ? item[1].trim() : ''
  })

  return result
}
