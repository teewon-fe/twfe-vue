<template>
  <div v-if="visible" class="tw-previewer">
    <div ref="swiper"
      class="tw-previewer-body swiper-container"
      @wheel="scaleImage">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(img,index) in images" :key="index">
          <div class="tw-previewer-imgbox"
            :class="{xlimitsize:limitSize}"
            @mousedown.stop="handleImageMousedown(index, $event)" >
            <div class="tw-previewer-dragbox"
              :style="{transform:`translate(${translates[index].x}px, ${translates[index].y}px)`}">
              <img :src="/^blob:/.test(img[urlKey]) ? img[urlKey]:`${img[urlKey]}${query}`"
                :style="{transform:`rotate(${degs[index]}deg) scale(${scales[index]})`}" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tw-previewer-tools">
      <a class="tw-previewer-close" title="关闭" @click="close"><i class="tw-ico xipvclose"></i></a>
      <a class="tw-previewer-rotate" title="旋转" @click="degs.splice(currentIndex, 1, degs[currentIndex]+90)"><i class="tw-ico xipvrotate"></i></a>
      <a class="tw-previewer-zoomup" title="放大" @click="scales.splice(currentIndex, 1, scales[currentIndex]+0.1)"><i class="tw-ico xipvzoomup"></i></a>
      <a class="tw-previewer-zoomdown" title="缩小" @click="scales[currentIndex] < 0.3 || scales.splice(currentIndex, 1, scales[currentIndex]-0.1)"><i class="tw-ico xipvzoomdown"></i></a>
    </div>

    <div>
      <a class="tw-previewer-prev" @click="swiper.slidePrev()"><i class="tw-ico xipvprev"></i></a>
      <a class="tw-previewer-next" @click="swiper.slideNext()"><i class="tw-ico xipvnext"></i></a>
    </div>

    <div class="tw-previewer-title">{{images[currentIndex][nameKey]||`图片-${currentIndex+1}`}}</div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import Swiper from 'swiper/dist/js/swiper.js'

export default {
  name: 'tw-previewer',

  props: {
    images: {
      type: Array,
      required: true
    },

    query: {
      type: String,
      default: ''
    },

    initIndex: {
      type: Number,
      default: 0
    },

    nameKey: {
      type: String,
      default: 'name'
    },

    urlKey: {
      type: String,
      default: 'url'
    },

    visible: {
      type: Boolean,
      default: false
    },

    limitSize: {
      type: Boolean,
      default: false
    },

    imageMovable: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      swiper: null,
      currentIndex: 0,
      currentImage: null,
      startX: 0,
      startY: 0,
      degs: [],
      scales: [],
      translates: []
    }
  },

  methods: {
    /**
    * 功能: 初始化swiper
    */
    initSwiper () {
      window.pv = this
      const vm = this

      if (!this.visible) return

      this.$nextTick(() => {
        if (this.swiper) {
          this.swiper.destroy()
        }

        this.currentIndex = this.initIndex

        this.swiper = new Swiper(this.$refs.swiper, {
          allowTouchMove: false,
          initialSlide: this.initIndex,
          touchStartPreventDefault: false,
          onSlideChangeEnd (swiper) {
            vm.currentIndex = swiper.activeIndex
          }
        })
      })
    },

    /**
    * 功能: 缩放图片
    */
    scaleImage (event) {
      if (event.deltaY < 0) {
        this.scales.splice(this.currentIndex, 1, this.scales[this.currentIndex] + 0.1)
      } else {
        this.scales[this.currentIndex] < 0.3 || this.scales.splice(this.currentIndex, 1, this.scales[this.currentIndex] - 0.1)
      }
    },

    /**
    * 功能: 处理拖动图片
    * @param {Number} index 图片的索引
    * @param {Object} event 事件对象
    */
    handleImageMousedown (index, event) {
      event.preventDefault()

      const vm = this
      let x = event.pageX
      let y = event.pageY
      let originalX = vm.translates[index].x
      let originalY = vm.translates[index].y

      const moveImage = function (event) {
        event.stopPropagation()

        vm.translates.splice(index, 1, {
          x: originalX + event.pageX - x,
          y: originalY + event.pageY - y
        })
      }

      const removeEvent = function (event) {
        document.removeEventListener('mousemove', moveImage)
        document.removeEventListener('mouseup', removeEvent)
      }

      if (this.imageMovable) {
        document.addEventListener('mousemove', moveImage)
        document.addEventListener('mouseup', removeEvent)
      }
    },

    /**
    * 功能: 关闭
    */
    close () {
      document.body.classList.remove('xpreviewer')
      this.$emit('update:visible', false)
      this.$emit('close', false)
    }
  },

  watch: {
    visible: {
      immediate: true,
      handler (val) {
        if (val) {
          document.body.classList.add('xpreviewer')
        } else {
          document.body.classList.remove('xpreviewer')
        }

        this.$nextTick(() => {
          this.initSwiper()
        })
      }
    },

    images: {
      immediate: true,
      handler (imgs) {
        this.degs = new Array(imgs.length).fill(0)
        this.scales = new Array(imgs.length).fill(1)
        this.translates = new Array(imgs.length).fill({ x: 0, y: 0 })
      }
    }
  },

  destroyed () {
    if (this.swiper) {
      this.swiper.destroy()
    }
  }
}
</script>

<style lang="scss">
@import "previewer.scss"
</style>
