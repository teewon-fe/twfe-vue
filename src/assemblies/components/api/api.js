import Api from '@plugins/apier/api.js'

export default {
  name: 'tw-api',

  props: {
    apis: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      doneNum: 0,
      apiList: []
    }
  },

  methods: {
    init () {
      this.apis.forEach((api) => {
        let item = {}

        if (api instanceof Api) {
          this.apiList.push(api)
          item.api = api
        } else {
          this.apiList.push(api.api)
        }

        if (item.autoSyncParams !== false) {
          item.api.syncParams(this)
        }

        if (item.autoSend !== false) {
          item.api.send(item.params).then(() => {
            this.doneNum++
          }).catch((err) => {
            this.$emit('err', item, err)
          })
        }
      })
    }
  },

  created () {
    this.init()
    this.$emit('created')
  },

  watch: {
    doneNum (val) {
      if (val === this.apis.length - 1) {
        this.$emit('done')
      }
    }
  },

  render () {
    return this.$scopedSlots.default(this.apiList)
  }
}
