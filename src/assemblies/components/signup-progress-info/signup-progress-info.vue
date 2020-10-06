<template>
  <div v-if="currStep" class="d-inline-block">
    <!-- 状态：'0'-未开始 '1'-进行中 '2'-已完成 '3'-已结束 '2,3'-已完成并为结束状态 -->
    <span class="tw-title-note">{{currTitle}}时间：{{currStep.startTime}} 至 {{currStep.endTime}}，{{`还有${currStep.remainingDay}天报名截止，数据来自教育局后台`}}</span>
    <i class="tw-ico xclock ml-step"></i>
  </div>
</template>

<script>
export default {
  name: 'tw-privateSchoolSignUp-remain-time',

  props: {
    signUpProgressInfo: {
      type: Object,
      required: true
    },

    signUpProgress: {
      type: String,
      required: true
    },

    type: {
      type: String,
      default: 'countdown'
    }
  },

  data () {
    return {
      // 报名进展信息状态: '0'-未开始 '1'-进行中 '2'-已完成 '3'-已结束 '2,3'-已完成并为结束状态 '4'-无需参加
      signUpStatusMap: {
        '0': '未开始',
        '1': '进行中',
        '2': '已完成',
        '3': '已结束',
        '2,3': '已完成(结束)',
        '4': '无需参加'
      }
    }
  },

  computed: {
    // 标题
    currTitle () {
      if (this.signUpProgress === this.UI_SIGNUP_PROGRESS_INFO_COLLECTION) {
        return '采集'
      } else {
        return '报名'
      }
    },

    // 当前的报名步骤
    currStep () {
      if (this.signUpProgress === this.UI_SIGNUP_PROGRESS_INFO_COLLECTION) {
        return this.signUpProgressInfo.infoCollection
      } else if (this.signUpProgress === this.UI_SIGNUP_PROGRESS_PRIVATE_SCHOOL) {
        return {
          batch1: this.signUpProgressInfo.signUp,
          batch2: this.signUpProgressInfo.signUp2
        }
      } else if (this.signUpProgress === this.UI_SIGNUP_PROGRESS_PUBLIC_SCHOOL) {
        return this.signUpProgressInfo.assembleSignUp
      } else if (this.signUpProgress === this.UI_SIGNUP_PROGRESS_HIGH_SCHOOL) {
        return this.signUpProgressInfo.specialitySignUp
      } else {
        return null
      }
    }
  }
}
</script>
