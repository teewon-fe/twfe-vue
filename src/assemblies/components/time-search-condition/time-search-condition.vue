<template>
  <div style="display: flex; height: 30px;" class="children">
    <el-select
        v-model="periodType"
        placeholder="时间类型"
        @change="handlePeriodTypeChange"
        style="width: 100px;"
      >
        <el-option v-if="enabledTypes.indexOf('all') !== -1" label="全部" value="all"></el-option>
        <el-option v-if="enabledTypes.indexOf('currentday') !== -1" label="本日" value="1"></el-option>
        <el-option v-if="enabledTypes.indexOf('currentweek') !== -1" label="本周" value="2"></el-option>
        <el-option v-if="enabledTypes.indexOf('currentmonth') !== -1" label="本月" value="3"></el-option>
        <el-option v-if="enabledTypes.indexOf('currentsemester') !== -1" label="本学期" value="4"></el-option>
        <el-option v-if="enabledTypes.indexOf('currentyear') !== -1" label="本学年" value="5"></el-option>
        <el-option v-if="enabledTypes.indexOf('range') !== -1" label="自定义" value="6"></el-option>
      </el-select>
    <el-date-picker
      style="margin-left:5px;"
      v-if="periodType==='6'"
      v-model="currentPeriod"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'time-search-condition',
  props: {
    enabledTypes: {
      type: Array,
      default: () => ['all', 'currentday', 'currentweek', 'currentmonth', 'currentsemester', 'currentyear', 'day', 'week', 'month', 'semester', 'year', 'range']
    },
    defaultType: {
      type: String,
      default: () => 'all'
    },
    defaultPeriod: {
      type: [String, Number],
      default: null
    },
    semesterData: {
      type: Array
    }
  },
  data () {
    return {
      currentPeriod: this.defaultPeriod,
      periodType: this.defaultType
    }
  },
  watch: {
    currentPeriod () {
      if (this.currentPeriod !== null) {
        this.$emit('on-period-change', this.currentPeriod, this.periodType)
      }
    }
  },
  methods: {
    /**
     * 功能：类型切换时，置空后续选择的值.
     */
    handlePeriodTypeChange () {
      this.$emit('on-period-type-change', this.periodType)
      this.currentPeriod = null
    }
  }
}
</script>
