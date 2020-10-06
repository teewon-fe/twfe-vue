import { base64 } from 'js-base64'

/**
* 功能: base64编码
* @param {String} value 要编码的字符串
*/
export const encode = function (value) {
  return base64.encode(value)
}

/**
* 功能: base64解码
* @param {String} base64Value base64字符串
*/
export const decode = function (base64Value) {
  return base64.decode(base64Value)
}

/**
* 功能: base64转ArrayBuffer
* @param {String} base64Value base64字符串
*/
export const toArrayBuffer = function (base64Value) {
  let binary = window.atob(base64Value)
  let len = binary.length
  let bytes = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i)
  }

  return bytes.buffer
}

/**
* 功能: base64转blob
* @param {String} base64Value base64字符串
* @param {String} mimeType blob的mimeType类型
*/
export const toBlob = function (base64Value, mimeType = '') {
  let headRegExp = /^data:([\w.-]+?\/[\w.-]+?);base64,/
  let match = base64Value.match(headRegExp)

  if (match && match[1]) {
    mimeType = match[1]
  }

  base64Value = base64Value.replace(headRegExp, '')
  let buffer = toArrayBuffer(base64Value)

  return new Blob([buffer], { type: mimeType })
}

/**
* 功能: base64转Url
* @param {String} base64Value base64字符串
* @param {String} mimeType blob的mimeType类型
*/
export const toUrl = function (base64Value, mimeType) {
  let blob = toBlob(base64Value, mimeType)

  return window.URL.createObjectURL(blob)
}

/**
* 功能: base64转Url
* @param {String} base64Value base64字符串
* @param {String} mimeType blob的mimeType类型
*/
export const toBlobAndUrl = function (base64Value, mimeType) {
  let blob = toBlob(base64Value, mimeType)

  return {
    blob,
    url: window.URL.createObjectURL(blob)
  }
}
