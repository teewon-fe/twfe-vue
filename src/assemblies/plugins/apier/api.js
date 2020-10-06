
import assign from '../../utils/assign'
import Vue from 'vue'
import axios from 'axios'
import propChain from '../../utils/prop-chain'
import { shake } from '../../utils/shake'
import mustache from '../../utils/mustache'
import urlQuery from '../../utils/url-query'
import { cloneJson, createApi, syncFromMap } from './lib'

const $i18n = window.$i18n
let qs = require('qs')
let apier = null
let loading = null

const getValidateType = function (params, rules, propName = '') {
  for (const [key, value] of Object.entries(rules)) {
    const propKey = propName ? `${propName}.${key}` : key
    const type = Array.isArray(propChain.get(params, propKey)) ? 'array' : typeof propChain.get(params, propKey)

    if (Array.isArray(value)) {
      for (const item of value) {
        if (!item.type) {
          item.type = type
        }

        if (item.fields) {
          getValidateType(params, item.fields, propKey)
        }
      }
    } else {
      if (!value.type) {
        value.type = type
      }

      if (value.fields) {
        getValidateType(params, value.fields, propKey)
      }
    }
  }
}

/**
 * 生成Api的错误对象
 */
class ApiError {
  constructor (option) {
    return Object.assign({
      error: null,
      code: 0,
      message: option.message || 'api.error'
    }, option)
  }
}

export default class Api {
  _responded = {}
  _loding = null
  _sending = false
  _vm = null
  _sendId = 0

  /**
   * 生成一个api实例
   * @param {Store} store vuex store
   * @param {Object} moduleName api模块名称
   * @param {String} apiName api名称
   * @param {Object} option api选项
   */
  constructor (store, moduleName, apiName, option) {
    this._option = option

    if (!apier) apier = option.apier
    this.$api = apier.$api
    delete option.apier

    createApi.call(this, store, moduleName, apiName, apier)
  }

  /**
   * 设置请求参数
   * @param {Object} params 新请求参数，不指定时为默认请求参数
   */
  setParams (params) {
    Object.assign(this.params, params)
    return this
  }

  /**
   * 设置响应数据
   * @param {Object} params 新响应数据，不指定时为默认响应数据
   */
  setData (data) {
    Object.assign(this.params, data)
    return this
  }

  /**
   * 重置请求参数
   */
  resetParams () {
    Object.assign(this.params, cloneJson(this._config.request.params))
    return this
  }

  /**
   * 重置响应数据
   */
  resetData () {
    Object.assign(this.data, cloneJson(this._config.response.data))
    return this
  }

  /**
   * 同时重置请求参数与响应数据
   */
  reset () {
    this.resetParams()
    this.resetData()
    return this
  }

  /**
   * 从指定的同步对象中同步请求参数
   * @param {*} reset 是否重置参数再同步
   * @param {*} route route对象，当从路由对象的params同步参数时，需要指定
   */
  syncParams (reset, route) {
    if (reset) {
      this.resetParams()
    }

    let sync = this._config.request.sync

    if (sync) {
      if (sync.state) {
        let store = this._config.store

        for (const [stateKey, map] of Object.entries(sync.state)) {
          let from = propChain.get(store.state, stateKey)
          syncFromMap.call(this, from, map)
        }
      }

      if (sync.params) {
        syncFromMap.call(this, route.params, sync.params)
      }

      if (sync.query) {
        syncFromMap.call(this, urlQuery(), sync.query)
      }

      if (sync.$app) {
        syncFromMap.call(this, window.$app, sync.$app)
      }

      if (sync.$user && window.$app.user) {
        syncFromMap.call(this, window.$app.user, sync.$user)
      }
    }
  }

  /**
   * 从当前接口克隆一个新接口
   * @param {String} name 新接口的名字
   * @param {Object} params 新接口特定的请求参数
   */
  clone (name, params) {
    if (!name) {
      throw new Error('The api name is required.')
    }

    let from = this._option
    let option = cloneJson(from)

    if (option.request) {
      Object.assign(option.request, {
        debug: from.request.debug
      })
    }

    if (typeof params === 'object') {
      if (!option.request) option.request = {}
      if (!option.request.params) option.request.params = {}
      Object.assign(option.request.params, params)
    }

    if (option.response) {
      Object.assign(option.response, {
        debug: from.response.debug,
        successHandler: from.response.successHandler,
        exceptionHandler: from.response.exceptionHandler,
        errorHandler: from.response.errorHandler
      })
    }

    let { store, apierModule } = this._config
    let api = new Api(store, apierModule, name, option)
    apier.addApi(apierModule, name, api)
    return api
  }

  /**
  * 功能: 复位请求状态
  */
  resetStatus () {
    if (loading) {
      loading.close()
      loading = null
    }

    this._sending = false
  }

  /**
   * 请求处理
   * @param {Object} params
   *  |—— 1、在vue组件中调用时，可指定该参数为vue组件本身，会传入所有api定义时的回调函数
   *  |—— 2、可以指定为一个对象，同名属性值将复制到api实例的参数中,指定vm
   *  |—— {Boolean} $isAppend 以追加的方式添加数据
   *  |—— {Number} $appendIndex 追加数据到指定的索引号
   *  |—— {vue} $vm vue组件本身
   *  |—— {vue[form]} $validator 有该字段说明发送前需要验证表单，可以为表单引用对象或验证规则
   *  |—— {vue[form]} $isParallel 是否为并行发送的请求
   *  |—— {String} $method 复写请求方法
   */
  send (params) {
    let option = {
      $vm: this._vm,
      $isAppend: false,
      $appendIndex: null,
      $validator: null,
      $isParallel: false,
      $method: null
    }

    if ((!this._config.once && !this._config.debounce.enable) && (!params || !params.$isAppend)) {
      this.resetData()
    }

    assign.same(option, params)

    if (params) {
      delete params.$vm
      delete params.$isAppend
      delete params.$appendIndex
      delete params.$validator
      delete params.$isParallel
      delete params.$method
    }

    let _config = this._config

    if (params) {
      this._sendParams = params

      if (params instanceof Vue) {
        this._vm = params
      } else if (typeof params === 'object') {
        Object.assign(this.params, params)

        if (params.$vm) {
          this._vm = params.$vm
        }
      }
    }

    option.$vm = this._vm
    params = this.params

    if (typeof _config.request.handler === 'function') {
      params = _config.request.handler.call(this, params, apier, this._vm)
    }

    const me = this
    const beforeSend = this._config.beforeSend

    if (typeof beforeSend === 'function') {
      const beforeResult = beforeSend.call(this)

      if (beforeResult instanceof Promise) {
        beforeResult.then(() => {
          return me.validateRequest(params, option)
        }).catch((err) => {
          return Promise.reject(new ApiError({
            err,
            code: '1',
            message: 'cancel request'
          }))
        })
      } else if (beforeResult !== false) {
        return me.validateRequest(params, option)
      } else {
        return Promise.reject(new ApiError({
          code: '1',
          message: 'cancel request'
        }))
      }
    } else {
      return me.validateRequest(params, option)
    }
  }

  /**
   * 验证请求参数
   * @param {*} * 同send
   */
  validateRequest (params, option) {
    const me = this

    if (option.$validator !== null && (option.$validator || me._config.request.rules)) {
      const descriptor = option.$validator || me._config.request.rules

      if (descriptor._isVue) {
        return new Promise((resolve, reject) => {
          option.$validator.validate((valid) => {
            if (valid) {
              delete option.$validator
              return resolve(me.confirmRequest(params, option))
            } else {
              return reject(new ApiError({
                code: '2',
                message: 'verification failed'
              }))
            }
          })
        })
      } else if (typeof descriptor === 'object' && descriptor !== null) {
        getValidateType(params, descriptor)

        const validator = new window.$ui.Validator(descriptor)

        return validator.validate(params).then(() => {
          return me.confirmRequest(params, option)
        }).catch(({ errors, fields }) => {
          window.$ui.msg({ type: 'warning', message: errors[0].message })

          return Promise.reject(new ApiError({
            code: '2',
            message: 'verification failed'
          }))
        })
      } else {
        return Promise.reject(new ApiError({
          code: '2',
          message: 'verification failed'
        }))
      }
    } else {
      return me.confirmRequest(params, option)
    }
  }

  /**
   * 确认请求
   * @param {*} * 同send
   */
  confirmRequest (params, option) {
    const me = this
    const message = this._config.message

    if (typeof message.confirm === 'string') {
      return window.$ui.confirm(message.confirm, message.title || $i18n.t('plugins.apier.messageTitle')).then(() => {
        return me.sendRequest(params, option)
      }).catch((err) => {
        return Promise.reject(new ApiError({
          err,
          code: '3',
          message: 'confirm message box is cancelled'
        }))
      })
    } else {
      return me.sendRequest(params, option)
    }
  }

  /**
   * 发送请求
   * @param {*} * 同send
   */
  sendRequest (params, option) {
    let _config = this._config
    let vm = option.$vm
    this._vm = vm

    if (_config.debounce.enable && this._sending) {
      if (_config.debounce.message) {
        window.$ui.msg({
          type: 'warning',
          message: _config.debounce.message
        })
      }

      return Promise.resolve(this.data)
    }

    const method = option.$method || this._option.method || 'get'
    _config.axios.method = method

    if (_config.once && this._responded[method]) {
      return Promise.resolve(this.data)
    } else {
      if (_config.request.removeEmptyItem) {
        params = shake(params)
      }

      if (_config.request.mode === 'body') {
        let likeGetMethods = ['get', 'delete', 'head', 'options']
        let likePostMethods = ['post', 'put', 'patch']

        if (likeGetMethods.includes(method)) {
          _config.axios.params = params
        }

        if (likePostMethods.includes(method)) {
          _config.axios.data = params
        }
      } else if (_config.request.mode === 'path') {
        _config['axios'].url = mustache(_config.url, params)
      } else if (_config.request.mode === 'query') {
        _config['axios'].url = `${_config.url}?${qs.stringify(params, { arrayFormat: 'indices' })}`
        _config.axios.data = {}
      } else if (_config.request.mode === 'formData') {
        const paramData = new FormData()

        for (const [key, val] of Object.entries(params)) {
          paramData.set(key, val)
        }

        _config.axios.data = paramData
      } else if (typeof params[_config.request.mode] !== 'undefined') {
        _config.axios.data = params[_config.request.mode]
        _config.axios.headers = { 'Content-Type': 'application/json' }
      }

      if (_config.cancelable.enable) {
        if (this._sending) {
          _config.cancel()
        } else {
          this._sending = true
        }

        _config.axios.cancelToken = new axios.CancelToken((cancel) => {
          _config.cancel = cancel
        })
      }

      if (_config.loading.enable) {
        if (!loading) {
          if (window.$app.appType === 'web') {
            loading = window.$ui.loading(_config.loading.option)
          }

          if (window.$app.appType === 'mobile') {
            loading = window.$ui.loading(_config.loading.option)
          }
        }
      }

      let self = this

      let sendId = 0
      if (!params.$isParallel) {
        sendId = ++this._sendId
      }

      this._sending = true

      return axios(_config.axios).then((resp) => {
        this.resetStatus()
        this._vm = vm

        if (!params.$isParallel && sendId !== self._sendId) {
          return
        }

        let resultCode = propChain.get(resp, _config.response.codeKey)
        let data = propChain.get(resp, _config.response.dataKey)

        if (_config.response.handler) {
          data = _config.response.handler.call(this, data, resp.data, apier, vm)
        }

        if (resultCode === _config.response.successCode) {
          this._responded[method] = true

          if (typeof _config.message.success === 'string') {
            window.$ui.msg({ type: 'success', message: _config.message.success })
          }

          if (option.$isAppend) {
            let apiList = propChain.get(this.data, _config.appendKey)
            let dataList = propChain.get(data, _config.appendKey)

            if (typeof option.$appendIndex === 'number') {
              apiList.splice(option.$appendIndex, 0, ...dataList)
              propChain.set(data, _config.appendKey, apiList)
            } else {
              propChain.set(data, _config.appendKey, [...apiList, ...dataList])
            }
          }

          Object.assign(this.data, data)

          if (_config.response.successHandler) {
            _config.response.successHandler.call(this, data, resp.data, apier, vm)
          }

          return data
        } else {
          if (typeof _config.message.exception === 'string') {
            window.$ui.msg({ type: 'error', message: _config.message.exception })
          }

          if (typeof _config.response.exceptionHandler === 'function') {
            _config.response.exceptionHandler.call(self, resultCode, resp.data, apier, vm)
            return Promise.reject(new ApiError({
              code: '4',
              resultCode: resultCode,
              response: resp.data,
              message: 'processed response non-success error'
            }))
          } else {
            return Promise.reject(new ApiError({
              code: '5',
              resultCode: resultCode,
              response: resp.data,
              message: 'unprocessed response non-success error'
            }))
          }
        }
      }).catch((err) => {
        this._vm = vm

        if (typeof _config.message.error === 'string') {
          window.$ui.msg({ type: 'error', message: _config.message.error })
        }

        this.resetStatus()

        if (axios.isCancel(err)) {
          if (_config.cancelable.message) {
            window.$ui.msg({
              type: 'warning',
              message: _config.cancelable.message
            })
          }

          return Promise.reject(new ApiError({
            err,
            code: '6',
            message: 'axios cancel is triggered'
          }))
        }

        if (typeof _config.response.errorHandler === 'function') {
          _config.response.errorHandler.call(self, err, apier, vm)
          return Promise.reject(new ApiError({
            code: '7',
            message: 'processed response axios error'
          }))
        }

        if (err instanceof ApiError) {
          return Promise.reject(err)
        } else {
          return Promise.reject(new ApiError({
            code: '8',
            message: 'unprocessed axios response error'
          }))
        }
      })
    }
  }

  /**
   * 并行发送请求
   * @param {*} * 同send
   */
  sendParallel (params = {}) {
    params.$isParallel = true
    return this.send(params)
  }

  /**
   * 追加列表数据
   * @param {Object} params
   *  |—— 1、在vue组件中调用时，可指定该参数为vue组件本身
   *  |—— 2、可以指定为一个对象，同名属性值将复制到api实例的参数中
   */
  append (params = {}) {
    params.$isAppend = true
    return this.send(params)
  }

  /**
   * 追加列表数据
   * @param {Number} index 追加数据到指定的索引号
   * @param {Object} params
   *  |—— 1、在vue组件中调用时，可指定该参数为vue组件本身
   *  |—— 2、可以指定为一个对象，同名属性值将复制到api实例的参数中
   */
  appendToIndex (index, params = {}) {
    params.$appendIndex = index
    params.$isAppend = true
    return this.send(params)
  }

  /**
   * 用get方法发送请求，参数同send方法
   */
  get (params = {}) {
    params.$method = 'get'
    return this.send(params)
  }

  /**
   * 用post方法发送请求，参数同send方法
   */
  post (params = {}) {
    params.$method = 'post'
    return this.send(params)
  }

  /**
   * 用put方法发送请求，参数同send方法
   */
  put (params = {}) {
    params.$method = 'put'
    return this.send(params)
  }

  /**
   * 用patch方法发送请求，参数同send方法
   */
  patch (params = {}) {
    params.$method = 'patch'
    return this.send(params)
  }

  /**
   * 用delete方法发送请求，参数同send方法
   */
  delete (params = {}) {
    params.$method = 'put'
    return this.send(params)
  }
}
