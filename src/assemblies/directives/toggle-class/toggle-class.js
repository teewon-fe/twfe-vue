export default {
  name: 'class',

  hooks: {
    inserted (el, binding) {
      const eventName = binding.arg ? (binding.arg === 'hover' ? 'mouseover' : binding.arg) : 'click'
      const relatedEvent = eventName === 'mouseover' ? 'mouseout' : 'blur'

      el.addEventListener(eventName, function () {
        const name = el.getAttribute('name')
        const className = binding.value

        if (name) {
          const group = document.getElementsByName(name)

          for (let i = 0; i < group.length; i++) {
            group[i].classList.remove(className)
          }

          el.classList.add(className)
        } else {
          const target = document.querySelector(el.getAttribute('data-target'))

          const removeClass = function (e) {
            if (relatedEvent === 'mouseover' && target.contains(e.relatedTarget)) return

            target.classList.remove(className)
            el.classList.remove(className)
          }

          if ((eventName === 'click' && target.classList.contains(className))) {
            removeClass()
          } else {
            target.classList.add(className)
            el.classList.add(className)
            el.removeEventListener(relatedEvent, removeClass)
            el.addEventListener(relatedEvent, removeClass)
            target.removeEventListener(relatedEvent, removeClass)
            target.addEventListener(relatedEvent, removeClass)
          }
        }
      })
    }
  }
}
