<template>
  <div class="tw-audio"
    :class="{xplaying: playing, xmin: progress<0.01, xmax: progress>0.99, xweb: $app.appType==='web', xmobile: $app.appType==='mobile'}">
    <div class="tw-audio-body">
      <!-- mini播放按钮 -->
      <div v-if="showType==='mini' && members.includes('play-btn')"
        class="tw-audio-iconbox"
        @click="toggle">
        <slot name="play-btn">
          <i v-if="playing" class="tw-ico xpause" :class="defaultIconSize"></i>
          <i v-else class="tw-ico xplay" :class="defaultIconSize"></i>
        </slot>
      </div>

      <!-- 当前时间 -->
      <div v-if="members.includes('current-time')"
        class="tw-audio-time">
        <slot name="current-time" :currTime="currTime">{{toPlayerTime(currTime)}}</slot>
      </div>

      <!-- 进度条 -->
      <div v-if="members.includes('progress')"
        class="tw-audio-progressbox">
        <slot name="progress" :progress="progress">
          <!-- web端 -->
          <el-slider
            v-if="$app.appType==='web'"
            :min="0"
            :max="1"
            :step="0.01"
            :show-tooltip="false"
            v-model="progress"
            @mousedown.native.capture="dragStartWeb"
            @mouseup.native.capture="dragEnd"
            @change="changeTime" />

          <!-- 移动端 -->
          <van-slider
            v-if="$app.appType==='mobile'"
            :min="0"
            :max="1"
            :step="0.01"
            v-model="progress"
            @drag-start="dragStart"
            @drag-end="dragEnd"
            @change="changeTime" />
        </slot>
      </div>

      <!-- 总时长 -->
      <div v-if="members.includes('duration')"
        class="tw-audio-time">
        <slot name="duration" :duration="toPlayerTime(duration)">{{toPlayerTime(duration)}}</slot>
      </div>
    </div>

    <!-- 控制条 -->
    <ul v-if="showType==='normal'" class="tw-audio-control">
      <!-- 后退x秒 -->
      <li v-if="members.includes('backward-btn') && this.duration > this.skipStep"
        class="tw-audio-control-skip xbackward"
        @click="skip('backward')">
        <slot name="backward-btn">
          <i class="tw-ico xbackward" :class="defaultIconSize">
            <span>{{skipStep}}</span>
          </i>
        </slot>
      </li>

      <!-- 播放按钮 -->
      <li v-if="members.includes('play-btn')"
        class="tw-audio-control-play"
        @click="toggle">
        <slot name="play-btn">
          <i v-if="playing" class="tw-ico xpause" :class="largeIconSize"></i>
          <i v-else class="tw-ico xplay" :class="largeIconSize"></i>
        </slot>
      </li>

      <!-- 前进x秒 -->
      <li v-if="members.includes('forward-btn') && this.duration > this.skipStep"
        class="tw-audio-control-skip xforward"
        @click="skip('forward')">
        <slot name="forward-btn">
          <i class="tw-ico xforward" :class="defaultIconSize">
            <span>{{skipStep}}</span>
          </i>
        </slot>
      </li>
    </ul>

    <div v-if="titleVisible" class="tw-audio-title">音频标题音频标题.mp3</div>

    <audio
      v-if="autoplay"
      autoplay
      ref="audio"
      :src="src"
      @loadedmetadata="updateMetaData"
      @timeupdate="updateTime"
      @ended="stop"
      @loadeddata="play"
      @error="handleError">
    </audio>

    <audio
      v-else
      ref="audio"
      :src="src"
      @loadedmetadata="updateMetaData"
      @timeupdate="updateTime"
      @ended="stop"
      @error="handleError">
    </audio>
  </div>
</template>

<script>
import props from './audio-props'

let prevAudio = null

export default {
  name: 'tw-audio-player',

  mixins: [props],

  data () {
    return {
      self: null,
      currTime: 0,
      progress: 0,
      playing: false,
      duration: 0
    }
  },

  computed: {
    defaultIconSize () {
      if (this.$app.appType === 'web') {
        return 'x32'
      } else {
        return 'x48'
      }
    },

    largeIconSize () {
      if (this.$app.appType === 'web') {
        return 'x48'
      } else {
        return 'x64'
      }
    }
  },

  methods: {
    /**
    * 功能: 秒转换为h:m:s
    */
    toPlayerTime (val) {
      val = parseInt(val)

      let h = parseInt(val / 3600) + ''
      let m = parseInt((val % 3600) / 60) + ''
      let s = val % 60 + ''

      return `${h === '0' ? '' : h + ':'}${m.padStart(2, '0')}:${s.padStart(2, '0')}`
    },

    /**
    * 功能: 加载音频
    */
    load () {
      this.$refs.audio.load()
    },

    /**
    * 功能: 更新元数据
    */
    updateMetaData () {
      this.duration = this.$refs.audio.duration
    },

    /**
    * 功能: 更新当前时间
    */
    updateTime () {
      if (this.$refs.audio) {
        this.currTime = this.$refs.audio.currentTime
        this.progress = this.currTime / this.duration
      }
    },

    /**
    * 功能: 播放音频
    */
    play () {
      if (this.$refs.audio) {
        if (this.single) {
          if (prevAudio && prevAudio !== this) {
            prevAudio.stop()
          }

          prevAudio = this
        }

        let promise = this.$refs.audio.play()

        if (promise) {
          promise.then(() => {
            this.playing = true
          }).catch(() => {
          // noop
          })
        } else {
          this.playing = true
        }
      }
    },

    /**
    * 功能: 暂停播放音频
    */
    pause () {
      if (this.$refs.audio) {
        this.$refs.audio.pause()
        this.playing = false
      }
    },

    /**
    * 功能: 停止播放
    */
    stop () {
      if (this.$refs.audio) {
        this.pause()
        this.currTime = 0
        this.progress = 0
        this.$refs.audio.currentTime = 0
      }
    },

    /**
    * 功能: 播放/暂停切换
    */
    toggle () {
      if (this.playing) {
        this.pause()
      } else {
        this.play()
      }
    },

    /**
     * 功能: 开始拖动时暂停播放
     */
    dragStart (value) {
      this.pause()
    },

    /**
     * 功能: web端拖动滑动条
     */
    dragStartWeb (value) {
      this.pause()
    },

    /**
     * 功能: 拖动进度条改变时间
     */
    dragEnd (value) {
      this.play()
    },

    /**
     * 功能: 快退/快进
     * @param {String} type 操作类型 backward-快退 forward-快进
     */
    skip (type) {
      this.pause()

      let step = type === 'forward' ? this.skipStep : -this.skipStep

      let time = this.currTime + step

      if (time < 0) {
        time = 0
      }

      if (time > this.duration) {
        time = this.duration
      }

      this.$refs.audio.currentTime = time

      this.play()
    },

    /**
    * 功能: 处理错误
    */
    handleError () {
      this.$ui.msg('播放出错了~')
    },

    /**
   * 功能: 拖动进度条改变时间
   */
    changeTime (value) {
      this.$refs.audio.currentTime = parseInt(this.duration * value)
      this.play()
    }
  },

  mounted () {
    this.load()
  },

  beforeDestroy () {
    this.stop()
  },

  watch: {
    src: {
      deep: true,
      handler () {
        this.$nextTick(() => {
          this.load()
        })
      }
    }
  }
}
</script>

<style lang="scss">
  @import "./audio-player.scss";
</style>
