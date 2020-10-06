/*
 * 功能: 配置原生app的功能调用函数
 *
 * 要求与用法：
 * 1、以window.$native.fnName或this.$native.fnName的形式调用功能
 * http://192.168.102.233:83/#/doc/guid/native
 */

import * as base from './base'
import * as device from './device'

export default {
  native: {
    ...base,
    ...device
  },

  upload: {
    url: window.$app.fileUploadUrl,

    data: {
      branchCode: window.$app.user.branchCode
    }
  }
}
