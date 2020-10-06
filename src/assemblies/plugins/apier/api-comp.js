export default {
  props: {
    api: {
      type: String,
      required: true
    },

    apiUid: {
      type: String,
      default: 'default'
    },

    autoSend: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    data () {
      return this.$api[this.api][this.apiUid]['data']
    }
  },

  methods: {
    send (option) {
      this.$api[this.api].send(this.apiUid, option)
    },

    generate () {
      let api = this.$api[this.api]

      return {
        params: api[this.apiUid]['params'],
        data: api[this.apiUid]['data'],
        getters: api[this.apiUid]['getters'],
        send: this.send
      }
    }
  },

  created () {
    if (this.autoSend) {
      this.$api[this.api].send(this, this.apiUid)
    }

    this.$emit('created', this.generate())
  },

  watch: {
    data: {
      deep: true,
      handler () {
        this.$emit('dataChange', this.data)
      }
    }
  },

  render () {
    return this.$scopedSlots.default(this.generate())
  }
}
