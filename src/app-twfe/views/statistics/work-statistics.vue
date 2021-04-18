<template>
  <main class="tw-body">
    <div class="tw-body-inner xcontainer">
      <!-- 筛选条件 -->
      <div class="tw-body-content mb-small" style="min-height: 0;">
        <div class="tw-title mb-tiny">
          <h3 class="tw-title-left text-default">统计条件</h3>
        </div>

        <div class="tw-filterpane p-0">
          <tw-tag-filter
            title="年份"
            v-model="filter.year"
            label-width="3.5em"
            :options="$dic.statisticsYearList"
            :keyMap="dataMap">
          </tw-tag-filter>

          <tw-tag-filter
            multiple
            title="月份"
            v-model="filter.months"
            label-width="3.5em"
            :options="$dic.statisticsMonthList"
            :keyMap="dataMap">
          </tw-tag-filter>

          <tw-tag-filter
            multiple
            title="开发组"
            v-model="filter.groups"
            label-width="3.5em"
            :options="$api.user.getGroups.data.list"
            :keyMap="dataMap">
          </tw-tag-filter>
          <div class="tw-filterpane-toolbar">
            <a class="tw-btn xmain" @click="handleQuery">查询</a>
          </div>
        </div>
      </div>
      <!-- /筛选条件 -->

      <div class="tw-body-content" style="min-height: 0;">
        <div class="tw-title">
          <h3 class="tw-title-left text-default">
            <span>工时统计</span>
          </h3>
        </div>

        <div class="tw-flex">
          <div class="tw-flex-body">
            <table class="tw-table xsmall">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>姓名</th>
                  <th>总工时</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in $api.project.taskTimes.data.list"
                  :key="idx">
                  <td>{{idx+1}}</td>
                  <td>{{item.developer_name}}</td>
                  <td>{{item.task_times}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      filter: {
        year: this.$cnt.TIME_CUR_YEAR,
        months: [this.$cnt.TIME_CUR_MONTH_MM],
        groups: []
      },
      dataMap: {
        text: 'name',
        value: 'id'
      }
    }
  },

  methods: {
    handleQuery () {
      this.$api.project.taskTimes.send(this.filter)
    }
  },

  created () {
    this.$api.user.getGroups.reset().send()
  }
}
</script>
