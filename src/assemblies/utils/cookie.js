/**
* 功能: cookie的基本操作
*/

export default {
  set (name, value, expires = 12) {
    if (value) {
      if (expires) {
        expires = new Date(new Date() * 1 + 60 * 60 * 1000 * expires).toUTCString()
      }

      window.document.cookie = `${name}=${encodeURIComponent(value)};path=/;${expires ? 'expires=' + expires : ''}`
    }
  },

  get (name) {
    let value = window.document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
    return value && decodeURIComponent(value[2])
  },

  delete (name) {
    this.set(name, name, -1)
  }
}
