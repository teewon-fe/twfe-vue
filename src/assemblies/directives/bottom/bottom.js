let setBottom

export default {
  name: 'bottom',

  hooks: {
    inserted (el, binding) {
      setBottom = function () {
        const rect = el.getBoundingClientRect()
        const top = rect.top + window.pageYOffset - document.documentElement.clientTop
        const windowHieght = window.innerHeight
        const value = parseInt(binding.value) ? parseInt(binding.value) : 0

        if (binding.modifiers.height) {
          el.style.height = windowHieght - top - value + 'px'
        } else {
          el.style.minHeight = windowHieght - top - value + 'px'
        }
      }

      setBottom()

      // 注册全局调用函数
      if (!(window.twBottomHandlers instanceof Array)) {
        window.twSetBottomHandlers = []
        window.twSetBottoms = function () {
          window.twSetBottomHandlers.forEach(handler => {
            handler()
          })
        }
      }

      el.twSetBottom = setBottom
      window.twSetBottomHandlers.push(setBottom)

      window.addEventListener('resize', setBottom)
    },

    componentUpdated (el, binding) {
      setBottom()
    },

    unbind () {
      window.removeEventListener('resize', setBottom)

      // 移除全局调用函数
      if (window.twBottomHandlers instanceof Array) {
        window.twSetBottomHandlers = window.twSetBottomHandlers.filters((handler) => {
          return handler !== setBottom
        })
      }
    }
  }
}
