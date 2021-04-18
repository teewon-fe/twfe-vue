<template>
  <main class="tw-body">
    <div class="tw-body-inner xcontainer">
      <div class="tw-body-content" v-bottom="70">
        <div class="tw-title">
          <h3 class="tw-title-left text-default">
            <span>任务列表</span>
            <span class="text-small text-weaking">(仅显示未结束项目的任务)</span>
          </h3>
          <div class="tw-title-right">
            <tw-api-select
              v-model="$api.project.getPlansByUserId.params.developer_id"
              :api="$api.user.getUsernames"
              size="small"
              clearable
              filterable
              option-value-key="id"
              placeholder="按开发人员过滤"
              @change="$api.project.getPlansByUserId.send()">
            </tw-api-select>

            <el-checkbox v-model="hideDoneTask" class="mx-small" @change="$api.project.getProjects.send()">隐藏已完成的任务</el-checkbox>

            <template v-if="$api.project.getPlansByUserId.params.developer_id === $app.user.userId || [$cnt.ROLE_TEAM_LEADER].includes($app.user.role)">
              <a v-if="progressInputVisibal" class="text-link" @click="progressInputVisibal = false">修改完成</a>
              <a v-else class="text-link" @click="progressInputVisibal = true">修改进度</a>
            </template>
          </div>
        </div>

        <div>
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
              <template v-for="(plan,idx) in plans">
                <tr v-if="idx === 0 || plans[idx].project_name !== plans[idx - 1].project_name" :key="idx">
                  <td class="text-bold" colspan="8">
                    <span style="margin-left: -15px;">{{plan.project_name}}</span>
                    <router-link :to="`/project-detail?id=${plan.project_id}`" class="text-link text-normal text-small">（项目详情）</router-link>
                  </td>
                </tr>
                <tr :key="plan.id">
                  <td>{{idx + 1}}</td>
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
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'page-task-list',

  data () {
    return {
      hideDoneTask: false,
      progressInputVisibal: false
    }
  },

  computed: {
    plans () {
      const plans = this.$api.project.getPlansByUserId.data.list

      if (this.hideDoneTask) {
        return plans.filter(item => item.progress < 1)
      } else {
        return plans
      }
    }
  },

  methods: {
    format (percentage) {
      return `${percentage}%`
    }
  },

  created () {
    this.$api.project.getPlansByUserId.send()
  }
}
</script>
