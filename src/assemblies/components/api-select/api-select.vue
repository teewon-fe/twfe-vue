<template>
  <el-select v-model="val"
    :name="name"
    :autocomplete="autocomplete"
    :automaticDropdown="automaticDropdown"
    :size="size"
    :disabled="disabled"
    :clearable="clearable"
    :filterable="filterable"
    :allowCreate="allowCreate"
    :loading="loading"
    :popperClass="popperClass"
    :remote="remote"
    :loadingText="loadingText"
    :noMatchText="noMatchText"
    :noDataText="noDataText"
    :remoteMethod="remoteMethod"
    :filterMethod="filterMethod"
    :multiple="multiple"
    :multipleLimit="multipleLimit"
    :defaultFirstOption="defaultFirstOption"
    :reserveKeyword="reserveKeyword"
    :collapseTags="collapseTags"
    :popperAppendToBody="popperAppendToBody"
    :placeholder="placeholder"
    @change="change"
    @visible-change="visibleChange"
    @remove-tag="removeTag"
    @clear="clear"
    @blur="blur"
    @focus="focus">
    <el-option v-for="(item, index) in options"
      :key="index"
      :label="item[optionLabelKey]"
      :value="optionValueKey ? item[optionValueKey] : item">
    </el-option>
  </el-select>
</template>

<script>
import propChain from '../../utils/prop-chain'
import Api from '@plugins/apier/api'

export default {
  name: 'tw-api-select',

  props: {
    value: {
      required: true
    },

    api: {
      type: Object,
      required: true,
      validator (val) {
        return val instanceof Api
      }
    },

    params: {
      type: Object
    },

    list: Array,

    apiUid: String,

    listKey: {
      type: String,
      default: 'list'
    },

    optionValueKey: {
      type: String
    },

    optionLabelKey: {
      type: String,
      default: 'name'
    },

    optionDisableKey: {
      type: String,
      default: 'disabled'
    },

    autoSend: {
      type: Boolean,
      default: true
    },

    name: String,

    autocomplete: {
      type: String,
      default: 'off'
    },

    automaticDropdown: Boolean,

    size: String,

    disabled: Boolean,

    clearable: Boolean,

    filterable: Boolean,

    allowCreate: Boolean,

    loading: Boolean,

    popperClass: String,

    remote: Boolean,

    loadingText: String,

    noMatchText: String,

    noDataText: String,

    remoteMethod: Function,

    filterMethod: Function,

    multiple: Boolean,

    multipleLimit: {
      type: Number,
      default: 0
    },

    placeholder: {
      type: String,
      default: '请选择'
    },

    valueKey: {
      type: String,
      default: 'value'
    },

    defaultFirstOption: Boolean,

    reserveKeyword: Boolean,

    collapseTags: Boolean,

    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      val: undefined,
      data: null
    }
  },

  computed: {
    options () {
      return propChain.get(this.data, this.listKey) || []
    }
  },

  methods: {
    change (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },

    visibleChange (val) {
      this.$emit('visibleChange', val)
    },

    removeTag (val) {
      this.$emit('removeTag', val)
    },

    clear (val) {
      this.$emit('clear', val)
    },

    blur (val) {
      this.$emit('blur')
    },

    focus (val) {
      this.$emit('focus', val)
    },

    send () {
      this.$nextTick(() => {
        if (typeof this.params === 'object') {
          this.api.setParams(this.params)
        }

        this.api.send().catch(err => {
          this.$nextTick(() => {
            this.$emit('error', err)
          })
        })
      })
    }
  },

  created () {
    this.val = this.value
    this.data = this.api.data
    if (this.autoSend) {
      this.send()
    }
  },

  watch: {
    value (val) {
      this.val = val
    },

    options (val) {
      this.$emit('update:list', val)
      if (val.length > 0) {
        this.$emit('done', this.data, this.options)
      }
    }
  }
}
</script>
