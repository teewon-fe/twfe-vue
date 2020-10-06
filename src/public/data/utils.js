/*
 * 功能: 工具类变量及对象定义
 * 避免整个系统中多处使用同一个工具类对象时，每次都定义一个新的相同对象
 * 一旦发现定义有误，导致整个项目的所有涉及的代码都要更改的强耦合关系
 *
 * 定义举例：
 * 各页面表单通用的正则表达式、工具方法等
 *
 * 要求与用法：
 * 1、不允许在组件或js中单独定义通用的工具类变量，方法
 * 2、vue组件中以this.$ui.propName的形式访问工具类定义，js代码中直接引入该文件即可
 * http://192.168.102.233:83/#/doc/guid/utils
 */

export const pattern = {
  phone: /^1[3456789]\d{9}$/,
  chinese: /^[\u0391-\uFFE5]+$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  idCardNo: /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
}

export const timeOptions = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30'
]

export class Workday {
  constructor (option = {}) {
    this.worktime = Object.assign({
      amStart: '09:00:00',
      amEnd: '12:00:00',
      pmStart: '13:30:00',
      pmEnd: '18:00:00'
    }, option.worktime)

    this.currentTime = option.currentTime.replace(' ', 'T')
    this.taskTime = option.taskTime
    this.vacationDays = option.vacation || []
    this.overtimeDays = option.overtime || []
    this.taskMaxDays = option.taskMaxDays || 3
    this.format = option.format || 'yyyy-mm-dd HH:MM'

    Object.defineProperties(this, {
      dateString: {
        get () {
          return this.currentTime.match(/^(.*)T/)[1]
        }
      },

      msAmStart: {
        get () {
          return Date.parse(`${this.dateString}T${this.worktime.amStart}`)
        }
      },

      msAmEnd: {
        get () {
          return Date.parse(`${this.dateString}T${this.worktime.amEnd}`)
        }
      },

      msPmStart: {
        get () {
          return Date.parse(`${this.dateString}T${this.worktime.pmStart}`)
        }
      },

      msPmEnd: {
        get () {
          return Date.parse(`${this.dateString}T${this.worktime.pmEnd}`)
        }
      },

      amWorkTimes: {
        get () {
          return this.msAmEnd - this.msAmStart
        }
      },

      pmWorkTimes: {
        get () {
          return this.msPmEnd - this.msPmStart
        }
      },

      workTimes: {
        get () {
          return this.amWorkTimes + this.pmWorkTimes
        }
      },

      msCurrentTime: {
        get () {
          return Date.parse(this.currentTime)
        }
      },

      msTaskTime: {
        get () {
          return this.taskTime * this.workTimes
        }
      },

      amRemainingTimesTheDay: {
        get () {
          const t = this.msAmEnd - this.msCurrentTime

          return t < 0 ? 0 : t
        }
      },

      pmRemainingTimesTheDay: {
        get () {
          const t = this.msPmEnd - this.msCurrentTime

          return t > this.pmWorkTimes ? this.pmWorkTimes : t
        }
      },

      remainingTimesTheDay: {
        get () {
          return this.amRemainingTimesTheDay + this.pmRemainingTimesTheDay
        }
      },

      remainingTaskDayTheDay: {
        get () {
          return this.remainingTimesTheDay / this.workTimes
        }
      },

      nextWorkdays: {
        get () {
          const result = []
          let dateString = this.dateString

          for (let i = 0; i < this.taskMaxDays; i++) {
            let date = null

            do {
              date = new Date(Date.parse(`${dateString}T00:00:00`) + 86400000)
              dateString = window.$ui.dateFormat(date, 'yyyy-mm-dd')
            } while (!this.isWorkday(date))

            result.push(window.$ui.dateFormat(date, 'yyyy-mm-dd'))
          }

          return result
        }
      },

      computedTime: {
        get () {
          let nextStartTime = null
          let endTime = null

          if (this.msTaskTime <= this.amRemainingTimesTheDay) {
            endTime = new Date(this.msCurrentTime + this.msTaskTime)

            if (this.msTaskTime === this.amRemainingTimesTheDay) {
              nextStartTime = new Date(this.msPmStart)
            }
          } else if (this.msTaskTime <= this.remainingTimesTheDay) {
            endTime = new Date(this.msPmStart + (this.msTaskTime - this.amRemainingTimesTheDay))

            if (this.msTaskTime === this.remainingTimesTheDay) {
              nextStartTime = new Date(Date.parse(`${this.nextWorkdays[0]}T${this.worktime.amStart}`))
            }
          } else {
            const diff = this.msTaskTime - this.remainingTimesTheDay
            const days = parseInt(diff / this.workTimes)
            const mantissa = diff % this.workTimes

            if (mantissa === 0) {
              if (days > 0) {
                endTime = new Date(Date.parse(`${this.nextWorkdays[days - 1]}T${this.worktime.pmEnd}`))
                nextStartTime = new Date(Date.parse(`${this.nextWorkdays[days]}T${this.worktime.amStart}`))
              } else {
                endTime = new Date(Date.parse(`${this.dateString}T${this.worktime.pmEnd}`))
                nextStartTime = new Date(Date.parse(`${this.nextWorkdays[0]}T${this.worktime.amStart}`))
              }
            } else if (mantissa <= this.amWorkTimes) {
              endTime = new Date(Date.parse(`${this.nextWorkdays[days]}T${this.worktime.amStart}`) + mantissa)

              if (mantissa === this.amWorkTimes) {
                nextStartTime = new Date(Date.parse(`${this.nextWorkdays[days]}T${this.worktime.pmStart}`))
              }
            } else {
              endTime = new Date(Date.parse(`${this.nextWorkdays[days]}T${this.worktime.pmStart}`) + mantissa - this.amWorkTimes)
            }
          }

          if (!nextStartTime) {
            nextStartTime = endTime
          }

          return {
            endTime: window.$ui.dateFormat(endTime, this.format),
            nextStartTime: window.$ui.dateFormat(nextStartTime, this.format)
          }
        }
      }
    })
  }

  isWorkday (date) {
    const dateString = window.$ui.dateFormat(date, 'yyyy-mm-dd')

    return this.overtimeDays.includes(dateString) || (!this.isWeekend(date) && !this.vacationDays.includes(dateString))
  }

  isWeekend (date) {
    const day = date.getDay()
    return day === 6 || day === 0
  }
}
