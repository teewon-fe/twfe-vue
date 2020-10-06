import axios from 'axios'
import Validator from 'async-validator'
import assign from '../utils/assign'
import cookie from '../utils/cookie'
import urlQuery from '../utils/url-query'
import * as base64 from '../utils/base64'
import { uuid } from '../utils/uuid'
import dateFormat from '../utils/dateformat'
import downloadFile from '../utils/download'
import * as arr from '../utils/arr'
import * as tree from '../utils/tree'
import * as file from '../utils/file'
import * as el from '../utils/el'
import * as event from '../utils/event'
import XYChanger from '../utils/xyChanger'
import toRemPx from '../utils/toRemPx'
import genError from '../utils/gen-error'
import cloneJson from '../utils/clone-json'
import { shake } from '../utils/shake'
import { cloneApiOption } from '../plugins/apier/lib'
import extToFileType from '../utils/extToFileType'
import getFilenameFromUrl from '../utils/get-filename-from-url'
import numToPercent from '../utils/num-to-percent'
import numToLetter from '../utils/num-to-letter'
import numToChinese from '../utils/num-to-chinese'
import client from '../utils/client'
import * as generateArray from '../utils/generateArray'
import mimetype from '../utils/mime-type'

let qs = require('qs')
let utf8 = require('crypto-js/enc-utf8')
let aes = require('crypto-js/aes')
let pkcs7 = require('crypto-js/pad-pkcs7')
let ecb = require('crypto-js/mode-ecb')
let CryptoJS = {
  enc: {
    Utf8: utf8
  },
  AES: aes,
  mode: {
    ECB: ecb
  },
  pad: {
    Pkcs7: pkcs7
  }
}

export default {
  install (Vue, options = {}) {
    let t0 = 0
    let wait = parseInt(options.wait) || 3000

    let utils = {
      // get unix timestamp
      get now () {
        return Date.now()
      },

      get getServeTime () {
        return new Promise((resolve, reject) => {
          let request = new XMLHttpRequest()
          request.open('HEAD', window.location.href.toString(), false)

          request.onreadystatechange = function () {
            if (request.readyState === 4) {
              if ((request.status >= 200 && request.status < 300) || request.status === 304) {
                resolve(new Date(request.getResponseHeader('Date')))
              } else {
                reject(new Error('Failed to get serve time.'))
              }
            }
          }

          request.setRequestHeader('Content-Type', 'text/html')
          request.send(null)
        })
      },

      get urlQuery () {
        return urlQuery()
      },

      // debounce click
      get debounceExpired () {
        let t1 = new Date().getTime()

        if (t1 - t0 > wait) {
          t0 = t1
          return true
        } else {
          return false
        }
      },

      setDefaultHeaders (header) {
        Object.assign(axios.defaults.headers.common, shake(header, [undefined, null]))
      },

      CryptoJS: {
        ...CryptoJS
      },

      qs,
      arr,
      tree,
      el,
      file,
      event,
      mimetype,
      XYChanger,
      assign,
      cookie,
      base64: {
        ...base64
      },
      noop () {},
      uuid,
      dateFormat,
      downloadFile,
      toRemPx,
      genError,
      cloneJson,
      cloneApiOption,
      extToFileType,
      getFilenameFromUrl,
      client,
      numToPercent,
      numToLetter,
      numToChinese,
      Validator,
      ...options,
      ...generateArray
    }

    Object.freeze(utils)

    window.$ui = utils

    Object.defineProperty(Vue.prototype, '$ui', {
      get () { return utils }
    })

    Object.defineProperty(Vue.prototype, '$noop', {
      get () { return utils.noop }
    })
  }
}
