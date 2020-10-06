<template>
  <div class="tw-body">
    <div class="tw-body-flexinner">
      <tw-collapse-group
        class="tw-sidebar"
        key="uid-key">
        <ul class="tw-nav xsidebar">
          <li>
            <a class="js-menu1">
              <i class="tw-font xico"></i>
              <span>分类1</span>
              <i class="tw-arrow xright"></i>
            </a>
            <tw-collapse
              class="xsidebar"
              switch=".js-menu1">
              <ul class="tw-nav xsidebar">
                <li><a>导航1</a></li>
                <li><a class="xactive">选中状态</a></li>
                <li><a>导航3</a></li>
              </ul>
            </tw-collapse>
          </li>
          <li>
            <a class="js-menu2">
              <i class="tw-font xico"></i>
              <span>分类2</span>
              <i class="tw-arrow xright"></i>
            </a>
            <tw-collapse
              class="xsidebar"
              switch=".js-menu2">
              <ul class="tw-nav xsidebar">
                <li><a>导航1</a></li>
                <li><a>导航2</a></li>
                <li><a>导航3</a></li>
              </ul>
            </tw-collapse>
          </li>
          <li>
            <a class="jst-close">
              <i class="tw-font xico"></i>
              <span>分类3</span>
            </a>
          </li>
        </ul>
      </tw-collapse-group>

      <div class="tw-body-content">

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .tw-body-content,
  .tw-sidebar {
    border: 1px dashed #ccc;
  }

  .tw-sidebar:after {
    display: none;
  }
</style>
