# 响应式盒模型

快速使用基本的响应式盒模型样式。

## 用法示例

<div class="d-inline-block d-block-lpad d-none-lphone p-medium bg-card border">d-inline-block d-pad-block d-phone-none</div>
<div class="d-inline-block d-block-lpad d-none-lphone p-medium bg-card border">d-inline-block d-pad-block d-phone-none</div>

```
/* pc端显示为行内块元素, pad端与显示为块元素，手机端不显示 */
<div class="d-inline-block d-block-lpad d-none-lphone p-medium bg-card">
  d-inline-block d-block-lpad d-none-lphone
</div>
```

## 成员

```
.d-none {
    display: none !important;
}

.d-inline {
    display: inline !important;
}

.d-inline-block {
    display: inline-block !important;
}

.d-block {
    display: block !important;
}

.d-table {
    display: table !important;
}

.d-table-row {
    display: table-row !important;
}

.d-table-cell {
    display: table-cell !important;
}

.d-flex {
    display: flex !important;
}

.d-inline-flex {
    display: inline-flex !important;
}

@media (max-width: 1199px) {
    .d-none-lpad {
        display: none !important;
    }

    .d-inline-lpad {
        display: inline !important;
    }

    .d-inline-block-lpad {
        display: inline-block !important;
    }

    .d-block-lpad {
        display: block !important;
    }

    .d-table-lpad {
        display: table !important;
    }

    .d-table-row-lpad {
        display: table-row !important;
    }

    .d-table-cell-lpad {
        display: table-cell !important;
    }

    .d-flex-lpad {
        display: flex !important;
    }

    .d-inline-flex-lpad {
        display: inline-flex !important;
    }
}

@media (max-width: 991px) {
    .d-none-pad {
        display: none !important;
    }

    .d-inline-pad {
        display: inline !important;
    }

    .d-inline-block-pad {
        display: inline-block !important;
    }

    .d-block-pad {
        display: block !important;
    }

    .d-table-pad {
        display: table !important;
    }

    .d-table-row-pad {
        display: table-row !important;
    }

    .d-table-cell-pad {
        display: table-cell !important;
    }

    .d-flex-pad {
        display: flex !important;
    }

    .d-inline-flex-pad {
        display: inline-flex !important;
    }
}

@media (max-width: 767px) {
    .d-none-lphone {
        display: none !important;
    }

    .d-inline-lphone {
        display: inline !important;
    }

    .d-inline-block-lphone {
        display: inline-block !important;
    }

    .d-block-lphone {
        display: block !important;
    }

    .d-table-lphone {
        display: table !important;
    }

    .d-table-row-lphone {
        display: table-row !important;
    }

    .d-table-cell-lphone {
        display: table-cell !important;
    }

    .d-flex-lphone {
        display: flex !important;
    }

    .d-inline-flex-lphone {
        display: inline-flex !important;
    }
}

@media (max-width: 553px) {
    .d-none-phone {
        display: none !important;
    }

    .d-inline-phone {
        display: inline !important;
    }

    .d-inline-block-phone {
        display: inline-block !important;
    }

    .d-block-phone {
        display: block !important;
    }

    .d-table-phone {
        display: table !important;
    }

    .d-table-row-phone {
        display: table-row !important;
    }

    .d-table-cell-phone {
        display: table-cell !important;
    }

    .d-flex-phone {
        display: flex !important;
    }

    .d-inline-flex-phone {
        display: inline-flex !important;
    }
}
```
