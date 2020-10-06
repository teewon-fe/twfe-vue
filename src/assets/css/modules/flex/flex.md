# 弹性盒子(Flex)

用于快速使用弹性盒子样式。

## 方向(flex-direction)
### 水平排列: `.flex-row`
<div class="d-flex flex-row border mb-small">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### 水平反序排列: `.flex-row-reverse`
<div class="d-flex flex-row-reverse border mb-small">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### 垂直排列: `.flex-column`
<div class="d-flex flex-column border mb-small">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny bg-card border-top">Flex item 2</div>
  <div class="p-tiny bg-card border-top">Flex item 3</div>
</div>

### 垂直反序排列: `.flex-column-reverse`
<div class="d-flex flex-column-reverse border">
  <div class="p-tiny bg-card border-top">Flex item 1</div>
  <div class="p-tiny bg-card border-top">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

## 主轴对齐(justify-content)
### 与主轴起始端对齐: `.justify-content-start`
<div class="d-flex justify-content-start border">
  <div class="p-tiny bg-card border-top">Flex item 1</div>
  <div class="p-tiny bg-card border-top">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### 与主轴未端对齐: `.justify-content-end`
<div class="d-flex justify-content-end border">
  <div class="p-tiny bg-card border-top">Flex item 1</div>
  <div class="p-tiny bg-card border-top">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### 与主轴中线对齐: `.justify-content-center`
<div class="d-flex justify-content-center border">
  <div class="p-tiny bg-card border-top">Flex item 1</div>
  <div class="p-tiny bg-card border-top">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### flex项之间平分主轴多余间隙: `.justify-content-between`
<div class="d-flex justify-content-between border">
  <div class="p-tiny bg-card border-top">Flex item 1</div>
  <div class="p-tiny bg-card border-top">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### flex项两端平分主轴多余间隙: `.justify-content-around`
<div class="d-flex justify-content-around border">
  <div class="p-tiny bg-card border-top">Flex item 1</div>
  <div class="p-tiny bg-card border-top">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

## 单行对齐方式(align-items)
### 从交叉轴起始端开始对齐: `.align-items-start`
<div class="d-flex align-items-start border" style="height:200px;">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### 所有项与交叉轴未端对齐: `.align-items-end`
<div class="d-flex align-items-end border" style="height:200px;">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### 所有项与交叉轴中线对齐: `.align-items-center`
<div class="d-flex align-items-center border" style="height:200px;">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### 所有项拉伸为交叉轴的尺寸: `.align-items-stretch`
<div class="d-flex align-items-stretch border" style="height:200px;">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### 项之间基线对齐: `.align-items-baseline`
<div class="d-flex align-items-baseline border" style="height:200px;">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

## 多行对齐(align-content)
### 多行与交叉轴起始端对齐: `.align-content-start`
<div class="d-flex flex-wrap align-content-start border" style="height:200px;">
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 1</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 2</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 3</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 4</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 5</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 6</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 7</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 8</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 9</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 10</div>
</div>

### 多行与交叉轴未端对齐: `.align-content-end`
<div class="d-flex flex-wrap align-content-end border" style="height:200px;">
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 1</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 2</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 3</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 4</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 5</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 6</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 7</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 8</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 9</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 10</div>
</div>

### 多行与交叉轴中线对齐: `.align-content-center`
<div class="d-flex flex-wrap align-content-center border" style="height:200px;">
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 1</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 2</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 3</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 4</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 5</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 6</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 7</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 8</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 9</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 10</div>
</div>

### 多行之间平分交插轴多余空间: `.align-content-between`
<div class="d-flex flex-wrap align-content-between border" style="height:200px;">
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 1</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 2</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 3</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 4</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 5</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 6</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 7</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 8</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 9</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 10</div>
</div>

### 多行两端平分交插轴多余空间: `.align-content-around`
<div class="d-flex flex-wrap align-content-around border" style="height:200px;">
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 1</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 2</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 3</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 4</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 5</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 6</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 7</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 8</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 9</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 10</div>
</div>

### 多行拉伸平分交插轴尺寸: `.align-content-stretch`
<div class="d-flex flex-wrap align-content-stretch border" style="height:200px;">
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 1</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 2</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 3</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 4</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 5</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 6</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 7</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 8</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 9</div>
  <div class="p-tiny bg-card" style="flex-basis: 25%;">Flex item 10</div>
</div>

## flex项自身对齐(align-self)
### 与交叉轴起始端对齐: `.align-self-start`
<div class="d-flex align-self-start border" style="height:200px;">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny align-self-start bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### 与交叉轴未端对齐: `.align-self-end`
<div class="d-flex border" style="height:200px;">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny align-self-end bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### 与交叉轴中线对齐: `.align-self-center`
<div class="d-flex border" style="height:200px;">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny align-self-center bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### 拉伸: `.align-self-stretch`
<div class="d-flex border" style="height:200px;">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny align-self-stretch bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

### 基线对齐: `.align-self-baseline`
<div class="d-flex border" style="height:200px;">
  <div class="p-tiny bg-card">Flex item 1</div>
  <div class="p-tiny align-self-baseline bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

## 栅格
### flex-fill
<div class="d-flex align-self-start border">
  <div class="p-tiny flex-fill bg-card">Flex item 1</div>
  <div class="p-tiny flex-fill align-self-start bg-card">Flex item 2</div>
  <div class="p-tiny flex-fill bg-card">Flex item 3</div>
</div>

## 控制flex项的Grow与shrink
+ flex-grow-1
+ flex-grow-0
+ flex-shrink-1
+ flex-shrink-0

### 开启grow: flex-grow-1
<div class="d-flex align-self-start border">
  <div class="p-tiny flex-grow-1 bg-card border-right">Flex item 1</div>
  <div class="p-tiny align-self-start bg-card">Flex item 2</div>
  <div class="p-tiny bg-card">Flex item 3</div>
</div>

## 换行
### .flex-nowrap
<div class="d-flex flex-nowrap border" style="overflow: auto;">
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 1</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 2</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 3</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 4</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 5</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 6</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 7</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 8</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 9</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 10</div>
</div>

### .flex-wrap
<div class="d-flex flex-wrap border" style="overflow: auto;">
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 1</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 2</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 3</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 4</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 5</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 6</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 7</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 8</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 9</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 10</div>
</div>

### .flex-wrap
<div class="d-flex flex-wrap-reverse border" style="overflow: auto;">
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 1</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 2</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 3</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 4</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 5</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 6</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 7</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 8</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 9</div>
  <div class="p-tiny flex-shrink-0 bg-card" style="flex-basis: 25%;">Flex item 10</div>
</div>

## 成员

```
.flex-row {
    flex-direction: row !important;
}

.flex-column {
    flex-direction: column !important;
}

.flex-row-reverse {
    flex-direction: row-reverse !important;
}

.flex-column-reverse {
    flex-direction: column-reverse !important;
}

.flex-wrap {
    flex-wrap: wrap !important;
}

.flex-nowrap {
    flex-wrap: nowrap !important;
}

.flex-wrap-reverse {
    flex-wrap: wrap-reverse !important;
}

.flex-fill {
    flex: 1 1 auto !important;
}

.flex-grow-0 {
    flex-grow: 0 !important;
}

.flex-grow-1 {
    flex-grow: 1 !important;
}

.flex-shrink-0 {
    flex-shrink: 0 !important;
}

.flex-shrink-1 {
    flex-shrink: 1 !important;
}

.justify-content-start {
    justify-content: flex-start !important;
}

.justify-content-end {
    justify-content: flex-end !important;
}

.justify-content-center {
    justify-content: center !important;
}

.justify-content-between {
    justify-content: space-between !important;
}

.justify-content-around {
    justify-content: space-around !important;
}

.align-items-start {
    align-items: flex-start !important;
}

.align-items-end {
    align-items: flex-end !important;
}

.align-items-center {
    align-items: center !important;
}

.align-items-baseline {
    align-items: baseline !important;
}

.align-items-stretch {
    align-items: stretch !important;
}

.align-content-start {
    align-content: flex-start !important;
}

.align-content-end {
    align-content: flex-end !important;
}

.align-content-center {
    align-content: center !important;
}

.align-content-between {
    align-content: space-between !important;
}

.align-content-around {
    align-content: space-around !important;
}

.align-content-stretch {
    align-content: stretch !important;
}

.align-self-auto {
    align-self: auto !important;
}

.align-self-start {
    align-self: flex-start !important;
}

.align-self-end {
    align-self: flex-end !important;
}

.align-self-center {
    align-self: center !important;
}

.align-self-baseline {
    align-self: baseline !important;
}

.align-self-stretch {
    align-self: stretch !important;
}

@media (max-width: 1199px) {
    .flex-row-lpad {
        flex-direction: row !important;
    }

    .flex-column-lpad {
        flex-direction: column !important;
    }

    .flex-row-reverse-lpad {
        flex-direction: row-reverse !important;
    }

    .flex-column-reverse-lpad {
        flex-direction: column-reverse !important;
    }

    .flex-wrap-lpad {
        flex-wrap: wrap !important;
    }

    .flex-nowrap-lpad {
        flex-wrap: nowrap !important;
    }

    .flex-wrap-reverse-lpad {
        flex-wrap: wrap-reverse !important;
    }

    .flex-fill-lpad {
        flex: 1 1 auto !important;
    }

    .flex-grow-0-lpad {
        flex-grow: 0 !important;
    }

    .flex-grow-1-lpad {
        flex-grow: 1 !important;
    }

    .flex-shrink-0-lpad {
        flex-shrink: 0 !important;
    }

    .flex-shrink-1-lpad {
        flex-shrink: 1 !important;
    }

    .justify-content-start-lpad {
        justify-content: flex-start !important;
    }

    .justify-content-end-lpad {
        justify-content: flex-end !important;
    }

    .justify-content-center-lpad {
        justify-content: center !important;
    }

    .justify-content-between-lpad {
        justify-content: space-between !important;
    }

    .justify-content-around-lpad {
        justify-content: space-around !important;
    }

    .align-items-start-lpad {
        align-items: flex-start !important;
    }

    .align-items-end-lpad {
        align-items: flex-end !important;
    }

    .align-items-center-lpad {
        align-items: center !important;
    }

    .align-items-baseline-lpad {
        align-items: baseline !important;
    }

    .align-items-stretch-lpad {
        align-items: stretch !important;
    }

    .align-content-start-lpad {
        align-content: flex-start !important;
    }

    .align-content-end-lpad {
        align-content: flex-end !important;
    }

    .align-content-center-lpad {
        align-content: center !important;
    }

    .align-content-between-lpad {
        align-content: space-between !important;
    }

    .align-content-around-lpad {
        align-content: space-around !important;
    }

    .align-content-stretch-lpad {
        align-content: stretch !important;
    }

    .align-self-auto-lpad {
        align-self: auto !important;
    }

    .align-self-start-lpad {
        align-self: flex-start !important;
    }

    .align-self-end-lpad {
        align-self: flex-end !important;
    }

    .align-self-center-lpad {
        align-self: center !important;
    }

    .align-self-baseline-lpad {
        align-self: baseline !important;
    }

    .align-self-stretch-lpad {
        align-self: stretch !important;
    }
}

@media (max-width: 991px) {
    .flex-row-pad {
        flex-direction: row !important;
    }

    .flex-column-pad {
        flex-direction: column !important;
    }

    .flex-row-reverse-pad {
        flex-direction: row-reverse !important;
    }

    .flex-column-reverse-pad {
        flex-direction: column-reverse !important;
    }

    .flex-wrap-pad {
        flex-wrap: wrap !important;
    }

    .flex-nowrap-pad {
        flex-wrap: nowrap !important;
    }

    .flex-wrap-reverse-pad {
        flex-wrap: wrap-reverse !important;
    }

    .flex-fill-pad {
        flex: 1 1 auto !important;
    }

    .flex-grow-0-pad {
        flex-grow: 0 !important;
    }

    .flex-grow-1-pad {
        flex-grow: 1 !important;
    }

    .flex-shrink-0-pad {
        flex-shrink: 0 !important;
    }

    .flex-shrink-1-pad {
        flex-shrink: 1 !important;
    }

    .justify-content-start-pad {
        justify-content: flex-start !important;
    }

    .justify-content-end-pad {
        justify-content: flex-end !important;
    }

    .justify-content-center-pad {
        justify-content: center !important;
    }

    .justify-content-between-pad {
        justify-content: space-between !important;
    }

    .justify-content-around-pad {
        justify-content: space-around !important;
    }

    .align-items-start-pad {
        align-items: flex-start !important;
    }

    .align-items-end-pad {
        align-items: flex-end !important;
    }

    .align-items-center-pad {
        align-items: center !important;
    }

    .align-items-baseline-pad {
        align-items: baseline !important;
    }

    .align-items-stretch-pad {
        align-items: stretch !important;
    }

    .align-content-start-pad {
        align-content: flex-start !important;
    }

    .align-content-end-pad {
        align-content: flex-end !important;
    }

    .align-content-center-pad {
        align-content: center !important;
    }

    .align-content-between-pad {
        align-content: space-between !important;
    }

    .align-content-around-pad {
        align-content: space-around !important;
    }

    .align-content-stretch-pad {
        align-content: stretch !important;
    }

    .align-self-auto-pad {
        align-self: auto !important;
    }

    .align-self-start-pad {
        align-self: flex-start !important;
    }

    .align-self-end-pad {
        align-self: flex-end !important;
    }

    .align-self-center-pad {
        align-self: center !important;
    }

    .align-self-baseline-pad {
        align-self: baseline !important;
    }

    .align-self-stretch-pad {
        align-self: stretch !important;
    }
}

@media (max-width: 767px) {
    .flex-row-lphone {
        flex-direction: row !important;
    }

    .flex-column-lphone {
        flex-direction: column !important;
    }

    .flex-row-reverse-lphone {
        flex-direction: row-reverse !important;
    }

    .flex-column-reverse-lphone {
        flex-direction: column-reverse !important;
    }

    .flex-wrap-lphone {
        flex-wrap: wrap !important;
    }

    .flex-nowrap-lphone {
        flex-wrap: nowrap !important;
    }

    .flex-wrap-reverse-lphone {
        flex-wrap: wrap-reverse !important;
    }

    .flex-fill-lphone {
        flex: 1 1 auto !important;
    }

    .flex-grow-0-lphone {
        flex-grow: 0 !important;
    }

    .flex-grow-1-lphone {
        flex-grow: 1 !important;
    }

    .flex-shrink-0-lphone {
        flex-shrink: 0 !important;
    }

    .flex-shrink-1-lphone {
        flex-shrink: 1 !important;
    }

    .justify-content-start-lphone {
        justify-content: flex-start !important;
    }

    .justify-content-end-lphone {
        justify-content: flex-end !important;
    }

    .justify-content-center-lphone {
        justify-content: center !important;
    }

    .justify-content-between-lphone {
        justify-content: space-between !important;
    }

    .justify-content-around-lphone {
        justify-content: space-around !important;
    }

    .align-items-start-lphone {
        align-items: flex-start !important;
    }

    .align-items-end-lphone {
        align-items: flex-end !important;
    }

    .align-items-center-lphone {
        align-items: center !important;
    }

    .align-items-baseline-lphone {
        align-items: baseline !important;
    }

    .align-items-stretch-lphone {
        align-items: stretch !important;
    }

    .align-content-start-lphone {
        align-content: flex-start !important;
    }

    .align-content-end-lphone {
        align-content: flex-end !important;
    }

    .align-content-center-lphone {
        align-content: center !important;
    }

    .align-content-between-lphone {
        align-content: space-between !important;
    }

    .align-content-around-lphone {
        align-content: space-around !important;
    }

    .align-content-stretch-lphone {
        align-content: stretch !important;
    }

    .align-self-auto-lphone {
        align-self: auto !important;
    }

    .align-self-start-lphone {
        align-self: flex-start !important;
    }

    .align-self-end-lphone {
        align-self: flex-end !important;
    }

    .align-self-center-lphone {
        align-self: center !important;
    }

    .align-self-baseline-lphone {
        align-self: baseline !important;
    }

    .align-self-stretch-lphone {
        align-self: stretch !important;
    }
}

@media (max-width: 553px) {
    .flex-row-phone {
        flex-direction: row !important;
    }

    .flex-column-phone {
        flex-direction: column !important;
    }

    .flex-row-reverse-phone {
        flex-direction: row-reverse !important;
    }

    .flex-column-reverse-phone {
        flex-direction: column-reverse !important;
    }

    .flex-wrap-phone {
        flex-wrap: wrap !important;
    }

    .flex-nowrap-phone {
        flex-wrap: nowrap !important;
    }

    .flex-wrap-reverse-phone {
        flex-wrap: wrap-reverse !important;
    }

    .flex-fill-phone {
        flex: 1 1 auto !important;
    }

    .flex-grow-0-phone {
        flex-grow: 0 !important;
    }

    .flex-grow-1-phone {
        flex-grow: 1 !important;
    }

    .flex-shrink-0-phone {
        flex-shrink: 0 !important;
    }

    .flex-shrink-1-phone {
        flex-shrink: 1 !important;
    }

    .justify-content-start-phone {
        justify-content: flex-start !important;
    }

    .justify-content-end-phone {
        justify-content: flex-end !important;
    }

    .justify-content-center-phone {
        justify-content: center !important;
    }

    .justify-content-between-phone {
        justify-content: space-between !important;
    }

    .justify-content-around-phone {
        justify-content: space-around !important;
    }

    .align-items-start-phone {
        align-items: flex-start !important;
    }

    .align-items-end-phone {
        align-items: flex-end !important;
    }

    .align-items-center-phone {
        align-items: center !important;
    }

    .align-items-baseline-phone {
        align-items: baseline !important;
    }

    .align-items-stretch-phone {
        align-items: stretch !important;
    }

    .align-content-start-phone {
        align-content: flex-start !important;
    }

    .align-content-end-phone {
        align-content: flex-end !important;
    }

    .align-content-center-phone {
        align-content: center !important;
    }

    .align-content-between-phone {
        align-content: space-between !important;
    }

    .align-content-around-phone {
        align-content: space-around !important;
    }

    .align-content-stretch-phone {
        align-content: stretch !important;
    }

    .align-self-auto-phone {
        align-self: auto !important;
    }

    .align-self-start-phone {
        align-self: flex-start !important;
    }

    .align-self-end-phone {
        align-self: flex-end !important;
    }

    .align-self-center-phone {
        align-self: center !important;
    }

    .align-self-baseline-phone {
        align-self: baseline !important;
    }

    .align-self-stretch-phone {
        align-self: stretch !important;
    }
}
```
