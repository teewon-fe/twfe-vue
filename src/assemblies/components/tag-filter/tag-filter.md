# 标签筛选面板

标签筛选面板。

# 标签筛选组-单选

{{tag-filter-single}}

# 标签筛选组-多选

<b>为空表示选中全部</b>

{{tag-filter-multiple}}

# 标签筛选面板

{{tag-filter-pane}}

## 属性

| <div style="width: 120px;">属性名称</div> | 说明 | 类型 | 必须 | 默认值 | 可选值 |
| ----- | ----- | ----- | ----- | ----- | ----- |
| labelWidth | 标题宽度 | String | no | css指定 | - |
| title | 标题:不指定会不显示标题容器 | String | no | '' | - |
| options | 选项数组 | Array | yes | - | - |
| keyMap | 显示文本与值在选项数组中的属性名称映射关系 | Object | no | {text: 'name',value: 'value'} | - |
| multiple | 多选 | Boolean | no | false | - |
| multipleBtnVisible | 多选按钮可见 | Boolean | no | true | - |
| toggleHeight | 显示收缩按钮的高度值 | Number | no | 50 | - |
| toggleSelf | 单选状态是否允许切换自身 | Boolean | no | false | - |


## 事件

| 事件名称 | 说明 | 参数 |
| ----- | ----- | ----- |
| change | 选项改变时触发 | value:当前选中的值或值的数组(多选时) |
