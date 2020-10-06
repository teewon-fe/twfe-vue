import tween from '@utils/tween'

export default {
  name: 'lift',

  hooks: {
    inserted (el) {
      const dataTarget = el.getAttribute('data-target')

      /**
       * 行为: 获取电梯式锚点在页面中top值
       * @param {Element} lift 电梯式锚点指令绑定元素
       */
      const getLiftTargetTop = function (lift) {
        const target = document.querySelector(lift.getAttribute('data-target'))

        if (target) {
          const scrollTop = window.pageYOffset

          let dataTop = lift.getAttribute('data-top')
          dataTop = dataTop ? parseInt(dataTop) : 0

          return parseInt(target.getBoundingClientRect().top - dataTop + scrollTop - document.documentElement.clientTop)
        } else {
          return 0
        }
      }

      // 单击指令元素时，页面滚动到电梯式锚点所在处
      el.addEventListener('click', function () {
        const target = document.querySelector(dataTarget)

        if (target || dataTarget === 'top') {
          const scrollTop = window.pageYOffset
          const scrollLeft = window.pageXOffset

          tween({
            from: { top: scrollTop },
            to: { top: getLiftTargetTop(el) },
            time: 200,
            update (update) {
              window.scrollTo(scrollLeft, update.top)
            }
          })
        }
      })

      /**
       * 行为: 电梯式锚点Class处理器
       * @param {String} groupName 用于区分电梯式锚点指令绑定元素的分组
       */
      const liftClassHandler = function (groupName) {
        if (groupName) {
          const lifts = document.getElementsByName(groupName)

          for (let i = 0; i < lifts.length; i++) {
            if (lifts[i] === el) {
              lifts[i].classList.add('xactive')
            } else {
              lifts[i].classList.remove('xactive')
            }
          }
        } else {
          el.classList.add('xactive')
        }
      }

      /**
       * 行为: 当页面滚动到电梯式锚点目标位置时，指令绑定元素添加激活样式
       */
      const handleScrollForLifts = function (event) {
        if (dataTarget === 'top') {
          if (window.scrollY > 100) {
            el.style.display = ''
          } else {
            el.style.display = 'none'
          }
        }

        if (!document.documentElement.contains(el)) {
          // 如果el在当前页已经不存在，注销其在document上相关联的scroll事件
          document.removeEventListener('scroll', handleScrollForLifts)
          return
        }

        const target = document.querySelector(dataTarget)
        const scrollTop = window.pageYOffset

        if (target) {
          const groupName = el.getAttribute('name')

          // 如果指定了组名，按组来计算当前指令绑定元素是否需要被激活
          if (groupName) {
            const lifts = document.getElementsByName(groupName)
            let targets = []

            // 获取电梯式锚点目标组中每个目标的top值
            for (let i = 0; i < lifts.length; i++) {
              targets.push({
                link: lifts[i],
                top: getLiftTargetTop(lifts[i])
              })
            }

            // 电梯式锚点目标组按其top值从小到大排序
            targets = targets.sort((t1, t2) => {
              return t1.top - t2.top
            })

            // 获取当前事件元素在排序后的电梯式锚点目标组中对应的索引
            for (var i = 0; i < targets.length; i++) {
              if (targets[i].link === el) break
            }

            if (i < targets.length - 2) {
              if (scrollTop >= targets[i].top && scrollTop < targets[i + 1].top) {
                liftClassHandler(groupName)
              } else {
                el.classList.remove('xactive')
              }
            } else {
              if (scrollTop >= targets[i].top) {
                liftClassHandler(groupName)
              } else {
                el.classList.remove('xactive')
              }
            }
          } else {
            if (scrollTop >= getLiftTargetTop(el)) {
              liftClassHandler()
            }
          }
        }

        // 当为返回顶部的按钮触发时，滚动条等于0时添加一个隐藏该返回顶部按钮的class
        if (dataTarget === 'top') {
          if (scrollTop === 0) {
            el.classList.remove('xactive')
          } else {
            el.classList.add('xactive')
          }
        }
      }

      // 只有当指令元素被name分组时，才启用滚动条监测功能
      if (el.getAttribute('name') || dataTarget === 'top') {
        // 预先隐藏到顶部的lift
        if (dataTarget === 'top') {
          el.style.display = 'none'
        }

        document.addEventListener('scroll', handleScrollForLifts)
      }
    }
  }
}
