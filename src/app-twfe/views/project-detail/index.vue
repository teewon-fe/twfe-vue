<template>
  <main class="tw-body">
    <div class="tw-body-inner xcontainer">
      <div class="tw-crm">
        <router-link class="tw-crm-link" to="/">项目</router-link>
        <i class="tw-crm-arrow"></i>
        <span class="tw-crm-self ml-step">ECO数据开放平台</span>
      </div>

      <!-- 概要 -->
      <div class="tw-card mb-medium pb-medium">
        <!-- 项目:标题 -->
        <div class="tw-title xnomark xico">
          <div class="tw-title-left">
            <i class="tw-ico xeco xsmall"></i>
            <span class="text-default">ECO数据开放平台</span>
          </div>
          <div class="tw-title-right">
            <a class="tw-icobtn"><i class="tw-ico xsync"></i>同步进度</a>
            <router-link class="tw-icobtn" :to="`/new-project?id=${$route.query.id}`"><i class="tw-ico xedit"></i>编辑</router-link>
            <a class="tw-icobtn"><i class="tw-ico xdel"></i>删除</a>
          </div>
        </div>
        <!-- /项目:标题 -->

        <div class="tw-grid xpc4 xlpad4 xpad4 text-center">
          <div class="tw-grid-col">
            <div class="text-large">欧阳娜娜</div>
            <div class="text-small text-weaking scale-less-medium">13431863008(手机)</div>
            <div class="text-medium"><i class="tw-ico xdev dt-n1 mr-3"></i>项目负责人</div>
          </div>

          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">5</span>/20</div>
            <div class="text-small text-weaking scale-less-medium">已投入/总工时(h)</div>
            <div class="text-medium"><i class="tw-ico xcmonth dt-n1 mr-3"></i>项目工时</div>
          </div>

          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">1.2</span>/1.5</div>
            <div class="text-small text-weaking scale-less-medium">当前/目标(页/人天)</div>
            <div class="text-medium"><i class="tw-ico xspeed dt-n1 mr-3"></i>项目效率</div>
          </div>

          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">5</span>/20</div>
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
              <li class="tw-steps-item xdone" style="z-index:4;">开发(2020-10-06)</li>
              <li class="tw-steps-item xactive" style="z-index:3;">转测(2020-10-20)</li>
              <li class="tw-steps-item" style="z-index:1;">步骤四</li>
            </ul>
          </div>
        </div>

        <!-- 项目:进度图表 -->
        <div class="text-small">
          <a class="tw-tag xsmall p-0 xrisk mr-step"></a>
          <span class="text-secondary">有风险, 进度延期20%</span>
        </div>

        <div class="tw-flex align-items-center text-center">
          <div style="width: 30%;">
            <el-progress type="circle" :width="150" :percentage="25" :stroke-width="8"></el-progress>
            <!-- <div class="text-weaking">总体进度</div> -->
          </div>
          <div class="tw-flex-body">
            <!-- http://echartsjs.com/option.html#yAxis -->
            <tw-chart
              height="200px"
              categoryKey="student"
              :option="chartOption"
              :dataMaps="chartDataMaps">
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
                    <th>开始时间</th>
                    <th>完成时间</th>
                    <th style="width: 150px;">进度</th>
                    <th>开发</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-bold" colspan="8">通用流程</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>需求评审</td>
                    <td>中等</td>
                    <td>1.5</td>
                    <td>2020-02-20</td>
                    <td>2020-02-21</td>
                    <td>
                      <el-progress :percentage="50" :format="format"></el-progress>
                    </td>
                    <td>陈今斌</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>高保真评审</td>
                    <td>中等</td>
                    <td>1.5</td>
                    <td>2020-02-20</td>
                    <td>2020-02-21</td>
                    <td>
                      <el-progress :percentage="50" :format="format"></el-progress>
                    </td>
                    <td>陈今斌</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>框架搭建(框架、公用样式、公用逻辑等)</td>
                    <td>中等</td>
                    <td>1.5</td>
                    <td>2020-02-20</td>
                    <td>2020-02-21</td>
                    <td>
                      <el-progress :percentage="50" :format="format"></el-progress>
                    </td>
                    <td>陈今斌</td>
                  </tr>
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
  }
}
</script>

<style lang="scss">

</style>
