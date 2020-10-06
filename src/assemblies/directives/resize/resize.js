export default {
  name: 'resize',

  hooks: {
    inserted (el, binding) {
      const target = document.querySelector(el.getAttribute('data-target'))
      let start = { x: 0, y: 0, width: 0, height: 0 }

      const resizeHandler = function (e) {
        const min = parseInt(el.getAttribute('data-min'))
        const max = parseInt(el.getAttribute('data-max'))
        let { x, y, width, height } = start

        if (binding.arg === 'width') {
          if (binding.modifiers.reverse) {
            width += x - e.pageX
          } else {
            width += e.pageX - x
          }

          if (!isNaN(min) && width < min) width = min
          if (!isNaN(max) && width > max) width = max

          target.style.width = width + 'px'
        }

        if (binding.arg === 'height') {
          if (binding.modifiers.reverse) {
            height += y - e.pageY
          } else {
            height += e.pageY - y
          }

          if (!isNaN(min) && height < min) height = min
          if (!isNaN(max) && height > max) height = max

          target.style.height = height + 'px'
        }
      }

      el.addEventListener('mousedown', function (e) {
        start = {
          x: e.pageX,
          y: e.pageY,
          width: target.offsetWidth,
          height: target.offsetHeight
        }

        document.addEventListener('mousemove', resizeHandler)
        document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', resizeHandler)
        })
      })
    }
  }
}
