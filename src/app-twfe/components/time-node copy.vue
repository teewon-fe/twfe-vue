<template>
  <div>
    <ul class="tw-steps xstripe">
      <li v-for="(tn, idx) in timeNodes"
        :key="idx"
        class="tw-steps-item"
        :class="{xdone: tn.status === 'done', xactive: tn.status === 'active', xrisk: tn.status === 'risk'}"
        :style="`z-index:${timeNodes.length - idx};`"
        @click="handleTimeNode(tn, idx)">
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
              <div class="tw-card pl-medium pr-huge pb-step">
                <el-form-item
                  v-for="developer in project.prd_review_num"
                  :key="developer.developer_id"
                  prop="num"
                  :label="developer.developer_name+':'">
                  <el-input v-model.number="developer.num"></el-input>
                </el-form-item>
              </div>
          </el-form>
          </template>
        </tw-scope>

        <div class="pb-tiny">
          <a class="text-link" :href="project.project_prd_url" target="_blank">需求地址：{{project.project_name}}</a>
        </div>
      </template>
      <template slot="footer">
        <a class="tw-btn xmain" @click="submitPrdReviewNum">确定</a>
        <a class="tw-btn xweaking" @click="prdReviewModal.visible=false">取消</a>
      </template>
    </tw-modal>
    <!-- /弹窗:提交需求评审 -->

    <!-- 弹窗:提交转测 -->
    <tw-modal class="xmedium" :visible.sync="testModal.visible">
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
                    v-model="params.actual_start_time"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="date">
                  </el-date-picker>
                </el-form-item>

                <template v-if="currentTimeNodeIsDelay">
                  <el-form-item
                    prop="num"
                    label="本组延期负责人：">
                    <el-select v-model="testParams.delay_developer_id" multiple clearable>
                      <el-option v-for="devloper in sameGroupDevelopers"
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
                    label="本组转测失败负责人：">
                    <el-select v-model="testParams.ng_developer_id" multiple clearable>
                      <el-option v-for="devloper in sameGroupDevelopers"
                        :key="devloper.developer_id"
                        :label="devloper.developer_name"
                        :value="devloper.developer_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>

                <div class="tw-title xsub">
                  <h3 class="tw-title-left">本轮转测遗留Bug数</h3>
                </div>

                <el-form-item
                  v-for="developer in params.delay_bug_num"
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
        <a class="tw-btn xmain" @click="submitTest">确定</a>
        <a class="tw-btn xweaking" @click="testModal.visible=false">取消</a>
      </template>
    </tw-modal>
    <!-- /弹窗:提交转测 -->

    <!-- 弹窗:版本发布 -->
    <tw-modal class="xmedium" :visible.sync="publishModal.visible">
      <template slot="header">版本发布</template>

      <template slot="body">
        <div class="text-center pr-huge pl-tiny">
          <tw-search
            style="width: 100%;"
            v-model="jira.keyword"
            placeholder="请输入jira影响版本关键字..."
            @search="searchJira">
          </tw-search>
        </div>

        <tw-scope :data="$api.project.updatePublishInfo.params">
          <template v-slot="params">
            <el-form
              ref="form"
              label-width="6em"
              size="medium"
              :model="params">
              <div class="tw-card pl-medium pr-huge pb-step">
                <el-form-item
                  v-if="$app.user.role === $cnt.ROLE_TEAM_LEADER"
                  prop="num"
                  label="发布日期：">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="$api.project.updateActualStartTime.params.actual_start_time"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="date">
                  </el-date-picker>
                </el-form-item>

                <div class="js-abc" v-for="kpiItem in projectKpis" :key="kpiItem.key">
                  <div class="tw-title xsub">
                    <h3 class="tw-title-left">{{kpiItem.name}}</h3>
                  </div>

                  <el-form-item
                    v-for="developer in params[kpiItem.key]"
                    :key="developer.developer_id"
                    prop="num"
                    :label="developer.developer_name+':'">
                    <el-input v-model.number="developer.num"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </template>
        </tw-scope>

        <div class="pb-tiny">
          <a class="text-link" :href="$app.jiraUrl" target="_blank">去jira查看</a>
        </div>
      </template>

      <template slot="footer">
        <a class="tw-btn xmain" @click="submitProjectKpi">确定</a>
        <a class="tw-btn xweaking" @click="publishModal.visible=false">取消</a>
      </template>
    </tw-modal>
    <!-- /弹窗:版本发布 -->
  </div>
</template>

<script>
export default {
  name: 'tw-time-node',

  props: {
    project: {
      type: Object,
      require: true
    }
  },

  data () {
    return {
      currentTimeNode: null,
      currentTimeNodeIndex: 0,

      prdReviewModal: {
        visible: false
      },

      testModal: {
        visible: false
      },

      publishModal: {
        visible: false
      },

      projectKpis: [
        { key: 'normal_bug_num', name: '普通Bug数' },
        { key: 'red_bug_num', name: '红线Bug数' },
        { key: 'org_bug_num', name: '橙线Bug数' },
        { key: 'design_doc', name: '设计文档得分' }
      ],

      testParams: {
        delay_developer_id: [],
        ng_developer_id: [],
        delay_bug_num: []
      },

      jira: {
        keyword: ''
      }
    }
  },

  computed: {
    developers () {
      return this.project.developers
    },

    timeNodes () {
      return this.project.timeNodes
    },

    currentTimeNodeIsDelay () {
      if (this.currentTimeNode) {
        const doneTime = this.$api.project.updateTestInfo.params.actual_start_time
        return (doneTime ? new Date(doneTime).getTime() : Date.now()) - new Date(this.currentTimeNode.start_time).getTime() > 0
      } else {
        return false
      }
    },

    developerIds () {
      return this.developers.map(item => item.developer_id)
    },

    sameGroupDevelopers () {
      return this.developers.filter(item => item.dev_group === this.$app.user.userGroup).map(item => ({
        dev_group: item.dev_group,
        developer_id: item.developer_id,
        developer_name: item.developer_name
      }))
    }
  },

  methods: {
    handleTimeNode (timeNode, idx) {
      this.currentTimeNodeIndex = idx
      this.currentTimeNode = timeNode

      if (timeNode.time_node_name.includes('启动开发')) {
        this.generateProjectKpiItem(['prd_review_num'], this.$api.kpi.submitKpi.params)
        this.prdReviewModal.visible = true
      } else if (timeNode.time_node_name.includes('转测')) {
        this.generateTestParams()
        this.testModal.visible = true
      } else if (timeNode.time_node_name.includes('版本')) {
        this.$api.project.updateActualStartTime.params.actual_start_time = this.currentTimeNode.actual_start_time || ''
        this.generateProjectKpiItem(this.projectKpis.map(item => item.key), this.$api.project.updatePublishInfo.params)
        this.publishModal.visible = true
      }
    },

    generateProjectKpiItem (types, params) {
      for (const type of types) {
        params[type] = JSON.parse(JSON.stringify(this.project[type])) || []

        for (const item of this.developers) {
        // 以下if语句为判断，只添加在接口返回的数组中不存在的开发
          if (!this.$ui.arr.hasMode(params[type], { developer_id: item.developer_id })) {
            params[type].push({
              dev_group: item.dev_group,
              developer_id: item.developer_id,
              developer_name: item.developer_name,
              num: 0
            })
          }
        }

        // 只能改同组的开发人员的数据
        params[type] = params[type].filter(item => item.dev_group === this.$app.user.userGroup)
      }
    },

    generateTestParams () {
      const testApiParams = this.$api.project.updateTestInfo.params
      testApiParams.actual_start_time = this.currentTimeNode.actual_start_time
      testApiParams.delay_cause = this.currentTimeNode.delay_cause
      testApiParams.ng_status = this.currentTimeNode.ng_status

      for (const key of Object.keys(this.testParams)) {
        this.$set(testApiParams, key, JSON.parse(JSON.stringify(this.currentTimeNode[key])) || [])
        this.testParams[key] = testApiParams[key].map(item => item.developer_id)
      }

      for (const item of this.developers) {
        // 以下if语句为判断，只添加在接口返回的数组中不存在的开发
        if (!this.$ui.arr.hasMode(testApiParams.delay_bug_num, { developer_id: item.developer_id })) {
          testApiParams.delay_bug_num.push({
            dev_group: item.dev_group,
            developer_id: item.developer_id,
            developer_name: item.developer_name,
            num: 0
          })
        }
      }

      // 只能改同组的开发人员的数据
      testApiParams.delay_bug_num = testApiParams.delay_bug_num.filter(item => item.dev_group === this.$app.user.userGroup)
    },

    submitPrdReviewNum () {
      this.$api.project.updatePrdReviewNum.send({
        id: this.currentTimeNode.id,
        project_id: this.project.id
      }).then(() => {
        this.prdReviewModal.visible = false
        this.$emit('submit')
      })
    },

    submitTest () {
      const params = this.$api.project.updateTestInfo.params

      params.id = this.currentTimeNode.id

      if (this.currentTimeNodeIsDelay) {
        params.delay_developer_id = this.sameGroupDevelopers.filter(item => this.testParams.delay_developer_id.includes(item.developer_id))
        params.secondary_delay_developer_id = this.sameGroupDevelopers.filter(item => !this.testParams.delay_developer_id.includes(item.developer_id))
      } else {
        params.delay_developer_id = []
        params.secondary_delay_developer_id = []
      }

      if (params.ng_status === 'ng') {
        params.ng_developer_id = this.sameGroupDevelopers.filter(item => this.testParams.ng_developer_id.includes(item.developer_id))
        params.secondary_ng_developer_id = this.sameGroupDevelopers.filter(item => !this.testParams.ng_developer_id.includes(item.developer_id))
      } else {
        params.ng_developer_id = []
        params.secondary_ng_developer_id = []
      }

      params.delay_bug_num = params.delay_bug_num.filter(item => item.num > 0)

      this.$api.project.updateTestInfo.send().then(() => {
        this.testModal.visible = false
        this.$emit('submit')
      })
    },

    submitProjectKpi () {
      this.$api.project.updateActualStartTime.send({
        id: this.currentTimeNode.id
      })

      this.$api.project.updatePublishInfo.send({
        id: this.project.id
      }).then(() => {
        this.publishModal.visible = false
        this.$emit('submit')
      })
    },

    searchJira () {
      this.$api.kpi.jira.send({
        keyword: this.jira.keyword,
        users: this.project.developers.map(item => ({
          developer_name: item.developer_name,
          developer_id: item.developer_id
        }))
      }).then(data => {
        const types = ['normal_bug_num', 'red_bug_num', 'org_bug_num']

        for (const developer of data.list) {
          for (let i = 0; i < types.length; i++) {
            const type = types[i]
            const item = this.$ui.arr.findMode(this.$api.project.updatePublishInfo.params[type], { developer_name: developer.developer_name })[0]
            item.num = developer[type]
          }
        }
      })
    }
  },

  created () {
    this.$api.project.updatePrdReviewNum.reset()
    this.$api.project.updateTestInfo.reset()
  },

  watch: {
    currentTimeNodeIsDelay (val) {
      if (!val) {
        const params = this.$api.project.updateTestInfo.params
        params.delay_cause = ''
        params.secondary_delay_developer_id = []
        params.secondary_delay_developer_id = []
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
    padding: 0 6px;
    margin-bottom: 5px;
    width: 110px;
  }

  .tw-steps-item  {
    color: #333;
  }

  .tw-steps.xstripe > .tw-steps-item {
    border-left: 1px solid #fff;
  }

  .tw-steps.xstripe > .tw-steps-item::after {
    display: none;
  }
</style>
