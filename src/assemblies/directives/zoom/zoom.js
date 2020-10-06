let Hammer = require('hammerjs')

export default {
  name: 'zoom',

  hooks: {
    inserted (el, binding) {
      let mc = new Hammer.Manager(el)
      let pinch = new Hammer.Pinch()
      let pan = new Hammer.Pan()
      let tap = new Hammer.Tap()
      mc.add([pinch, pan, tap])

      let scale = 1
      let zoom = 1
      let x = 0
      let y = 0
      let prevTime = 0
      let scalReg = /scale\((\d*.\d*)\)/
      let translateReg = /translate\((.*?)\)/
      let limit = Object.assign({ max: 3, min: 0.5 }, binding.value)
      let originalTransform = el.style.transform

      mc.on('pinch pinchstart panstart panmove tap', function (ev) {
        if (ev.type === 'pinchstart') {
          let match = el.style.transform.match(scalReg)
          scale = match ? parseFloat(match[1]) || 1 : 1
        } else if (ev.type === 'pinch') {
          if (ev.scale > 1) {
            zoom = scale + (ev.scale - 1)
          } else {
            zoom = scale + (ev.scale - 1) * 3
          }

          if (zoom > limit.max) {
            zoom = limit.max
          }

          if (zoom < limit.min) {
            zoom = limit.min
          }

          if (el.style.transform) {
            if (scalReg.test(el.style.transform)) {
              el.style.transform = el.style.transform.replace(scalReg, `scale(${zoom})`)
            } else {
              el.style.transform = el.style.transform + ` scale(${zoom})`
            }
          } else {
            el.style.transform = `scale(${zoom})`
          }
        } else if (ev.type === 'panstart') {
          let match = el.style.transform.match(translateReg)
          match = match ? match[1].split(',').map(item => parseFloat(item)) || [0, 0] : [0, 0]
          x = match[0]
          y = match[1]
        } else if (ev.type === 'panmove') {
          let easyValue = Math.cbrt ? Math.cbrt(zoom) : Math.sqrt(zoom)
          let endX = x + ev.deltaX / easyValue
          let endY = y + ev.deltaY / easyValue
          let result = `translate(${endX}px, ${endY}px)`

          if (el.style.transform) {
            if (translateReg.test(el.style.transform)) {
              el.style.transform = el.style.transform.replace(translateReg, result)
            } else {
              el.style.transform = el.style.transform + ` ${result}`
            }
          } else {
            el.style.transform = result
          }
        } else if (ev.type === 'tap') {
          if (ev.timeStamp - prevTime < 250) {
            el.style.transform = originalTransform
          }

          prevTime = ev.timeStamp
        }
      })
    }
  }
}
