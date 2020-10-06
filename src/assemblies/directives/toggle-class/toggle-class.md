# class切换

在指令元素与data-target指定的目标元素上，切换指定的class.

{{toggle-class}}

# 指令

| 指令项 | 说明 | 备注 |
| ----- | ----- | ----- |
| v-class="'xname'" | 单击时切换(默认) | - |
| v-class:hover="'xname'" | 鼠标悬停时切换 | - |
| v-class:focus="'xname'" | 指令元素获取焦点时切换 | - |

# data参数

| 参数名称 | 说明 | 备注 |
| ----- | ----- | ----- |
| data-target | 要切换class的目标css选择器 | - |
