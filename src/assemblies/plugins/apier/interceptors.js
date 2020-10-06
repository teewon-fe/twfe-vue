import axios from 'axios'
import propChain from '../../utils/prop-chain'

export default function genAxiosInterceptors ({ authDetection, responseOption, interceptors }) {
  /* ------------------------------ 所有的请求拦截器 ------------------------------ */
  axios.interceptors.request.use(
    config => {
      if (window.navigator.onLine === false) {
        window.$ui.msg({
          type: 'error',
          message: '网络不给力，请检查网络或刷新页面重试~',
          customClass: 'xtop'
        })
        return Promise.reject(new Error('network error.'))
      }

      if (interceptors.request.resolve) {
        config = interceptors.request.resolve(config)

        if (config === undefined) return
      }

      for (const item of authDetection.whitelist) {
        if (config.url.startsWith(item)) {
          return config
        }
      }

      if (authDetection.enable) {
        if (window.$app.authorized) {
          return config
        } else {
          window.$ui.msgBox({
            title: '请登录',
            type: 'warning',
            message: authDetection.unauthMessage,
            confirmButtonText: '确定',
            showCancelButton: false,
            showClose: false
          }).then(() => {
            window.$app.delAuth(true)
          })

          return Promise.reject(new Error('Unauthorized.'))
        }
      } else {
        return config
      }
    },
    err => {
      if (interceptors.request.reject) {
        err = interceptors.request.reject(err)
        if (err === undefined) return
      }

      return Promise.reject(err)
    })

  /* ------------------------------ 所有的响应拦截器 ------------------------------ */
  axios.interceptors.response.use(
    response => {
      if (interceptors.response.resolve) {
        response = interceptors.response.resolve(response)

        if (response === undefined) return
      }

      let resultCode = propChain.get(response, responseOption.codeKey)

      if (resultCode && resultCode !== responseOption.successCode) {
        let msg = propChain.get(response, responseOption.uiMessageKey)
        let type = propChain.get(response, responseOption.uiMessageTypeKey)

        if (resultCode === 4000) {
          window.$ui.msgBox({
            title: '提示',
            type: 'warning',
            message: '您的登录信息已过期',
            confirmButtonText: '确定',
            showCancelButton: false,
            showClose: false
          }).then(() => {
            window.$app.delAuth(true)
          })

          return
        }

        if (msg) {
          window.$ui.msg({
            type: type || 'warning',
            message: msg
          })
        }
      }

      return response
    },
    error => {
      if (error.code === 'ECONNABORTED' || (error.response && error.response.status === 408)) {
        window.$ui.msg({
          type: 'error',
          message: '请求超时，请检查网络或刷新页面重试',
          customClass: 'xtop'
        })
      }

      if (interceptors.response.reject) {
        error = interceptors.response.reject(error)
        if (error === undefined) return
      }

      if (error.response && error.response.data) {
        let errorCode = propChain.get(error.response.data, authDetection.endAuthCodeKey)

        if (errorCode && authDetection.endAuthCodes.includes(errorCode)) {
          window.$ui.msgBox({
            title: '请登录',
            type: 'warning',
            message: authDetection.endAuthMessage,
            confirmButtonText: '确定',
            showCancelButton: false,
            showClose: false
          }).then(() => {
            window.$app.delAuth(true)
          })
        }

        if (errorCode && authDetection.badRequestCodes.includes(errorCode)) {
          window.$ui.msg({
            type: 'error',
            customClass: 'xtop',
            message: authDetection.badRequestMessage
          })
        }
      }

      return Promise.reject(error)
    })
}
