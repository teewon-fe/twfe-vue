<script>
import chartMixins from './chart-mixins.js'

export default {
  name: 'tw-chart',

  props: {
    // 图表类目轴
    categoryKey: String,

    // 图表的类目轴数据源: data中指定了多个数据源时可用
    categoryDataSourceKey: String
  },

  mixins: [chartMixins],

  methods: {
    /**
    * 功能: 功能描述
    * @param {Type} name 参数描述
    */
    /**
     * 功能: 将json格式的数据(data)按数据映射(dataMaps)指定的方式转换为echarts的数据格式
     */
    initData () {
      if (this.dataMaps.length === 0) return

      // 生成legendData数据
      let dataNameToLegend = false
      let legendData = []

      this.dataMaps.forEach((dm) => {
        if (dm.type === 'gauge') return

        if (dm.type === 'pie' || dm.type === 'radar') {
          let dataset = dm.dataset

          dataNameToLegend = true
          // pie图时，从图表的data数据中取lengend的数据值
          dataset.forEach((item) => {
            legendData.push({
              name: item[dm.dataNameKey]
            })
          })
        } else {
          // 非pie图时，从图表的serie中取lengend的数据值
          legendData.push({
            name: dm.name,
            icon: dm.legendIcon ? `image://${dm.legendIcon}` : 'rect'
          })
        }
      })

      // 类目轴数据集
      let categoryDataset = this.dataMaps[0].dataset

      // 配置图表属性
      this.dataOption = {
        legend: {
          show: dataNameToLegend || this.dataMaps.length > 1,
          data: legendData
        },

        series: this.dataMaps.map((serie) => {
          // 映射真实的数据集
          let dataset = serie.dataset

          // 只有当指定了dataKey时，才映射相关的数据值
          if (serie.dataKey) {
            // line与bar图表必须指定categoryKey
            if (!serie.dataset) throw TypeError(`[tw-chart]: Missing required prop: "dataset" in the current serie.`)

            serie.data = dataset.map((d, index) => {
              let dataItem = {}

              if (serie.dataKey instanceof Array) {
              // 当dataKey为一个数组时，说明其对应的data值也应该为一个数组, 主要用于散点图中(scatter)
                dataItem.value = serie.dataKey.map((key) => d[key])
              } else {
                dataItem.value = d[serie.dataKey]
              }

              if (serie.colors instanceof Array) {
              // 为同一系列的数据项指定不同的颜色
                dataItem.itemStyle = { color: serie.colors[index % serie.colors.length] }
              }

              if (serie.dataNameKey) {
              // 为数据项添加名称
                dataItem.name = d[serie.dataNameKey]
              }

              return dataItem
            })
          }

          // line与bar图表必须指定categoryKey
          if (['line', 'bar'].includes(serie.type) && !this.categoryKey) {
            throw TypeError(`[tw-chart]: Missing required prop: "categoryKey"`)
          }

          if (serie.isCategoryDataset) categoryDataset = dataset

          return serie
        })
      }

      // 设置类别轴数据
      if (this.categoryKey) {
        this.dataOption.yAxis = {}
        this.dataOption.xAxis = {}

        let categoryAxisData = categoryDataset.map((item) => item[this.categoryKey])

        if (this.option.yAxis && this.option.yAxis.type === 'category') {
          // y轴为类别轴
          this.dataOption.yAxis.data = categoryAxisData
        } else {
          // x轴为类别轴
          this.dataOption.xAxis.data = categoryAxisData
        }

        this.dataOption.tooltip = { trigger: 'axis' }
      } else {
        this.dataOption.tooltip = { trigger: 'item' }
      }

      this.initChart()
    }
  }
}
</script>
