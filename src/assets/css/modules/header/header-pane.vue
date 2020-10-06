<template>
  <div class="tw-header">
    <div class="tw-header-inner">
      <h1 class="tw-header-left">
        <a>
          <img src="@images/logo.png">
          <span class="tw-header-title">应用标题</span>
        </a>
      </h1>
      <div class="tw-header-body">
        <ul class="tw-nav xheader xhorizontal">
          <li v-class:hover="'xactive'" data-target=".js-demo">
            <a class="xactive">普通导航</a>
          </li>
          <li>
            <a>普通导航</a>
          </li>
          <li>
            <a>普通导航</a>
          </li>
        </ul>
      </div>
      <div class="tw-header-right">
        <a class="tw-popswitch xheader xcenter js-rightmenu">右侧内容</a>
        <tw-poppane switch=".js-rightmenu">
          <ul class="tw-header-menu">
            <li><a>菜单项1菜单项1</a></li>
            <li><a>菜单项2</a></li>
            <li><a>菜单项3</a></li>
          </ul>
        </tw-poppane>
      </div>
    </div>

    <div class="tw-demo js-demo" data-re3-value="chenjb">面板内容</div>
  </div>
</template>

<style lang="scss" scoped>
  .tw-demo {
    position: absolute;
    top: 60px;
    left: 0;
    height: 300px;
    width: 100%;
    display: none;
    background: rgba(0,0,0,.65);
  }

  .tw-demo.xactive {
    display: block;
  }
</style>
