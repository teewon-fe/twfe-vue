<template>
  <div class="tw-question-joinline"
    :class="{'m-0': options.length === 0}">
    <table class="tw-question-joinline-table">
      <tr v-for="(row,rowIndex) in options"
        :key="rowIndex">
        <td v-for="(item,colIndex) in row"
          :key="rowIndex+'-'+colIndex"
          :class="genJoinItemClass(item)"
          @click="selectJoinCell(item,rowIndex,colIndex,$event)">
          <template v-if="item">
            <div class="tw-question-optitem-content"
              v-html="formatHtml(item.content)">
            </div>
            <i :ref="`${item.value}Left`"
              class="tw-question-joinline-point xleft"></i>
            <i :ref="`${item.value}Right`"
              class="tw-question-joinline-point xright"></i>
          </template>
        </td>
      </tr>
    </table>
    <tw-svg-canvas :lines="lines"
      :size-from-element="$el">
    </tw-svg-canvas>
    <div v-if="viewType==='answer'"
      class="tw-question-joinline-tools">
      <span>双击选项清除连线，或</span>
      <a class="text-link"
        @click="setValue([])">清空所有连线</a>
    </div>
  </div>
</template>

<script>
import formatHtml from './format-html'

export default {
  name: 'tw-join-line-question',

  props: {
    // 连线题答案
    value: {
      type: Array
    },

    // 与question组件相同，可以看做是继承关系
    viewType: {
      type: String,
      default: 'normal'
    },

    // 试题数据
    question: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      options: [],
      lines: [],
      activeItem: null
    }
  },

  methods: {
    formatHtml,

    /**
    * 功能: 初始化连线题内容
    */
    init () {
      let colNum = 0
      let options = []

      this.question.options.forEach(item => {
        let colIndex = item.colNo.charCodeAt() - 65

        if (!options[item.optionNo]) {
          options[item.optionNo] = []
        }

        options[item.optionNo][colIndex] = {
          value: item.colNo + item.optionNo,
          content: item.content
        }

        if (options[item.optionNo].length > colNum) {
          colNum = options[item.optionNo].length
        }
      })

      options.forEach(row => {
        row.length = colNum
      })

      this.options = options
      this.joinLine()
      window.addEventListener('resize', this.joinLine)
    },

    /**
    * 功能: 生成连线项的class
    * @param {String} item 每个连线项
    */
    genJoinItemClass (item) {
      let result = []

      if (item) {
        if (['answer', 'view-answer'].includes(this.viewType)) {
          let rightRegExp = new RegExp(`^${item.value}-`)
          let leftRegExp = new RegExp(`-${item.value}$`)

          this.value.forEach(val => {
            if (leftRegExp.test(val)) {
              result.push('xlactive')
            }

            if (rightRegExp.test(val)) {
              result.push('xractive')
            }
          })

          if (this.activeItem === item) {
            result.push('xactive')
          }
        }
      } else {
        result.push('xnocontent')
      }

      return result
    },

    /**
    * 功能: 添加值，连接项无需分顺序
    * @param {Object} item1 连接项1
    * @param {Object} item2 连接项2
    * @return {Boolean} true-添加成功 false-不能或不需要添加
    */
    addValue (item1, item2) {
      let valArr = [item1.value, item2.value].sort()
      let exp = /^[A-Z]/
      let colArr = [valArr[0].match(exp)[0], valArr[1].match(exp)[0]]

      // 邻近列选项才可以连接
      if (colArr[0].charCodeAt() + 1 === colArr[1].charCodeAt()) {
        let lineValue = `${valArr[0]}-${valArr[1]}`

        if (this.value.includes(lineValue)) {
          return false
        } else {
          let result = JSON.parse(JSON.stringify(this.value))
          result.push(lineValue)
          result.sort()
          this.setValue(result)
          return true
        }
      } else {
        return false
      }
    },

    /**
    * 功能: 设置值
    * @param {Array} result 要设置的值
    */
    setValue (result) {
      this.$emit('input', result)
      this.$emit('change', result)
      this.joinLine()
    },

    /**
    * 功能: 选中连线题单元格
    * @param {Number} item 选中项
    * @param {Number} rowIndex 行索引
    * @param {Number} colIndex 列索引
    * @param {Object} event 事件对象
    */
    selectJoinCell (item, rowIndex, colIndex, event) {
      if (this.viewType === 'answer') {
        if (item) {
          if (this.activeItem) {
            if (this.addValue(this.activeItem, item)) {
              this.activeItem = null
            } else {
              if (this.activeItem === item) {
                this.removeJoinLine(item)
              } else {
                this.activeItem = item
              }
            }
          } else {
            this.activeItem = item
          }
        }
      }
    },

    /**
    * 功能: 删除连线
    * @param {Number} item 需清除的项
    */
    removeJoinLine (item) {
      let result = this.value.filter(val => !(val.includes(item.value + '-') || val.includes('-' + item.value)))
      this.setValue(result)
      this.activeItem = null
    },

    /**
    * 功能: 画线
    */
    joinLine () {
      let vm = this

      this.$nextTick(() => {
        this.lines = []
        this.value.forEach(val => {
          const [leftVal, rightVal] = val.split('-')
          const startPoint = vm.$refs[`${leftVal}Right`][0]
          const endPoint = vm.$refs[`${rightVal}Left`][0]
          const startOffset = vm.$ui.el.position(startPoint.offsetParent)
          const endOffset = vm.$ui.el.position(endPoint.offsetParent)
          const startCenter = vm.$ui.el.positionCenter(startPoint)
          const endCenter = vm.$ui.el.positionCenter(endPoint)

          let classList = []

          if (['answer', 'view-answer'].includes(this.viewType)) {
            classList = ['xselected']
          } else if (['correct', 'view-result'].includes(this.viewType)) {
            if (this.question.standardAnswers[0].value.split(',').includes(val)) {
              classList = ['xright']
            } else {
              classList = ['xwrong']
            }
          }

          vm.lines.push({
            start: {
              x: startOffset.left + startCenter.x + 1,
              y: startOffset.top + startCenter.y + 1
            },
            end: {
              x: endOffset.left + endCenter.x + 1,
              y: endOffset.top + endCenter.y + 1
            },
            classList
          })
        })
      })
    }
  },

  mounted () {
    this.init()
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.joinLine)
  },

  watch: {
    'question.id' () {
      this.init()
    }
  }
}
</script>
