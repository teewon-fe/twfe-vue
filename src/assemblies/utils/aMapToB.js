/**
* 功能: 将对象a按映射关系转换成b
* @param {Type} from 源对象
* @param {Type} keyMap 映射关系
* 如果源对象属性为字面量，直接这样映射: {fromKey: 'toKey'}
* 如果源对象属性为数组或对象，这样映射: {fromKey: {name: 'toKey', map: {fromKey: 'toKey'}}}
* 嵌套的map为对应的数组每一项(注意不支持多维数组嵌套)，或是对应的子对象的映射关系
*/
export default function aMapToB (from, keyMap) {
  if (from !== null && !Array.isArray(from) && typeof from === 'object') {
    let to = {}

    for (const [fromKey, toKey] of Object.entries(keyMap)) {
      let curr = from[fromKey]

      if (curr !== null && typeof curr === 'object' && typeof toKey === 'object') {
        let map = toKey.map

        if (Array.isArray(curr)) {
          to[toKey.name] = []

          curr.forEach(item => {
            to[toKey.name].push(aMapToB(item, map))
          })
        } else {
          to[toKey.name] = aMapToB(curr, map)
        }
      } else {
        to[toKey] = curr
      }
    }

    return to
  } else {
    return from
  }
}
