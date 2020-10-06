import cookie from '../utils/cookie'

class User {
  authList = []

  /**
   * 功能：验证用户是否有在eco的应用中配置的权限
   * @param {String,Array} auth 权限菜单或列表
   * @param {Boolean} exact 是否开启精确匹配
   */
  hasAuth (auth, exact) {
    const auths = Array.isArray(auth) ? auth : [auth]
    const result = this.authList.filter(auth => auths.includes(auth.menuPath))

    if (exact) {
      return result.length === auths.length
    } else {
      return result.length > 0
    }
  }
}

export default {
  install (Vue, options = {}) {
    if (this.installed) return

    window.addEventListener('offline', function () {
      window.$ui.msgBox({
        title: '提示',
        type: 'error',
        message: '网络不给力，请检查网络~',
        customClass: 'xtop'
      })
    })

    this.installed = true

    if (process.env.NODE_ENV === 'development') {
      Vue.mixin({
        created () {
          if (this.$options.name) {
            let name = this.$options.name.replace(/-(\w)/g, (m, p1) => p1.toUpperCase())
            window[name] = this
          }
        }
      })
    }

    let config = {}

    for (const key in process.env) {
      if (process.env.hasOwnProperty(key)) {
        if (/^VUE_APP_/.test(key)) {
          let _key = key
            .replace(/^VUE/, '')
            .replace(/_(\w)([^_]*)/g, (m, p1, p2) => p1 + p2.toLowerCase())
            .replace(/^(\w)/, (m, p1) => p1.toLowerCase())

          config[_key] = process.env[key]
        }
      }
    }

    Object.assign(config, options, {
      setAuth (user, isAdditional) {
        if (typeof user === 'object') {
          let _user = new User()

          if (isAdditional) {
            _user = Object.assign(_user, JSON.parse(localStorage.getItem('$user')) || {}, user)
          } else {
            Object.assign(_user, user)
          }

          cookie.set('authorized', true, 0)
          window.$app.user = _user
          localStorage.setItem('$user', JSON.stringify(_user))
        }
      },

      delAuth (gotoLoginPage, joinUrl = '') {
        cookie.delete('authorized')
        localStorage.removeItem('$user')

        if (gotoLoginPage) {
          if (window.$app.appType === 'web') {
            let handleHashChange = function () {
              window.removeEventListener('hashchange', handleHashChange)
              window.location.reload()
            }

            window.addEventListener('hashchange', handleHashChange)

            let next = (options.loginPage || window.$app.loginPage) + joinUrl
            window.location.href = next
          } else {
            window.$native.back.send()
          }
        }
      }
    })

    Object.assign(window.$app, config)

    Object.defineProperties(window.$app, {
      authorized: {
        enumerable: true,
        get () {
          return !!cookie.get('authorized') && !!localStorage.getItem('$user')
        }
      }
    })

    window.$app.title = { text: '' }
    Vue.observable(window.$app.title)

    window.$app.user = new User()

    if (window.$app.authorized) {
      Object.assign(window.$app.user, JSON.parse(localStorage.getItem('$user')))
    }

    Object.defineProperty(Vue.prototype, '$app', {
      value: window.$app
    })
  }
}
