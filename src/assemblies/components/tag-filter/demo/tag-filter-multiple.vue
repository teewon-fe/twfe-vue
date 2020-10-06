<template>
<tw-tag-filter
  multiple
  title="标题"
  v-model="value"
  label-width="3em"
  :options="data"
  :keyMap="dataMap">
</tw-tag-filter>
</template>

<script>
export default {
  data () {
    return {
      value: [],
      data: [],
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
          vm.data = [
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
