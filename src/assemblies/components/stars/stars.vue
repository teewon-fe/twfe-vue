<template>
  <div class="tw-stars">
    <i class="tw-stars-item"
       :class="{xoff: n > value, xreadonly: readOnly}"
       v-for="n in 5"
       @click="clickStar(n)"
       :key="n">
    </i>
  </div>
</template>

<script>
export default {
  name: 'tw-stars',

  props: {
    value: {
      type: Number,
      default: 0
    },

    readOnly: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    clickStar (n) {
      if (!this.readOnly) {
        this.$emit('input', n)
      }
    }
  }
}
</script>
