<template>
  <div class="tw-dtrange">
    <!-- 标签：开始时间 -->
    <label
      class="tw-dtrange-label"
      @click="start.visible = true">
      <slot :start-time="startTime">
        <span>{{value[0] || placeholder[0]}}</span>
      </slot>
    </label>

    <span class="tw-dtrange-line"></span>

    <!-- 标签：结束时间 -->
    <label
      class="tw-dtrange-label"
      @click="end.visible = true">
      <slot :end-time="endTime">
        <span>{{value[1] || placeholder[1]}}</span>
      </slot>
    </label>

    <!-- 弹出层：开始时间 -->
    <van-popup
      v-model="start.visible"
      position="bottom">
      <h6 class="tw-dtrange-title">{{placeholder[0]}}</h6>
      <van-datetime-picker
        v-model="start.pickerValue"
        @confirm="confrimTime"
        @cancel="start.visible=false"
        :type="type" />
    </van-popup>

    <!-- 弹出层：结束时间 -->
    <van-popup
      v-model="end.visible"
      position="bottom">
      <h6 class="tw-dtrange-title">{{placeholder[1]}}</h6>
      <van-datetime-picker
        v-model="end.pickerValue"
        @confirm="confrimTime"
        @cancel="end.visible = false"
        :type="type" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'tw-datetime-range',

  props: {
    // 组件值
    value: {
      type: Array,
      required: true
    },

    // 组件类型：date-日期范围 time-时间范围 month-月份范围
    type: {
      type: String,
      default: 'date'
    },

    // 占位文本：除在没有值的时候显示，还会显示在弹出层的顶部用做弹出层标题
    placeholder: {
      type: Array,
      default () {
        return ['开始时间', '结束时间']
      }
    }
  },

  data () {
    return {
      start: {
        visible: false,
        pickerValue: ''
      },

      end: {
        visible: false,
        pickerValue: ''
      }
    }
  },

  computed: {
    startTime () {
      return this.formatTime(this.start.pickerValue)
    },

    endTime () {
      return this.formatTime(this.end.pickerValue)
    }
  },

  methods: {
    /**
    * 功能: 格式化时间
    * @param {Date} timeVal 要格式化的值
    */
    formatTime (timeVal) {
      if (this.type === 'date') {
        return this.$ui.dateFormat(timeVal, 'yyyy-mm-dd')
      } else if (this.type === 'year-month') {
        return this.$ui.dateFormat(timeVal, 'yyyy-mm')
      } else if (this.type === 'time') {
        return timeVal
      }
    },

    /**
    * 功能: 确定时间
    */
    confrimTime () {
      if (this.start.pickerValue > this.end.pickerValue) {
        this.$ui.msg('开始时间不能大于结束时间')
      } else {
        this.start.visible = false
        this.end.visible = false
        this.changeTime()
      }
    },

    /**
    * 功能: 改变时间
    */
    changeTime () {
      if (this.startTime !== this.value[0] || this.endTime !== this.value[1]) {
        this.$emit('input', [this.startTime, this.endTime])
        this.$emit('change', [this.startTime, this.endTime])
      }
    }
  },

  created () {
    if (this.value[0]) {
      if (this.type === 'time') {
        this.start.pickerValue = this.value[0]
      } else {
        this.start.pickerValue = new Date(this.value[0].replace('-', '/'))
      }
    } else {
      if (this.type === 'time') {
        this.start.pickerValue = '12:00'
      } else {
        this.start.pickerValue = new Date()
      }
    }

    if (this.value[1]) {
      if (this.type === 'time') {
        this.end.pickerValue = this.value[1]
      } else {
        this.end.pickerValue = new Date(this.value[1].replace('-', '/'))
      }
    } else {
      if (this.type === 'time') {
        this.end.pickerValue = '12:00'
      } else {
        this.end.pickerValue = new Date()
      }
    }

    this.changeTime()
  }
}
</script>

<style lang="scss">
  @import "./datetime-range.scss";
</style>
