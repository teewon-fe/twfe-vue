/**
 * 功能： 返回校比邻
 */
export const back = {
  ios: 'xblGoback',
  android: 'xbl_goback',

  // ios 需要一个空对象做为参数,android不需要任何参数
  paramsHandler (params) {
    if (this._os === 'android') {
      return []
    } else if (this._os === 'ios') {
      return [{}]
    }
  }
}

/**
 * 功能： 打开原生app
 * @params {String} url-启动app的url
 */
export const openNativeApp = {
  ios: 'xblOpenApp',
  android: 'openNativeApp',

  params: {
    url: ''
  },

  paramsHandler (params) {
    return [params.url]
  }
}

/**
 * 功能：通过packageName打开原生app(仅android支持)
 * @params {String} packageName-包名
 */
export const openNativeAppWithPackageName = {
  android: 'openNativeAppWithPackageName',

  params: {
    packageName: ''
  },

  paramsHandler (params) {
    return [params.packageName]
  }
}
