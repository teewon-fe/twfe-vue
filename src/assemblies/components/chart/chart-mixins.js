/** ------------------------------------------------------------
 * 所有图表的mixins,当前只在chart.vue中引用，
 * 但为以后扩展特殊类图表方便， 不合并此mixins到chart.vue中
------------------------------------------------------------ */
import screenIs from '@utils/screen-size.js'
let config = window.$app

const echarts = require('echarts')
const medias = config.medias ? config.medias : ['default']

// 注册echarts主题
medias.forEach((media) => {
  const c = config
  const themeJSON = require(`./theme/${c.chartTheme}/${media}.json`)
  echarts.registerTheme(`${config.chartTheme}-${media}`, themeJSON)
})

export default {
  // 模板
  template: `<div class="tw-chart" :style="{width: width ? width : '100%', height: height}"></div>`,

  props: {
    // 图表的宽度
    width: String,

    // 图表的高度
    height: {
      type: String,
      default: '300px'
    },

    // 与echarts中的series相同，但增加了必要的数据映射属性
    dataMaps: {
      type: Array,
      required: true
    },

    // echarts定义的options
    option: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      dataOption: {},

      chart: null
    }
  },

  computed: {
    datasetCount () {
      let result = 0
      this.dataMaps.forEach(item => {
        result += item.dataset ? item.dataset.length : 0
      })

      return result
    }
  },

  methods: {
    /**
     * 功能: 初始化图表
     */
    initChart () {
      const vm = this
      // 初始化echarts实例
      vm.$nextTick(() => {
        if (!vm.chart) {
          vm.chart = echarts.init(vm.$el, config.medias ? `${config.chartTheme}-${screenIs()}` : `${config.chartTheme}-default`)
        }

        const options = echarts.util.merge(echarts.util.merge({}, vm.option), vm.dataOption)
        vm.chart.setOption(options, true)
      })
    },

    /**
     * 功能: 重新调整图表的大小
     */
    resizeChart () {
      if (this.chart) {
        this.chart.resize()
      }
    }
  },

  mounted () {
    this.initData()
    window.addEventListener('resize', this.resizeChart)
  },

  destroyed () {
    window.removeEventListener('resize', this.resizeChart)
  },

  watch: {
    dataMaps: {
      handler: function () {
        this.initData()
      },
      deep: true
    },

    options (val) {
      if (this.chart) {
        this.chart.setOption(val)
      }
    }
  }
}
