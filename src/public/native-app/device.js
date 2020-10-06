import callback from './media-callback'
import downloadConfig from './download-callback'

/**
 * 功能： 调用相册选择图片
 * @params {String} format 打开哪种内容的相册(仅ios支持) image-图片 ?-视频
 * @params {String} maxCount 最多几张
 * @params {String} remainCount 还剩几张
 * @params {String} params 业务json string(仅ios支持)
 */
export const selectPhoto = {
  ios: 'xblOpenAlbum',
  android: 'selectPhotos',

  params: {
    format: 'image',
    maxCount: 10,
    remainCount: 10,
    localHandle: 'y'
  },

  paramsHandler (params) {
    if (this._os === 'android') {
      return [params.maxCount, params.remainCount]
    } else if (this._os === 'ios') {
      return [params]
    }
  },

  callback
}

/**
 * 功能：调用原生选择视频
 */
export const selectVideo = {
  ios: 'selectVideoiOS',
  android: 'selectVideo',

  params: {
    localHandle: 'y'
  },

  paramsHandler (params) {
    if (this._os === 'android') {
      return []
    } else if (this._os === 'ios') {
      return [params]
    }
  },

  callback
}

/**
 * 功能：调用原生拍照
 */
export const takePhoto = {
  ios: 'xblOpenCamera',
  android: 'takePhoto',

  params: {
    localHandle: 'y'
  },

  paramsHandler (params) {
    if (this._os === 'android') {
      return []
    } else if (this._os === 'ios') {
      return [params]
    }
  },

  callback
}

/**
 * 功能：调用原生录像
 */
export const takeVideo = {
  ios: 'takeVideoiOS',
  android: 'takeVideo',

  params: {
    localHandle: 'y'
  },

  paramsHandler (params) {
    if (this._os === 'android') {
      return []
    } else if (this._os === 'ios') {
      return [params]
    }
  },

  callback
}

/**
 * 功能：调用原生录音
 */
export const takeAudio = {
  ios: 'xblOpenAudio',
  android: 'takeVoice',

  params: {
    maxTime: 300,
    localHandle: 'y'
  },

  paramsHandler (params) {
    if (this._os === 'android') {
      return []
    } else if (this._os === 'ios') {
      return [params]
    }
  },

  callback
}

/**
 * 功能： 调用签字板
 * @params {Any} extendParam 在调用后会回传回来
 */
export const takeSign = {
  ios: 'xblOpenSign',
  android: 'openSignature',

  params: {
    extendParam: '',
    localHandle: 'y'
  },

  paramsHandler (params) {
    if (this._os === 'android') {
      return [params.extendParam]
    } else if (this._os === 'ios') {
      return [params]
    }
  },

  callback
}

/**
 * 功能：调用分享功能
 */
export const share = {
  ios: 'xblShare',
  android: 'xblShare',

  params: {
    link: '',
    title: '',
    thumbnail: '',
    description: '',
    content: '',
    extendParam: '',
    localHandle: 'y'
  },

  paramsHandler (params) {
    if (this._os === 'android') {
      if (!params.content) {
        params.content = params.description
      }

      return [params.link, params.title, params.thumbnail, params.description, params.content, params.extendParam]
    } else if (this._os === 'ios') {
      return [params]
    }
  }
}

/**
 * 功能：调用原生打印
 */
export const print = {
  ios: 'xblAirPrint',
  android: 'print',
  ...downloadConfig
}

/**
 * 功能：调用原生扫描
 */
export const scan = {
  ios: 'xblOpenScanCamera',
  android: 'openScanCamera',

  params: {
    scanCallback: null,
    extendParam: '',
    localHandle: 'y'
  },

  before () {
    /**
     * 功能：扫描回调函数
     * @params {String} scanResult 扫描切图结果的json字符串
     */
    let me = this
    window.xblScanFinish = function (scanResult) {
      if (me.params.scanCallback) {
        me.params.scanCallback(scanResult)
      }
    }
  },

  paramsHandler (params) {
    if (this._os === 'android') {
      return [params.extendParam]
    } else if (this._os === 'ios') {
      return [{
        extendParam: params.extendParam,
        localHandle: 'y'
      }]
    }
  },

  callback
}

/**
 * 功能：调用原生下载
 */
export const download = {
  ios: 'xblDownloadFile',
  android: 'downloadFile',
  ...downloadConfig
}

/**
 * 功能：取消原生下载
 */
export const cancelDownload = {
  ios: 'xblCancelDownloadFile',
  android: 'cancelDownloadFile',
  ...downloadConfig
}

/**
 * 功能： 切换横竖屏
 * @params {String} userInfo (仅android需要) 传入本地的自定义信息,可以是json字符串,
 *  在完成本地方法后，在本地调用webview 的xblSelectFinish 将回传此字段
 * @params {String} orientation '0'-竖屏 '1'-横屏 '2'-自动感应
 */
export const changeOrientation = {
  params: {
    userInfo: '',
    orientation: '1'
  },

  paramsHandler (params) {
    if (this._os === 'android') {
      return [params.userInfo, params.orientation]
    } else if (this._os === 'ios') {
      return [{ orientation: params.orientation }]
    }
  }
}

/**
 * 功能：打开文件
 */
export const openFile = {
  ios: 'xblOpenFileOnWeb',
  android: 'openFile',

  params: {
    url: '',
    fileName: '',
    userInfo: ''
  },

  paramsHandler (params) {
    if (this._os === 'android') {
      return [params.url, params.fileName, params.userInfo]
    } else if (this._os === 'ios') {
      return [params]
    }
  }
}
