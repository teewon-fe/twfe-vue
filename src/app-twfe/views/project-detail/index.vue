<template>
  <main class="tw-body">
    <div class="tw-body-inner xcontainer">
      <div class="tw-crm">
        <router-link class="tw-crm-link" to="/home">项目列表</router-link>
        <i class="tw-crm-arrow"></i>
        <span class="tw-crm-self ml-step">{{project.project_name}}</span>
      </div>

      <!-- 概要 -->
      <div class="tw-card mb-medium pb-medium">
        <!-- 项目:标题 -->
        <div class="tw-title xnomark xico">
          <div class="tw-title-left">
            <i class="tw-ico xeco xsmall"></i>
            <span class="text-default">{{project.project_name}}</span>
          </div>
          <div class="tw-title-right">
            <template v-if="$app.user.role === $cnt.ROLE_TEAM_LEADER">
              <router-link class="tw-icobtn" :to="`/new-project?id=${$route.query.id}`"><i class="tw-ico xedit"></i>编辑</router-link>
              <a class="tw-icobtn" @click="delProject"><i class="tw-ico xdel"></i>删除</a>
            </template>
          </div>
        </div>
        <!-- /项目:标题 -->

        <div class="tw-grid xpc4 xlpad4 xpad4 text-center">
          <div v-if="leader" class="tw-grid-col">
            <div class="text-large">{{leader.name || '--'}}</div>
            <div class="text-small text-weaking scale-less-medium">{{leader.mobile || '--'}}(手机)</div>
            <div class="text-medium"><i class="tw-ico xdev dt-n1 mr-3"></i>开发负责人</div>
          </div>

          <div v-if="!$app.testVersion.includes('twfe') && feLeader" class="tw-grid-col">
            <div class="text-large">{{feLeader.name || '--'}}</div>
            <div class="text-small text-weaking scale-less-medium">{{feLeader.mobile || '--'}}(手机)</div>
            <div class="text-medium"><i class="tw-ico xfe dt-n1 mr-3" style="margin-right: -3px;"></i>前端负责人</div>
          </div>

          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">{{project.invested_time}}</span>/{{project.task_time}}</div>
            <div class="text-small text-weaking scale-less-medium">已投入/总工时(人天)</div>
            <div class="text-medium"><i class="tw-ico xcmonth dt-n1 mr-3"></i>项目工时</div>
          </div>

          <div v-if="$app.testVersion.includes('twfe')" class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">--</span>/1.5</div>
            <div class="text-small text-weaking scale-less-medium">当前/目标(页/人天)</div>
            <div class="text-medium"><i class="tw-ico xspeed dt-n1 mr-3"></i>项目效率</div>
          </div>

          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">--</span>/--</div>
            <div class="text-small text-weaking scale-less-medium">本月/总数(个)</div>
            <div class="text-medium"><i class="tw-ico xbug dt-n1 mr-3"></i>项目缺陷</div>
          </div>
        </div>
      </div>
      <!-- /概要 -->

      <!-- 项目 -->
      <div class="tw-card xradius px-medium pb-huge" v-bottom="70">
        <div class="tw-title">
          <h3 class="tw-title-left text-default">项目详情</h3>
          <div class="tw-title-right">
            <tw-time-node
              v-if="project.developers && project.developers.length > 0"
              :project="project"
              @submit="getProject">
            </tw-time-node>
          </div>
        </div>

        <!-- 项目:进度图表 -->
        <div class="text-small">
          <a class="tw-tag xsmall dt-n1 p-0 mr-step" :class="{xrisk: project.status==='risky', xnormal: project.status!=='risky'}"></a>
          <span v-if="project.status==='risky'" class="text-secondary">
            <span>有风险, 进度延期{{project.delay}}天({{parseInt(project.expectant_progress - project.progress)}}%)；</span>
            <span v-for="(delayDev, devIdx) in project.delayDevelopers" :key="devIdx">
              <span>【{{delayDev.developer_name}}】延期</span>
              <span class="text-bold">{{delayDev.delay}}天</span>
              <span v-if="devIdx < project.delayDevelopers.length - 1">,</span>
            </span>
          </span>
          <span v-else>{{$dic.select($dic.projectStatus, project.status)}}</span>
        </div>

        <div class="tw-flex align-items-center text-center">
          <div style="width: 30%;">
            <el-progress type="circle" :width="150" :percentage="project.progress" :stroke-width="8" :color="project.status==='risky'?'#f56c6c':'#218fff'"></el-progress>
            <!-- <div class="text-weaking">总体进度</div> -->
          </div>
          <div class="tw-flex-body">
            <!-- http://echartsjs.com/option.html#yAxis -->
            <tw-chart
              height="240px"
              categoryKey="developer_name"
              :option="{legend: {show:false},tooltip:{formatter:'{b}<br />完成：{c}%'}}"
              :dataMaps="project.chartDataMaps">
            </tw-chart>
          </div>
        </div>

        <!-- /项目:进度图表 -->

        <tw-collapse-group>
          <div class="text-center mt-medium">
            <ul class="tw-btngroup">
              <li class="js-project1-schedule">
                <a class="tw-btn xweaking">进度详情</a>
              </li>
              <li class="js-project1-info">
                <a class="tw-btn xweaking">项目信息</a>
              </li>
            </ul>
          </div>

          <div v-if="[$cnt.ROLE_TEAM_LEADER].includes($app.user.role) || (project && project.developer_ids && project.developer_ids.includes($app.user.userId))" class="text-right">
            <a v-if="progressInputVisibal" class="text-link" @click="closeModify">修改完成</a>
            <a v-else class="text-link" @click="progressInputVisibal = true">修改进度</a>
          </div>

          <!-- 项目:计划详情 -->
          <tw-collapse
            default-open
            switch=".js-project1-schedule">
            <div class="tw-twrapper mt-step">
              <table class="tw-table xnowrap xprogress">
                <thead>
                  <tr>
                    <th style="width: 4em;">序号</th>
                    <th style="width: 300px;">任务名称</th>
                    <th>开发</th>
                    <th style="width: 150px;">进度</th>
                    <th>难度等级</th>
                    <th style="width: 70px;">工时</th>
                    <th style="width: 130px;">开始时间</th>
                    <th style="width: 130px;">完成时间</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(plan,idx) in project.plans">
                    <tr v-if="plan.task_type==='group'" :key="plan.id">
                      <td class="text-bold" colspan="8">{{plan.task_name}}</td>
                    </tr>
                    <tr v-else
                      :key="plan.id">
                      <td>{{idx - getOffsetIdx(idx)}}</td>
                      <td>{{plan.task_name}}</td>
                      <td>{{plan.developer_name}}</td>
                      <td>
                        <el-select
                          v-if="progressInputVisibal && (plan.developer_id === $app.user.userId || [$cnt.ROLE_TEAM_LEADER].includes($app.user.role))"
                          v-model="plan.progress"
                          size="mini"
                          @change="$api.project.updatePlan.send({id: plan.id, progress: plan.progress})">
                          <el-option
                            v-for="item in $dic.progressList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                        <el-progress v-else :percentage="plan.progress*100" :format="format" :color="plan.status==='risky'?'#f56c6c':'#218fff'"></el-progress>
                      </td>
                      <td>{{$dic.select($api.dic.degreens.data.list, plan.degreen, 'degreen_name')}}</td>
                      <td>{{plan.task_time}}</td>
                      <td>{{$ui.dateFormat(plan.start_time, 'yyyy-mm-dd HH:MM')}}</td>
                      <td>{{$ui.dateFormat(plan.end_time, 'yyyy-mm-dd HH:MM')}}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </tw-collapse>
          <!-- /项目:计划详情 -->

          <!-- 项目:地址信息 -->
          <tw-collapse
            switch=".js-project1-info">
            <div class="tw-twrapper mt-medium">
              <table class="tw-table">
                <thead>
                  <tr>
                    <th style="width: 200px;">项目相关url</th>
                    <th>url</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="project.project_svn">
                    <td>项目SVN目录</td>
                    <td><a class="text-link" :href="project.project_svn" target="_blank">{{project.project_svn}}</a></td>
                  </tr>
                  <tr v-if="project.project_prd_url">
                    <td>需求文档地址</td>
                    <td><a class="text-link" :href="project.project_prd_url" target="_blank">{{project.project_prd_url}}</a></td>
                  </tr>
                  <tr v-if="project.project_design_svn">
                    <td>高保真SVN</td>
                    <td><a class="text-link" :href="project.project_design_svn" target="_blank">{{project.project_design_svn}}</a></td>
                  </tr>
                  <tr v-if="project.project_psd_svn">
                    <td>设计源文件SVN</td>
                    <td><a class="text-link" :href="project.project_psd_svn" target="_blank">{{project.project_psd_svn}}</a></td>
                  </tr>
                  <tr v-if="project.project_api_svn">
                    <td>接口文档地址</td>
                    <td><a class="text-link" :href="project.project_api_svn" target="_blank">{{project.project_api_svn}}</a></td>
                  </tr>
                  <tr v-if="project.project_test_case_svn">
                    <td>测试用例地址</td>
                    <td><a class="text-link" :href="project.project_test_case_svn" target="_blank">{{project.project_test_case_svn}}</a></td>
                  </tr>
                  <tr v-if="project.remark">
                    <td>备注</td>
                    <td><pre>{{project.remark}}</pre></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </tw-collapse>
          <!-- /项目:地址信息 -->
        </tw-collapse-group>
      </div>
      <!-- /项目 -->
    </div>
  </main>
</template>

<script>
export default {
  name: 'page-project-detail',

  data () {
    return {
      progressInputVisibal: false
    }
  },

  computed: {
    planGroupIndexes () {
      const result = []

      this.project.plans.forEach((item, idx) => {
        if (item.task_type === 'group') {
          result.push(idx)
        }
      })

      return result
    },

    project () {
      if (this.$api.project.getProjects.data.list[0]) {
        const project = this.$api.project.getProjects.data.list[0]

        let colors = []

        for (const developer of project.developers) {
          colors.push(developer.progress < developer.expectant_progress ? '#fb6c84' : '#218fff')
        }

        project.developers.forEach(item => (item.total = 100))

        return {
          ...project.project,
          developers: project.developers,
          delayDevelopers: project.developers.filter(item => item.delay > 0),
          timeNodes: project.timeNodes,
          plans: project.plans,
          chartDataMaps: [
            {
              name: '百分比',
              type: 'bar',
              dataset: project.developers,
              dataKey: 'total',
              barWidth: 30,
              barGap: '-100%',
              itemStyle: {
                normal: {
                  color: '#ebeef5'
                },
                barBorderRadius: 0
              },
              tooltip: {
                show: false
              }
            },
            {
              name: '已完成',
              type: 'bar',
              dataset: project.developers,
              dataKey: 'progress',
              barWidth: 30,
              itemStyle: {
                barBorderRadius: 0
              },
              colors
            }
          ]
        }
      } else {
        return {
          plans: [],
          timeNodes: [],
          chartData: [],
          chartDataMaps: []
        }
      }
    },

    leader () {
      if (this.$api.user.getUsers.data.list.length > 0) {
        return this.$ui.arr.findMode(this.$api.user.getUsers.data.list, { id: this.project.project_leader_id })[0]
      } else {
        return {}
      }
    },

    feLeader () {
      if (this.$api.user.getUsers.data.list.length > 0) {
        return this.$ui.arr.findMode(this.$api.user.getUsers.data.list, { id: this.project.project_fe_leader_id })[0]
      } else {
        return {}
      }
    }
  },

  methods: {
    format (percentage) {
      return `${percentage}%`
    },

    getProject () {
      this.$api.project.getProjects.reset().send({
        id: this.$route.query.id
      }).then(data => {
        if (data.list && data.list[0]) {
          let project = data.list[0].project

          if (project.dev_group) {
            this.$api.user.getUsers.send({ groupIds: project.dev_group })
          }
        }
      })
    },

    getOffsetIdx (index) {
      for (var i = 0; i < this.planGroupIndexes.length; i++) {
        if (index < this.planGroupIndexes[i]) {
          break
        }
      }

      return i - 1
    },

    delProject () {
      this.$prompt('该删除为物理删除，不可恢复，请输入登录密码继续：', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{6}/,
        inputErrorMessage: '请输入密码',
        inputPlaceholder: '请输入您的登录密码'
      }).then(({ value }) => {
        this.$api.project.del.send({
          pwd: btoa(value).replace(/=+$/g, ''),
          id: this.$route.query.id
        }).then(data => {
          this.$ui.msg('删除成功')
          this.$router.push('/')
        }).catch(e => {
          this.$ui.msg({
            type: 'error',
            message: '删除失败'
          })
        })
      }).catch(() => {
        // noop
      })
    },

    closeModify () {
      this.progressInputVisibal = false
      this.getProject()
    }
  },

  created () {
    if (this.$route.query.id) {
      this.getProject()
      this.$api.dic.degreens.send()
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">

</style>
