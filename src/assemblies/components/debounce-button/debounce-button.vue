<template>
  <a :class="[this.enable?'':this.disabledClass]" @click="handleClick"></a>
</template>

<script>
export default {
  name: 'tw-debounce-button',

  props: {
    wait: {
      type: Number,
      default: 1000
    },

    type: {
      type: String,
      default: 'timer'
    },

    maxWait: {
      type: Number,
      default: 6000
    },

    disabledClass: {
      type: String,
      default: 'disabled'
    },

    showMsg: {
      type: Boolean,
      default: false
    },

    msg: {
      type: String,
      default: '休息一下，:)'
    }
  },

  data () {
    return {
      enable: true
    }
  },

  methods: {
    handleClick () {
      if (!this.enable) {
        if (this.showMsg) {
          this.twMsg(this.msg)
        }

        return
      }

      if (this.type === 'timer') {
        if (this.enable) {
          this.enable = false
          this.$emit('click', this)

          setTimeout(() => {
            this.enable = true
          }, this.wait)
        }
      }

      if (this.type === 'api') {
        if (this.enable) {
          this.enable = false
          this.$emit('click', this)

          setTimeout(() => {
            this.enable = true
          }, this.maxWait)
        }
      }
    }
  }
}
</script>
