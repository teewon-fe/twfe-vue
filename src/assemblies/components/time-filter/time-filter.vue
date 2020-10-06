<template>
  <div class="tw-timefilter">
    <div class="tw-tagfilter xmobile">
      <div class="tw-tagfilter-tags">
        <a class="tw-tag xfilter"
          :class="{xactive:value===item[keyMap.value]}"
          v-for="item in options"
          :key="item[keyMap.value]"
          @click="handleTagClick(item[keyMap.value])">
          <span>{{item[keyMap.text]}}</span>
        </a>

        <a v-if="customBtnVisible"
          class="tw-tag xfilter"
          :class="{xactive:pickerVisible}"
          @click="openCustomTime">
          <span>自定义</span>
        </a>
      </div>
    </div>

    <tw-datetime-range
      class="pb-tiny"
      v-if="pickerVisible"
      v-model="customVal"
      :type="customTimeType"
      @change="changeTime">
    </tw-datetime-range>
  </div>
</template>

<script>
export default {
  name: 'tw-time-filter',

  props: {
    // 控件值
    value: {
      type: String,
      required: true
    },

    // 时间过滤器选项
    options: {
      type: Array,
      required: true
    },

    // 键值映射
    keyMap: {
      type: Object,
      default () {
        return {
          text: 'name',
          value: 'id'
        }
      }
    },

    // 是否显示自定义按钮
    customBtnVisible: {
      type: Boolean,
      default: true
    },

    // 自定义时间控件类型: date-日期范围 time-时间范围 month-月份范围
    customTimeType: {
      type: String,
      default: 'date'
    }
  },

  data () {
    return {
      customVal: [],
      pickerVisible: false
    }
  },

  methods: {
    /**
    * 功能: 处理标签点击
    * @param {Type} name 参数描述
    * @param {String} value 点击标签的值
    */
    handleTagClick (value) {
      this.pickerVisible = false
      this.changeTime(value)
    },

    /**
    * 功能: 时间改变
    * @param {String} value 表示当前选中的值
    */
    changeTime (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },

    /**
    * 功能: 打开自定义弹窗
    */
    openCustomTime () {
      this.pickerVisible = true

      if (this.customVal.length === 2) {
        this.changeTime(this.customVal)
      }
    }
  }
}
</script>
