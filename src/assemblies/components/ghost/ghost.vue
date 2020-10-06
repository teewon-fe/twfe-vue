<template>
  <div class="tw-ghost">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tw-ghost',

  props: {
    contract: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      firstElement: null,
      contractElement: null
    }
  },

  methods: {
    addToDom () {
      // like a ghost element
      // move the first child node to the contract element
      this.firstElement = this.$el.querySelector(':first-child')
      this.contractElement = document.querySelector(this.contract)

      if (this.contractElement && this.firstElement) this.contractElement.appendChild(this.firstElement)
    },

    removeFromDom () {
      if (this.firstElement) {
        this.$el.appendChild(this.firstElement)
      }
    }
  },

  mounted () {
    this.addToDom()
  },

  beforeDestroy () {
    // move the ghost element to its original element
    this.removeFromDom()
  }
}
</script>

<style lang="scss">
  @import "style"
</style>
