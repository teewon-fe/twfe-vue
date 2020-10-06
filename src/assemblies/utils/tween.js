const TWEEN = require('@tweenjs/tween.js')

/**
 * 功能: 简单使用tween.js定义的动画效果
 * https://github.com/tweenjs/tween.js
 * @param {Object} option 动画选项 {from: 动画开始的数值对象, to:动画结束的数值对象, time：动画时间, update：动画更新时的回调函数}
 */
export default function (option) {
  new TWEEN.Tween(option.from)
    .to(option.to, option.time)
    .start()
    .onUpdate(option.update)

  const animate = function () {
    if (TWEEN.update()) {
      if (requestAnimationFrame) {
        requestAnimationFrame(animate)
      } else {
        setTimeout(animate, 17)
      }
    }
  }

  animate()
}
