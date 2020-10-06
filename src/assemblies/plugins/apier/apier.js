import axios from 'axios'
import Vuex from 'vuex'
import Api from './api'
import genAxiosInterceptors from './interceptors'

let $i18n = window.$i18n
let apis = null

export default class Apier {
  constructor (store, option) {
    if (!(store instanceof Vuex.Store)) {
      throw new TypeError('The apier plugin depends on vuex, please specify the store option')
    }

    this._option = {
      store,
      responseOption: Object.assign({
        codeKey: 'data.serverResult.resultCode',
        uiMessageKey: 'data.serverResult.internalMessage',
        uiMessageTypeKey: 'data.serverResult.internalMessageType',
        successCode: '200'
      }, option.response),
      authDetection: Object.assign({
        enable: true,
        unauthMessage: $i18n.t('plugins.apier.unauthMessage'),
        endAuthCodes: [4210, 4211],
        endAuthCodeKey: 'resultCode',
        endAuthMessage: $i18n.t('plugins.apier.endAuthMessage'),
        badRequestCodes: [4000, 4010],
        badRequestMessage: $i18n.t('plugins.apier.badRequestMessage'),
        whitelist: []
      }, option.authDetection),
      interceptors: Object.assign({
        request: {},
        response: {}
      }, option.interceptors)
    }

    delete option.response
    delete option.authDetection
    delete option.interceptors

    Object.assign(this._option, option)

    if (this._option.baseUrl) {
      axios.defaults.baseURL = this._option.baseUrl
    }

    if (this._option.timeout) {
      axios.defaults.timeout = this._option.timeout
    }

    if (option.headers) {
      if (window.$ui.setDefaultHeaders) {
        window.$ui.setDefaultHeaders(this._option.headers)
      } else {
        Object.assign(axios.defaults.headers.common, this._option.headers)
      }
    }

    genAxiosInterceptors(this._option)
    apis = { _vm: null }
    Object.defineProperty(this, '$api', {
      get () {
        apis._vm = null
        return apis
      }
    })

    this._modules = {}

    for (const [moduleName, module] of Object.entries(this._option.modules)) {
      this.addModule(moduleName, module)
    }
  }

  addApi (moduleName, apiName, api) {
    if (this.$api[moduleName][apiName]) {
      throw new TypeError(`Duplicate api name detected:"${moduleName}.${apiName}".The api name must be unique. `)
    } else {
      Object.defineProperty(this.$api[moduleName], apiName, {
        get () {
          api._vm = apis._vm
          return api
        }
      })

      if (api.noAuthRequired) {
        this._option.authDetection.whitelist.push(api.url)
      }
    }
  }

  addModule (moduleName, module) {
    this._modules[moduleName] = module

    // module config convert to non enumerable
    let config = null

    if (module._config) {
      config = module._config
      delete module._config
    }

    Object.defineProperty(module, '_config', {
      value: config || {}
    })

    if (!this.$api[moduleName]) {
      this.$api[moduleName] = {}
      this._option.store.registerModule(moduleName, { namespaced: true })
    }

    for (const [apiName, api] of Object.entries(module)) {
      this.addApi(moduleName, apiName, new Api(this._option.store, moduleName, apiName, {
        ...api,
        apier: this,
        globaConfig: {
          response: this._option.responseOption,
          cancelable: this._option.cancelable,
          debounce: this._option.debounce,
          pageInfo: this._option.pageInfo,
          loading: this._option.loading
        }
      }))
    }
  }

  static install (Vue, apier) {
    if (this.installed) return

    this.installed = true

    Object.defineProperties(Vue.prototype, {
      $apier: {
        get () { return apier }
      },

      $axios: {
        get () { return axios }
      },

      $api: {
        get () {
          apis._vm = this
          return apis || {}
        }
      }
    })
  }
}
