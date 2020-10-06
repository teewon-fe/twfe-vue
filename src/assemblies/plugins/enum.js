export default {
  install (Vue, options = {}) {
    let enums = { ...options }

    Object.freeze(enums)

    Object.defineProperty(Vue.prototype, '$cnt', {
      get () { return enums }
    })
  }
}
