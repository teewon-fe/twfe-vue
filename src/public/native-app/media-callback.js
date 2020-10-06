// 图片，视频，音频的回调函数全部类似
export default {
  name: 'xblSelectFinish',
  handler (option = {}, value, type, extendParam, result) {
    let base64Data = value
    let res, ext, filename

    if (type === 'image') {
      try {
        base64Data = JSON.parse(value)
      } catch (e) {
        base64Data = value
      }

      ext = 'png'
      filename = (option.filename || window.$ui.uuid()) + '.png'
    } else if (type === 'video') {
      ext = 'mp4'
      filename = (option.filename || window.$ui.uuid()) + '.mp4'
    } else if (type === 'audio') {
      ext = 'mp3'
      filename = (option.filename || window.$ui.uuid()) + '.mp3'
    }

    let mimeType = `${type}/${ext}`

    if (Array.isArray(base64Data)) {
      res = []
      base64Data.forEach((b64, idx) => {
        let blobAndUrl = window.$ui.base64.toBlobAndUrl(b64, mimeType)
        res.push({
          ext,
          mimeType,
          fileType: type,
          url: blobAndUrl.url,
          fromNative: true,
          filename: filename,
          data: blobAndUrl.blob
        })
      })
    } else {
      let blobAndUrl = window.$ui.base64.toBlobAndUrl(base64Data, mimeType)
      res = {
        ext,
        mimeType,
        fileType: type,
        url: blobAndUrl.url,
        fromNative: true,
        filename: filename,
        data: blobAndUrl.blob
      }
    }

    return {
      data: res,
      type,
      extendParam,
      result
    }
  }
}
