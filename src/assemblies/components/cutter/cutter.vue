<template>
  <div class="tw-cutter"
       :class="{xoverflow: overflow, xmore: !collapsed}"
       :style="{height: overflow ? limitHeight + 'px' : 'auto'}">

       <slot></slot>

       <div v-if="overflow"
            class="tw-cutter-tool"
            @click="collapsed=!collapsed">
            <i v-if="ellipsisVisibal" class="tw-cutter-ellipsis">...</i>
            <slot name="btn">
              <a class="tw-cutter-btn">{{btnText}}</a>
            </slot>
       </div>
  </div>
</template>

<script>
export default {
  name: 'tw-cutter',

  props: {
    limitHeight: {
      type: Number,
      required: true
    },

    collapseText: {
      type: String,
      default: '展开'
    },

    extendText: {
      type: String,
      default: '收起'
    },

    ellipsisVisibal: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      overflow: false,
      collapsed: false,
      currentHeight: ''
    }
  },

  computed: {
    btnText () {
      if (this.collapsed) {
        return this.collapseText
      } else {
        return this.extendText
      }
    }
  },

  methods: {
    init () {
      const cutterHeight = this.$el.offsetHeight

      if (cutterHeight > this.limitHeight) {
        this.overflow = true
        this.collapsed = true
      }
    }
  },

  mounted () {
    this.currentHeight = this.$el.offsetHeight
    this.init()
  },

  updated () {
    if (this.$el.offsetHeight > this.currentHeight && !this.collapsed) {
      this.currentHeight = this.$el.offsetHeight
      this.init()
    }
  }
}
</script>
