<template>
  <div class="tw-player" :class="{xaudio: type==='audio'}">
    <video v-if="autoplay" ref="player" controls autoplay class="video-js" playsinline></video>
    <video v-else ref="player" controls class="video-js" playsinline></video>

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

<script>
import player from './player-minxin'

export default {
  name: 'tw-player',
  mixins: [player]
}
</script>

<style lang="scss">
  @import "./player.scss";
</style>
