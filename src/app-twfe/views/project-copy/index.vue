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
          <router-link class="tw-btn xmain xmedium" to="/new-project">创建项目</router-link>
        </div>
      </div>

      <tw-collapse-group>
        <!-- 项目 -->
        <div class="tw-card xradius">
          <!-- 项目:标题 -->
          <div class="tw-title xnomark xico">
            <div class="tw-title-left">
              <i class="tw-ico xeco xsmall"></i>
              <span class="text-default">ECO数据开放平台</span>
            </div>
            <div class="tw-title-right">
              <a class="tw-icobtn"><i class="tw-ico xsync"></i>同步进度</a>
              <a class="tw-icobtn"><i class="tw-ico xedit"></i>编辑</a>
              <a class="tw-icobtn"><i class="tw-ico xdel"></i>删除</a>
            </div>
          </div>
          <!-- /项目:标题 -->

            <ul class="tw-steps xround">
              <li class="tw-steps-item xdone">
                <i class="tw-steps-no">1</i>
                <div class="tw-steps-text">
                  <label>步骤一</label>
                  <p>描述性文字描述性文字</p>
                </div>
              </li>
              <li class="tw-steps-item xactive">
                <i class="tw-steps-no">2</i>
                <div class="tw-steps-text">
                  <label>步骤二</label>
                  <p>描述性文字描述性文字</p>
                </div>
              </li>
              <li class="tw-steps-item">
                <i class="tw-steps-no">3</i>
                <div class="tw-steps-text">
                  <label>步骤三</label>
                  <p>描述性文字描述性文字</p>
                </div>
              </li>
              <li class="tw-steps-item">
                <i class="tw-steps-no">4</i>
                <!-- 请在以下div指定合适的宽度，以适应其中的文字长度 -->
                <div class="tw-steps-text" style="width: 120px;">
                  <label>步骤四</label>
                  <p>描述性文字描述性文字</p>
                </div>
              </li>
            </ul>

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

          <div class="tw-bgbox tw-flex mt-small js-project1">
            <div class="tw-flex-body text-small">
              <span class="text-bold">项目负责人: </span>
              <span class="text-secondary">张娟</span>
              <span class="ml-medium text-bold">总工时: </span>
              <span class="text-secondary">120人天</span>
              <span class="ml-medium text-bold">里程碑关键节点: </span>
              <span class="text-secondary">2020-03-01<span class="text-weaking">(开始)</span></span>
              <span>—</span>
              <span class="text-secondary">2020-03-10<span class="text-weaking">(转测)</span></span>
              <span>—</span>
              <span class="text-secondary">2020-03-30<span class="text-weaking">(发布)</span></span>
            </div>

            <div>
              <i class="tw-arrow xright"></i>
            </div>
          </div>

          <tw-collapse switch=".js-project1">
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
          </tw-collapse>
        </div>
        <!-- /项目 -->

        <!-- 项目 -->
        <div class="tw-card xradius">
          <!-- 项目:标题 -->
          <div class="tw-title xnomark xico">
            <div class="tw-title-left">
              <i class="tw-ico xeco xsmall"></i>
              <span class="text-default">ECO数据开放平台</span>
            </div>
            <div class="tw-title-right">
              <a class="tw-icobtn"><i class="tw-ico xsync"></i>同步进度</a>
              <a class="tw-icobtn"><i class="tw-ico xedit"></i>编辑</a>
              <a class="tw-icobtn"><i class="tw-ico xdel"></i>删除</a>
            </div>
          </div>
          <!-- /项目:标题 -->

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

          <div class="tw-bgbox tw-flex mt-small js-project2">
            <div class="tw-flex-body text-small">
              <span class="text-bold">项目负责人: </span>
              <span class="text-secondary">张娟</span>
              <span class="ml-medium text-bold">总工时: </span>
              <span class="text-secondary">120人天</span>
              <span class="ml-medium text-bold">里程碑关键节点: </span>
              <span class="text-secondary">2020-03-01<span class="text-weaking">(开始)</span></span>
              <span>—</span>
              <span class="text-secondary">2020-03-10<span class="text-weaking">(转测)</span></span>
              <span>—</span>
              <span class="text-secondary">2020-03-30<span class="text-weaking">(发布)</span></span>
            </div>

            <div>
              <i class="tw-arrow xright"></i>
            </div>
          </div>

          <tw-collapse switch=".js-project2">
            <tw-collapse-group>
              <div class="text-center mt-medium">
                <ul class="tw-btngroup">
                  <li class="js-project2-schedule">
                    <a class="tw-btn xweaking">进度详情</a>
                  </li>
                  <li class="js-project2-info">
                    <a class="tw-btn xweaking">项目信息</a>
                  </li>
                </ul>
              </div>

              <!-- 项目:计划详情 -->
              <tw-collapse
                default-open
                switch=".js-project2-schedule">
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
                        <td class="text-bold" colspan="8">开发公共流程</td>
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
                switch=".js-project2-info">
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
          </tw-collapse>
        </div>
        <!-- /项目 -->
      </tw-collapse-group>
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
