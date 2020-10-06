export default {
  props: {
    items: {
      type: Array
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: [String, Array, Object],
    valueKey: {
      type: String,
      default: 'value'
    },
    textKey: {
      type: String,
      default: 'text'
    },
    disabledKey: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      displayElement: null,
      selectedItem: [],
      labelVisible: true
    }
  },
  computed: {
    labelText () {
      if (this.multiple) {
        if (this.selectedItem.length === 0) {
          return this.placeholder
        } else if (this.selectedItem.length === 1) {
          return this.selectedItem[0][this.textKey]
        } else {
          return `已选择${this.selectedItem.length}项`
        }
      } else {
        return this.selectedItem[this.textKey]
      }
    }
  },
  methods: {
    getselectedItem (val) {
      if (this.multiple) {
        this.selectedItem = this.items.filter(element => val.indexOf(element[this.valueKey]) !== -1)
      } else {
        for (let i = 0; i < this.items.length; i++) {
          if (val === this.items[i][this.valueKey]) {
            this.selectedItem = this.items[i]
            break
          }
        }
      }
    },
    selectItem (item) {
      let result = this.value
      let itemVal = item[this.valueKey]

      if (this.multiple) {
        const itemIndexInResult = result.indexOf(itemVal)
        result = [...result]

        if (itemIndexInResult === -1) {
          result.push(itemVal)
        } else {
          result.splice(itemIndexInResult, 1)
        }

        this.getselectedItem(result)
      } else {
        if (result === itemVal) return
        result = itemVal
        this.selectedItem = item
      }

      this.$emit('input', result)
      this.$emit('change', result, this.selectedItem)
    }
  },
  created () {
    this.getselectedItem(this.value)
  }
}
