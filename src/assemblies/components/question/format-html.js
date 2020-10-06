/**
 * 功能： 将<img src="xxx" />文本替换为<img src="xxx" data-src="xxx" /> 以使图片标签能被tw-media-view做大图预览
 * @param {Array, String} val html内容
 * @param {String} isEcr 是否用ecr文件服务器
 */
export default function formatHtml (val, returnText, isEcr = true) {
  if (!val) val = ''

  if (Array.isArray(val)) {
    return val.join('、')
  } else {
    val = val.replace(/&equal;/gm, '=').replace(/&add;/gm, '+')

    if (returnText) {
      let div = document.createElement('div')
      val = val.replace(/<img .*?>/, '【图片占位】')
      div.innerHTML = val.replace(/#BLANK#/gm, '______')
      val = div.innerText
      div = null
      return val
    } else {
      let fileBaseUrl = isEcr ? window.$app.ecr.fileBaseUrl : window.$app.fileBaseUrl

      return val.replace(/src=['"](.+?)['"]/gm, (m, p1) => {
        if (p1.startsWith('http')) {
          return `src="${p1}" data-src="${p1.replace(/\?.*/, '')}" `
        } else {
          return `src="${fileBaseUrl}${p1}" data-src="${fileBaseUrl}${p1.replace(/\?.*/, '')}" `
        }
      }).replace(/(<img.*?)(\swidth=.*?\b)(.*?>)/gm, '$1 $3').replace(/(<img.*?)(\sheight=.*?\b)(.*?>)/gm, '$1 $3')
    }
  }
}
