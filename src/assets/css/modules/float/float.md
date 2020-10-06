# 浮动

用于快速使用浮动样式。

# 用法说明
+ 因浮动的特殊性，响应浮动的元素，用法多为大尺寸屏幕启用浮动，小尺寸屏幕取消浮动，固不管是在pc端优先还是在移动端优先的css设计模式下，取消浮动都采用向下媒体查询;
+ float-left: 表示启用左浮动;
+ float-none-lphone: 表示所有小于等于pad屏幕(手机屏lphone<=767px>)的设备，都取消浮动;
+ clear-float: 清除所有子级元素浮动，需要用于浮动元素直接父级元素。

# 成员

```
.clear-float:after {
    content: " ";
    display: block;
    clear: both;
}

.float-left {
    float: left !important;
}

.float-right {
    float: right !important;
}

.float-none {
    float: none !important;
}

@media (max-width: 1199px) {
    .float-none-lpad {
        float: none !important;
    }
}

@media (max-width: 991px) {
    .float-none-pad {
        float: none !important;
    }
}

@media (max-width: 767px) {
    .float-none-lphone {
        float: none !important;
    }
}

@media (max-width: 553px) {
    .float-none-phone {
        float: none !important;
    }
}
```
