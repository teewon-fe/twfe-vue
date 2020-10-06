<template>
<div class="tw-filterpane">
  <tw-tag-filter
    multiple
    title="标题1"
    v-model="value1"
    label-width="3em"
    :options="data.group1"
    :keyMap="dataMap">
  </tw-tag-filter>
  <tw-tag-filter
    multiple
    title="标题2"
    v-model="value2"
    label-width="3em"
    :options="data.group2"
    :keyMap="dataMap">
  </tw-tag-filter>
  <div class="tw-filterpane-toolbar">
    <a class="tw-btn xmain">查询</a>
    <a class="tw-btn xweaking">重置</a>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      value1: [],
      value2: [],
      data: {
        group1: [],
        group2: []
      },
      dataMap: {
        text: 'name',
        value: 'id'
      }
    }
  },

  methods: {
    /**
    * 功能: 获取过滤数据
    */
    getFilterData () {
      const vm = this

      this.axios.get('/ui-success').then((resp) => {
        if (resp.data.code === 0) {
          vm.data = {
            group1: [
              {
                name: '小学',
                id: '001'
              },
              {
                name: '初中',
                id: '002'
              },
              {
                name: '高中',
                id: '003'
              }
            ],
            group2: [
              {
                name: '语文',
                id: '001'
              },
              {
                name: '数学',
                id: '002'
              },
              {
                name: '英语',
                id: '003'
              },
              {
                name: '历史',
                id: '004'
              },
              {
                name: '地理',
                id: '005'
              }
            ]
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },

  created () {
    this.getFilterData()
  }
}
</script>
