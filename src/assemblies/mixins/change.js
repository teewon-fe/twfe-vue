export default {
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },
    text: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    handleClick () {
      this.$emit('change', this.value)
    }
  }
}
