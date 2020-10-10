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
            <div class="text-huge"><span class="text-highlight">{{$api.project.count.data.doing}}</span>/{{$api.project.count.data.total}}</div>
            <div class="text-small text-weaking scale-less-medium">进行中/总数(个)</div>
            <div class="text-medium"><i class="tw-ico xproject dt-n1 mr-3"></i>项目统计</div>
          </div>

          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">--</span>/--</div>
            <div class="text-small text-weaking scale-less-medium">未排期/已排期(h)</div>
            <div class="text-medium"><i class="tw-ico xcmonth dt-n1 mr-3"></i>本月工时</div>
          </div>

          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">--</span>/--</div>
            <div class="text-small text-weaking scale-less-medium">当前/目标(页/人天)</div>
            <div class="text-medium"><i class="tw-ico xspeed dt-n1 mr-3"></i>开发效率</div>
          </div>

          <div class="tw-grid-col">
            <div class="text-huge"><span class="text-highlight">--</span>/--</div>
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
              <th style="width: 6em;">负责人</th>
              <th style="width: 180px;">进度</th>
              <th style="width: 9em;">总工时(人/天)</th>
              <th style="width: 7em;">项目状态</th>
              <th>下一里程碑</th>
              <th style="width: 6em;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(project,idx) in projects"
              :key="project.id">
              <td>{{idx+1}}</td>
              <td>
                <router-link :to="`/project-detail?id=${project.id}`" class="text-link">{{project.project_name}}</router-link>
              </td>
              <td>{{project.project_leader_name}}</td>
              <td class="pr-huge">
                <el-progress :percentage="project.progress" :format="format" :color="project.status==='有风险'?'#fb6c84':'#218fff'"></el-progress>
              </td>
              <td>{{project.task_time}}</td>
              <td>{{project.status}}</td>
              <td>{{project.next_time_node.text}}</td>
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
      searchWord: ''
    }
  },

  computed: {
    projects () {
      return this.$api.project.getProjects.data.list.map(item => {
        return item.project
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
    }
  },

  created () {
    this.$api.project.count.send()
    this.$api.project.getProjects.reset().send()
  }
}
</script>

<style lang="scss">
  .tw-table .el-progress {
    white-space: nowrap;
  }
</style>
