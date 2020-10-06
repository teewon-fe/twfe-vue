export default {
  props: {
    // 音频播放地址
    src: {
      type: [String, Array],
      required: true
    },

    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: false
    },

    // 显示类型 normal-正常 mini-迷你
    showType: {
      type: String,
      default: 'normal'
    },

    // 时间类型 normal-正常 countdown-倒计时
    timeType: {
      type: String,
      default: 'normal'
    },

    // 是否显示标题
    titleVisible: {
      type: Boolean,
      default: false
    },

    // 快进或快退的步长
    skipStep: {
      type: Number,
      default: 15
    },

    // 是否只能同时启用一个播放器播放
    single: {
      type: Boolean,
      default: true
    },

    // 渲染哪些组件成员 play-btn(播放按钮) current-time(当前时间) progress(进度条)
    // duration(总时长) backward-btn(后退按钮) forward-btn(前进按钮)
    members: {
      type: Array,
      default () {
        return ['play-btn', 'current-time', 'progress', 'duration', 'backward-btn', 'forward-btn']
      }
    }
  }
}
