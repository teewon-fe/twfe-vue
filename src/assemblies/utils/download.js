import getFilenameFromUrl from './get-filename-from-url'
import * as file from './file'

/**
 *  功能：文件下载
 * @param {String} url 下载的URL地址
 * @param {String} name 下载名称
 * @param {String} urlIsText url为文本内容
 */
export default function (url, name, urlIsText) {
  if (urlIsText) {
    file.saveAs(new Blob([url], { type: 'text/plain' }), name)
  } else {
    name = name || getFilenameFromUrl(url)
    file.download(url, name)
  }
}
