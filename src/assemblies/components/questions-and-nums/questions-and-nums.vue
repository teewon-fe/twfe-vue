<template>
  <div v-if="nums.length > 0 && questions.length > 0" class="tw-qlist">
    <slot v-if="currentQuestion" :question="question"> </slot>

    <slot name="footer" :question="question"> </slot>

    <!-- 题号：弹出卡片 -->
    <van-popup
      class="xqncard"
      v-model="visible"
      position="bottom"
      :duration="0.2"
    >
      <div class="tw-qncard">
        <!-- 题号：弹出卡片-头部 -->
        <div class="tw-qncard-header">
          <!-- 答题模式： 显示完成数据 -->
          <template v-if="viewType === 'answer'">
            <label>已完成：</label>
            <span
              class="tw-ancard-activetext">{{doneNos.length}}</span>
            <label class="pl-medium">未完成：</label>
            <span
              class="text-main">{{total-doneNos.length}}</span>
          </template>

          <!-- 答题模式： 查看做答模式，显示答题结果数据 -->
          <template v-if="['correct', 'view-result'].includes(viewType)">
            <label>正确：</label>
            <span
              class="tw-ancard-righttext">{{rightNos.length}}</span>
            <label class="pl-medium">错误：</label>
            <span
              class="tw-ancard-wrongtext">{{wrongNos.length}}</span>
            <label class="pl-medium">未批改：</label>
            <span
              class="text-main">{{noCorrectNos.length}}</span>
          </template>

          <!-- 统计模式： -->
          <template v-if="viewType === 'statistics'">
            <van-radio-group v-model="sortType" @change="sortNumbers">
              <van-radio name="byNo">按题号排序</van-radio>
              <van-radio class="ml-large" name="byScoreRate"
                >按得分率排序</van-radio
              >
            </van-radio-group>
          </template>
        </div>

        <!-- 题号：弹出卡片-列表 -->
        <div class="tw-qncard-body">
          <a
            class="tw-qno"
            :class="genNoClass(no.questionNo)"
            v-for="(no, index) in numbers"
            :key="no.questionNo"
            @click="beforeSelectNo(index)"
          >
            <span>{{ no.questionNo }}</span>
          </a>
        </div>
      </div>
    </van-popup>

    <!-- 题号：底部操作栏 -->
    <tw-ghost ref="ghost" contract="#app">
      <footer class="tw-footer xqncard">
        <!-- 进度条 -->
        <div class="xqnprogress">
          <div class="tw-qnprogress">
            <div class="tw-qnprogress-main"></div>
            <div class="tw-qnprogress-value"
              :style="{width:$ui.numToPercent(doneProgress)}">
            </div>
          </div>
        </div>

        <!-- 打开题号面板按钮 -->
        <div
          class="tw-footer-item justify-content-start"
          @click="visible = !visible"
        >
          <i class="tw-ico xqncard"></i>
          <span class="tw-footer-item-text xnowarp">
            <span
              class="text-main">{{numbers[currentIndex].questionNo}}/</span>
            <span>{{total}}</span>
          </span>
        </div>

        <!-- 操作按钮 -->
        <div
          v-if="currentIndex > 0"
          class="tw-footer-item justify-content-end flex-grow-0"
          @click="prev"
        >
          <i class="tw-ico xqnprev dl-n5"></i>
          <span
            class="tw-footer-item-text xnowarp text-main">上一题</span>
        </div>

        <div
          v-if="currentIndex < total - 1"
          class="tw-footer-item justify-content-end flex-grow-0"
          @click="next"
        >
          <i class="tw-ico xqnnext"></i>
          <span
            class="tw-footer-item-text xnowarp text-main">下一题</span>
        </div>

        <div
          v-if="viewType==='answer' && currentIndex===total-1"
          class="tw-footer-item justify-content-end flex-grow-0"
          @click="$emit('submit')"
        >
          <i class="tw-ico xqnsubmit"></i>
          <span
            class="tw-footer-item-text xnowarp text-main">提交</span>
        </div>

        <div
          v-if="viewType==='correct' && currentIndex===total-1"
          class="tw-footer-item justify-content-end flex-grow-0"
          @click="nextStudent"
        >
          <a class="tw-btn xmain">下一个学生</a>
        </div>
      </footer>
    </tw-ghost>
  </div>
</template>

<script>
export default {
  name: 'tw-questions-and-nums',

  props: {
    // 视图模式 normal-普通
    // answer-学生做答模式 view-answer-查看做答(无标准答案，不显示对错，仅查看作答的内容)
    // correct-批改 view-result(有标准答案，显示对错) statistics-统计模式
    viewType: {
      type: String,
      required: true
    },

    // 试题数组，组件用该数组判断是否需要加载当前页的试题数据，
    // 判断逻辑为: 试题数组中不存在当前序号对象questionId对应的试题时，就产生一个loadPage事件，否则说明试题页已下载，不产生该事件
    questions: {
      type: Array,
      required: true
    },

    // 试题序号列表数据: {questionNo: 1, questionId: 'questionId', scoreRate: 0.8, answerResult: $cnt.QUESTION_ANSWER_WRONG}
    nums: {
      type: Array,
      required: true
    },

    // 仅用于答题时：完成的试题序号
    doneNos: {
      type: Array,
      default () {
        return []
      }
    },

    // 分页大小
    pageSize: {
      type: Number,
      default: 10
    },

    // 当前试题的检测函数
    currentQuestionHandler: Function,

    // 识别当前试题的key值
    idKey: {
      type: String,
      default: 'id'
    },

    // 是否启用主观题客观题筛选
    onlySubjective: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      numbers: [],
      sortType: 'byNo',
      visible: false,
      currentNo: null,
      currentIndex: 0
    }
  },

  computed: {
    // 试题总数
    total () {
      return this.nums.length
    },

    // 作答完成进度
    doneProgress () {
      return this.doneNos.length / this.total
    },

    // 正确的试题序号
    rightNos () {
      return this.numbers
        .filter(item => item.answerResult === this.$cnt.QUESTION_ANSWER_RIGHT)
        .map(item => item.questionNo)
    },

    // 错误的的试题序号
    wrongNos () {
      return this.numbers
        .filter(item => item.answerResult === this.$cnt.QUESTION_ANSWER_WRONG)
        .map(item => item.questionNo)
    },

    // 未批改的试题序号
    noCorrectNos () {
      return this.numbers
        .filter(
          item => item.answerResult === this.$cnt.QUESTION_RESULT_NOCORRECT
        )
        .map(item => item.questionNo)
    },

    // 当前页码
    pageNum () {
      if (this.sortType === 'byScoreRate') {
        // 按得分率排序时，当前页码还是按序号排序计算
        return (
          Math.floor(
            this.$ui.arr.indexMode(this.nums, {
              questionNo: this.currentNo.questionNo
            }) / this.pageSize
          ) + 1
        )
      } else {
        return Math.floor(this.currentIndex / this.pageSize) + 1
      }
    },

    // 当前页面起始索引
    startIndex () {
      return (this.pageNum - 1) * this.pageSize
    },

    // 试题的视图类型
    questionViewType () {
      if (this.viewType === 'statistics') {
        return 'view-result'
      } else {
        return this.viewType
      }
    },

    // 当前试题
    currentQuestion () {
      if (typeof this.currentQuestionHandler === 'function') {
        return this.currentQuestionHandler(
          this.questions,
          this.currentNo.questionId
        )
      } else {
        return this.$ui.arr.findMode(this.questions, {
          [this.idKey]: this.currentNo.questionId
        })[0]
      }
    },

    // 当前试题
    question () {
      return {
        data: this.currentQuestion,
        questionNo: this.currentNo.questionNo,
        questionViewType: this.questionViewType
      }
    }
  },

  methods: {
    /**
     * 功能: 初始化数据
     * @params {Number} index 题号数据对象的索引
     */
    init (index) {
      this.numbers = this.$ui.cloneJson(this.nums)

      if (typeof index === 'number') {
        this.currentIndex = index
      }

      if (this.currentIndex >= this.numbers.length) {
        this.currentIndex = this.numbers.length - 1
      }

      if (this.numbers.length > 0) {
        this.currentNo = this.numbers[this.currentIndex]
      }
    },

    /**
     * 功能: 功能描述
     * @param {String} type byNo-按题号排序 byScoreRate-按得分率排序
     */
    sortNumbers (type) {
      if (type === 'byNo') {
        this.numbers = this.$ui.cloneJson(this.nums)
      } else {
        this.numbers.sort((n1, n2) => n2.scoreRate - n1.scoreRate)
      }
    },

    /**
     * 功能: 生成试题号的class
     * @param {String} no 题号
     */
    genNoClass (no) {
      if (this.viewType === 'answer') {
        if (this.doneNos.includes(no)) {
          return 'xdone'
        }
      } else {
        if (this.rightNos.includes(no)) {
          return 'xright'
        } else if (this.wrongNos.includes(no)) {
          return 'xwrong'
        } else {
          return 'xdone'
        }
      }
    },

    /**
     * 功能: 选择试题号
     * @param {Number} index 当前索引
     */
    selectNo (index) {
      this.currentIndex = index
      this.currentNo = this.numbers[index]
      this.$emit('change', this.currentNo)
    },

    /**
    * 功能: 选择试题号预处理
    * @param {Number} index 当前索引
    */
    beforeSelectNo (index) {
      let no = this.numbers[index]

      if (this.onlySubjective) {
        if (no.subjective) {
          this.selectNo(index)
        } else {
          this.$ui.msg('该题为客观题，请关闭查看主观题按钮才可查看')
        }
      } else {
        this.selectNo(index)
      }
    },

    /**
    * 功能: 查找i上一个主观题的索引
    * @param {Number} index 当前索引
    */
    getPrevSubjectiveQuestionIndex (index) {
      while (index >= 0) {
        index--

        if (this.numbers[index].subjective) {
          return index
        }
      }

      return -1
    },

    /**
    * 功能: 查找上一个主观题的索引
    * @param {Number} index 当前索引
    */
    getNextSubjectiveQuestionIndex (index) {
      while (index < this.numbers.length) {
        index++

        if (this.numbers[index].subjective) {
          return index
        }
      }

      return -1
    },

    /**
     * 功能: 点击上一题
     */
    prev () {
      if (this.currentIndex > 0) {
        if (this.onlySubjective) {
          let prevSubjectiveIndex = this.getPrevSubjectiveQuestionIndex(this.currentIndex)

          if (prevSubjectiveIndex === -1) {
            this.$ui.msg('当前题为第一道主观题')
          } else {
            this.selectNo(prevSubjectiveIndex)
          }
        } else {
          this.selectNo(this.currentIndex - 1)
        }
      }
    },

    /**
     * 功能: 点击下一题
     */
    next () {
      if (this.currentIndex < this.total - 1) {
        if (this.onlySubjective) {
          let nextSubjectiveIndex = this.getNextSubjectiveQuestionIndex(this.currentIndex)

          if (nextSubjectiveIndex === -1) {
            this.$ui.msg('当前题为最后一道主观题')
          } else {
            this.selectNo(nextSubjectiveIndex)
          }
        } else {
          this.selectNo(this.currentIndex + 1)
        }
      }
    },

    /**
     * 功能: 移除底部题号栏
     */
    removeNumBar () {
      this.$refs.ghost.removeFromDom()
    },

    /**
     * 功能: 重新添加底部题号栏
     */
    addNumBar () {
      this.$refs.ghost.addToDom()
    },

    /**
     * 功能: 切换到下一个学生
     */
    nextStudent () {
      this.currentIndex = 0
      this.$emit('nextStudent')
    }
  },

  watch: {
    nums: {
      deep: true,
      immediate: true,
      handler (val) {
        if (val.length > 0) {
          this.init(this.currentIndex)
        }
      }
    },

    pageNum (val) {
      // 试题数组中不存在当前序号对象questionId对应的试题时，就产生一个loadPage事件，否则说明试题页的试题都已下载，不产生该事件
      if (
        !this.$ui.arr.hasMode(this.questions, { [this.idKey]: this.currentNo.questionId })
      ) {
        this.$emit('loadPage', val, this.startIndex)
      }
    }
  }
}
</script>
