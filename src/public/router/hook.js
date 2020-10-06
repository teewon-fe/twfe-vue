export default {
  beforeEach (to, from, next) {
    const title = to.meta && to.meta.title

    if (title) {
      document.title = title
    }

    if (to.meta.noAuthRequired) {
      next()
    } else {
      if (window.$app.authorized) {
        if (to.meta.auth) {
          if (window.$app.user.hasAuth(to.meta.auth, to.meta.authExact)) {
            next()
          } else {
            next('/404')
          }
        } else {
          next()
        }
      } else {
        window.$app.delAuth(true)
      }
    }
  },

  // --sync--
  afterEach (to, from) {
    if (to.meta.toggleBodyClass) {
      document.body.classList.add(to.meta.toggleBodyClass)
    }

    if (from.meta.toggleBodyClass) {
      document.body.classList.remove(from.meta.toggleBodyClass)
    }
  }
}
