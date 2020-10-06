export default {
  name: 'fix',

  hooks: {
    inserted (el, bind) {
      let fixEl
      let unFix
      let fixed = false
      let fixedClassName = 'xfixed'
      let originalStyle = el.getAttribute('style')
      let originalTop = el.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop
      let originalLeft = el.getBoundingClientRect().left + window.pageXOffset - document.documentElement.clientLeft

      const elPlaceholder = el.cloneNode()

      fixEl = function () {
        fixed = true
        elPlaceholder.classList.add('xplaceholder')
        elPlaceholder.style.visibility = 'hidden'
        elPlaceholder.style.width = el.offsetWidth + 'px'
        elPlaceholder.style.height = el.offsetHeight + 'px'

        el.classList.add(fixedClassName)
        el.style.width = el.offsetWidth + 'px'
        el.style.position = 'fixed'
        el.style.left = originalLeft + 'px'
        bind.arg === 'bottom' ? (el.style.bottom = bind.value ? bind.value + 'px' : 0) : (el.style.top = bind.value ? bind.value + 'px' : 0)
        el.parentElement.insertBefore(elPlaceholder, el)
      }

      unFix = function () {
        fixed = false
        el.classList.remove(fixedClassName)

        if (el.parentElement.contains(elPlaceholder)) {
          el.parentElement.removeChild(elPlaceholder)
        }

        el.setAttribute('style', originalStyle || '')
      }

      if (typeof el.tw !== 'object') el.tw = {}

      el.tw.fixHandler = function () {
        if (!document.contains(el)) {
          document.removeEventListener('scroll', el.tw.fixHandler)
          return
        }

        const scrollTop = window.pageYOffset

        if (!fixed) {
          originalTop = el.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop
          originalLeft = el.getBoundingClientRect().left + window.pageXOffset - document.documentElement.clientLeft
        }

        if (bind.arg === 'bottom') {
          if (scrollTop + window.innerHeight < originalTop + el.offsetHeight) {
            fixed || fixEl()
          } else {
            fixed && unFix()
          }
        } else {
          if (scrollTop > originalTop) {
            fixed || fixEl()
          } else {
            fixed && unFix()
          }
        }
      }

      el.tw.fix = function () {
        unFix()
        el.tw.fixHandler()
      }

      document.addEventListener('scroll', el.tw.fixHandler)
      window.addEventListener('resize', el.tw.fix)
      el.tw.fixHandler()
    },

    componentUpdated (el, bind) {
      el.tw.fixHandler()
    },

    unbind (el) {
      document.removeEventListener('scroll', el.tw.fixHandler)
      window.removeEventListener('resize', el.tw.fix)
    }
  }
}
