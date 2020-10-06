<template>
  <tw-modal class="xplayer"
    no-footer
    :visible.sync="playVisible">
    <template slot="header">{{modalTitle}}</template>
    <template slot="body">
      <tw-player
        ref="player"
        autoplay
        :type="mediaFormat"
        :src="src">
      </tw-player>
    </template>
  </tw-modal>
</template>

<script>
import extToFileType from '@utils/extToFileType.js'

export default {
  name: 'tw-pop-player',

  props: {
    src: {
      type: String,
      required: true
    },

    title: String,

    ext: String
  },

  data () {
    return {
      playVisible: false
    }
  },

  computed: {
    modalTitle () {
      return this.title || `播放-${this.src.replace(/.*\//, '')}`
    },

    mediaFormat () {
      return this.ext ? extToFileType(`*.${this.ext}`) : extToFileType(this.src)
    }
  },

  methods: {
    play () {
      this.playVisible = true
    }
  }
}
</script>

<style lang="scss">
@import "./pop-player.scss";
</style>
