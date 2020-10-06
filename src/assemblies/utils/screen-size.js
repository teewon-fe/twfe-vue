/**
 * 功能: 按向上媒体查询，获取当前屏幕分辨率在指定的媒体列表中对应哪个媒体关键字
 * @param {Array} medias 需要返回关键字的媒体列表
 */
export default function screenIs (medias) {
  const mediaBreakpoint = {
    '4k': 2560,
    '2k': 1920,
    'lpc': 1600,
    'pc': 1200,
    'lpad': 996,
    'pad': 768,
    'lphone': 576,
    'phone': 0
  }

  const windowWidth = window.innerWidth

  if (medias) {
    medias = medias.sort((i1, i2) => mediaBreakpoint[i2] - mediaBreakpoint[i1])
  } else {
    medias = ['4k', '2k', 'lpc', 'pc', 'lpad', 'pad', 'lphone', 'phone']
  }

  for (var i = 0; i < medias.length; i++) {
    const breakpoint = mediaBreakpoint[medias[i]]
    if (windowWidth > breakpoint) {
      return medias[i]
    }
  }

  return medias[i - 1]
}
