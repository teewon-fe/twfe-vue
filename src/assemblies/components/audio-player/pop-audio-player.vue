<template>
  <div class="tw-popaudio"
    :class="'x'+$app.appType">
    <!-- web端 -->
    <tw-modal
      v-if="$app.appType==='web'"
      no-footer
      class="xaudio"
      :visible="playerVisible"
      @close="$emit('update:visible', false)">
      <template slot="header">{{modalTitle}}</template>
      <template slot="body">
        <tw-audio-player
          ref="player"
          :autoplay="autoplay"
          :src="src"
          :showType="showType"
          :titleVisible="titleVisible"
          :skipStep="skipStep">
        </tw-audio-player>
      </template>
    </tw-modal>

    <!-- 移动端 -->
    <van-popup
      v-if="$app.appType==='mobile'"
      v-model="playerVisible"
      class="xplayer"
      :class="{xhide: playerHidden}"
      :overlay="false"
      closeable
      position="bottom"
      get-container="body"
      @opened="opened"
      @close="close">
      <div class="tw-popplayer-audio">
        <tw-audio-player
          ref="player"
          :autoplay="autoplay"
          :src="src"
          :showType="showType"
          :titleVisible="titleVisible"
          :skipStep="skipStep">
        </tw-audio-player>
      </div>
    </van-popup>
  </div>
</template>

<script>
import props from './audio-props'

export default {
  name: 'tw-pop-audio-player',

  mixins: [props],

  props: {
    visible: {
      type: Boolean,
      default: false
    },

    scrollContainer: String,

    title: String
  },

  data () {
    return {
      scrollEl: null,
      prevScrollTop: 0,
      playerHidden: false,
      playerVisible: this.visible
    }
  },

  computed: {
    modalTitle () {
      return this.title || `播放-${this.src.replace(/.*\//, '')}`
    }
  },

  methods: {
    init () {
      if (this.scrollContainer) {
        this.scrollEl = document.querySelector(this.scrollContainer)
        this.scrollEl.addEventListener('scroll', this.startScroll)
      }
    },

    startScroll () {
      let scrollTop = this.scrollEl.scrollTop

      if ((scrollTop > this.prevScrollTop && scrollTop > 1) ||
          scrollTop >= this.scrollEl.scrollHeight - this.scrollEl.offsetHeight) {
        this.playerHidden = true
      } else {
        this.playerHidden = false
      }

      this.prevScrollTop = this.scrollEl.scrollTop
    },

    opened () {
      this.$refs.player.load()
    },

    close () {
      this.$refs.player.stop()
      this.$emit('update:visible', false)
    }
  },

  mounted () {
    if (this.$app.appType === 'mobile') {
      this.init()
    }
  },

  beforeDestroy () {
    if (this.scrollEl) {
      this.scrollEl.removeEventListener('scroll', this.startScroll)
    }
  },

  watch: {
    visible (val) {
      this.playerVisible = this.visible

      if (val) {
        this.playerHidden = false
      }
    }
  }
}
</script>

<style lang="scss">
// 与pop-player中的样式大部份重复
@import "../player/pop-player.scss";
</style>
