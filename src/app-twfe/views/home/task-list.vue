<template>
  <main class="tw-body">
    <div class="tw-body-inner xcontainer">
      <!-- 筛选条件 -->
      <!-- <div class="tw-body-content mb-small" style="min-height: 0;">
        <div class="tw-title mb-tiny">
          <h3 class="tw-title-left text-default">筛选条件</h3>
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
            <a class="tw-btn xmain">查询</a>
          </div>
        </div>
      </div> -->
      <!-- /筛选条件 -->

      <div class="tw-body-content" v-bottom="70">
        <div class="tw-title">
          <h3 class="tw-title-left text-default">
            <span>任务列表</span>
          </h3>
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
        months: [this.$cnt.TIME_CUR_MONTH],
        groups: []
      },
      dataMap: {
        text: 'name',
        value: 'id'
      }
    }
  },

  methods: {

  },

  created () {
    this.$api.user.getGroups.reset().send()
  }
}
</script>
