import freeze from '../utils/freeze'

/**
* 功能: 字典通用方法，按id查询属性值
* @param {Array} from 字典表
* @param {String|Array} value 字典项对应的值
* @param {String|Array} query 查找哪个属性值，当传入【*】号，返回字典项的全部属性，也即字典项本身
* @param {String} valueKey 值对应的属性名称
*/
function select (from, value, query = 'name', valueKey = 'id') {
  try {
    if (Array.isArray(value)) {
      let list = from.filter(o => value.includes(o[valueKey]))

      if (typeof query === 'string') {
        return query === '*' ? list : list.map(item => item[query])
      }

      if (Array.isArray(query)) {
        return list.map(item => (query.reduce((r, prop) => {
          r[prop] = item[prop]
          return r
        }, {})))
      }
    } else {
      let item = from.filter(o => o[valueKey] === value)[0]

      if (typeof query === 'string') {
        return query === '*' ? item : item[query]
      }

      if (Array.isArray(query)) {
        return query.reduce((r, prop) => {
          r[prop] = item[prop]
          return r
        }, {})
      }
    }
  } catch (err) {
    return undefined
  }
}

export default {
  install (Vue, data = {}) {
    let dics = { select, ...data }

    freeze(dics)

    Object.defineProperty(Vue.prototype, '$dic', {
      get () { return dics }
    })
  }
}

export {
  select
}
