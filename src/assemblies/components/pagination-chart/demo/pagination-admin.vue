<template>
  <tw-pagination
    v-model="pagination.pageNo"
    :pageSize.sync="pagination.pageSize"
    :total="pagination.total"
    @pageChange="getData"
    @sizeChange="getData">
  </tw-pagination>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      pagination: {
        pageSize: 10,
        pageNo: 1,
        total: 0
      }
    }
  },

  methods: {
    /**
    * 功能: 获取数据
    */
    getData () {
      const vm = this

      this.axios.post('/ui-success', {
        pageSize: this.pagination.pageSize,
        pageNo: this.pagination.pageNo
      }).then((resp) => {
        if (resp.data.code === 0) {
          // 总记录数
          vm.pagination.total = 101

          vm.data = []
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
