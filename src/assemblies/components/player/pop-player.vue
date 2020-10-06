<template>
  <div class="tw-popplayer"
    :class="'x'+$app.appType">
    <!-- web端 -->
    <tw-modal
      v-if="$app.appType==='web'"
      class="xplayer"
      no-footer
      :visible="playerVisible"
      @close="$emit('update:visible', false)">
      <template slot="header">{{modalTitle}}</template>
      <template slot="body">
        <div class="tw-player" :class="{xaudio: type==='audio'}">
          <video v-if="autoplay" ref="player" controls autoplay class="video-js"></video>
          <video v-else ref="player" controls class="video-js"></video>

          <div v-if="isTransing"
            class="tw-player-cover"
            @click="getTranscodingPath">
            <div class="tw-player-cover-inner">
              <i class="el-icon-loading"></i>
              <div class="tw-player-cover-text">{{msg}}</div>
            </div>
          </div>

          <i v-if="type==='audio'" class="tw-ico xplaudio"></i>
        </div>
      </template>
    </tw-modal>

    <!-- 移动端 -->
    <van-popup
      v-if="$app.appType==='mobile'"
      v-model="playerVisible"
      class="xplayer"
      style="height: 100%;"
      closeable
      position="bottom"
      get-container="body"
      @close="$emit('update:visible', false)"
      @opened="init">
      <div v-if="playerVisible"
        class="tw-popplayer-video">
        <div class="tw-player" :class="{xaudio: type==='audio'}">
          <video v-if="autoplay" ref="player" controls autoplay class="video-js"></video>
          <video v-else ref="player" controls class="video-js"></video>

          <div v-if="isTransing"
            class="tw-player-cover"
            @click="getTranscodingPath">
            <div class="tw-player-cover-inner">
              <i class="el-icon-loading"></i>
              <div class="tw-player-cover-text">{{msg}}</div>
            </div>
          </div>

          <i v-if="type==='audio'" class="tw-ico xplaudio"></i>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import player from './player-minxin'

export default {
  name: 'tw-pop-player',

  mixins: [player],

  props: {
    visible: {
      type: Boolean,
      default: false
    },

    title: String
  },

  data () {
    return {
      playerVisible: this.visible
    }
  },

  computed: {
    modalTitle () {
      return this.title || `播放-${this.src.replace(/.*\//, '')}`
    }
  },

  watch: {
    visible (val) {
      this.playerVisible = this.visible

      if (val) {
        this.init()
      } else {
        this.destroyPlayer()
      }
    }
  }
}
</script>

<style lang="scss">
@import "./pop-player.scss";
</style>
