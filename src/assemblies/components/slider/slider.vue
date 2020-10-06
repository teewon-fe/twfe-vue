<template>
  <transition-group
    :tag = "tag"
    :name="name">
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  name: 'tw-slider',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      name: 'tw-slider'
    }
  },
  watch: {
    activeIndex (newValue, oldValue) {
      if (newValue < oldValue) {
        this.name = 'tw-sliderprev'
      } else {
        this.name = 'tw-slider'
      }
    }
  }
}
</script>
