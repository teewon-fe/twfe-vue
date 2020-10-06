<template>
  <svg
    class="tw-svgcanvas"
    :width="svgWidth"
    :height="svgHeight"
    version="1.1"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg">
    <line
      class="tw-svgcanvas-line"
      :class="line.classList || []"
      v-for="(line,index) in lines"
      :key="index"
      :x1="line.start.x"
      :y1="line.start.y"
      :x2="line.end.x"
      :y2="line.end.y">
    </line>
  </svg>
</template>

<script>
export default {
  name: 'tw-svg-canvas',

  props: {
    // 总宽度
    width: {
      type: String,
      default: '300'
    },

    // 总高度
    height: {
      type: String,
      default: '300'
    },

    // 用元素设置svg的尺寸
    sizeFromElement: {
      type: [String, Element]
    },

    // 线-{start: {x:0, y:0}, end: {x:10, y:10}}
    lines: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      svgWidth: 0,
      svgHeight: 0
    }
  },

  computed: {
    // 尺寸元素
    sizeElement () {
      if (this.sizeFromElement instanceof Element) {
        return this.sizeFromElement
      } else if (typeof this.sizeFromElement === 'string') {
        return document.querySelector(this.sizeFromElement)
      } else {
        return null
      }
    }
  },

  methods: {
    init () {
      this.genSize()
    },

    /**
    * 功能: 生成尺寸
    */
    genSize () {
      if (this.sizeElement) {
        this.svgWidth = this.sizeElement.offsetWidth
        this.svgHeight = this.sizeElement.offsetHeight
      } else {
        this.svgWidth = this.width
        this.svgHeight = this.height
      }
    }
  },

  mounted () {
    this.init()
  },

  watch: {
    lines () {
      this.init()
    }
  }
}
</script>

<style lang="scss">
@import "./svg-canvas.scss";
</style>
