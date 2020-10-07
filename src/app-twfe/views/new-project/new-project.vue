<template>
  <main class="tw-body" @contextmenu.prevent>
    <div class="tw-body-inner xcontainer">
        <div class="tw-crm">
          <router-link class="tw-crm-link" to="/">项目</router-link>
          <i class="tw-crm-arrow"></i>
          <span class="tw-crm-self ml-step">新建项目</span>
        </div>

      <!-- 基本信息 -->
      <tw-scope :data="$api.project.update.params">
        <template v-slot="params">
          <el-form
            ref="form"
            label-width="9em"
            size="medium"
            :model="params"
            :rules="$api.project.update.rules">
            <div class="tw-card pl-medium pr-huge pb-medium">
              <div class="tw-title">
                <h3 class="tw-title-left text-default">基本信息</h3>
              </div>

              <el-row :gutter="20">
                <el-col class="pl-0" :span="12">
                  <el-form-item
                    prop="project.project_name"
                    label="项目名称:">
                    <el-input v-model="params.project.project_name"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    prop="project.project_version"
                    label="项目版本号:">
                    <el-input v-model="params.project.project_version"></el-input>
                  </el-form-item>
                </el-col>

                <el-col class="pl-0" :span="12">
                  <el-form-item
                    prop="project.project_type"
                    label="项目类型:">
                    <tw-api-select
                      v-model="params.project.project_type"
                      :api="$api.project.getTypes"
                      option-value-key="id">
                    </tw-api-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item
                    prop="project.dev_group"
                    label="开发组:">
                    <tw-api-select
                      v-model="params.project.dev_group"
                      :api="$api.user.getGroups"
                      option-value-key="id"
                      @change="$api.user.getUsers.send({groupId:params.project.dev_group})">
                    </tw-api-select>
                  </el-form-item>
                </el-col>

                <template v-if="$api.user.getUsers.data.list.length>0">
                  <div>
                    <el-form-item
                      style="clear:both;"
                      prop="project.developer_ids"
                      label="开发人员:">
                      <el-checkbox-group class="pt-tiny xorderly"
                        v-model="params.project.developer_ids"
                        @change="changeDevlopers">
                        <el-checkbox v-for="item in $api.user.getUsers.data.list" :label="item.id" :key="item.id">
                          <span>{{item.name}}</span>
                          <i class="tw-ico xleader xsmall pl-step" :class="{xactive:params.project.project_leader_id===item.id}" @click.prevent="[params.project.project_leader_id, params.project.project_leader_name]=[item.id,item.name]" title="点亮图标设为项目负责"></i>
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </template>

                <el-form-item
                  style="clear:both;"
                  prop="project.project_svn"
                  label="项目SVN目录:">
                  <el-input v-model="params.project.project_svn"></el-input>
                </el-form-item>

                <el-form-item
                  prop="project.project_prd_url"
                  label="需求文档地址:">
                  <el-input v-model="params.project.project_prd_url"></el-input>
                </el-form-item>

                <el-form-item
                  prop="project.project_design_svn"
                  label="高保真SVN:">
                  <el-input v-model="params.project.project_design_svn"></el-input>
                </el-form-item>

                <el-form-item
                  prop="project.project_psd_svn"
                  label="设计源文件SVN:">
                  <el-input v-model="params.project.project_psd_svn"></el-input>
                </el-form-item>

                <el-form-item
                  prop="project.project_api_svn"
                  label="接口文档地址:">
                  <el-input v-model="params.project.project_api_svn"></el-input>
                </el-form-item>

                <el-form-item
                  prop="project.project_test_case_svn"
                  label="测试用例地址:">
                  <el-input v-model="params.project.project_test_case_svn"></el-input>
                </el-form-item>
              </el-row>
            </div>
            <!-- /基本信息 -->

            <!-- 项目里程碑 -->
            <div class="tw-card px-medium pb-medium">
              <div class="tw-title">
                <h3 class="tw-title-left text-default">
                  <span>项目里程碑</span>
                  <span class="text-weaking text-small text-normal"> (双击添加，右击删除，拖动序号排序)</span>
                </h3>
              </div>

              <div class="tw-twrapper mt-medium" @contextmenu.prevent>
                <table class="tw-table xeditable">
                  <thead>
                    <tr>
                      <th style="width: 4em;">序号</th>
                      <th style="width: 360px;">里程碑名称</th>
                      <th>开始时间</th>
                      <th>备注</th>
                    </tr>
                  </thead>
                  <draggable v-model="params.timeNodes" handle=".jx-handle" tag="tbody">
                    <tr
                      v-for="(timeNode,idx) in params.timeNodes"
                      :key="idx"
                       @dblclick="params.timeNodes.splice(idx+1, 0, $ui.cloneJson($cnt.projectTemplate.timeNode))"
                       @mouseup.right="params.timeNodes.length>1 && (params.timeNodes.splice(idx, 1))">
                      <td class="xhandle jx-handle">{{idx+1}}</td>
                      <td>
                        <el-form-item
                          label-width="0"
                          :prop="`timeNodes.${idx}.time_node_name`"
                          :rules="[{ required: true, message: '请输入里程碑名称', trigger: 'blur' }]">
                          <el-input v-model="timeNode.time_node_name" size="small" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label-width="0"
                          :prop="`timeNodes.${idx}.start_time`"
                          :rules="[{ required: true, message: '请输入开始时间', trigger: 'blur' }]">
                          <el-date-picker
                            v-model="timeNode.start_time"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            size="small"
                            type="date">
                          </el-date-picker>
                        </el-form-item>
                      </td>
                      <td>
                        <el-input v-model="timeNode.remark" size="small" />
                      </td>
                    </tr>
                  </draggable>
                </table>
              </div>
            </div>
            <!-- /项目里程碑 -->

            <!-- 项目计划 -->
            <div v-if="params.project.developer_ids.length>0" class="tw-card px-medium" style="padding-bottom: 1000px;">
              <div class="tw-title" v-fix>
                <h3 class="tw-title-left text-default">
                  <span>项目计划</span>
                  <span class="text-weaking text-small text-normal"> (单击选中，双击添加，右击删除，拖动序号排序)</span>
                </h3>
                <div class="tw-title-right">
                  <el-dropdown @command="doPlan">
                    <a class="tw-btn xmain">
                      <span>按选中行自动排期</span>
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </a>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="one">对应开发的后续计划</el-dropdown-item>
                      <el-dropdown-item command="all">全部开发的后续计划</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>

              <div class="tw-twrapper mt-medium">
                <table class="tw-table xeditable">
                  <thead>
                    <tr>
                      <th style="width: 4em;">序号</th>
                      <th>任务名称</th>
                      <th style="width: 7em;">开发</th>
                      <th style="width: 10em;">难度等级</th>
                      <th style="width: 7em;">工时(人天)</th>
                      <th style="width: 160px;">开始时间</th>
                      <th style="width: 160px;">完成时间</th>
                    </tr>
                  </thead>
                  <draggable v-model="params.plans" handle=".jx-handle" tag="tbody">
                    <template v-for="(plan,idx) in params.plans">
                      <tr v-if="plan.task_type==='group'"
                        :key="idx"
                        @dblclick="params.plans.splice(idx+1, 0, $ui.cloneJson($cnt.projectTemplate.planGroup))"
                        @mouseup.right="params.plans.filter(item=>item.task_type==='group').length>1 && (params.plans.splice(idx, 1))">
                        <td class="xbold xhandle jx-handle" colspan="7">
                          <el-form-item
                            label-width="0"
                            :prop="`plans.${idx}.task_name`"
                            :rules="[{ required: true, message: '请输入任务组名称', trigger: 'blur' }]">
                              <el-input class="xhandle" v-model="plan.task_name" size="small" />
                          </el-form-item>
                        </td>
                      </tr>
                      <tr v-else
                        :key="idx"
                        @dblclick="params.plans.splice(idx+1, 0, $ui.cloneJson($cnt.projectTemplate.plan))"
                        @mouseup.right="params.plans.filter(item=>item.task_type==='normal').length>1 && (params.plans.splice(idx, 1))"
                        @click="currentTaskIndex=idx">
                        <td class="xhandle jx-handle" :class="[idx===currentTaskIndex?'text-link text-bold text-medium':'']">{{idx - getOffsetIdx(idx)}}</td>
                        <td>
                          <el-form-item
                            label-width="0"
                            :prop="`plans.${idx}.task_name`"
                            :rules="[{ required: true, message: '请输入任务名称', trigger: 'blur' }]">
                              <el-input v-model="plan.task_name" size="small" />
                          </el-form-item>
                        </td>
                        <td>
                          <el-form-item
                            label-width="0"
                            :prop="`plans.${idx}.developer_id`"
                            :rules="[{ required: true, message: '请选择开发', trigger: 'change' }]">
                            <el-select v-model="plan.developer_id" @change="(val)=>{params.plans[idx].developer_name=params.project.developer_names[params.project.developer_ids.indexOf(val)]}">
                              <el-option v-for="item in developers"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </td>
                        <td>
                          <el-form-item
                            label-width="0"
                            :prop="`plans.${idx}.degreen`"
                            :rules="[{ required: true, message: '请选择难度', trigger: 'change' }]">
                            <tw-api-select
                              v-model="plan.degreen"
                              :api="$api.dic.degreens"
                              option-value-key="id"
                              option-label-key="degreen_name"
                              @change="plan.task_time=$dic.select($api.dic.degreens.data.list, plan.degreen, 'task_time')">
                            </tw-api-select>
                          </el-form-item>
                        </td>
                        <td>
                          <el-form-item
                            v-if="plan.degreen===9"
                            label-width="0"
                            :prop="`plans.${idx}.task_time`"
                            :rules="[{ required: true, message: '请输入任务工时', trigger: 'blur' }]">
                              <el-input v-model="plan.task_time" size="small" />
                          </el-form-item>

                          <div v-else>{{plan.task_time || '--'}}</div>
                        </td>
                        <td>
                          <el-form-item
                            label-width="0"
                            :prop="`plans.${idx}.start_time`"
                            :rules="[{ required: true, message: '请输入开始时间', trigger: 'change' }]">
                            <el-date-picker
                              type="datetime"
                              v-model="plan.start_time"
                              :disabled="!(plan.degreen+'')"
                              size="small"
                              :placeholder="plan.degreen+'' ? '请输入开始时间':'请先选择难度'"
                              default-time="9:00:00"
                              value-format="yyyy-MM-dd HH:mm"
                              format="yyyy-MM-dd HH:mm"
                              time-arrow-control
                              @change="computeEndTime">
                            </el-date-picker>
                          </el-form-item>
                        </td>
                        <td>
                          {{plan.end_time || '--'}}
                        </td>
                      </tr>
                    </template>
                  </draggable>
                </table>
              </div>

              <div class="text-secondary mt-tiny">
                <div class="text-bold">难度等级说明：</div>
                <p class="text-small"
                  v-for="item in $api.dic.degreens.data.list"
                  :key="item.id">
                  {{`${item.degreen_name}(${item.task_time.toString()}人天) ：${item.remark}`}}
                </p>
                <p class="text-small">普通任务最长排期为3天，攻关任务最长排期为30天，如有超出，请拆解后再排期</p>
                <p class="text-small">任务不能多选开发人员，如同一任务需要多个开发人员，请将任务拆解后再排期</p>
              </div>
            </div>
            <!-- /项目计划 -->
          </el-form>
        </template>
      </tw-scope>

      <div v-fix:bottom class="tw-fixbtns">
        <a class="tw-btn xmedium xmain" @click="submit">保存</a>
        <a class="tw-btn xmedium xweaking">取消</a>
      </div>
    </div>
  </main>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'page-new-project',

  components: {
    draggable
  },

  data () {
    return {
      currentTaskIndex: ''
    }
  },

  computed: {
    projectParams () {
      return this.$api.project.update.params
    },

    planGroupIndexes () {
      const result = []

      this.$api.project.update.params.plans.forEach((item, idx) => {
        if (item.task_type === 'group') {
          result.push(idx)
        }
      })

      return result
    },

    developers () {
      const project = this.$api.project.update.params.project

      return this.$api.project.update.params.project.developer_ids.map((item, idx) => ({
        id: item, name: project.developer_names[idx]
      }))
    },

    groupTaskCount () {
      return this.$api.project.update.params.plans.filter(item => item.task_type === 'group').length
    },

    currentPlan () {
      return this.$api.project.update.params.plans[this.currentTaskIndex]
    }
  },

  methods: {
    init () {
      if (this.$route.query.id) {
        this.$api.project.update.reset()
        this.getProject(this.$route.query.id)
      } else {
        let projectDraft = window.localStorage.getItem('projectDraft')

        if (projectDraft) {
          projectDraft = JSON.parse(projectDraft)
          Object.assign(this.$api.project.update.params, projectDraft)
        } else {
          Object.assign(this.$api.project.update.params, {
            plans: this.$cnt.projectTemplate.plans,
            timeNodes: this.$cnt.projectTemplate.timeNodes
          })
        }
      }
    },

    getProject (id) {
      this.$api.project.getProjects.send({ id }).then(data => {
        if (data.list && data.list[0]) {
          const result = data.list[0]

          result.plans = result.plans.map(item => {
            item.start_time = this.$ui.dateFormat(item.start_time, 'yyyy-mm-dd HH:MM')
            item.end_time = this.$ui.dateFormat(item.end_time, 'yyyy-mm-dd HH:MM')
            return item
          })

          Object.assign(this.$api.project.update.params, {
            id: result.project.id,
            ...result
          })

          this.$api.user.getUsers.send({ groupId: result.project.dev_group })
        }
      })
    },

    changeDevlopers (val) {
      this.$api.project.update.params.project.developer_names = this.$dic.select(this.$api.user.getUsers.data.list, val)

      const params = this.$api.project.update.params

      if (!params.projectLeaderId) {
        [params.project.project_leader_id, params.project.project_leader_name] = [params.project.developer_ids[0], params.project.developer_names[0]]
      }
    },

    setProjectLeader (item) {
      const params = this.$api.project.update.params;
      [params.projectLeaderid, params.projectLeaderName] = [item.id, item.name]
    },

    getOffsetIdx (index) {
      for (var i = 0; i < this.planGroupIndexes.length; i++) {
        if (index < this.planGroupIndexes[i]) {
          break
        }
      }

      return i - 1
    },

    computeTime (currentTime, taskTime) {
      const workday = new this.$ui.Workday({
        taskTime,
        currentTime
      })

      return workday.computedTime
    },

    computeEndTime (startTime) {
      const hourString = startTime.match(/\s(.+)/)[1]

      if (this.$ui.timeOptions.includes(hourString)) {
        this.currentPlan.end_time = this.computeTime(startTime + ':00', this.currentPlan.task_time).endTime
      } else {
        this.$ui.msgBox({
          type: 'info',
          message: `只能选择工作时间，且以半小时为单位：${this.$ui.timeOptions.join('、')}`
        })
      }
    },

    setPlanForDeveloper (developerId) {
      const plans = this.$api.project.update.params.plans
      let startTime = this.currentPlan.start_time

      for (let i = this.currentTaskIndex; i < plans.length; i++) {
        if (plans[i].developer_id === developerId) {
          if (!(plans[i].degreen + '')) {
            this.$ui.msgBox({
              type: 'info',
              message: `请为任务【${plans[i].task_name}】选择难度等级`
            })

            return
          }

          plans[i].start_time = startTime
          const wd = new this.$ui.Workday({ currentTime: startTime + ':00', taskTime: plans[i].task_time })
          plans[i].end_time = wd.computedTime.endTime
          startTime = wd.computedTime.nextStartTime
        }
      }
    },

    doPlan (type) {
      if (!this.currentPlan) {
        this.$ui.msgBox({
          type: 'info',
          message: '请先选择一行做为自动排期的起始点'
        })

        return
      }

      if (!this.currentPlan.developer_id) {
        this.$ui.msgBox({
          type: 'info',
          message: '请先选择当前行的的开发'
        })

        return
      }

      if (!this.currentPlan.end_time) {
        this.$ui.msgBox({
          type: 'info',
          message: '请先选择当前行的开始时间与结束时间'
        })

        return
      }

      let developerId = ''

      if (type === 'one') {
        this.setPlanForDeveloper(this.currentPlan.developer_id)
      } else {
        for (developerId of this.$api.project.update.params.project.developer_ids) {
          this.setPlanForDeveloper(developerId)
        }
      }
    },

    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$api.project.update.send().then(() => {
            window.localStorage.removeItem('projectDraft')
            this.$router.push('/')
          })
        }
      })
    }
  },

  created () {
    this.init()
  },

  watch: {
    projectParams: {
      deep: true,
      handler (val) {
        if (!this.$route.query.id) {
          window.localStorage.setItem('projectDraft', JSON.stringify(val))
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .tw-table.xeditable .el-form-item {
    margin-bottom: 0;
  }

  .tw-table.xeditable .el-form-item.is-error {
    margin-bottom: 22px;
  }
</style>
