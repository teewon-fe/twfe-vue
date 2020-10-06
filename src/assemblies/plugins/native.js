import Vue from 'vue'
import axios from 'axios'
import assign from '../utils/assign'

const os = window.creativeJSCallbackForOther ? 'android'
  : (window.webkit && window.webkit.messageHandlers) ? 'ios' : 'other'

class NativeApi {
  cancelSymbol = 'ui-native-api-cancel-symbole'

  /**
   * 生成一个调用ios或android原生功能的对象的实例
   * @param {String, Object} option 函数名，或函数对象，函数对象有以下属性
   *  |-ios: ios函数名称
   *  |-android: android函数名称
   *  |-paramsHandler: 参数预处理函数, 第一个参数指定os名称(android, ios)，后续参数为传入的参数
   *  |-callback: 原生回调h5功能的设置对象,有如下属性
   *   |-name: 自动生成的回调函数的名称
   *   |-handler: 统一的回调函数传入的参数处理器
   * @param  {String} name 功能名称
   * @param  {Object} native 原生对象
   */
  constructor (option, name, native) {
    this._option = option
    this._name = name
    this._native = native
    this._os = os
    this.params = option.params ? Vue.observable(option.params) : null
  }

  /**
   * 运行ios或android原生功能的函数
   * @param  {Object} option 发送send时的配置选项，可以设置在params中定义的同名参数，
   *  同时会做为paramsHandler函数的第二个参数，callback.handler的第一个回调函数
   * @return {Promise} 原生回调生成的promise对象
   */
  send (option) {
    let me = this
    let ios, android
    let opt = this._option

    if (typeof opt.before === 'function') {
      opt.before.call(me)
    }

    const promise = new Promise(function (resolve, reject) {
      if (opt.callback) {
        let cbName = opt.callback.name || '$nativeCallH5'

        window[cbName] = function (...args) {
          try {
            if (typeof opt.callback.handler === 'function') {
              args = opt.callback.handler.call(me, option, ...args)
            }

            if (args === me.cancelSymbol) {
              return
            } else {
              resolve(args)
            }
          } catch (err) {
            reject(err)
          }
        }

        if (process.env.NODE_ENV === 'development' && opt.debugParams) {
          window[cbName](...opt.debugParams)
        }
      } else {
        resolve()
      }
    })

    if (typeof opt === 'string') {
      ios = android = opt
    } else if (opt !== null && typeof opt === 'object') {
      ios = opt.ios
      android = opt.android
    }

    assign.same(this.params, option)

    let params = opt.paramsHandler
      ? opt.paramsHandler.call(this, this.params, option)
      : this.params ? [this.params] : []

    if (os === 'android' && window.creativeJSCallbackForOther[android]) {
      window.creativeJSCallbackForOther[android](...params)
    } else if (os === 'ios' && window.webkit.messageHandlers[ios]) {
      window.webkit.messageHandlers[ios].postMessage(...params)
    } else {
      if (!opt.debugParams) {
        window.$ui.msg({ type: 'warning', message: '该功能在当前环境下不可用' })
      }
    }

    return promise
  }
}

class Native {
  constructor (config) {
    this.dataMap = new Map()
    this._config = config

    for (const [key, opt] of Object.entries(config.native)) {
      opt.debugable = opt.debugable === undefined ? config.debugable : opt.debugable
      this[key] = new NativeApi(opt, key, this)
    }
  }

  /**
  * 功能: 上传原生缓存的数据文件到服务器
  * @param {Type} option 上传选项
  *   |- uploadUrl 服务器上传文件的url地址
  *   |- data 数据本身
  *   |- filename 文件名
  *   |- mimeType mimeType类型
  *   |- extendData 上传时额外的数据
  *   |- onUploadProgress 记录上传进度的回调函数
  *   |- axiosSource axios的取消token源
  */
  upload (option) {
    let formData = new FormData()
    let extendData = Object.assign({}, this._config.upload && this._config.upload.data, option.extendData)

    for (const [key, value] of Object.entries(extendData)) {
      formData.append(key, value)
    }

    let file = new File([option.data], option.filename, {
      type: option.mimeType
    })

    formData.append('file', file)

    let axiosOption = {
      method: 'post',
      url: option.uploadUrl || (this._config.upload && this._config.upload.url),
      data: formData,

      headers: {
        'Content-Type': 'multipart/form-data'
      },

      onUploadProgress (event) {
        if (event.lengthComputable && typeof option.onUploadProgress === 'function') {
          option.onUploadProgress(option, event.loaded, event.total)
        }
      }
    }

    if (option.axiosSource) {
      axiosOption.cancelToken = option.axiosSource.token
    }

    return axios(axiosOption).then(res => {
      return res
    }).catch(e => {
      return Promise.reject(e)
    })
  }
}

export default {
  install (Vue, config = {}) {
    let native = new Native(config)

    window.$native = native

    Object.defineProperty(Vue.prototype, '$native', {
      get () { return native }
    })
  }
}
