<template>
  <ul class="tw-question-opts">
    <li class="tw-question-optitem"
      :style="{width: width}"
      v-for="(opt, index) in options"
      :key="opt.optionNo">
      <em class="tw-question-optitem-no">{{index|numToLetter}}.</em>
      <span class="tw-question-optitem-content" v-html="formatHtml(opt.content)"></span>
    </li>
  </ul>
</template>

<script>
import questonMixins from './question-mixins'

export default {
  name: 'tw-question-options',

  mixins: [questonMixins],

  props: {
    options: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      width: 'auto'
    }
  },

  methods: {
    /**
    * 功能: 计算选项布局
    */
    layout () {
      this.width = 'auto'

      this.$nextTick(() => {
        const optEls = this.$el.querySelectorAll('ul > li')
        const totalWidth = this.$el.getBoundingClientRect().width
        let maxWidth = 0

        optEls.forEach(el => {
          let width = el.getBoundingClientRect().width

          if (width > maxWidth) {
            maxWidth = width
          }
        })

        let cols = parseInt(totalWidth / maxWidth)

        if (cols < this.options.length) {
          while (cols !== 1) {
            if (this.options.length % cols === 0 || (this.options.length % cols >= cols / 2)) {
              break
            } else {
              cols--
            }
          }

          this.width = parseInt(1 / cols * 10000) / 100 + '%'
        }
      })
    }
  },

  mounted () {
    this.layout()
  }
}
</script>
