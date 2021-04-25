<template>
  <div>
    <ul class="tw-steps xstripe">
      <li v-for="(tn, idx) in timeNodes"
        :key="idx"
        class="tw-steps-item"
        :class="{xdone: tn.status === 'done', xactive: tn.status === 'active', xrisk: tn.status === 'risk'}"
        :style="`z-index:${timeNodes.length - idx};`"
        @click="handleTimeNode(tn)">
        <span>{{tn.text.replace(/\d{4}-/g, '')}}</span>
        <!-- <a v-if="(!tn.status || tn.status === 'risk') && tn.time_node_name.includes('转测')" class="text-link" style="margin-right: -5px; padding-left: 5px;">转测</a> -->
      </li>
    </ul>

    <!-- 弹窗:提交需求评审 -->
    <tw-modal class="xmedium" :visible.sync="prdReviewModal.visible">
      <template slot="header">需求评审数量</template>
      <template slot="body">
        <tw-scope :data="$api.project.updatePrdReviewNum.params">
          <template v-slot="params">
            <el-form
              ref="form"
              label-width="5em"
              size="medium"
              :model="params">
              <div class="tw-card pl-medium pr-huge pb-medium">
                <el-form-item
                  v-for="developer in developersPrd"
                  :key="developer.developer_id"
                  prop="num"
                  :label="developer.developer_name+':'">
                  <el-input v-model="developer.num"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </template>
        </tw-scope>
      </template>
      <template slot="footer">
        <a class="tw-btn xmain" @click="submitPrdReviewNum">确定</a>
        <a class="tw-btn xweaking" @click="prdReviewModal.visible=false">取消</a>
      </template>
    </tw-modal>
    <!-- /弹窗:提交需求评审 -->

    <!-- 弹窗:提交转测 -->
    <tw-modal class="xfull" :visible.sync="testModal.visible">
      <template slot="header">提交转测</template>
      <template slot="body">
        <tw-scope :data="$api.project.updateTestInfo.params">
          <template v-slot="params">
            <el-form
              ref="form"
              label-width="11em"
              size="medium"
              :model="params">
              <div class="tw-card pl-medium pr-huge pb-medium">
                <el-form-item
                  v-if="$app.user.role === $cnt.ROLE_TEAM_LEADER"
                  prop="num"
                  label="转测日期：">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="params.done_time"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="date">
                  </el-date-picker>
                </el-form-item>

                <template v-if="currentTimeNodeIsDelay">
                  <el-form-item
                    prop="num"
                    label="延期主负责人：">
                    <el-select v-model="params.delay_developer_id" multiple clearable>
                      <el-option v-for="devloper in developers"
                        :key="devloper.developer_id"
                        :label="devloper.developer_name"
                        :value="devloper.developer_id">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item
                    prop="num"
                    label="延期原因：">
                    <el-input type="textarea" v-model="params.delay_cause" />
                  </el-form-item>
                </template>

                <template v-if="$app.user.role === $cnt.ROLE_TEAM_LEADER && currentTimeNode.time_node_name.includes('转测')">
                  <el-form-item
                    prop="num"
                    label="转测状态：">
                    <el-select v-model="params.ng_status" clearable @change="params.ng_developer_id = []">
                      <el-option label="未出结论" value=""></el-option>
                      <el-option label="通过" value="pass"></el-option>
                      <el-option label="失败" value="ng"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item
                    v-if="params.ng_status === 'ng'"
                    prop="num"
                    label="转测失败主负责人：">
                    <el-select v-model="params.ng_developer_id" multiple clearable>
                      <el-option v-for="devloper in developers"
                        :key="devloper.developer_id"
                        :label="devloper.developer_name"
                        :value="devloper.developer_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </div>
            </el-form>
          </template>
        </tw-scope>
      </template>
      <template slot="footer">
        <a class="tw-btn xmain" @click="submitTest">确定</a>
        <a class="tw-btn xweaking" @click="testModal.visible=false">取消</a>
      </template>
    </tw-modal>
    <!-- /弹窗:提交转测 -->
  </div>
</template>

<script>
export default {
  name: 'tw-time-node',

  props: {
    developers: {
      type: Array,
      default () {
        return []
      }
    },

    timeNodes: {
      type: Array,
      require: true
    }
  },

  data () {
    return {
      currentTimeNode: null,

      prdReviewModal: {
        visible: false
      },

      testModal: {
        visible: false
      },

      developersPrd: []
    }
  },

  computed: {
    currentTimeNodeIsDelay () {
      if (this.currentTimeNode) {
        const doneTime = this.$api.project.updateTestInfo.params.done_time
        return (doneTime ? new Date(doneTime).getTime() : Date.now()) - new Date(this.currentTimeNode.start_time).getTime() > 0
      } else {
        return false
      }
    },

    developerIds () {
      return this.developers.map(item => item.developer_id)
    }
  },

  methods: {
    handleTimeNode (timeNode) {
      this.currentTimeNode = timeNode

      if (timeNode.time_node_name.includes('启动开发')) {
        this.prdReviewModal.visible = true
      } else if (timeNode.time_node_name.includes('转测')) {
        this.testModal.visible = true
      }
    },

    generateDeveloperPrd () {
      this.developersPrd = []

      for (const item of this.developers) {
        // 只能修改自己同组的人的数据
        if (item.dev_group === this.$app.user.userGroup) {
          this.developersPrd.push({
            developer_id: item.developer_id,
            developer_name: item.developer_name,
            num: 0
          })
        }
      }
    },

    submitPrdReviewNum () {
      this.$api.project.updatePrdReviewNum.send({
        id: this.currentTimeNode.id,
        prd_review_nums: this.developersPrd
      }).then(() => {
        this.prdReviewModal.visible = false
      })
    },

    submitTest () {
      const params = this.$api.project.updateTestInfo.params

      params.id = this.currentTimeNode.id

      if (this.currentTimeNodeIsDelay) {
        params.secondary_ng_developer_id = this.developerIds.filter(item => !params.delay_developer_id.includes(item))
      }

      if (params.ng_status === 'ng') {
        params.secondary_delay_developer_ids = this.developerIds.filter(item => !params.ng_developer_id.includes(item))
      }

      this.$api.project.updateTestInfo.send().then(() => {
        this.testModal.visible = false
      })
    }
  },

  created () {
    this.$api.project.updatePrdReviewNum.reset()
    this.$api.project.updateTestInfo.reset()
    this.generateDeveloperPrd()
  },

  watch: {
    currentTimeNodeIsDelay (val) {
      if (!val) {
        const params = this.$api.project.updateTestInfo.params
        params.delay_cause = ''
        params.secondary_delay_developer_ids = []
        params.secondary_delay_developer_ids = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tw-steps.xstripe {
      cursor: pointer;
    }

    .tw-steps-item.xrisk .text-link {
      color: #6ec940 !important;

      &:hover {
        color: #5dbe2d !important;
      }
    }

  .tw-steps.xstripe {
    display: block;
    height: auto;
    padding-right: 0;
  }

  .tw-steps.xstripe > .tw-steps-item {
    display: inline-block;
    padding: 0 10px;
    margin-bottom: 5px;
    width: 110px;
  }

  .tw-steps-item  {
    color: #666;
  }

  .tw-steps.xstripe > .tw-steps-item {
    border-left: 1px solid #fff;
  }

  .tw-steps.xstripe > .tw-steps-item::after {
    display: none;
  }
</style>
