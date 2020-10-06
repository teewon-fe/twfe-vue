export default {
  /**
   * 功能：获取属性值
   * @param {Object} source 源对象
   * @param {String} propChain 点分隔字符串
   */
  get (source, propChain) {
    if (propChain === '') {
      return source
    }

    let names = propChain.split('.')

    try {
      for (let i = 0; i < names.length; i++) {
        source = source[names[i]]
      }
    } catch (e) {
      source = undefined
    }

    return source
  },

  /**
   * 功能：设置属性值
   * @param {Object} source 源对象
   * @param {String} propChain 点分隔字符串
   * @param {String} value 要设置的值
   */
  set (source, propChain, value) {
    if (propChain === '') return

    let names = propChain.split('.')
    let length = names.length - 1

    try {
      for (let i = 0; i < length; i++) {
        if (!source[names[i]]) {
          source[names[i]] = {}
        }

        source = source[names[i]]
      }

      source[names[length]] = value
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * 功能：删除属性值
   * @param {Object} source 源对象
   * @param {String} propChain 点分隔字符串
   * @return 被删除的值
   */
  delete (source, propChain) {
    if (propChain === '') {
      return undefined
    }

    let result
    let names = propChain.split('.')
    let length = names.length - 1

    try {
      for (let i = 0; i < length; i++) {
        source = source[names[i]]
      }

      if (source[names[length]]) {
        result = source[names[length]]
        delete source[names[length]]
      }
    } catch (e) {
      console.log(e)
    }

    return result
  }
}
