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

        <div class="tw-flex">
          <div class="tw-flex-body">
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
          </div>

          <div>
            <el-checkbox v-model="$api.kpi.issues.params.status" true-label="" false-label="doing" class="mx-small" @change="$api.kpi.issues.send()">显示所有任务</el-checkbox>
          </div>
        </div>

        <table class="tw-table">
          <thead>
            <tr>
              <th style="width: 5em;">序号</th>
              <th>问题描述</th>
              <!-- <th style="width: 160px;">所属项目</th> -->
              <th style="width: 7em;">问题创建人</th>
              <th style="width: 7em;">问题处理人</th>
              <th style="width: 8em;">期待解决时间</th>
              <!-- <th style="width: 8em;">类型</th> -->
              <th style="width: 5em;">状态</th>
              <th style="width: 90px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(issue,idx) in $api.kpi.issues.data.list" :key="issue.id">
              <td>{{idx + 1}}</td>
              <td>
                <a class="text-link" @click="editIssue(issue)">{{issue.descript}}</a>
              </td>
              <!-- <td>{{issue.project_name}}</td> -->
              <td>{{issue.create_developer}}</td>
              <td>{{issue.handle_developer}}</td>
              <td>{{$ui.dateFormat(issue.resolve_time, 'yyyy-mm-dd')}}</td>
              <!-- <td>{{$dic.select($dic.issueType, issue.type)}}</td> -->
              <td>{{issue.status==='done'?'已完成':'进行中'}}</td>
              <td>
                <a class="tw-icobtn" @click="delIssue(issue)" title="删除"><i class="tw-ico xdel"></i></a>
                <a v-if="issue.status==='doing'" class="tw-icobtn ml-step" @click="updateIssue(issue, 'done')" title="结束"><i class="tw-ico xstop"></i></a>
                <!-- <a v-else class="tw-icobtn" @click="updateIssue(issue, 'doing')" title="重新打开"><i class="tw-ico xstart"></i></a> -->
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
    },

    updateIssue (issue, type) {
      issue.status = type
      this.$api.kpi.updateIssue.send(issue)
    }
  },

  created () {
    this.$api.kpi.issues.send()
  }
}
</script>

<style lang="scss">

</style>
