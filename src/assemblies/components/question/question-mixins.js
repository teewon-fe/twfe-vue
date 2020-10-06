import extToFileType from '@utils/extToFileType.js'
import formatHtml from './format-html'

export default {
  props: {
    // 作答时学生填写的答案
    // 注意，为了统一逻辑，所有题型的答案都是一个数组
    value: {
      type: Array,
      default () {
        return []
      }
    },

    // 视图模式 normal-普通
    // answer-学生做答模式 view-answer-查看做答(无标准答案，不显示对错，仅查看作答的内容)
    // correct-批改 view-result(有标准答案，显示对错)
    viewType: {
      type: String,
      default: 'normal'
    },

    // 试题数据
    data: {
      type: Object,
      required: true
    },

    // 是否显示标题
    titleVisible: {
      type: Boolean,
      default: true
    },

    // 是否显示选项或填空
    optionOrBlanksVisible: {
      type: Boolean,
      default: true
    },

    // 题号
    questionNo: String,

    // 附件区是否可见
    attachmentsVisible: {
      type: Boolean,
      default: true
    },

    // 答题区是否可见
    answerAreaVisible: {
      type: Boolean,
      default: true
    },

    // 解析初始化时是否可见
    initAnalysisVisibel: {
      type: Boolean,
      default: false
    },

    // 不渲染试题解析
    noAnalysis: {
      type: Boolean,
      default: false
    },

    // 是否显示工具栏
    toolbarVisible: {
      type: Boolean,
      default: false
    },

    // 是否选中
    selected: {
      type: Boolean,
      default: undefined
    },

    // 填空题【空值】点位符
    blankPlaceholder: {
      type: String,
      default: '#BLANK#'
    },

    // 展开时解析按钮名称
    extendedAnalysisLabel: {
      type: String,
      default: '收起'
    },

    // 收起时解析按钮名称
    collapsedAnalysisLabel: {
      type: String,
      default: '解析'
    },

    // 扫描作业
    answerFromScan: {
      type: Boolean,
      default: false
    },

    // 是否为班级模式
    isClass: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      question: null,
      analysisVisible: false,
      blankNums: 0,
      correcting: false,
      optWidth: 'auto',
      answerWidth: 'auto',
      correctData: [],
      blankScores: []
    }
  },

  computed: {
    // 试题id
    qid () {
      return this.data ? (this.data.childId || this.data.id) : ''
    },

    // 可选择的
    selectable () {
      return typeof this.selected !== 'undefined'
    },

    // 为选选类题型: 单选、多选、判断
    isChoiceQuestion () {
      return this.$cnt.QUESTION_IS_CHOICE_TYPES.includes(this.question.type)
    },

    // 文本类题型: 填空、简答、选填
    isTextQuestion () {
      return this.$cnt.QUESTION_IS_TEXT_TYPES.includes(this.question.type)
    },

    // 填空类题型: 填空、选填
    isBlankQuestion () {
      return this.$cnt.QUESTION_IS_BLANK_TYPES.includes(this.question.type)
    },

    // 做答答案类型：作答时学生填写的答案应该为什么类型
    valueType () {
      if ([this.$cnt.QUESTION_TYPE_MULTIPLE_CHOICE, this.$cnt.QUESTION_TYPE_BLANK, this.$cnt.QUESTION_TYPE_LINE].includes(this.question.type)) {
        // 多选，填空题，连线题答案为数组
        return 'multiple'
      } else {
        // 单选题，判断题，简答题答案为字符串
        // [this.$cnt.QUESTION_TYPE_SINGLE_CHOICE, this.$cnt.QUESTION_TYPE_JUDGEMENT, this.$cnt.QUESTION_TYPE_SHORT_ANSWER]
        return 'single'
      }
    },

    // 统计项标签的长度：主观题5个字符，客观题3个字符
    statisticLabelWidth () {
      let arr = JSON.parse(JSON.stringify(this.$cnt.QUESTION_IS_SUBJECTIVE_TYPES))
      arr.push(this.$cnt.QUESTION_TYPE_LINE)

      if (arr.includes(this.question.type)) {
        return '6em'
      } else {
        return '3em'
      }
    },

    // 单选题，判断题 ，多选题 统计项标签的长度
    dtstatisticLabelWidth () {
      let arr = JSON.parse(JSON.stringify(this.$cnt.ODD_MUCH_JUDGE_TYPES))
      arr.push(this.$cnt.QUESTION_TYPE_LINE)

      if (arr.includes(this.question.type)) {
        return '5em'
      } else {
        return '4em'
      }
    },

    // 统计项标签的长度：主观题45%的视宽度，客观题55%
    statisticProgresslWidth () {
      let arr = JSON.parse(JSON.stringify(this.$cnt.QUESTION_IS_SUBJECTIVE_TYPES))
      arr.push(this.$cnt.QUESTION_TYPE_LINE)

      if (arr.includes(this.question.type)) {
        return '45%'
      } else {
        return '55%'
      }
    }
  },

  methods: {
    formatHtml,

    /**
    * 功能: 初始化试题
    */
    init () {
      this.analysisVisible = this.initAnalysisVisibel
      this.correcting = false
      this.question = this.data ? this.$ui.cloneJson(this.data) : null

      if (this.question.options) {
        this.question.options.sort((a, b) => a.optionNo > b.optionNo ? 1 : -1)
      }

      if (this.question.standardAnswers) {
        this.question.standardAnswers.sort((a, b) => a.no > b.no ? 1 : -1)
      }

      if (this.question) {
        if (this.isChoiceQuestion) {
          this.initChoice()
        }

        if (this.isTextQuestion) {
          this.initTextQuestion()
        }
      }

      if (this.$refs.nativeUploader) {
        this.$refs.nativeUploader.closeMedia()
      }

      // 扫描连线题要显示批改按钮
      if (this.answerFromScan) {
        if (this.question.type === this.$cnt.QUESTION_TYPE_LINE) {
          if (this.$app.appType === 'mobile' && this.viewType === 'correct') {
            // 给未做答的题默认设为0分
            this.blankScores = [parseInt(this.question.score)]
            this.correctData = typeof this.value[0] !== 'undefined'
              ? [!this.question.answerResults || !this.question.answerResults[0] || typeof this.question.answerResults[0].score === 'undefined' ? '' : parseFloat(this.question.answerResults[0].score)]
              : [0]
          }
        }
      }
    },

    /**
    * 功能: 计算元素的布局
    * @param {String} refName 元素的ref名称
    * @param {String} widthName 宽度数据对象的名称
    */
    layout (refName, widthName) {
      this[widthName] = 'auto'

      this.$nextTick(() => {
        let container = this.$refs[refName]

        if (container) {
          const optEls = container.querySelectorAll('ul > li')
          const totalWidth = container.getBoundingClientRect().width
          let maxWidth = 0

          optEls.forEach(el => {
            let width = el.getBoundingClientRect().width

            if (width > maxWidth) {
              maxWidth = width
            }
          })

          let cols = parseInt(totalWidth / maxWidth)

          if (cols < optEls.length) {
            while (cols !== 1) {
              if (optEls.length % cols === 0 || (optEls.length % cols >= cols / 2)) {
                break
              } else {
                cols--
              }
            }

            this[widthName] = parseInt(1 / cols * 10000) / 100 + '%'
          }
        }
      })
    },

    /**
    * 功能: 初始化选择类试题
    */
    initChoice () {
      if (this.$app.appType === 'web') {
        this.layout('options', 'optWidth')
      }
    },

    /**
    * 功能: 初始化文本类试题
    */
    initTextQuestion () {
      if (this.$app.appType === 'web') {
        this.layout('answer', 'answerWidth')
      }

      if (this.isBlankQuestion) {
      // 填空、选填
        if (this.answerFromScan) {
          this.blankNums = this.value.length
        } else {
          this.blankNums = this.data.title.split(this.blankPlaceholder).length - 1
        }

        if (this.viewType === 'answer' && this.value.length === 0) {
          this.$emit('input', Array(this.blankNums).fill(''))
        }

        this.question.title = this.data.title

        if (this.$app.appType === 'web') {
          for (let i = 0; i < this.blankNums; i++) {
            let replaceHtml = ''

            if (['normal', 'answer'].includes(this.viewType)) {
              replaceHtml = `<i class="tw-question-bpline"><i class="tw-question-blankno">${i + 1}</i></i>`
            } else {
              if (this.answerFromScan) {
                replaceHtml = `<i class="tw-question-bpline ${this.getTextQuestionClass(i)}"><i class="tw-question-blankno">${i + 1}</i></i>`
              } else {
                replaceHtml = `<i class="tw-question-bpline ${this.getTextQuestionClass(i)}"><i class="tw-question-blankno">${i + 1}</i>${this.formatHtml(this.value[i], false, false) || '<span class="tw-question-bpline-noanswer">未做答</span>'}</i>`
              }
            }

            this.question.title = this.question.title.replace(this.blankPlaceholder, replaceHtml)
          }
        } else {
          if (this.viewType === 'correct') {
            this.correctData = []

            // 给未做答的题默认设为0分
            for (let i = 0; i < this.blankNums; i++) {
              if (typeof this.value[i] === 'undefined') {
                this.correctData.push(0)
              } else {
                this.correctData.push(!this.question.answerResults || !this.question.answerResults[i] || typeof this.question.answerResults[i].score === 'undefined' ? '' : parseFloat(this.question.answerResults[i].score))
              }
            }

            const avgScore = parseInt(this.question.score / this.blankNums * 10) / 10
            const lastScore = parseInt((this.question.score - avgScore * (this.blankNums - 1)) * 10) / 10
            this.blankScores = new Array(this.blankNums - 1).fill(avgScore)
            this.blankScores.push(lastScore)
          }

          this.question.title = this.data.title.replace(/#BLANK#/g, '<i class="tw-question-bpline"></i>')
        }
      } else {
        // 简答
        if (this.viewType === 'answer' && this.value.length === 0) {
          this.$emit('input', [''])
        }

        if (this.$app.appType === 'mobile' && this.viewType === 'correct') {
          // 给未做答的题默认设为0分
          this.blankScores = [parseInt(this.question.score)]
          this.correctData = typeof this.value[0] !== 'undefined'
            ? [!this.question.answerResults || !this.question.answerResults[0] || typeof this.question.answerResults[0].score === 'undefined' ? '' : parseFloat(this.question.answerResults[0].score)]
            : [0]
        }
      }
    },

    /**
    * 功能: 获取媒体的类型
    * @param {String} val 文件
    */
    getFormat (val) {
      return extToFileType(val)
    },

    /**
    * 功能: 切换选中自身
    */
    toggleSelectSelf () {
      if (this.selectable) {
        let selected = !this.selected
        this.$emit('update:selected', selected)
        this.$emit('selectChange', selected, this.question.id)
      }
    },

    /**
    * 功能: 选择选项，用于单选题，多选题，判断题
    * @param {String} optionNo 选项号
    */
    selectOption (optionNo) {
      if (this.viewType === 'answer') {
        if (this.valueType === 'single') {
          if (this.value[0] !== optionNo) {
            this.$emit('input', [optionNo])
            this.$emit('answer', this.value)
          }
        } else if (this.valueType === 'multiple') {
          let result = this.$ui.arr.toggle(JSON.parse(JSON.stringify(this.value)), optionNo)
          this.$emit('input', result)
          this.$emit('answer', result)
        }
      }
    },

    /**
    * 功能: 生成选项的class
    * @param {String} optionNo 当前选项号
    */
    genItemClass (optionNo) {
      if (['answer', 'view-answer'].includes(this.viewType)) {
        if (this.value.includes(optionNo)) {
          return 'xselected'
        }
      } else if (['correct', 'view-result'].includes(this.viewType)) {
        if (this.value.includes(optionNo)) {
          // 已做答但未批改
          if (this.question.answerResults[0] && this.question.answerResults[0].result === this.$cnt.QUESTION_RESULT_NOCORRECT) {
            return 'xselected'
          } else {
            // 查看结果模式-显示正确或错误样式,只标识【学生选中的选项】
            if (this.$ui.arr.equal(this.value, this.question.standardAnswers[0].value.split(',').map(item => parseInt(item)))) {
              return 'xright'
            } else {
              return 'xwrong'
            }
          }
        }
      }

      return ''
    },

    /**
    * 功能: 填空
    * @param {Type} value 当前作答空的值
    */
    answerTextQuestion (value) {
      this.$emit('input', this.value)
      this.$emit('answer', this.value, this.question.id)
    },

    /**
    * 功能: 是否有作答
    * @param {Number} index 当前第几空
    */
    isAnswered (index) {
      return this.value[index] && this.value[index] !== ''
    },

    /**
    * 功能: 生成文本点位符
    * @param {Number} index 当前第几空
    */
    getTextQuestionPlaceholder (index) {
      if (this.viewType === 'answer') {
        if (this.isBlankQuestion) {
          return `请输入第${index + 1}空答案`
        } else {
          return '请输入答案'
        }
      } else {
        if (!this.isAnswered(index)) {
          return `未做答`
        }
      }
    },

    /**
    * 功能: 生成选项的class
    * @param {Number} index 当前第几空
    */
    getTextQuestionClass (index) {
      let result = []

      if (['correct', 'view-result'].includes(this.viewType)) {
        if (this.correcting) {
          result.push('xcorrecting')
        }

        if (this.value[index]) {
          if (this.question.answerResults && this.question.answerResults[index]) {
            if (this.question.answerResults[index].result === this.$cnt.QUESTION_ANSWER_RIGHT) {
              result.push('xright')
            }

            if (this.question.answerResults[index].result === this.$cnt.QUESTION_ANSWER_WRONG) {
              result.push('xwrong')
            }
          }
        } else {
        // 学生答案中不存在该索引的答案
          result.push('xwrong')
        }
      }

      return result
    },

    /**
    * 功能: 批改试题
    */
    correctQuestion () {
      this.correcting = false
      this.$emit('correct', this.data, this.correctData)
    },

    /**
    * 功能: 改变连线
    */
    changeJoinLine (result) {
      this.$emit('input', result)
      this.$emit('change', result)
      this.$emit('answer', result)
    },

    /**
    * 功能: 添加简答题附件
    * @params {Array} value 原生上传控件的值
    */
    addStudentAttachs (value) {
      this.$emit('upload', value)
    },

    /**
    * 功能: 验证填空题批改分数
    * @param {Number} index 第几个空
    */
    validateBlankCorrectScore (index) {
      let result = parseFloat(this.correctData[index])

      if (result > this.blankScores[index]) {
        this.$ui.msg(`该空分数不能超${this.blankScores[index]}分`)
        this.$set(this.correctData, index, this.blankScores[index])
      } else if (result < 0) {
        this.$ui.msg(`批改分数不能小于0分`)
        this.$set(this.correctData, index, 0)
      } else if (`${result}`.test(/\.\d\d/)) {
        this.$ui.msg(`批改分数不能有两位小数`)
        this.$set(this.correctData, index, parseInt(result * 10) / 10)
      } else {
        this.$set(this.correctData, index, parseFloat(result))
      }
    }
  },

  mounted () {
    this.init()
  },

  watch: {
    qid () {
      if (this.viewType === 'answer') {
        this.init()
      }
    },

    data: {
      deep: true,
      handler () {
        if (this.viewType !== 'answer') {
          this.init()
        }
      }
    },
    initAnalysisVisibel (val) {
      this.analysisVisible = val
    }
  }
}
