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
          <li>
            <a class="xactive">
              <div>
                <i class="tw-ico xname xwrap"></i>
                <span>图标换行</span>
              </div>
            </a>
          </li>
          <li>
            <a>
              <div>
                <i class="tw-ico xname xwrap"></i>
                <span>图标换行</span>
              </div>
            </a>
          </li>
          <li>
            <a>
              <div>
                <i class="tw-ico xname xwrap"></i>
                <span>图标换行</span>
              </div>
            </a>
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
  </div>
</template>
