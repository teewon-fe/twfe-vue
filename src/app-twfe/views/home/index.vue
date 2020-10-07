<template>
  <main class="tw-body">
    <div class="tw-body-inner xcontainer">
      <div class="tw-flex mb-small">
        <div class="tw-flex-body">
          <tw-search class="xmedium"
            placeholder="请输入项目名称"
            v-model="searchWord">
          </tw-search>
        </div>

        <div>
          <router-link class="tw-btn xsecondary xmedium" to="/new-project">创建项目</router-link>
        </div>
      </div>

      <!-- 统计信息 -->
      <div class="tw-card mb-medium pb-medium">
        <!-- 项目:标题 -->
        <div class="tw-title xnomark xico">
          <div class="tw-title-left">
            <i class="tw-ico xsummary"></i>
            <span class="text-default">项目统计</span>
          </div>
        </div>
        <!-- /项目:标题 -->

        <div class="tw-grid xpc4 xlpad4 xpad4 text-center">
          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">5</span>/20</div>
            <div class="text-small text-weaking scale-less-medium">进行中/总数(个)</div>
            <div class="text-medium"><i class="tw-ico xproject dt-n1 mr-3"></i>项目统计</div>
          </div>

          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">5</span>/20</div>
            <div class="text-small text-weaking scale-less-medium">未排期/已排期(h)</div>
            <div class="text-medium"><i class="tw-ico xcmonth dt-n1 mr-3"></i>本月工时</div>
          </div>

          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">1.2</span>/1.5</div>
            <div class="text-small text-weaking scale-less-medium">当前/目标(页/人天)</div>
            <div class="text-medium"><i class="tw-ico xspeed dt-n1 mr-3"></i>开发效率</div>
          </div>

          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">5</span>/20</div>
            <div class="text-small text-weaking scale-less-medium">本月/总数(个)</div>
            <div class="text-medium"><i class="tw-ico xbug dt-n1 mr-3"></i>缺陷密度</div>
          </div>
        </div>
      </div>
      <!-- /统计信息 -->

      <!-- 项目列表 -->
      <div class="tw-body-content" v-bottom="70">
        <div class="tw-title">
          <h3 class="tw-title-left text-default">项目列表</h3>
        </div>

        <table class="tw-table">
          <thead>
            <tr>
              <th style="width: 5em;">序号</th>
              <th>项目名称</th>
              <th style="width: 180px;">进度</th>
              <th style="width: 9em;">总工时(人/天)</th>
              <th style="width: 7em;">项目状态</th>
              <th>下一里程碑</th>
              <th style="width: 6em;">负责人</th>
              <th style="width: 6em;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(project,idx) in projects"
              :key="project.id">
              <td>{{idx+1}}</td>
              <td>
                <router-link :to="`/project-detail?id=${project.id}`" class="text-link">{{project.projectName}}</router-link>
              </td>
              <td class="pr-huge">
                <el-progress :percentage="project.progress" :format="format" :color="project.status==='有风险'?'#fb6c84':'#218fff'"></el-progress>
              </td>
              <td>{{project.taskTime}}</td>
              <td>{{project.status}}</td>
              <td>{{project.nextTimeNode.text}}</td>
              <td>{{project.leader}}</td>
              <td>
                <a v-if="project.status!=='已完成'" class="text-link" @click="$api.project.close.send({id:project.id, status: 'done'}).then(()=>{$api.project.getProjects.send()})">关闭项目</a>
                <a v-else class="text-link" @click="$api.project.close.send({id:project.id, status: 'doing'}).then(()=>{$api.project.getProjects.send()})">开启项目</a>
              </td>
            </tr>
          </tbody>
        </table>

        <tw-pagination
          type="front"
          v-model="$api.project.getProjects.params.pageNo"
          :pageSize.sync="$api.project.getProjects.params.pageSize"
          :total="$api.project.getProjects.data.total"
          @pageChange="$api.project.getProjects.send()"
          @sizeChange="$api.project.getProjects.send()">
        </tw-pagination>
      </div>
      <!-- /项目列表 -->
    </div>
  </main>
</template>

<script>
export default {
  name: 'page-home',

  data () {
    return {
      chartOption: {
        grid: {
          top: 10,
          bottom: 20
        }
      },
      searchWord: '',
      chartData: [],
      chartDataMaps: []
    }
  },

  computed: {
    projects () {
      return this.$api.project.getProjects.data.list.map(item => {
        let taskNums = 0
        let progress = 0
        let taskTime = 0
        let expectantProgress = 0
        let nextTimeNode = {
          start: new Date(),
          time_node_name: '超出里程碑范围'
        }

        for (const tn of item.timeNodes) {
          const start = new Date(tn.start_time)
          if (new Date() <= start) {
            nextTimeNode = {
              start,
              time_node_name: tn.time_node_name,
              text: `${tn.time_node_name}(${this.$ui.dateFormat(start, 'yyyy-mm-dd')})`
            }
            break
          }
        }

        nextTimeNode.text = `${nextTimeNode.time_node_name}(${this.$ui.dateFormat(nextTimeNode.start, 'yyyy-mm-dd')})`

        item.plans.forEach(item => {
          if (item.task_type === 'normal') {
            taskNums++
            progress += item.progress || 0
            taskTime += parseFloat(item.task_time)

            if (new Date() - new Date(item.end_time) >= 0) {
              expectantProgress++
            }
          }
        })

        expectantProgress = expectantProgress / taskNums * 100
        progress = progress / taskNums * 100

        let status = '正常进行中'

        if (item.project.status === 'done') {
          status = '已完成'
        } else if (progress < expectantProgress) {
          status = '有风险'
        }

        return {
          id: item.project.id,
          projectName: item.project.project_name,
          taskTime,
          progress: parseFloat(progress.toFixed(2)),
          status,
          nextTimeNode,
          leader: item.project.project_leader_name
        }
      })
    }
  },

  methods: {
    /**
    * 功能: 功能描述
    * @param {Type} name 参数描述
    */
    format (percentage) {
      return `${percentage}%`
    },

    /**
    * 功能: 获取图表数据
    */
    getChartData () {
      const vm = this

      // 设置图表数据
      vm.chartData = [
        {
          student: '学生1',
          score: 90
        },
        {
          student: '学生2',
          score: 148
        }
      ]

      // 映射图表数据 http://echartsjs.com/option.html#series-bar.data
      vm.chartDataMaps = [
        {
          name: '分数',
          type: 'bar',
          dataset: vm.chartData,
          dataKey: 'score',
          barWidth: 30,
          // 用主题的默认颜色请删除此colors值, 建议不指定该值，同一系列的柱状图本应该是同一颜色(echarts默认)
          // 但当设计稿在同一系列的每一个柱条指定了不同的颜色时，需要指定此colors参数
          colors: ['#657df5', '#43a2ff', '#4ac7ff', '#2bd3bd', '#96e388', '#fecd63']
        }
      ]
    }
  },

  created () {
    this.getChartData()
    this.$api.project.getProjects.send()
  }
}
</script>

<style lang="scss">
  .tw-table .el-progress {
    white-space: nowrap;
  }
</style>
