<template>
  <div class="tw-mviewer">
    <slot></slot>

    <tw-ghost
      v-if="mediaTypes.includes('video') && player.videoVisible"
      ref="ghost"
      :contract="asChildOf">
      <tw-pop-player
        ref="video"
        :autoplay="autoplay"
        :src="player.src"
        :title="player.fileName"
        :ext="player.ext"
        :visible.sync="player.videoVisible"
        @click.native="modalClickHandler">
      </tw-pop-player>
    </tw-ghost>

    <tw-ghost
      v-if="mediaTypes.includes('audio') && player.audioVisible"
      ref="ghost"
      :contract="asChildOf">
      <tw-pop-audio-player
        ref="audio"
        :autoplay="autoplay"
        :show-type="$app.appType==='web'?'mini':'normal'"
        :scroll-container="scrollContainer"
        :src="player.src"
        :title="player.fileName"
        :ext="player.ext"
        :visible.sync="player.audioVisible">
      </tw-pop-audio-player>
    </tw-ghost>

    <!-- web端图片预览 -->
    <tw-ghost
      v-if="$app.appType==='web' && previewer.visible"
      ref="ghost"
      :contract="asChildOf">
      <tw-previewer
        ref="previewer"
        :visible.sync="previewer.visible"
        :init-index="previewer.initIndex"
        :images="previewer.images"
        @click.native="modalClickHandler">
      </tw-previewer>
    </tw-ghost>

    <!-- 移动端图片预览 -->
    <van-popup
      v-if="$app.appType==='mobile'"
      class="xmedia"
      v-model="previewer.visible"
      :overlay="false"
      get-container="body">
      <van-image-preview
        v-if="previewer.visible"
        ref="previewer"
        class="xmedia"
        v-model="previewer.visible"
        :loop="false"
        :start-position="previewer.initIndex"
        :images="modileImages">
      </van-image-preview>
    </van-popup>
  </div>
</template>

<script>
import extToFileType from '@utils/extToFileType.js'
let activeMediaView = null

export default {
  name: 'tw-media-view',

  props: {
    autoplay: {
      type: Boolean,
      default: true
    },

    selector: {
      type: String,
      default: '[data-src]'
    },

    srcAttribute: {
      type: String,
      default: 'data-src'
    },

    extAttribute: {
      type: String,
      default: 'data-ext'
    },

    nameAttribute: {
      type: String,
      default: 'data-name'
    },

    stopModalClick: {
      type: Boolean,
      default: false
    },

    mediaTypes: {
      type: Array,
      default () {
        return ['video', 'audio']
      }
    },

    scrollContainer: {
      type: String,
      default: '.tw-body-inner'
    },

    asChildOf: {
      type: String,
      default: 'body'
    },

    stopPropagation: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      mediaType: '',

      previewer: {
        images: [],
        initIndex: 0,
        visible: false
      },

      player: {
        src: '',
        ext: '',
        fileName: '',
        videoVisible: false,
        audioVisible: false
      }
    }
  },

  computed: {
    modileImages () {
      return this.previewer.images.map(item => item.url)
    },

    mediaOpen () {
      return this.previewer.visible === true || this.player.videoVisible === true || this.player.audioVisible === true
    }
  },

  methods: {
    /**
    * 功能: 打开视频
    * @param {String} type image-图片 video-视频 audio-音频
    */
    openMedia (type) {
      if (type === 'image' && !this.previewer.visible) {
        this.player.videoVisible = false
        this.player.audioVisible = false
        this.previewer.visible = true
        this.$emit('open', type, this.previewer)
      } else if (type === 'video' && !this.player.videoVisible) {
        this.previewer.visible = false
        this.player.audioVisible = false
        this.player.videoVisible = true
        this.$emit('open', type, this.player)
      } else if (type === 'audio' && !this.player.audioVisible) {
        this.previewer.visible = false
        this.player.videoVisible = false
        this.player.audioVisible = true
        this.$emit('open', type, this.player)
      }
    },

    /**
    * 功能: 关闭所有媒体
    */
    closeAll () {
      this.previewer.visible = false
      this.player.videoVisible = false
      this.player.audioVisible = false
    },

    /**
    * 功能: 关闭当前激活的媒体
    */
    closeActiveMedia () {
      if (activeMediaView && activeMediaView !== this) {
        activeMediaView.closeAll()
      }
    },

    /**
    * 功能: 单击媒体对象操作
    */
    handleClick (event) {
      if (this.stopPropagation) {
        event.stopPropagation()
      }

      let currEl = event.target
      let src = ''

      while (currEl && currEl !== this.$el) {
        src = currEl.getAttribute(this.srcAttribute)

        if (src) {
          activeMediaView = this

          let ext = currEl.getAttribute(this.extAttribute)
          let fileName = currEl.getAttribute(this.nameAttribute)
          this.mediaType = extToFileType(ext || src)

          if (this.mediaType === 'image') {
            const allMedias = this.$el.querySelectorAll(this.selector)
            this.previewer.images = []

            allMedias.forEach((media, index) => {
              let mediaSrc = media.getAttribute(this.srcAttribute)
              let mediaExt = media.getAttribute(this.extAttribute)
              let mediaFormat = extToFileType(mediaExt || mediaSrc)

              if (mediaFormat === 'image') {
                this.previewer.images.push({
                  name: media.getAttribute(this.nameAttribute),
                  url: mediaSrc
                })

                if (media === currEl) {
                  this.previewer.initIndex = this.previewer.images.length - 1
                }
              }
            })

            this.openMedia('image')
          } else if (['video', 'audio'].includes(this.mediaType)) {
            this.closeActiveMedia()
            this.player.src = src
            this.player.ext = ext
            this.player.fileName = fileName

            if (this.mediaType === 'audio' && this.mediaTypes.includes('audio')) {
              this.openMedia('audio')
            } else {
              this.openMedia('video')
            }
          } else {
            this.$ui.downloadFile(src, currEl.getAttribute(this.nameAttribute))
            this.$emit('download', this.mediaType, src)
          }

          break
        } else {
          currEl = currEl.parentNode
        }
      }
    },

    /**
    * 功能: 绑定事件
    */
    init () {
      this.$el.addEventListener('click', this.handleClick)
    },

    /**
    * 功能: 从dom中移除弹窗元素
    */
    removeFromDom () {
      this.$refs.ghost.removeFromDom()
    },

    /**
    * 功能: 阻止弹窗的事件冒泡
    */
    modalClickHandler (event) {
      if (this.stopModalClick) {
        event.stopPropagation()
      }
    },

    /**
    * 功能: 有父辈media-view组件
    */
    hasParentMediaView () {
      let parent = this.$parent

      while (parent) {
        if (parent.$options.name === 'tw-media-view') {
          return true
        }

        parent = parent.$parent
      }

      return false
    }
  },

  mounted () {
    if (!this.hasParentMediaView()) {
      this.init()
    }
  },

  watch: {
    mediaOpen (val) {
      if (val) {
        document.body.classList.add('xmediaopen')
      } else {
        document.body.classList.remove('xmediaopen')
        this.$emit('close', this.mediaType, this.mediaType === 'image' ? this.previewer : this.player)
      }

      // fix van-image-preview index bug
      if (this.previewer.visible) {
        this.$nextTick(() => {
          this.$refs.previewer.active = this.previewer.initIndex
        })
      }
    }
  }
}
</script>

<style lang="scss">
  // stylelint-disable selector-class-pattern
  .van-popup.xmedia {
    z-index: 3001 !important;
    width: 100%;
    height: 100%;
  }
</style>
