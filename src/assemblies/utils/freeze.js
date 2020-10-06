export default function freeze (target = {}) {
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      const me = target[key]
      if (typeof me === 'object' && !(me instanceof RegExp)) {
        Object.freeze(me)
        freeze(me)
      }
    }
  }

  Object.freeze(target)
}
