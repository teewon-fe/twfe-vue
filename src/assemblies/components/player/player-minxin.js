import 'video.js/dist/video-js.css'
import videojs from 'video.js/dist/video'
import extToFileType from '@utils/extToFileType.js'

window.videojs = videojs

require('videojs-contrib-hls/dist/videojs-contrib-hls.js')

export default {
  props: {
    src: {
      type: String,
      required: true
    },

    autoplay: {
      type: Boolean,
      default: false
    },

    isEcoTrnascodeing: {
      type: Boolean,
      default: false
    },

    ext: String,

    mimeType: {
      type: String,
      default: 'auto'
    },

    options: {
      type: Object,
      default () {
        return {}
      }
    },

    fileBaseUrl: {
      type: String,
      default: ''
    },

    ecoGatewayUrl: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      player: null,
      isTransing: false,
      transcodingStatus: ''
    }
  },

  computed: {
    // 最终的文件扩展名
    extention () {
      return this.ext || this.src.substring(this.src.lastIndexOf('.') + 1)
    },

    // 文件扩展类型
    type () {
      return extToFileType(`*.${this.extention}`)
    },

    // 信息提示
    msg () {
      if (this.transcodingStatus === 'wating') {
        return '转码中，点击刷新状态...'
      } else {
        return '转码未完成，请稍候重试...'
      }
    }
  },

  methods: {
    init () {
      if (this.$options.name === 'tw-pop-player' && !this.playerVisible) {
        return
      }

      this.$nextTick(() => {
        this.fileBaseUrl = this.fileBaseUrl
        this.ecoGatewayUrl = this.ecoGatewayUrl

        if (this.isEcoTrnascodeing) {
          this.isTransing = true
          this.transcodingStatus = 'wating'
          this.getTranscodingPath()
        } else {
          this.initVideo(this.src)
        }
      })
    },

    initVideo (src) {
      const vedioMime = {
        mp4: 'video/mp4',
        ogg: 'video/ogg',
        webm: 'video/webm',
        m3u8: 'application/x-mpegURL'
      }

      let source = {
        src: `${this.fileBaseUrl}${src}`,
        type: this.mimeType === 'auto' ? vedioMime[this.extention] : this.mimeType
      }

      if (this.player) {
        this.player.src(source)
        this.player.load()
        return
      }

      let options = {
        sources: [source]
      }

      Object.assign(options, this.options)

      setTimeout(() => {
        this.player = videojs(this.$refs.player, options)
      }, 1000)
    },

    getTranscodingPath () {
      let vm = this

      if (this.transcodingStatus === 'cooldown') {
        return
      }

      this.axios.get(`${this.ecoGatewayUrl}/twasp/fs/fs/file/getMediaConvertPath?${encodeURIComponent(this.src)}`).then((resp) => {
        if (resp.data.serverResult.resultCode === '200') {
          if (/\.m3u8$/.test(resp.data.responseEntity)) {
            vm.initVideo(resp.data.responseEntity)
            vm.isTransing = false
          } else {
            vm.transcodingStatus = 'cooldown'
          }
        } else {
          vm.transcodingStatus = 'cooldown'
        }
      }).catch(() => {
        vm.transcodingStatus = 'cooldown'
      })
    },

    stop () {
      if (this.player) {
        this.player.currentTime(0)
        setTimeout(() => {
          this.player.pause()
        }, 0)
      }
    },

    destroyPlayer () {
      if (this.player) {
        this.player.dispose()
        this.player = null
      }
    }
  },

  mounted () {
    this.init()
  },

  beforeDestroy () {
    this.destroyPlayer()
  },

  watch: {
    src () {
      this.init()
    },

    transcodingStatus (val) {
      if (val === 'cooldown') {
        setTimeout(() => {
          this.transcodingStatus = 'wating'
        }, 3000)
      }
    }
  }
}
