<template>
  <div>
    <ul class="tw-steps xstripe">
      <li v-for="(tn, idx) in timeNodes"
        :key="idx"
        class="tw-steps-item"
        :class="{xdone: tn.status === 'done', xactive: tn.status === 'active', xnoplan: tn.start_time.includes('9999-01-01'), xrisk: tn.status === 'risk', xfaile: tn.ng_status === 'ng'}"
        :style="`z-index:${timeNodes.length - idx};`"
        @click="handleTimeNode(tn, idx)">
        <span>{{tn.text.replace('9999-01-01', '未排期').replace(/\d{4}-/g, '')}}</span>
        <i v-if="tn.kpi_status === 'doing'" class="tw-tag xdot"></i>
        <!-- <a v-if="(!tn.status || tn.status === 'risk') && tn.time_node_name.includes('转测')" class="text-link" style="margin-right: -5px; padding-left: 5px;">转测</a> -->
      </li>
    </ul>

    <!-- 弹窗:提交需求评审 -->
    <tw-modal class="xmedium" :visible.sync="prdReviewModal.visible">
      <template slot="header">需求评审数量</template>
      <template slot="body">
        <tw-scope :data="$api.kpi.submitKpi.params">
          <template v-slot="params">
            <el-form
              ref="form"
              label-width="8em"
              size="medium"
              :model="params">
              <div class="tw-card pl-medium pr-huge pb-step">
                <el-form-item
                  v-if="$app.user.role === $cnt.ROLE_TEAM_LEADER"
                  prop="num"
                  label="启动开发日期：">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="currentTimeNode.actual_start_time"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="date">
                  </el-date-picker>
                </el-form-item>

                <el-form-item
                  label="">
                  <el-checkbox v-model="noKpi">该里程碑无需统计KPI项</el-checkbox>
                </el-form-item>

                <template v-if="!noKpi">
                  <el-form-item
                    v-for="developer in params.kpis.prd_review_num"
                    :key="developer.developer_id"
                    prop="num"
                    :label="developer.developer_name+':'">
                    <el-input v-model.number="developer.kpi_num"></el-input>
                  </el-form-item>
                </template>
              </div>
          </el-form>
          </template>
        </tw-scope>

        <div class="pb-tiny">
          <a class="text-link" :href="project.project_prd_url" target="_blank">需求地址：{{project.project_name}}</a>
        </div>
      </template>
      <template slot="footer">
        <a class="tw-btn xmain" @click="handleKpiSubmit">确定</a>
        <a class="tw-btn xweaking" @click="prdReviewModal.visible=false">取消</a>
      </template>
    </tw-modal>
    <!-- /弹窗:提交需求评审 -->

    <!-- 弹窗:提交转测 -->
    <tw-modal class="xmedium" :visible.sync="testModal.visible">
      <template slot="header">提交转测</template>
      <template slot="body">
        <tw-scope :data="$api.kpi.submitKpi.params">
          <template v-slot="params">
            <el-form
              ref="form"
              label-width="12em"
              size="medium"
              :model="params">
              <div class="tw-card pl-medium pr-huge pb-medium">
                <el-form-item
                  v-if="$app.user.role === $cnt.ROLE_TEAM_LEADER"
                  prop="num"
                  label="转测日期：">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="currentTimeNode.actual_start_time"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="date">
                  </el-date-picker>
                </el-form-item>

                <el-form-item
                  label="">
                  <el-checkbox v-model="noKpi">该里程碑无需统计KPI项</el-checkbox>
                </el-form-item>

                <template v-if="!noKpi">
                  <template v-if="currentTimeNodeIsDelay">
                    <el-form-item
                      prop="num"
                      label="本组延期主责任人：">
                      <div class="el-checkbox-group xorderly mt-tiny">
                        <el-checkbox
                          v-model="developer.kpi_num"
                          v-for="developer in params.kpis.delay_developer_id"
                          :key="developer.developer_id"
                          :true-label="1"
                          :false-label="0">
                          {{developer.developer_name}}
                        </el-checkbox>
                      </div>
                    </el-form-item>

                    <el-form-item
                      prop="num"
                      label="本组延期开发：">
                      <div class="el-checkbox-group xorderly mt-tiny">
                        <el-checkbox
                          v-model="developer.kpi_num"
                          v-for="developer in params.kpis.secondary_delay_developer_id"
                          :key="developer.developer_id"
                          :true-label="1"
                          :false-label="0">
                          {{developer.developer_name}}
                        </el-checkbox>
                      </div>
                    </el-form-item>

                    <el-form-item
                      prop="num"
                      label="延期原因：">
                      <el-input type="textarea" v-model="currentTimeNode.delay_cause" />
                    </el-form-item>
                  </template>

                  <template v-if="$app.user.role === $cnt.ROLE_TEAM_LEADER && currentTimeNode.time_node_name.includes('转测')">
                    <el-form-item
                      prop="num"
                      label="转测状态：">
                      <el-select v-model="currentTimeNode.ng_status" clearable>
                        <el-option label="未出结论" value=""></el-option>
                        <el-option label="通过" value="pass"></el-option>
                        <el-option label="失败" value="ng"></el-option>
                      </el-select>
                    </el-form-item>

                    <template v-if="currentTimeNode.ng_status === 'ng'">
                      <el-form-item
                        prop="num"
                        label="本组转测失败主责任人：">
                        <div class="el-checkbox-group xorderly mt-tiny">
                          <el-checkbox
                            v-model="developer.kpi_num"
                            v-for="developer in params.kpis.ng_developer_id"
                            :key="developer.developer_id"
                            :true-label="1"
                            :false-label="0">
                            {{developer.developer_name}}
                          </el-checkbox>
                        </div>
                      </el-form-item>

                      <el-form-item
                        prop="num"
                        label="本组转测失败开发：">
                        <div class="el-checkbox-group xorderly mt-tiny">
                          <el-checkbox
                            v-model="developer.kpi_num"
                            v-for="developer in params.kpis.secondary_ng_developer_id"
                            :key="developer.developer_id"
                            :true-label="1"
                            :false-label="0">
                            {{developer.developer_name}}
                          </el-checkbox>
                        </div>
                      </el-form-item>
                    </template>
                  </template>

                  <div class="tw-title xsub">
                    <h3 class="tw-title-left">本轮转测遗留Bug数</h3>
                  </div>

                  <el-form-item
                    v-for="developer in params.kpis.delay_bug_num"
                    :key="developer.developer_id"
                    prop="num"
                    :label="developer.developer_name+':'">
                    <el-input v-model.number="developer.kpi_num"></el-input>
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

        <tw-scope :data="$api.kpi.submitKpi.params">
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
                    v-model="currentTimeNode.actual_start_time"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="date">
                  </el-date-picker>
                </el-form-item>

                <el-form-item
                  label="">
                  <el-checkbox v-model="noKpi">该里程碑无需统计KPI项</el-checkbox>
                </el-form-item>

                <template v-if="!noKpi">
                  <div class="js-abc" v-for="(kpiItem, key) in params.kpis" :key="key">
                    <div class="tw-title xsub">
                      <h3 class="tw-title-left">{{projectKpis[key]}}</h3>
                    </div>

                    <el-form-item
                      v-for="developer in kpiItem"
                      :key="developer.developer_id"
                      prop="kpi_num"
                      :label="developer.developer_name+':'">
                      <el-input v-model.number="developer.kpi_num"></el-input>
                    </el-form-item>
                  </div>
                </template>
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
      noKpi: false,

      prdReviewModal: {
        visible: false
      },

      testModal: {
        visible: false
      },

      publishModal: {
        visible: false
      },

      projectKpis: {
        normal_bug_num: '普通Bug数',
        red_bug_num: '红线Bug数',
        org_bug_num: '橙线Bug数',
        design_doc: '设计文档得分'
      },

      jira: {
        keyword: this.project.project_version
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
        const doneTime = this.currentTimeNode.actual_start_time
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
    async handleTimeNode  (timeNode, idx) {
      this.currentTimeNodeIndex = idx
      this.currentTimeNode = timeNode
      this.noKpi = false

      if (timeNode.time_node_name.includes('启动开发')) {
        await this.getApiByTimeNode(['prd_review_num'])
        this.prdReviewModal.visible = true
      } else if (timeNode.time_node_name.includes('转测')) {
        await this.getApiByTimeNode([
          'delay_developer_id',
          'secondary_delay_developer_id',
          'ng_developer_id',
          'secondary_ng_developer_id',
          'delay_bug_num'
        ])
        this.testModal.visible = true
      } else if (timeNode.time_node_name.includes('版本')) {
        await this.getApiByTimeNode([
          'normal_bug_num',
          'red_bug_num',
          'org_bug_num',
          'design_doc'
        ])

        this.publishModal.visible = true
      }
    },

    getApiByTimeNode (kpiTypes) {
      window.aaa = this
      this.$api.kpi.submitKpi.reset()
      return this.$api.kpi.getApisByTimeNode.send({
        time_node_id: this.currentTimeNode.id
      }).then((data) => {
        this.$api.kpi.submitKpi.params.kpis = data.kpis
        this.addKpiItem(kpiTypes, data.kpis)
      })
    },

    addKpiItem (types, params) {
      for (const type of types) {
        for (const item of this.developers) {
          if (!params[type]) {
            this.$set(params, type, [])
          }

          // 以下if语句为判断，只添加在接口返回的数组中不存在的开发
          if (!this.$ui.arr.hasMode(params[type], { developer_id: item.developer_id })) {
            params[type].push({
              kpi_type: type,
              kpi_num: 0,
              kpi_time: this.currentTimeNode.start_time,
              developer_id: item.developer_id,
              developer_name: item.developer_name,
              dev_group: item.dev_group,
              project_id: this.project.id,
              time_node_id: this.currentTimeNode.id
            })
          }
        }

        // 只能改同组的开发人员的数据
        params[type] = params[type].filter(item => item.dev_group === this.$app.user.userGroup)
      }
    },

    handleKpiSubmit () {
      if (this.noKpi) {
        this.$api.kpi.submitKpi.params.kpis = {}
      }

      this.$api.kpi.submitKpi.send({
        time_node: this.currentTimeNode
      }).then(() => {
        this.prdReviewModal.visible = false
        this.testModal.visible = false
        this.$emit('submit')
      })
    },

    submitTest () {
      const params = this.$api.kpi.submitKpi.params.kpis

      // 延期才需要记录延期开发的相关kpi数据
      if (this.currentTimeNodeIsDelay) {
        params.delay_developer_id = params.delay_developer_id.filter(item => item.kpi_num === 1)
        params.secondary_delay_developer_id = params.secondary_delay_developer_id.filter(item => item.kpi_num === 1)
      } else {
        this.currentTimeNode.delay_cause = ''
        params.delay_developer_id = []
        params.secondary_delay_developer_id = []
      }

      // 失败才需要记录失败开发的相关kpi数据
      if (this.currentTimeNode.ng_status === 'ng') {
        params.ng_developer_id = params.ng_developer_id.filter(item => item.kpi_num === 1)
        params.secondary_ng_developer_id = params.secondary_ng_developer_id.filter(item => item.kpi_num === 1)
      } else {
        params.ng_developer_id = []
        params.secondary_ng_developer_id = []
      }

      // 遗留bug没有时，不需要记录其kpi
      params.delay_bug_num = params.delay_bug_num.filter(item => item.kpi_num > 0)

      this.handleKpiSubmit()
    },

    submitProjectKpi () {
      // 设计文档没有时，不需要记录其kpi
      const params = this.$api.kpi.submitKpi.params.kpis
      params.design_doc = params.design_doc.filter(item => item.kpi_num > 0)

      this.handleKpiSubmit()
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
            const item = this.$ui.arr.findMode(this.$api.kpi.submitKpi.params.kpis[type], { developer_name: developer.developer_name })[0]
            item.kpi_num = developer[type]
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

  .tw-steps .tw-tag.xdot {
    position: absolute;
    top: 2px;
    right: 2px;
    min-width: 0;
    width: 5px;
    height: 5px;
    padding: 0;
    background: #5dbe2d;
  }
</style>
