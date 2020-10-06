export default {
  name: 'tw-scope',

  props: {
    data: {
      type: [Object, Array],
      required: true
    }
  },

  render () {
    return this.$scopedSlots.default(this.data)
  }
}
