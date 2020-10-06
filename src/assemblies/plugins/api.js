import axios from 'axios'
import dotProperty from '../utils/dotProperty'

let apiSymbol = Symbol('api')

class Api {
  constructor (apiOption) {
    if (!apiOption.url) {
      throw new TypeError(`Cannot find property 'url' of config object`)
    }

    this.defaultConfig = JSON.parse(JSON.stringify(apiOption))
    this.defaultRequestParams = JSON.parse(JSON.stringify(apiOption.request.data || apiOption.request))
    this.defaultResponse = JSON.parse(JSON.stringify(apiOption.response.data || apiOption.response))
    this.responseDataKey = apiOption.response.key
    this.responseHandler = typeof apiOption.response.handler === 'function' ? apiOption.response.handler : () => {}
    this.autoMerge = this.autoMerge || true
    this.autoReset = this.autoReset || true

    this.create()
  }

  create (name = apiSymbol) {
    if (!this[name]) {
      let config = this.defaultConfig

      this.requestParams = { [name]: JSON.parse(JSON.stringify(config.request.data || config.request)) }
      delete config.request

      this.response = { [name]: JSON.parse(JSON.stringify(config.response.data || config.response)) }
      delete config.response

      this.config = { [name]: config }
      this.config[name].method = config.method || 'get'

      if (['get'].includes(this.config[name].method)) {
        this.config[name].params = this.requestParams
      }

      if (['post', 'put', 'patch'].includes(this.config[name].method)) {
        this.config[name].data = this.requestParams
      }

      this[name] = true
    }
  }

  mapRequest (name = apiSymbol) {
    this.create(name)

    if (this.autoReset) {
      this.resetRequest(name)
    }

    return this.requestParams[name]
  }

  mapResopnse (name = apiSymbol) {
    this.create(name)

    if (this.autoReset) {
      this.restResponse(name)
    }

    return this.response[name]
  }

  resetRequest (name = apiSymbol) {
    this.create(name)
    Object.assign(this.requestParams[name], JSON.parse(JSON.stringify(this.defaultRequestParams)))
  }

  restResponse (name = apiSymbol) {
    this.create(name)
    Object.assign(this.response[name], JSON.parse(JSON.stringify(this.defaultResponse)))
  }

  send (vm = null, name = apiSymbol, callback) {
    this.create(name)

    return axios(this.config[name]).then((resp) => {
      let data = dotProperty(resp, this.responseDataKey)

      if (typeof data !== 'undefined') {
        if (this.autoMerge) {
          Object.assign(this.response[name], dotProperty(resp, this.responseDataKey))
        }

        this.responseHandler(data, vm, this)

        if (typeof callback === 'function') {
          callback(data, vm, this)
        }

        return this.response[name]
      }

      return undefined
    })
  }
}

export default {
  install (Vue, options = {}) {
    let api = {}

    Object.setPrototypeOf(api, {
      setHeaders (header, method = 'common') {
        Object.assign(axios.defaults.headers[method], header)
      }
    })

    for (const item in options) {
      if (options.hasOwnProperty(item)) {
        api[item] = new Api(options[item])
      }
    }

    Object.freeze(api)

    Object.defineProperties(Vue.prototype, {
      '$api': {
        value: api
      },
      axios: {
        value: axios
      }
    })
  }
}
