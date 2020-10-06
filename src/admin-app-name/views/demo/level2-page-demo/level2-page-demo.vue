<template>
  <div class="tw-body-content" v-bottom="40">
    <!-- 内容筛选区 -->
    <div class="tw-filter">
      <div class="tw-filter-body js-filter-body">
        <table class="tw-filter-table">
          <tr>
            <th>过滤条件</th>
            <td>
              <el-input
                v-model="$api.ui.demo.params.str"
                maxlength="30">
              </el-input>
            </td>
            <th>过滤条件</th>
            <td>
              <el-input
                v-model="$api.ui.demo.params.str"
                maxlength="30">
              </el-input>
            </td>
            <th>过滤条件</th>
            <td>
              <tw-api-select
                :api="$api.ui.demo"
                class="xpersonalized-select"
                optionValueKey="id"
                optionLabelKey="text"
                v-model="$api.ui.demo.params.list"
                placeholder="请选择">
              </tw-api-select>
            </td>
          </tr>

          <tr>
            <th>过滤条件</th>
            <td>
              <tw-api-select
                :api="$api.ui.demo"
                class="xpersonalized-select"
                optionValueKey="id"
                optionLabelKey="text"
                v-model="$api.ui.demo.params.list"
                placeholder="请选择">
              </tw-api-select>
            </td>
            <th></th>
            <td></td>
            <th></th>
            <td></td>
          </tr>
        </table>
      </div>

      <div class="tw-filter-tools">
        <a class="tw-btn xmain" @click="$api.ui.demo.send()">查询</a>
        <a class="tw-filter-collapsebtn"
          v-class="'xcollapse'"
          data-target=".js-filter-body">
          <i class="tw-ico xcollapse"></i>
        </a>
      </div>
    </div>
    <!-- /内容筛选区 -->

    <!-- 表格标题 -->
    <div class="tw-title xnoborder">
      <h3 class="tw-title-left">表格示例</h3>
      <div class="tw-title-right">
        <a class="tw-btn xweaking">导出</a>
      </div>
    </div>
    <!-- /表格标题 -->

    <!-- 数据表格 -->
    <el-table :data="$api.ui.demo.data.tableData" border>
       <el-table-column
        prop="prop1"
        label="第一列" min-width="180">
      </el-table-column>

      <el-table-column
        prop="prop2"
        label="第二列" min-width="120">
      </el-table-column>

      <el-table-column
        prop="prop3"
        label="第三列">
      </el-table-column>

      <el-table-column
        width="120"
        label="操作"
        fixed="right">
        <template slot-scope="scope">
          <a class="text-link" @click="$api.ui.demo.send({str: scope.row.prop1})">审核</a>
          <a class="text-link">查看</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- /数据表格 -->

    <!-- 分页器 -->
    <tw-admin-pagination
      v-model="$api.ui.demo.params.pageNo"
      :pageSize.sync="$api.ui.demo.params.pageSize"
      :total="$api.ui.demo.data.total"
      @pageChange="$api.ui.demo.send()"
      @sizeChange="$api.ui.demo.send()" />
    <!-- /分页器 -->
  </div>
</template>

<script>
export default {
  name: 'page-level2-demo'
}
</script>

<style lang="scss">

</style>
