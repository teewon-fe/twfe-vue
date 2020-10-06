/**
* 功能: 按属性名生成选中列表的数组
* @param {Array} from 源数组
* @param {String} prop 属性名
*/
export function generateArrByProp (from, prop) {
  return from.reduce((r, item) => {
    r.push(item[prop])
    return r
  }, [])
}

/**
* 功能: 按属性数组成选中列表的数组
* @param {Array} from 源数组
* @param {Array} props 属性名数组
*/
export function generateArrByProps (from, props = []) {
  return from.reduce((r, item) => {
    let o = {}

    props.forEach(p => {
      o[p] = item[p]
    })

    r.push(o)

    return r
  }, [])
}
