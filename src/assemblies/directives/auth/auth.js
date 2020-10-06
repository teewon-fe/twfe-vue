export default {
  name: 'auth',

  hooks: {
    inserted (el, binding) {
      if (!window.$app.user.hasAuth(binding.value, binding.modifiers.exact)) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
