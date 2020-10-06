export default {
  beforeEach (to, from, next) {
    const title = to.meta && to.meta.title

    if (title) {
      document.title = title
      window.$app.title.text = title
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
        window.$app.delAuth(true, window.$ui.urlQuery.accredit_code ? `?accredit_code=${window.$ui.urlQuery.accredit_code}` : '')
      }
    }
  }
}
