<template>
  <div class="tw-countdown">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tw-countdown',

  props: {
    // 持续时间，倒计时总时长
    duration: {
      type: Number,
      default: 60
    },

    // 计时单位: s, ms
    unit: {
      type: String,
      default: 's',
      validator (duration) {
        // 只允许赋值为s或ms
        return /^s|ms$/.test(duration)
      }
    },

    // 是否全局启用，即页面刷新，页面切换倒计时仍然有效
    isGlobal: {
      type: Boolean,
      default: true
    },

    // 控件全局共享Id，用于在项目中全局识别该控件
    sid: {
      type: String,
      default: 'default',
      validator (duration) {
        // 只允1-20位许数字与字母
        return /[\d\w]{1,20}/.test(duration)
      }
    },

    // 以逗号分隔的天时分秒单位
    format: {
      type: String,
      default: '天,时,分,秒,毫秒'
    }
  },

  data () {
    return {
      // 倒计时
      countdown: 0,

      // 显示倒计时的元素
      countdownEls: []
    }
  },

  computed: {
    // 保存在cookie中的标识符
    cookieSid () {
      return 'twui_countdown_' + this.sid
    },

    // 毫秒数倒记时长
    duration_ms () {
      return this.unit.toLowerCase() === 's' ? this.duration * 1000 : this.duration
    },

    // 倒计时运行间隔,按毫秒记
    runInterval () {
      return this.unit.toLowerCase() === 's' ? 1000 : 16
    },

    // 倒计时转变成时分秒
    countdownText () {
      /* eslint-disable camelcase */
      if (this.countdown < 0) return

      const f = this.format.split(',')
      const s_ms = 1000
      const m_ms = 60 * s_ms
      const h_ms = 60 * m_ms
      const d_ms = 24 * h_ms

      let d = parseInt(this.countdown / d_ms)
      let h = parseInt(this.countdown % d_ms / h_ms)
      let m = parseInt(this.countdown % h_ms / m_ms)
      let s = parseInt(this.countdown % m_ms / s_ms)
      let ms = parseInt(this.countdown % s_ms)

      return (d ? d + f[0] : '') + (h ? h + f[1] : '') + (m ? m + f[2] : '') + (s ? s + f[3] : '') + (this.unit.toLowerCase() === 'ms' ? ms + f[4] : '')
      /* eslint-enable camelcase */
    }
  },

  methods: {
    /**
    * 功能: 检测自动运行
    */
    detectAutoRun () {
      const regx = new RegExp(this.cookieSid + '=([^;]+)')
      let cookieCountdown = document.cookie.match(regx)
      cookieCountdown = cookieCountdown && cookieCountdown[1]

      if (cookieCountdown) {
        let endTime = parseInt(cookieCountdown)
        let now = (new Date()).getTime()

        if (endTime - now > 0) {
          this.countdown = Math.round((endTime - now))
          this.run()
        }
      }
    },

    /**
    * 功能: 初始化倒计时
    */
    start () {
      this.countdown = this.duration_ms
      const now = (new Date()).getTime()

      document.cookie = `${this.cookieSid}='';expires=${(new Date(now - 1)).toGMTString()}`

      let endTime = now + this.duration_ms

      if (this.isGlobal) {
        document.cookie = `${this.cookieSid}=${endTime};`
      }

      this.run()
    },

    /**
    * 功能: 初始化倒计时
    */
    stop () {
      this.countdown = 0
      const now = (new Date()).getTime()
      document.cookie = `${this.cookieSid}='';expires=${(new Date(now - 1)).toGMTString()}`
    },

    /**
    * 功能: 开始倒计时
    */
    run () {
      const vm = this

      if (vm.countdown > 0) {
        setTimeout(() => {
          vm.countdown -= vm.runInterval
          this.run()
        }, vm.runInterval)
      } else {
        vm.countdown = 0

        if (this.isGlobal) {
          let exp = new Date()
          exp.setTime(exp.getTime() - 1)
          document.cookie = `${vm.cookieSid}='';expires=${exp.toGMTString()}`
        }
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      if (this.isGlobal) {
        this.detectAutoRun()
      }

      this.countdownEls = document.querySelectorAll('.js-countdown')
    })
  },

  watch: {
    duration () {
      this.countdown = 0
    },

    countdownText (val) {
      // 渲染不用vue的渲染机制，避免部份android手机在包含倒计时的表单字段中
      // 输入字符有问题，如输入的内容在倒计时渲染时被删除，输出多个相同字符
      for (let i = 0; i < this.countdownEls.length; i++) {
        this.countdownEls[i].textContent = val
      }

      if (this.countdown >= 1000) {
        this.$el.classList.add('xrunning')
      } else {
        this.$el.classList.remove('xrunning')
      }
    }
  }
}
</script>

<style lang="scss">
  .tw-countdown,
  .tw-countdown > .tw-countdown-runningbox,
  .tw-countdown > .tw-countdown-stopbox {
    display: inline-block;
  }

  .tw-countdown > .tw-countdown-runningbox,
  .tw-countdown.xrunning > .tw-countdown-stopbox {
    display: none;
  }

  .tw-countdown.xrunning > .tw-countdown-runningbox {
    display: inline-block;
  }
</style>
