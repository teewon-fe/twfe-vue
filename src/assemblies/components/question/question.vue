<template>
  <tw-media-view v-if="question"
    class="tw-question"
    :class="{xhidetoolbar:hideToolbar, xactive: selected}">
    <!-- 题干 -->
    <div class="tw-question-title"
      v-if="titleVisible"
      @click="toggleSelectSelf">
      <slot name="title"></slot>
      <b class="tw-question-no"
        v-if="questionNo && titleMembers.includes('questionNo')">{{questionNo}}.</b>
      <var v-if="titleMembers.includes('score')"
        class="tw-question-score">({{question.score}}分)</var>
      <span v-if="titleMembers.includes('title')"
        class="tw-question-title-content"
        v-html="formatHtml(question.title)"></span>
    </div>

    <!-- 附件区 -->
    <ul v-if="attachmentsVisible && question.attachments && question.attachments.length>0"
      class="tw-attachlist">
      <li v-for="(attach,index) in question.attachments"
        :key="index"
        :data-src="attach.fileUrl"
        :data-name="attach.fileName">
        <div class="tw-attachlist-icobox">
          <img v-if="getFormat(attach.fileUrl)==='image'"
            :src="attach.fileUrl" />

          <i v-else
            class="tw-ico x24"
            :class="`xr${getFormat(attach.fileUrl)}`">
          </i>
        </div>

        <div class="tw-attachlist-name">{{attach.fileName}}</div>
      </li>
    </ul>

    <template v-if="optionOrBlanksVisible && answerAreaVisible">
      <!-- 单选题选项 -->
      <ul ref="options"
        v-if="isChoiceQuestion"
        class="tw-question-opts">
        <li class="tw-question-optitem"
          :style="{width: optWidth}"
          v-for="(opt, index) in question.options"
          :key="opt.optionNo"
          @click="selectOption(opt.optionNo)">
          <!-- 普通模式 -->
          <template v-if="viewType==='normal'">
            <em class="tw-question-optitem-no">{{index|numToLetter}}.</em>
            <span class="tw-question-optitem-content"
              v-html="formatHtml(opt.content)"></span>
          </template>

          <!-- 答案模式 -->
          <div v-else
            class="tw-question-optitem-inner"
            :class="genItemClass(opt.optionNo)">
            <div class="tw-question-optitem-no">
              <em>{{index|numToLetter}}</em>
            </div>
            <div class="tw-question-optitem-content"
              v-html="formatHtml(opt.content)">
            </div>
          </div>
        </li>
      </ul>

      <!-- 填空题与简答题 -->
      <ul v-if="isTextQuestion && viewType !== 'normal'"
        class="tw-question-blanks">
        <!-- 填空类答题区: 只做答时才显示，非做答把答案显示在题干 -->
        <template v-if="isBlankQuestion && (viewType === 'answer' || answerFromScan)">
          <li v-if="answerFromScan"
            class="tw-question-blanks-item">
            <div class="tw-question-blankitem-answer"
              v-html="formatHtml(value[0], false, false)">
            </div>
          </li>
          <template v-else>
            <li class="tw-question-blanks-item"
              v-for="index in blankNums"
              :key="`blank-${index}`">
              <div class="tw-question-blankitem-input"
                :class="getTextQuestionClass(index-1)">
                <el-input v-if="viewType==='answer'"
                  :readonly="viewType!=='answer'"
                  rows="1"
                  type="textarea"
                  :autosize="true"
                  v-model="value[index-1]"
                  :placeholder="getTextQuestionPlaceholder(index-1)"
                  @change="answerTextQuestion" />
              </div>
            </li>
          </template>
        </template>

        <!-- 简答题答题区 -->
        <li v-if="question.type === $cnt.QUESTION_TYPE_SHORT_ANSWER"
          class="tw-question-blanks-item">
          <div class="tw-question-blankitem-input xshortanswer"
            :class="getTextQuestionClass(0)">
            <el-input v-if="viewType==='answer'"
              :readonly="viewType!=='answer'"
              rows="3"
              type="textarea"
              :autosize="true"
              v-model="value[0]"
              :placeholder="getTextQuestionPlaceholder(0)"
              @change="answerTextQuestion" />
            <div v-else
              class="tw-question-blankitem-answer xshortanswer"
              v-html="formatHtml(value[0], false, false)">
            </div>
          </div>
          <div v-if="viewType==='correct' && isAnswered(0)"
            class="tw-question-blankitem-correct">
            <el-input type="number"
              :placeholder="`请输入得分`" />
          </div>
        </li>
      </ul>

      <!-- 简答题附件区 -->
      <ul v-if="question.type === $cnt.QUESTION_TYPE_SHORT_ANSWER && (viewType==='answer' || (question.studentAttachments && question.studentAttachments.length>0))"
        class="tw-attachlist">
        <li v-for="(attach,index) in question.studentAttachments"
          :key="index"
          :data-src="attach.fileUrl"
          :data-name="attach.fileName">
          <div class="tw-attachlist-icobox">
            <img v-if="getFormat(attach.fileUrl)==='image'"
              :src="attach.fileUrl" />

            <i v-else
              class="tw-ico x24"
              :class="`xr${getFormat(attach.fileUrl)}`">
            </i>
          </div>

          <div class="tw-attachlist-name">{{attach.fileName}}</div>
        </li>
      </ul>

      <!-- 试题：连线题 -->
      <template v-if="question.type===$cnt.QUESTION_TYPE_LINE">
        <div v-if="answerFromScan"
          class="tw-question-blankitem-input xshortanswer"
          :class="getTextQuestionClass(0)">
          <div class="tw-question-blankitem-answer xshortanswer"
            v-html="formatHtml(value[0], false, false)"></div>
        </div>

        <tw-join-line-question v-else
          :value="value"
          :question="question"
          :view-type="viewType"
          @change="changeJoinLine">
        </tw-join-line-question>
      </template>
    </template>

    <!-- 自定义主体内容 -->
    <slot name="body"></slot>

    <!-- 工具栏 -->
    <div v-if="toolbarVisible"
      class="tw-qeustion-toolbar">
      <div class="tw-question-toolbar-left">
        <span v-if="toolbarMembers.includes('degree')"
          class="tw-question-prop"
          :class="$dic.select($dic.questionDegrees, question.degree, 'className')">
          <label>难度：</label>
          <var>{{$dic.select($dic.questionDegrees, question.degree)}}</var>
        </span>

        <span v-if="toolbarMembers.includes('type')"
          class="tw-question-prop">
          <label>题型：</label>
          <var>{{question.typeName}}</var>
        </span>

        <span v-if="toolbarMembers.includes('choices')"
          class="tw-question-prop">
          <label>组卷次数：</label>
          <var>{{question.choices}}次</var>
        </span>

        <!-- 自定义按钮 -->
        <slot name="toolbar-left"></slot>
      </div>

      <div class="tw-question-toolbar-right">
        <!-- 自定义按钮: 左侧 -->
        <slot name="toolbar-btns-left"></slot>

        <a v-if="toolbarMembers.includes('analysis')"
          class="tw-question-toolbtn"
          :class="{xactive: analysisVisible}"
          @click="toggleAnalysis">
          <slot name="analisis-btn-icon">
            <i class="tw-ico xanalysis"></i>
          </slot>
          <span>{{analysisVisible?extendedAnalysisLabel:collapsedAnalysisLabel}}</span>
        </a>

        <!-- 自定义按钮 -->
        <slot name="toolbar-btns"></slot>
      </div>
    </div>

    <!-- 解析 -->
    <ul v-if="!noAnalysis && analysisVisible"
      class="tw-question-analysis">
      <!-- 解析顶部 -->
      <slot name="analysis-top"></slot>

      <!-- 得分 -->
      <li v-if="analysisMembers.includes('studentScore')">
        <div class="tw-question-analysis-label">【得 分】</div>
        <div class="tw-question-analysis-content">
          <span class="text-highlight text-bold">{{question.studentScore}}</span>
          <span>分</span>
          <span class="text-small text-secondary">（班级平均{{question.avgScore}}分）</span>
        </div>
      </li>

      <!-- 解析：得分率 -->
      <li v-if="analysisMembers.includes('scoreRate')">
        <div class="tw-question-analysis-label">【得分率】</div>
        <div class="tw-question-analysis-content">
          <span class="text-highlight text-bold">{{question.scoreRate}}</span>
          <span class="text-small text-secondary"
            v-if="isClass">（{{question.rightStudent}}人做对,{{question.wrongStudent}}人做错）</span>
          <span v-else
            class="text-small text-secondary">（班级平均得分率{{question.classAvgRate}}%）</span>
        </div>
      </li>

      <!-- 统计区 -->
      <li v-if="analysisMembers.includes('statistics')">
        <div class="tw-question-analysis-label">【统 计】</div>
        <div class="tw-question-analysis-content xpoint">
          <div class="tw-question-analysis-statistic"
            v-for="(statistic,index) in question.statistics"
            :key="`statis-${index}`">
            <div class="tw-question-analysis-label"
              :style="{width: dtstatisticLabelWidth}">{{statistic.name}}</div>
            <div class="tw-question-analysis-statistic-progress"
              :style="{width: statisticProgresslWidth}">
              <el-progress color="#218fff"
                class="tw-question-dtstyletype"
                :percentage="statistic.percentage"
                :stroke-width="10"
                :show-text="false" />
            </div>
            <div class="tw-question-analysis-statistic-detail text-small text-secondary">{{statistic.studentNumber}}人，占比{{statistic.percentage}}%</div>
          </div>
        </div>
      </li>

      <!-- 解析：答案 -->
      <li v-if="analysisMembers.includes('answer')">
        <div class="tw-question-analysis-label">【答 案】</div>
        <!-- 选择类题型 -->
        <template v-if="isChoiceQuestion">
          <div class="tw-question-analysis-content"
            v-for="(standardAnswer,index) in question.standardAnswers"
            :key="`opt-${index}`">
            <span>{{$ui.numToLetter(standardAnswer.value.split(',')).join('、')}}</span>
          </div>
        </template>

        <!-- 文本类题型 -->
        <div v-if="isTextQuestion"
          class="tw-question-analysis-content">
          <ul ref="answer"
            class="tw-question-blanks xstd">
            <!-- 填空类答案 -->
            <template v-if="isBlankQuestion">
              <li class="tw-question-blanks-item"
                :style="{width: answerWidth}"
                v-for="(std,index) in question.standardAnswers"
                :key="`std-${index}`">
                <span class="tw-question-blankno">{{index+1}}</span>
                <span class="tw-question-blankitem-input">
                  <span v-html="formatHtml(std.value)"></span>
                </span>
              </li>
            </template>

            <!-- 简答题答案 -->
            <li v-else
              class="tw-question-blanks-item xstd">
              <div v-html="formatHtml(question.standardAnswers[0]?question.standardAnswers[0].value:'-')"></div>
            </li>
          </ul>
        </div>

        <div v-if="question.type===$cnt.QUESTION_TYPE_LINE"
          class="tw-question-analysis-content">
          <!-- 试题：连线题 -->
          <tw-join-line-question :value="question.standardAnswers[0].value.split(',')"
            :question="question">
          </tw-join-line-question>
        </div>
      </li>

      <!-- 解析：解析 -->
      <li v-if="analysisMembers.includes('analysis')">
        <div class="tw-question-analysis-label">【解 析】</div>
        <div class="tw-question-analysis-content">
          <div v-html="formatHtml(question.analysis)"></div>

          <!-- 解析-附件区 -->
          <ul v-if="question.analysisAttachments && question.analysisAttachments.length>0"
            class="tw-attachlist">
            <li v-for="(attach,index) in question.analysisAttachments"
              :key="index"
              :data-src="attach.fileUrl"
              :data-name="attach.fileName">
              <div class="tw-attachlist-icobox">
                <img class="tw-img xcover"
                  v-if="getFormat(attach.fileUrl)==='image'"
                  :src="attach.fileUrl" />

                <i v-else
                  class="tw-ico x24"
                  :class="`xr${getFormat(attach.fileUrl)}`">
                </i>
              </div>

              <div class="tw-attachlist-name">{{attach.fileName}}</div>
            </li>
          </ul>
        </div>
      </li>

      <!-- 解析：知识点 -->
      <li v-if="analysisMembers.includes('knowledgePoints')">
        <div class="tw-question-analysis-label">【知识点】</div>
        <div class="tw-question-analysis-content xpoint">
          <template v-if="question.knowledgePoints && question.knowledgePoints.length>0">
            <i class="tw-question-point"
              v-for="(point,id) in question.knowledgePoints"
              :key="id">
              <span>{{point.name}}</span>
            </i>
          </template>
          <span class="tw-question-point" v-else>无</span>
        </div>
      </li>

      <!-- 解析：副题型（如阅读理解） -->
      <li v-if="analysisMembers.includes('subType')">
        <div class="tw-question-analysis-label">【题 型】</div>
        <div class="tw-question-analysis-content">{{question.subType}}</div>
      </li>

      <!-- 解析底部 -->
      <slot name="analysis-bottom"></slot>
    </ul>

    <!-- 底部自定义内容 -->
    <slot name="footer"></slot>

    <!-- 自定义试题内容 -->
    <slot></slot>
  </tw-media-view>
</template>

<script>
import questonMixins from './question-mixins'

export default {
  name: 'tw-question',

  mixins: [questonMixins],

  props: {
    // 用样式隐藏toolbar
    hideToolbar: {
      type: Boolean,
      default: false
    },

    // 标题区显示哪些成员
    titleMembers: {
      type: Array,
      default () {
        return ['questionNo', 'title']
      }
    },

    // toolbar包含哪些成员
    toolbarMembers: {
      type: Array,
      default () {
        return ['degree', 'type', 'choices', 'analysis']
      }
    },

    // 解析显示哪些成员
    analysisMembers: {
      type: Array,
      default () {
        return ['answer', 'knowledgePoints', 'analysis', 'knowledgePoints', 'subType']
      }
    }
  },

  methods: {
    /**
    * 功能: 切换解析显示
    */
    toggleAnalysis () {
      this.analysisVisible = !this.analysisVisible

      if (this.analysisVisible) {
        this.layout('answer', 'answerWidth')
      }
      this.$emit('toggleAnalysis')
    }
  }
}
</script>

<style lang="scss">
@import "./question.scss";
@import "./join-line.scss";
@import "./question-common.scss";
</style>
