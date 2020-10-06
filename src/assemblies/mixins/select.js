export default {
  props: {
    inputClass: {
      type: String
    }
  },
  data () {
    return {
      filterText: '',
      switchSelector: ''
    }
  },
  methods: {
    focusInput () {
      this.$refs.filter.select()
    },
    hidePane () {
      this.$refs.filter.blur()
    }
  },
  created () {
    this.switchSelector = 'js-tw-poppane-switch-select-' + this._uid
  },
  mounted () {
    this.$refs.filter.value = this.labelText ? this.labelText : this.value
  },
  watch: {
    value (v1) {
      this.$refs.filter.value = this.labelText ? this.labelText : v1
      this.filterText = ''
    }
  }
}
