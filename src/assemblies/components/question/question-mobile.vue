<template>
  <tw-media-view v-if="question"
    class="tw-question">
    <!-- 试题：题干 -->
    <div v-if="titleVisible"
      class="tw-question-title">
      <div v-if="selectable"
        class="van-checkbox">
        <div class="van-checkbox__icon van-checkbox__icon--square"
          :class="{'van-checkbox__icon--checked':selected}">
          <i class="van-icon van-icon-success"></i>
        </div>
        <div class="tw-question-title-selbox" @click.stop="toggleSelectSelf"></div>
      </div>
      <slot name="title"></slot>
      <i v-if="question.degree && ['normal', 'correct'].includes(viewType) && titleMembers.includes('degree')"
        class="tw-question-degree">
        <span>{{$dic.select($dic.questionDegrees, question.degree)}}</span>
      </i>
      <b v-if="questionNo && titleMembers.includes('questionNo')"
        class="tw-question-no">{{questionNo}}.</b>
      <var v-if="titleMembers.includes('score')" class="tw-question-score">({{question.score}}分)</var>
      <em v-if="question.typeName && titleMembers.includes('typeName')" class="tw-question-type">【{{question.typeName}}】</em>
      <span v-if="titleMembers.includes('title')"
        class="tw-question-title-content"
        v-html="question.wrongQuestion&&question.wrongQuestion==='2'?formatHtml(question.title, false, false):formatHtml(question.title)"></span>
      <slot name="title-right"></slot>
    </div>

    <!-- 试题：附件区 -->
    <ul v-if="attachmentsVisible && question.attachments && question.attachments.length>0"
      class="tw-cardattachs">
      <li v-for="(attach,index) in question.attachments"
        :key="`attr-${index}`"
        :data-src="attach.fileUrl"
        :data-name="attach.fileName">
        <img v-if="getFormat(attach.fileUrl)==='image'"
          :src="attach.fileUrl" />
        <i v-else
          class="tw-ico x60"
          :class="`xr${getFormat(attach.fileUrl)}`"></i>
        <h4>{{attach.fileName}}</h4>
      </li>
    </ul>

    <!-- 答题区 -->
    <template v-if="optionOrBlanksVisible && answerAreaVisible">
      <!-- 试题：单选题选项 -->
      <ul v-if="isChoiceQuestion"
        class="tw-question-opts"
        :class="{xnormal: viewType==='normal'}">
        <!-- class修饰符：xselected-选择 xright-正确 xwrong-错误 -->
        <li class="tw-question-optitem"
          :class="genItemClass(opt.optionNo)"
          v-for="(opt, index) in question.options"
          :key="opt.optionNo"
          @click="selectOption(opt.optionNo)">
          <div class="tw-question-optitem-no">
            <em>{{index|numToLetter}}</em>
          </div>
          <div class="tw-question-optitem-content"
            v-html="formatHtml(opt.content)"></div>
        </li>
      </ul>

      <!-- 试题：填空题与简答题 -->
      <ul v-if="isTextQuestion && viewType !== 'normal'"
        class="tw-question-blanks">
        <!-- 填空类答题区 -->
        <template v-if="isBlankQuestion">
          <li class="tw-question-blanks-item"
            v-for="index in blankNums"
            :key="`blank-${index}`">
            <div class="tw-question-blankitem-input"
              :class="getTextQuestionClass(index-1)">
              <van-field v-if="viewType==='answer'"
                :readonly="viewType!=='answer'"
                rows="1"
                type="textarea"
                :autosize="true"
                v-model="value[index-1]"
                :placeholder="getTextQuestionPlaceholder(index-1)"
                @blur="answerTextQuestion" />
              <div v-else
                class="tw-question-blankitem-answer"
                v-html="formatHtml(value[index-1], false, false)"></div>
            </div>
            <div v-if="viewType==='correct'"
              class="tw-question-blankitem-correct">
              <van-field type="number"
                v-model="correctData[index-1]"
                @blur="validateBlankCorrectScore(index-1)"
                :placeholder="`第${index}空得分`" />
            </div>
          </li>
        </template>

        <!-- 简答题答题区 -->
        <template v-else>
          <li class="tw-question-blanks-item">
            <div class="tw-question-blankitem-input xshortanswer"
              :class="getTextQuestionClass(0)">
              <van-field v-if="viewType==='answer'"
                :readonly="viewType!=='answer'"
                rows="3"
                type="textarea"
                :autosize="true"
                v-model="value[0]"
                :placeholder="getTextQuestionPlaceholder(0)"
                @blur="answerTextQuestion" />
              <div v-else
                class="tw-question-blankitem-answer xshortanswer"
                v-html="formatHtml(value[0], false, false)"></div>
            </div>
            <div v-if="viewType==='correct'"
              class="tw-question-blankitem-correct">
              <van-field type="number"
                v-model="correctData[0]"
                @blur="validateBlankCorrectScore(0)"
                :placeholder="`请输入得分`" />
            </div>
          </li>
        </template>
      </ul>

      <!-- 简答题附件区 -->
      <tw-native-uploader :key="question.id"
        v-if="question.type === $cnt.QUESTION_TYPE_SHORT_ANSWER && (viewType==='answer' || (question.studentAttachments && question.studentAttachments.length>0))"
        class="xquestion"
        ref="nativeUploader"
        v-model="question.studentAttachments"
        @input="addStudentAttachs"
        :readonly="viewType!=='answer'"
        :limit="5"
        :natives="['selectPhoto', 'takePhoto']">
      </tw-native-uploader>

      <!-- 跟读附件区: 功能暂时隐藏，要实现跟读题的时候请去掉false -->
      <tw-native-uploader :key="question.id"
        v-if="false && question.type === $cnt.QUESTION_TYPE_FOLLOW_READ && (viewType==='answer' || (question.studentAttachments && question.studentAttachments.length>0))"
        class="xquestion"
        ref="nativeUploader"
        v-model="question.studentAttachments"
        @input="addStudentAttachs"
        :readonly="viewType!=='answer'"
        :limit="1"
        :natives="['takeAudio']">
      </tw-native-uploader>

      <!-- 试题：连线题 -->
      <template v-if="question.type===$cnt.QUESTION_TYPE_LINE">
        <div v-if="answerFromScan" class="tw-question-blanks-item mb-medium">
          <div class="tw-question-blankitem-input xshortanswer"
            :class="getTextQuestionClass(0)">
            <div class="tw-question-blankitem-answer xshortanswer" v-html="formatHtml(value[0], false, false)"></div>
          </div>
          <div v-if="viewType==='correct'"
            class="tw-question-blankitem-correct">
            <van-field type="number"
              v-model="correctData[0]"
              @blur="validateBlankCorrectScore(0)"
              :placeholder="`请输入得分`" />
          </div>
        </div>

        <tw-join-line-question
          v-else
          :value="value"
          :question="question"
          :view-type="viewType"
          @change="changeJoinLine">
        </tw-join-line-question>
      </template>
    </template>

    <!-- 自定义主体内容 -->
    <slot name="body"></slot>

    <!-- 试题：工具栏 -->
    <div v-if="toolbarVisible"
      class="tw-qeustion-toolbar">
      <div class="tw-question-toolbar-left">
        <a class="tw-question-toolbar-togglebtn"
          :class="{xopen:analysisVisible}"
          @click.stop="analysisVisible=!analysisVisible">
          <span>答案解析</span>
        </a>
      </div>

      <div class="tw-question-toolbar-right">
        <!-- 自定义按钮 -->
        <slot name="toolbar-btns"></slot>
      </div>
    </div>

    <slot name="toolbar-after"></slot>

    <!-- 试题：解析 -->
    <ul v-if="analysisVisible"
      class="tw-question-analysis">
      <li v-if="viewType==='correct' && ($cnt.QUESTION_IS_SUBJECTIVE_TYPES.includes(question.type) || (answerFromScan && question.type === $cnt.QUESTION_TYPE_LINE))">
        <template v-if="correcting">
          <a class="tw-question-correctbtn xtr xconfirm"
            @click.stop="correctQuestion">确定批改</a>
          <a class="tw-question-correctbtn xtr xcancel"
            @click.stop="correcting=false">取消</a>
        </template>
        <a v-else
          class="tw-question-correctbtn xtr"
          @click.stop="correcting=true">批改</a>
      </li>

      <!-- 解析顶部 -->
      <slot name="analysis-top"></slot>

      <!-- 得分 -->
      <li v-if="analysisMembers.includes('studentScore')">
        <div class="tw-question-analysis-label">得分:</div>
        <div class="tw-question-analysis-content">
          <span>{{question.studentScore}}分</span>
          <span class="text-small text-secondary">（班级平均{{question.avgScore}}分）</span>
        </div>
      </li>

      <!-- 得分率 -->
      <li v-if="analysisMembers.includes('scoreRate')">
        <div class="tw-question-analysis-label x3em">得分率:</div>
        <div class="tw-question-analysis-content">{{question.scoreRate}}</div>
        <span class="text-small text-secondary" v-if="isClass">（{{question.rightStudent}}人做对,{{question.wrongStudent}}人做错）</span>
        <span class="text-small text-secondary" v-else>（班级平均得分率{{question.classAvgRate}}分）</span>
      </li>

      <!-- 知识点 -->
      <li v-if="analysisMembers.includes('knowledgePoints')">
        <div class="tw-question-analysis-label x3em">知识点:</div>
        <div class="tw-question-analysis-content">
          <span>{{question.knowledgePoints.map(item=>item.name).join('、')}}</span>
        </div>
      </li>

      <!-- 标准答案 -->
      <li v-if="analysisMembers.includes('answer')"
        :class="{xjoinline:question.type===$cnt.QUESTION_TYPE_LINE}">
        <div class="tw-question-analysis-label">答案:</div>
        <!-- 选择类题型 -->
        <template v-if="isChoiceQuestion">
          <div class="tw-question-analysis-content"
            v-for="(standardAnswer,index) in question.standardAnswers"
            :key="`opt-${index}`">
            <span v-if="standardAnswer.value">{{$ui.numToLetter(standardAnswer.value.split(',')).join('、')}}</span>
            <span v-else>&nbsp;</span>
          </div>
        </template>

        <!-- 文本类题型 -->
        <div v-if="isTextQuestion"
          class="tw-question-analysis-content">
          <ul class="tw-question-blanks">
            <!-- 填空类 -->
            <template v-if="isBlankQuestion">
              <li class="tw-question-blanks-item xstd"
                v-for="(std,index) in question.standardAnswers"
                :key="`std-${index}`">
                <div class="tw-question-blankitem-input">
                  <div v-if="std.value"
                    v-html="formatHtml(std.value)"></div>
                  <div v-else>&nbsp;</div>
                </div>
              </li>
            </template>

            <!-- 简答题 -->
            <li v-else
              class="tw-question-blanks-item xstd">
              <div v-html="formatHtml(question.standardAnswers[0]?question.standardAnswers[0].value:'-')"></div>
            </li>
          </ul>
        </div>

        <!-- 试题：连线题 -->
        <template v-if="question.type===$cnt.QUESTION_TYPE_LINE">
          <tw-join-line-question v-if="question.standardAnswers[0].value"
            :value="question.standardAnswers[0].value.split(',')"
            :question="question">
          </tw-join-line-question>
          <div v-else>&nbsp;</div>
        </template>
      </li>

      <!-- 统计区 -->
      <template v-if="analysisMembers.includes('statistics')">
        <li class="tw-question-analysis-statistic"
          v-for="(statistic,index) in question.statistics"
          :key="`statis-${index}`">
          <div class="tw-question-analysis-label"
            :style="{width: statisticLabelWidth}">{{statistic.name}}</div>
          <div class="tw-question-analysis-statistic-progress"
            :style="{width: statisticProgresslWidth}">
            <van-progress class="xblue"
              color="#f2826a"
              :show-pivot="false"
              :percentage="statistic.percentage"
              stroke-width="10px" />
          </div>
          <div class="tw-question-analysis-statistic-detail">{{statistic.studentNumber}}人，占比{{statistic.percentage}}%</div>
        </li>
      </template>

      <!-- 解析 -->
      <li v-if="analysisMembers.includes('analysis')">
        <div class="tw-question-analysis-label">解析:</div>
        <div class="tw-question-analysis-content">
          <div v-html="formatHtml(question.analysis)"></div>

          <!-- 试题：解析-附件区 -->
          <ul v-if="question.analysisAttachments && question.analysisAttachments.length>0"
            class="tw-cardattachs">
            <li v-for="(attach,index) in question.analysisAttachments"
              :key="`analysis-attr-${index}`"
              :data-src="attach.fileUrl"
              :data-name="attach.fileName">
              <img v-if="getFormat(attach.fileUrl)==='image'"
                :src="attach.fileUrl" />
              <i v-else
                class="tw-ico x60"
                :class="`xr${getFormat(attach.fileUrl)}`"></i>
              <h4>{{attach.fileName}}</h4>
            </li>
          </ul>
        </div>
      </li>

      <!-- 解析底部 -->
      <slot name="analysis-bottom"></slot>
    </ul>

    <slot name="footer"></slot>
  </tw-media-view>
</template>

<script>
import questonMixins from './question-mixins'

export default {
  name: 'tw-question-mobile',

  props: {
    // 标题区显示哪些成员
    titleMembers: {
      type: Array,
      default () {
        return ['degree', 'questionNo', 'title', 'score', 'typeName']
      }
    },

    // 解析显示哪些成员
    analysisMembers: {
      type: Array,
      default () {
        return ['studentScore', 'studentAnswer', 'scoreRate', 'knowledgePoints', 'answer', 'statistics', 'analysis']
      }
    }
  },

  data () {
    return {
      att: []
    }
  },

  mixins: [questonMixins]
}
</script>

<style lang="scss">
@import "./question-mobile.scss";
@import "./join-line.scss";
@import "./question-common.scss";
</style>
