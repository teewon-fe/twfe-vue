<template>
  <div class="tw-popselect">
    <div class="tw-popselect-value" @click.stop="show">
      <template v-if="selectedTags.length>0">
        <template v-if="multiple">
          <span v-if="displayType==='text'">{{`${tags.join('，')}${selectedTags.length>displayLimit?'等共'+selectedTags.length+unitText:''}`}}</span>
          <span v-else
            class="tw-tag xselect"
            v-for="(tag,index) in tags"
            :key="tag">
            <span>{{tag}}</span>
            <i v-if="index===tags.length-1 && selectedTags.length>displayLimit">+{{selectedTags.length-displayLimit}}</i>
          </span>
        </template>
        <span v-else>{{selectedTags}}</span>
      </template>
      <span v-else>{{placeholder}}</span>
    </div>
    <mt-popup
      class="tw-popselect-main"
      v-model="visible"
      position="bottom"
      @close="cancel">
      <div class="tw-popselect-toolbar">
        <div class="tw-popselect-toolbar-left" @click.stop="cancel">取消</div>
        <div class="tw-popselect-toolbar-title">{{title}}</div>
        <div class="tw-popselect-toolbar-right" @click.stop="confirm">确定</div>
      </div>

      <div v-if="opts.length>0"
        class="tw-popselect-body">
        <mt-checklist
          v-if="multiple"
          v-model="val"
          align="right"
          :options="opts">
        </mt-checklist>

        <mt-radio
          v-else
          v-model="val"
          align="right"
          :options="opts">
        </mt-radio>
      </div>

      <div v-else class="p-medium text-weaking text-center">暂无数据...</div>
    </mt-popup>
  </div>
</template>

<script>
import arrIsEqual from '../../utils/arrIsEqual'

export default {
  name: 'tw-popup-select',

  props: {
    value: {
      required: true
    },

    title: {
      type: String,
      default: '请选择'
    },

    placeholder: {
      type: String,
      default: '请选择'
    },

    options: {
      type: Array,
      default () {
        return []
      }
    },

    valueKey: {
      type: String,
      default: 'id'
    },

    labelKey: {
      type: String,
      default: 'name'
    },

    multiple: {
      type: Boolean,
      default: false
    },

    switch: {
      type: [String, Object]
    },

    selection: {
      type: [Object, Array]
    },

    displayType: {
      type: String,
      default: 'text'
    },

    displayLimit: {
      type: Number,
      default: 1
    },

    selectedLabel: {
      type: [String, Array]
    },

    unitText: {
      type: String,
      default: '项'
    }
  },

  data () {
    return {
      val: '',
      visible: false
    }
  },

  computed: {
    opts () {
      return this.options.map(item => ({
        label: item[this.labelKey],
        value: item[this.valueKey],
        disabled: false
      }))
    },

    selectedItems () {
      if (this.multiple) {
        return this.options.filter(item => this.val.includes(item[this.valueKey]))
      } else {
        return this.options.filter(item => item[this.valueKey] === this.val)
      }
    },

    selectedTags () {
      if (this.multiple) {
        return this.selectedItems.map(item => item[this.labelKey])
      } else {
        return this.selectedItems[0] ? this.selectedItems[0][this.labelKey] : ''
      }
    },

    tags () {
      if (this.multiple) {
        return this.selectedTags.slice(0, this.displayLimit)
      } else {
        return []
      }
    }
  },

  methods: {
    initSwitch () {
      let el = null

      if (typeof this.switch === 'string') {
        el = document.querySelector(this.switch)
      }

      if (el instanceof Element) {
        el.addEventListener('click', this.show)
      } else {
        throw new Error('The switch is not a element.')
      }
    },

    show () {
      this.visible = true
    },

    close () {
      this.visible = false
    },

    cancel () {
      if (this.multiple) {
        this.val = Array.from(this.value)
      } else {
        this.val = this.value
      }

      this.close()
      this.syncSelection()
    },

    confirm () {
      this.close()

      if (this.multiple) {
        if (arrIsEqual(this.val, this.value)) return
      } else {
        if (this.val === this.value) return
      }

      this.$emit('input', this.val)
      this.syncSelection()
      this.$emit('change', this.val, this.selectedTags, this.selectedItems)
    },

    syncSelection () {
      this.$emit('update:selection', this.selectedItems)
      this.$emit('update:selectedLabel', this.selectedTags)
    }
  },

  created () {
    if (this.multiple) {
      if (!Array.isArray(this.value)) {
        throw Error(`Except an Array, but got a ${typeof this.value}`)
      }

      this.val = Array.from(this.value)
    } else {
      this.val = this.value
    }

    this.syncSelection()
  },

  mounted () {
    if (this.switch) {
      this.initSwitch()
    }
  },

  watch: {
    value (newVal) {
      if (this.multiple) {
        if (arrIsEqual(this.val, newVal)) return
      } else {
        if (this.val === newVal) return
      }

      this.val = newVal
      this.syncSelection()
    }
  }
}
</script>

<style lang="scss">
  @import "./popup-select.scss";
</style>
