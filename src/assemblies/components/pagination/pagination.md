# 分页

+ 主要用于表格分页

+ [element分页请参照element-ui官网](http://element-cn.eleme.io/#/zh-CN/component/pagination)

# 分页-偏后台

{{pagination-admin}}

# 分页-偏前台

{{pagination-front}}

## 属性

| <div style="width: 120px;">属性名称</div> | 说明 | 类型 | 必须 | 默认值 | 可选值 |
| ----- | ----- | ----- | ----- | ----- | ----- |
| type | 分页的类型: admin-后台型 front-前台型 | String | no | admin | - |
| pageSize | 每页显示多少行数据,支持(.sync) | Number | no | 10 | - |
| total | Number | Array | no | 0 | - |
| pageSizes | 每页显示行数选择器的选项设置 | Array | no | [10, 20, 30, 50, 100] | - |


## 事件

| 事件名称 | 说明 | 参数 |
| ----- | ----- | ----- |
| sizeChange | pageSize改变时触发 | pageSize(改变后每页显示多少行) |
| pageChange | pageSize改变时触发 | pageSize(改变后每页显示多少行) |
