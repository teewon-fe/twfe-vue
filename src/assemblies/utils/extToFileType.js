/**
 * 功能: 由文件扩展名回推文件类型
 * @param {String} file 带扩展名的文件路径或文件名称
 * @param {String} fromExt 直接通过扩展名回推
 */
export default function (file, fromExt) {
  if (fromExt) {
    file = `*.${file}`
  }

  const ext = file.substring(file.lastIndexOf('.') + 1).toLowerCase()

  const extMap = Object.assign({
    text: ['txt'],
    pdf: ['pdf'],
    ppt: ['ppt', 'pptx'],
    word: ['doc', 'docx'],
    flash: ['swf', 'flv'],
    excel: ['xls', 'xlsx'],
    image: ['jpg', 'jpeg', 'png', 'gif'],
    video: ['mp4', 'ogg', 'wmv', 'aiv'],
    audio: ['mp3', 'aac', 'm4a', 'wav'],
    zip: ['zip', 'rar', '7z']
  }, (window.$app && window.$app.extension) || {})

  for (const key in extMap) {
    if (extMap.hasOwnProperty(key)) {
      const element = extMap[key]

      if (element.includes(ext)) {
        return key
      }
    }
  }

  return 'other'
}
