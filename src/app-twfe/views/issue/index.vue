<template>
  <main class="tw-body">
    <div class="tw-body-inner xcontainer">
      <!-- 问题列表 -->
      <div class="tw-body-content" v-bottom="70">
        <div class="tw-title">
          <h3 class="tw-title-left text-default">问题列表</h3>
          <div class="tw-title-right">
            <router-link class="tw-btn xsecondary" to="/new-issue">创建问题</router-link>
          </div>
        </div>

        <div class="mb-small">
          <label>选择问题类型：</label>
          <el-select
            v-model="$api.kpi.issues.params.type"
            size="small"
            clearable
            @change="$api.kpi.issues.send()">
            <el-option
              v-for="item in $dic.issueType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>

        <table class="tw-table">
          <thead>
            <tr>
              <th style="width: 5em;">序号</th>
              <th>问题描述</th>
              <th style="width: 160px;">所属项目</th>
              <th style="width: 7em;">问题创建人</th>
              <th style="width: 7em;">问题处理人</th>
              <th style="width: 8em;">期待解决时间</th>
              <th style="width: 8em;">类型</th>
              <th style="width: 5em;">状态</th>
              <th style="width: 160px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(issue,idx) in $api.kpi.issues.data.list" :key="issue.id">
              <td>{{idx + 1}}</td>
              <td>{{issue.descript}}</td>
              <td>{{issue.project_name}}</td>
              <td>{{issue.create_developer}}</td>
              <td>{{issue.handle_developer}}</td>
              <td>{{$ui.dateFormat(issue.resolve_time, 'yyyy-mm-dd')}}</td>
              <td>{{$dic.select($dic.issueType, issue.type)}}</td>
              <td>{{issue.status==='done'?'已完成':'进行中'}}</td>
              <td>
                <a class="tw-icobtn" @click="editIssue(issue)"><i class="tw-ico xedit"></i>编辑</a>
                <a class="tw-icobtn" @click="delIssue(issue)"><i class="tw-ico xdel"></i>删除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'page-issue',

  methods: {
    editIssue (issue) {
      this.$router.push({
        name: 'new-issue',
        params: issue,
        query: {
          id: issue.id
        }
      })
    },

    delIssue (issue) {
      this.$confirm('是否删除该问题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.kpi.delIssue.send({
          id: issue.id
        }).then(() => {
          this.$api.kpi.issues.send()
        })
      }).catch(() => {
        // noop
      })
    }
  },

  created () {
    this.$api.kpi.issues.reset().send()
  }
}
</script>

<style lang="scss">

</style>
