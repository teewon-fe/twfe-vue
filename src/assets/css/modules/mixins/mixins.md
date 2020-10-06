# mixins

全局可用sass-mixins。
+ 提高编写css的效率
+ 规范css代码

## 媒体查询相关

媒体查询关键字与断点为：pc: 1200px, lpad: 992px, pad: 768px, lphone: 554px, phone: 0
<br>

| 名称 | 描述 |
| ----- | ----- |
| media-down($key[, $breakpoints]) | 生成的样式小于等于媒体关键字所在范围 |
| media-up($key[, $breakpoints]) | 生成的样式大于等于媒体关键字所在范围 |
| media-only($key[, $breakpoints]) | 生成的样式仅包含在媒体关键字所在范围 |
| make-container([, $breakpoints]) | 生成内容包含容器 |

用法举例：
```
/* 在手机端隐藏div.tw-box */
.tw-box {
  @include media-down(lphone) {
    display: none;
  }
}
```

生成的CSS为:
```
@media (max-width: 767px) {
  .tw-box {
      display: none;
  }
}
```

## 工具类
| 名称 | 描述 |
| ----- | ----- |
| ellipsis | 单行字符超出省略 |
| center-y | 垂直居中对齐 |
| clearfix | 清除当前元素浮动 |
| disable | 生成禁用样式 |
| triangle([$direction,$size]) | 生成小三角形<br>$direction:[top,left,bottom,right] |
| lines([$placement, $color]) | 生成移动端的1px边框<br>默认值:<br>$placement:bottom, $color:$color-border-main |

用法举例：
```
/* 生成4个1像素边框 */
.tw-1pxborderbox {
  @include lines(top right bottom left, $color-border-main);
}
```

<div class="tw-1pxborderbox">移动端的1px边框演示</div>
