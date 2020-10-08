<template>
  <main class="tw-body">
    <div class="tw-body-inner xcontainer">
      <div class="tw-crm">
        <router-link class="tw-crm-link" to="/">项目</router-link>
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
            <router-link class="tw-icobtn" :to="`/new-project?id=${$route.query.id}`"><i class="tw-ico xedit"></i>编辑</router-link>
            <a class="tw-icobtn"><i class="tw-ico xdel"></i>删除</a>
          </div>
        </div>
        <!-- /项目:标题 -->

        <div class="tw-grid xpc4 xlpad4 xpad4 text-center">
          <div class="tw-grid-col">
            <div class="text-large">{{leader.user_name || '--'}}</div>
            <div class="text-small text-weaking scale-less-medium">{{leader.mobile || '--'}}(手机)</div>
            <div class="text-medium"><i class="tw-ico xdev dt-n1 mr-3"></i>项目负责人</div>
          </div>

          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">{{project.investedTime}}</span>/{{project.taskTime}}</div>
            <div class="text-small text-weaking scale-less-medium">已投入/总工时(人天)</div>
            <div class="text-medium"><i class="tw-ico xcmonth dt-n1 mr-3"></i>项目工时</div>
          </div>

          <div class="tw-grid-col">
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
            <ul class="tw-steps xstripe">
              <li v-for="(tn, idx) in project.timeNodes"
                :key="idx"
                class="tw-steps-item"
                :class="{xdone: tn.status === 'done', xactive: tn.status === 'active'}"
                :style="`z-index:${project.timeNodes.length - idx};`">
                <span>{{tn.text}}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 项目:进度图表 -->
        <div class="text-small">
          <a class="tw-tag xsmall dt-n1 p-0 mr-step" :class="{xrisk: project.status==='有风险', xnormal: project.status!=='有风险'}"></a>
          <span v-if="project.status==='有风险'" class="text-secondary">有风险, 进度延期{{parseInt(project.expectantProgress - project.progress)}}%</span>
          <span v-else>{{project.status}}</span>
        </div>

        <div class="tw-flex align-items-center text-center">
          <div style="width: 30%;">
            <el-progress type="circle" :width="150" :percentage="project.progress" :stroke-width="8" :color="project.status==='有风险'?'#fb6c84':'#218fff'"></el-progress>
            <!-- <div class="text-weaking">总体进度</div> -->
          </div>
          <div class="tw-flex-body">
            <!-- http://echartsjs.com/option.html#yAxis -->
            <tw-chart
              height="240px"
              categoryKey="name"
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

          <!-- 项目:计划详情 -->
          <tw-collapse
            default-open
            switch=".js-project1-schedule">
            <div class="tw-twrapper mt-medium">
              <table class="tw-table">
                <thead>
                  <tr>
                    <th style="width: 4em;">序号</th>
                    <th style="width: 300px;">任务名称</th>
                    <th>难度等级</th>
                    <th>工时</th>
                    <th>计划开始时间</th>
                    <th>计划完成时间</th>
                    <th style="width: 150px;">进度</th>
                    <th>开发</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(plan,idx) in project.plans">
                    <tr v-if="plan.task_type==='group'" :key="plan.id">
                      <td class="text-bold" colspan="8">{{plan.task_name}}</td>
                    </tr>
                    <tr v-else :key="plan.id">
                      <td>{{idx - getOffsetIdx(idx)}}</td>
                      <td>{{plan.task_name}}</td>
                      <td>{{$dic.select($api.dic.degreens.data.list, plan.degreen, 'degreen_name')}}</td>
                      <td>{{plan.task_time}}</td>
                      <td>{{$ui.dateFormat(plan.start_time, 'yyyy-mm-dd HH:MM')}}</td>
                      <td>{{$ui.dateFormat(plan.end_time, 'yyyy-mm-dd HH:MM')}}</td>
                      <td>
                        <el-progress :percentage="plan.progress*100" :format="format" :color="plan.status==='有风险'?'#fb6c84':'#218fff'"></el-progress>
                      </td>
                      <td>{{plan.developer_name}}</td>
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
                    <th style="width: 200px;">项目</th>
                    <th>URL地址</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>项目名称</td>
                    <td class="text-secondary">ECO数据开放平台</td>
                  </tr>
                  <tr>
                    <td>项目类型</td>
                    <td class="text-secondary">门户类前台项目</td>
                  </tr>
                  <tr>
                    <td>项目SVN目录</td>
                    <td><a class="text-link">http://192.168.102.222:9888/pages/viewpage.action?pageId=39826770</a></td>
                  </tr>
                  <tr>
                    <td>需求文档地址</td>
                    <td><a class="text-link">http://192.168.102.222:9888/pages/viewpage.action?pageId=39826770</a></td>
                  </tr>
                  <tr>
                    <td>高保真SVN</td>
                    <td><a class="text-link">http://192.168.102.222:9888/pages/viewpage.action?pageId=39826770</a></td>
                  </tr>
                  <tr>
                    <td>设计源文件SVN</td>
                    <td><a class="text-link">http://192.168.102.222:9888/pages/viewpage.action?pageId=39826770</a></td>
                  </tr>
                  <tr>
                    <td>接口文档地址</td>
                    <td><a class="text-link">http://192.168.102.222:9888/pages/viewpage.action?pageId=39826770</a></td>
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
      leader: {}
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
        let taskNums = 0
        let progress = 0
        let taskTime = 0
        let investedTime = 0
        let expectantProgress = 0
        let nextTimeNode = {
          start: new Date(),
          time_node_name: '--'
        }

        for (const tn of project.timeNodes) {
          const start = new Date(tn.start_time)
          if (new Date() <= start) {
            if (nextTimeNode.time_node_name === '--') {
              nextTimeNode = {
                start,
                time_node_name: tn.time_node_name
              }
            }
          } else {
            tn.status = 'active'
          }

          if (tn.done_time) {
            tn.status = 'done'
          }

          tn.text = `${tn.time_node_name}(${this.$ui.dateFormat(start, 'yyyy-mm-dd')})`
        }

        nextTimeNode.text = `${nextTimeNode.time_node_name}(${this.$ui.dateFormat(nextTimeNode.start, 'yyyy-mm-dd')})`

        const developers = {}

        project.plans.forEach(item => {
          if (item.task_type === 'normal') {
            taskNums++
            progress += item.progress || 0
            taskTime += parseFloat(item.task_time)

            if (!developers[item.developer_name]) {
              developers[item.developer_name] = {
                taskNums: 0,
                progress: 0,
                expectantProgress: 0
              }
            }

            if (new Date() >= new Date(item.end_time)) {
              expectantProgress++
              developers[item.developer_name].expectantProgress++
            }

            if (new Date() >= new Date(item.end_time)) {
              investedTime += parseFloat(item.task_time)
            }

            developers[item.developer_name].taskNums++
            developers[item.developer_name].progress += item.progress
          }
        })

        let chartData = []
        let colors = []
        for (const [key, value] of Object.entries(developers)) {
          const progress = parseFloat((value.progress / value.taskNums * 100).toFixed(2))

          if (value.progress < value.expectantProgress) {
            colors.push('#fb6c84')
          } else {
            colors.push('#218fff')
          }

          chartData.push({
            name: key,
            progress,
            total: 100
          })
        }

        const chartDataMaps = [
          {
            name: '百分比',
            type: 'bar',
            dataset: chartData,
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
            dataset: chartData,
            dataKey: 'progress',
            barWidth: 30,
            itemStyle: {
              barBorderRadius: 0
            },
            colors
          }
        ]

        expectantProgress = expectantProgress / taskNums * 100
        progress = progress / taskNums * 100

        let status = '正常进行中'

        if (project.project.status === 'done') {
          status = '已完成'
        } else if (progress < expectantProgress) {
          status = '有风险'
        }

        project.project.status = status

        return {
          ...project.project,
          taskTime,
          investedTime,
          chartData,
          chartDataMaps,
          progress: parseFloat(progress.toFixed(2)),
          expectantProgress: parseFloat(expectantProgress.toFixed(2)),
          nextTimeNode,
          timeNodes: project.timeNodes,
          plans: project.plans
        }
      } else {
        return {
          project: {},
          plans: [],
          timeNodes: [],
          chartData: [],
          chartDataMaps: []
        }
      }
    }
  },

  methods: {
    format (percentage) {
      return `${percentage}%`
    },

    getProject () {
      this.$api.project.getProjects.send({ id: this.$route.query.id }).then(data => {
        if (data.list && data.list[0]) {
          this.$api.user.getUser.send({
            id: data.list[0].project.project_leader_id
          }).then(data => {
            if (data.user) {
              this.leader = data.user
            }
          })
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
    }
  },

  created () {
    this.getProject()
    this.$api.dic.degreens.send()
  }
}
</script>

<style lang="scss">

</style>
