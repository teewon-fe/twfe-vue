/* eslint-disable no-debugger */
import Vue from 'vue'
import axios from 'axios'
import propChain from '../utils/prop-chain'
import assign from '../utils/assign'
import mustache from '../utils/mustache'
import { shake } from '../utils/shake'

let api = {}
let qs = require('qs')
let apiDefault = 'default'
let apiConfig = Symbol('config')
let respondedSymbol = Symbol('responded')
let sendingSymbol = Symbol('sending')
let store = null
let apierOptions = {
  debounce: false,
  debounceMessage: 'sending...',
  pageInfo: {
    pageNumKey: 'pageNo',
    pageSizeKey: 'pageSize',
    totalKey: 'total',
    listKey: 'list'
  },
  showLoading: true,
  loadingOption: {
    lock: true,
    text: 'Loading...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  }
}

let watcherState = {}
function watcher (data, stateToData, apiName, name) {
  return function (apiState) {
    if (typeof apiState === 'object') {
      if (stateToData) {
        let entries = Object.entries(stateToData)

        for (const [key, value] of entries) {
          value.forEach(item => {
            let stateVal = propChain.get(apiState, key)
            if (typeof stateVal !== 'undefined') {
              propChain.set(data, item, stateVal)
            }
          })
        }
      } else {
        assign.same(data, apiState)
      }
    } else {
      throw new TypeError('The api state must be an object')
    }
  }
}

class Api {
  constructor (options, name) {
    if (!options.url) {
      throw new TypeError(`Cannot find property 'url' of api config`)
    }

    Object.defineProperty(this, '_name', {
      value: name
    })

    this[apiConfig] = {}
    this[apiConfig]['axios'] = options.axios || {}
    this[apiConfig]['axios'].url = options.url
    this[apiConfig]['axios'].method = options.method || 'get'
    this[apiConfig]['pageable'] = options.pageable || false
    this[apiConfig]['debounce'] = typeof options.debounce !== 'undefined' ? options.debounce : apierOptions.debounce
    this[apiConfig]['debounceMessage'] = typeof options.debounceMessage === 'undefined' ? apierOptions.debounceMessage : options.debounceMessage
    this[apiConfig]['showLoading'] = typeof options.showLoading !== 'undefined' ? options.showLoading : apierOptions.showLoading
    this[apiConfig]['loadingOption'] = options.loadingOption || apierOptions.loadingOption
    this[apiConfig]['dependencies'] = options.dependencies || []

    options.request = options.request || {}
    this[apiConfig]['defaultRequestParams'] = JSON.parse(JSON.stringify(options.request.params || {}))
    this[apiConfig]['states'] = options.request.states || []
    this[apiConfig]['stateToData'] = options.request.stateToData || null
    this[apiConfig]['requestMode'] = options.request.mode || 'payload'
    this[apiConfig]['removeEmptyItem'] = typeof options.request.removeEmptyItem === 'undefined' ? true : options.request.removeEmptyItem
    this[apiConfig]['paramsDebugger'] = options.request.debugger || false

    options.response = options.response || {}
    let responseDefaultKey = this[apiConfig]['pageable'] ? 'pageInfo' : 'responseEntity'

    this[apiConfig]['responseDataKey'] = `${options.response.isRoot === true ? '' : 'data.'}${options.response.dataKey || responseDefaultKey}`
    this[apiConfig]['mutations'] = options.response.mutations || []
    this[apiConfig]['defaultResponse'] = JSON.parse(JSON.stringify(options.response.data || {}))
    this[apiConfig]['responseResultCodeKey'] = `data.` + (options.response.resultCodeKey || 'serverResult.resultCode')
    this[apiConfig]['dataHandler'] = options.response.dataHandler || null
    this[apiConfig]['successHandler'] = options.response.successHandler || (() => {})
    this[apiConfig]['exceptionHandler'] = options.response.exceptionHandler || (() => {})
    this[apiConfig]['errorHandler'] = options.response.errorHandler || (() => {})
    this[apiConfig]['once'] = options.once || false
    this[apiConfig]['autoMerge'] = typeof options.response.autoMerge === 'undefined' ? true : options.response.autoMerge
    this[apiConfig]['successCode'] = options.response.successCode || '200'
    this[apiConfig]['ignoreSuccessCode'] = options.response.ignoreSuccessCode || false
    this[apiConfig]['dataDebugger'] = options.response.debugger || false

    this[apiConfig]['pageInfo'] = Object.assign(apierOptions.pageInfo, options.request.pageInfo, options.response.pageInfo)
    this[apiConfig]['appendKey'] = this[apiConfig]['pageable'] ? this[apiConfig]['pageInfo'].listKey : (options.response.appendKey || 'list')

    this[apiConfig]['dataHandlers'] = options.getters

    this.create()
  }

  create (name = apiDefault) {
    if (!this[name]) {
      this[name] = Vue.observable({
        params: null,
        data: null,
        getters: null
      })

      this[name]['params'] = Vue.observable(JSON.parse(JSON.stringify(this[apiConfig]['defaultRequestParams'])))

      // generates all watcher for vuex state
      if (this[apiConfig]['states'].length > 0 && store) {
        this[apiConfig]['states'].forEach(item => {
          if (watcherState[item]) {
            watcherState[item].handlers.push(watcher(this[name]['params'], this[apiConfig]['stateToData'], item, this._name, name))
          } else {
            watcherState[item] = {
              watch: null,
              handlers: [watcher(this[name]['params'], this[apiConfig]['stateToData'], item, this._name, name)]
            }
          }

          // cancel watch
          if (typeof watcherState[item].watch === 'function') {
            watcherState[item].watch()
          }

          watcherState[item].watch = store.watch(state => propChain.get(state, item), (val) => {
            watcherState[item].handlers.forEach(handler => handler(val))
          }, { deep: true, immediate: true })
        })
      }

      let data = JSON.parse(JSON.stringify(this[apiConfig]['defaultResponse']))
      data[respondedSymbol] = false
      data[sendingSymbol] = false
      this[name]['data'] = Vue.observable(data)

      if (this[apiConfig]['dataHandlers']) {
        let entries = Object.entries(this[apiConfig]['dataHandlers'])

        for (const [key, handler] of entries) {
          if (typeof handler === 'function') {
            if (!this[name]['getters']) this[name]['getters'] = Vue.observable({})

            store.watch(() => this[name]['data'], () => {
              Vue.set(this[name]['getters'], key, Vue.observable(handler(JSON.parse(JSON.stringify(this[name]['data'])), JSON.parse(JSON.stringify(this[name]['params'])), name)))
            }, { deep: true, immediate: true })
          }
        }
      }
    }
  }

  mapParams (name = apiDefault) {
    this.create(name)

    if (this.autoReset) {
      this.resetParams(name)
    }

    return this[name]['params']
  }

  setParams (name = apiDefault, params) {
    if (typeof name === 'object') {
      [params, name] = [name, apiDefault]
    }

    this.create(name)

    Object.assign(this[name]['params'], params)
  }

  mapData (name = apiDefault) {
    this.create(name)

    if (this.autoReset) {
      this.resetData(name)
    }

    return this[name]['data']
  }

  setData (name = apiDefault, data) {
    if (typeof name === 'object') {
      [data, name] = [name, apiDefault]
    }

    this.create(name)

    Object.assign(this[name]['data'], data)
  }

  resetParams (name = apiDefault) {
    this.create(name)
    Object.assign(this[name]['params'], JSON.parse(JSON.stringify(this[apiConfig]['defaultRequestParams'])))
  }

  resetData (name = apiDefault) {
    this.create(name)
    Object.assign(this[name]['data'], JSON.parse(JSON.stringify(this[apiConfig]['defaultResponse'])))
    this[name]['data'][respondedSymbol] = false
  }

  async send (name = apiDefault, option, customParams, isAppend) {
    if (process.env.NODE_ENV === 'development' && this[apiConfig]['paramsDebugger']) {
      debugger
    }

    for (let i = 0; i < this[apiConfig]['dependencies'].length; i++) {
      let dep = this[apiConfig]['dependencies'][i]

      let apiName = ''
      let apiUid = ''
      let autoSyncParams = false
      let dataToParams

      if (typeof dep === 'string') {
        apiName = dep
        autoSyncParams = true
      } else if (typeof dep === 'object') {
        if (dep.api) {
          apiName = dep.api
        } else {
          throw new TypeError(`Cannot find api property in dependency object`)
        }

        apiUid = dep.uid || 'default'
        autoSyncParams = typeof dep.autoSyncParams === 'undefined' ? true : dep.autoSyncParams
        dataToParams = dep.dataToParams
      }

      let resultData = await api[apiName].send(apiUid)

      if (autoSyncParams) {
        if (typeof dataToParams === 'object') {
          for (const [dataKey, paramKey] of Object.entries(dataToParams)) {
            propChain.set(this[name]['params'], paramKey, propChain.get(resultData, dataKey))
          }
        } else {
          assign.same(this[name]['params'], resultData)
        }
      }
    }

    if (typeof name !== 'string' && typeof name !== 'symbol') {
      [name, option] = [apiDefault, name]
    }

    this.create(name)

    let apiParams = { name }

    if (this[apiConfig]['once'] && this[name]['data'][respondedSymbol]) {
      let data = this[name]['data']

      apiParams.data = JSON.parse(JSON.stringify(data))

      if (typeof this[apiConfig]['successHandler'] === 'function') {
        this[apiConfig]['successHandler'](apiParams, option)
      }

      return Promise.resolve(data)
    } else {
      let loading

      if (this[apiConfig]['showLoading']) {
        loading = window.$ui.loading(this[apiConfig]['loadingOption'])
      }

      let params = customParams || this[name]['params']

      if (this[apiConfig]['removeEmptyItem']) {
        params = shake(params)
      }

      if (this[apiConfig]['requestMode'] === 'payload') {
        let likeGetMethods = ['get', 'delete', 'head', 'options']
        let likePostMethods = ['post', 'put', 'patch']

        if (likeGetMethods.includes(this[apiConfig]['axios'].method)) {
          this[apiConfig]['axios'].params = params
        }

        if (likePostMethods.includes(this[apiConfig]['axios'].method)) {
          this[apiConfig]['axios'].data = params
        }
      } else if (this[apiConfig]['requestMode'] === 'join') {
        this[apiConfig]['axios'].url = mustache(this[apiConfig]['axios'].url, params)
      } else if (this[apiConfig]['requestMode'] === 'query') {
        this[apiConfig]['axios'].url += `?${qs.stringify(params, { arrayFormat: 'indices' })}`
      }

      if (this[apiConfig]['debounce']) {
        if (this[name]['data'][sendingSymbol]) {
          this[apiConfig]['cancel']()
        } else {
          this[name]['data'][sendingSymbol] = true
        }

        this[apiConfig]['axios'].cancelToken = new axios.CancelToken((cancel) => {
          this[apiConfig]['cancel'] = cancel
        })
      }

      return axios(this[apiConfig]['axios']).then((resp) => {
        if (process.env.NODE_ENV === 'development' && this[apiConfig]['dataDebugger']) {
          debugger
        }

        let resultCode = propChain.get(resp, this[apiConfig]['responseResultCodeKey'])
        let data = propChain.get(resp, this[apiConfig]['responseDataKey'])

        if (this[apiConfig]['dataHandler']) {
          data = this[apiConfig]['dataHandler'](data)
        }

        apiParams.data = data

        if (typeof data !== 'undefined') {
          if (this[apiConfig]['autoMerge']) {
            if (isAppend && this[name]['data'][respondedSymbol]) {
              let list1 = propChain.get(this[name]['data'], this[apiConfig]['appendKey'])
              let list2 = propChain.get(data, this[apiConfig]['appendKey'])

              if (list1 && list2 && typeof list1.concat === 'function' && typeof list2.concat === 'function') {
                propChain.set(data, this[apiConfig]['appendKey'], [...list1, ...list2])
                Object.assign(this[name]['data'], data)
              } else {
                throw new TypeError(`The append data is not an array`)
              }
            } else {
              if (typeof data === 'object') {
                if (Array.isArray(data)) {
                  this[name]['data'] = data
                } else {
                  Object.assign(this[name]['data'], data)
                }
              } else {
                if (Object.keys[this[name]['data']].length === 0) {
                  this[name]['data'][Object.keys[this[name]['data']][0]] = data
                } else {
                  throw new TypeError(`Cannot find any property in response data object`)
                }
              }
            }
          } else {
            this[name]['data'] = data
          }
        } else {
          this.resetData(name)
        }

        this[name]['data'][sendingSymbol] = false

        if (loading) {
          loading.close()
        }

        if (resultCode === this[apiConfig]['successCode'] || this[apiConfig]['ignoreSuccessCode']) {
          this[name]['data'][respondedSymbol] = true

          if (typeof this[apiConfig]['successHandler'] === 'function') {
            this[apiConfig]['successHandler'](apiParams, option)
          }

          if (this[apiConfig]['mutations'].length > 0 && store) {
            for (let i = 0; i < this[apiConfig]['mutations'].length; i++) {
              store.commit(this[apiConfig]['mutations'][i], this[name]['data'])
            }
          }

          return this[name]['data']
        } else {
          if (typeof this[apiConfig]['exceptionHandler'] === 'function') {
            apiParams.resultCode = resultCode
            this[apiConfig]['exceptionHandler'](apiParams, option)
          }

          return Promise.reject(Object.assign(new Error('Response exception'), {
            resultCode: resultCode,
            data: resp.data
          }))
        }
      }).catch((err) => {
        if (axios.isCancel(err)) {
          if (this[apiConfig].debounceMessage) {
            window.$ui({
              type: 'warning',
              message: this[apiConfig].debounceMessage
            })
          }
        } else {
          apiParams.err = err
          this[apiConfig]['errorHandler'](apiParams, option)
          this[name]['data'][sendingSymbol] = false
        }

        this.resetData(name)
        if (loading) {
          loading.close()
        }
      })
    }
  }

  sendByParams (params, name = apiDefault, option) {
    return this.send(name, option, params)
  }

  append (name = apiDefault, option) {
    return this.send(name, option, null, true)
  }

  appendByParams (params, name = apiDefault, option) {
    return this.send(name, option, params, true)
  }

  bind (name = apiDefault) {
    let self = this

    return {
      params: this.mapParams(name),
      data: this.mapData(name),
      setParams (params) {
        self.setParams(name, params)
      },
      setData (data) {
        self.setData(name, data)
      },
      resetParams () {
        self.resetParams(name)
      },
      resetData () {
        self.resetData(name)
      },
      async send (option) {
        return self.send(name, option)
      },
      sendByParams (params, option) {
        return self.sendByParams(params, name, option)
      },
      append (option) {
        return self.sendByParams(name, option)
      },
      appendByParams (params, option) {
        return self.appendByParams(params, name, option)
      }
    }
  }
}

export default class Apier {
  constructor (options) {
    let apis = options.apis
    let keys = Object.keys(apis)

    if (options.store) {
      store = options.store
    } else {
      throw new TypeError('The apier plugin depends on vuex, please specify the store option')
    }

    Object.assign(apierOptions, options)

    for (let i = 0; i < keys.length; i++) {
      api[keys[i]] = new Api(apis[keys[i]], keys[i])
    }

    if (options.baseUrl) {
      axios.defaults.baseURL = options.baseUrl
    }

    if (options.headers) {
      Object.assign(axios.defaults.headers.common, options.headers)
    }

    Object.setPrototypeOf(api, {
      setHeaders (header, method = 'common') {
        Object.assign(axios.defaults.headers[method], header)
      }
    })

    Object.freeze(api)

    return api
  }

  static install (Vue) {
    Object.defineProperties(Vue.prototype, {
      axios: {
        value: axios
      },

      '$api': {
        value: api
      }
    })
  }
}
