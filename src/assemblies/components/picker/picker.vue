<template>
  <div class="tw-picker">
    <div class="tw-picker-body" @click="openPicker">
      <div class="tw-picker-body-text" :class="{disabled: disabled}">{{textVal || placeholder}}</div>
      <div class="tw-picker-body-arrowbox"></div>
    </div>

    <mt-popup
      v-if="!disabled"
      :modal="false"
      :closeOnClickModal="false"
      v-model="visible"
      position="bottom"
      style="width: 100%;">
      <div class="tw-picker-tools">
        <div>
          <a class="text-link" @click="closePicker">取消</a>
        </div>
        <div class="tw-picker-tools-body"></div>
        <div>
          <a class="text-link" @click="confirmSelect">确定</a>
        </div>
      </div>
      <div v-if="showHeader"
        class="tw-picker-header">
        <h3>当前选择项: </h3>
        <p>{{realTimeTextVal}}</p>
      </div>
      <mt-picker ref="picker"
        :slots="slots"
        :value-key="textKey"
        :visibleItemCount="visibleItemCount"
        @change='handleChange'>
      </mt-picker>
    </mt-popup>

    <div v-if="visible"
      class="tw-picker-modal"
      @click="closePicker"
      @touchmove.prevent>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tw-picker',

  props: {
    value: [Number, String, Boolean],
    placeholder: {
      type: String,
      default: '请选择'
    },
    visibleItemCount: {
      type: Number,
      default: 5
    },
    options: {
      type: Array
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    disabledKey: {
      type: String,
      default: 'disabled'
    },
    disabledMsgKey: {
      type: String,
      default: 'disabledMsg'
    },
    textKey: {
      type: String,
      default: 'name'
    },
    showHeader: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      selectedValue: '',
      visible: false
    }
  },

  computed: {
    slots () {
      let firstItem = {}
      firstItem[this.textKey] = this.placeholder
      firstItem[this.valueKey] = ''

      let result = JSON.parse(JSON.stringify(this.options))

      if (result[0] && result[0][this.valueKey] !== '') {
        result.unshift(firstItem)
      }

      let index = 0

      for (let i = 0; i < result.length; i++) {
        if (result[i][this.valueKey] === this.value) {
          index = i
          break
        }
      }

      return [
        {
          flex: 1,
          defaultIndex: index,
          values: result
        }
      ]
    },

    textVal () {
      const result = this.options.filter(item => item[this.valueKey] === this.value)
      return result.length > 0 ? result[0][this.textKey] : ''
    },

    realTimeTextVal () {
      const result = this.options.filter(item => item[this.valueKey] === this.selectedValue)
      return result.length > 0 ? result[0][this.textKey] : ''
    }
  },

  methods: {
    /**
    * 功能: 处理picker值的改变
    * @param {Object} picker mt-picker的vue实例
    * @param {Array} values 选中的值列表
    */
    handleChange (picker, values) {
      if (this.options.length === 0) {
        return
      }

      const valObj = values[0]
      if (valObj) {
        if (valObj[this.disabledKey]) {
          this.toast(valObj[this.disabledMsgKey])
          return
        }

        this.selectedValue = valObj[this.valueKey]
      }
    },

    /**
    * 功能: 功能描述
    */
    preventBodyMove (e) {
      e.preventDefault()
    },

    /**
    * 功能: 打开picker
    */
    openPicker () {
      if (this.disabled) return

      this.visible = true
      let el = document.querySelector('.tw-body')
      if (el) el.addEventListener('touchmove', this.preventBodyMove)
    },

    /**
    * 功能: 功能描述
    */
    confirmSelect () {
      this.$emit('input', this.selectedValue)
      this.$emit('change', this.selectedValue)
      this.$emit('done', this.selectedValue)
      this.closePicker()
    },

    /**
    * 功能: 关闭picker
    */
    closePicker () {
      this.visible = false
      let el = document.querySelector('.tw-body')
      if (el) el.removeEventListener('touchmove', this.preventBodyMove)
    }
  }
}
</script>

<style lang="scss">
  @import "./picker.scss"
</style>
