export default {
  params: {
    url: '',
    fileName: '',
    extendParam: '',
    localHandle: 'y'
  },

  paramsHandler (params) {
    if (this._os === 'android') {
      return [params.url, params.fileName, params.extendParam]
    } else if (this._os === 'ios') {
      return [params]
    }
  },

  callback: {
    name: 'xblDownloadCallable',
    /**
     * 下载回调后的参数处理
     * @param {String} status '0'-下载成功 '1'-下载失败 '2'-下载中 '3'-下载中止
     * @param {String} localPath 本地路径
     * @param {String} url 远程路径，status为'2'时，为下载进度
     * @param {Object} extendParam 额外的其他参数，由调用时传给原生函数，原生函数再原样返回
     */
    handler (option, status, localPath, urlOrProgress, extendParam) {
      if (['download', 'print'].includes(this._name)) {
        if (status === '2') {
          window.$ui.alert({
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: '取消下载',
            message: `文件下载中(${(urlOrProgress * 100).toFixed(2) + '%'})...`
          }).then(() => {
            // noop
          }).catch(() => {
            this._native.cancelDownload.send({ url: this.params.url })
          })

          return this.cancelSymbol
        } else {
          window.$ui.alert.close()
        }
      }

      let statusMap = ['success', 'fail', 'downloading', 'abort']

      return {
        status: statusMap[status],
        localPath,
        urlOrProgress,
        extendParam
      }
    }
  }
}
