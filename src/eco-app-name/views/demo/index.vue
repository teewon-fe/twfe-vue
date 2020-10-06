<template>
  <main class="tw-body xfull xadmin mb-0">
    <div class="tw-body-inner xfixsidebar js-body-inner pb-0">
      <!-- 侧边栏 -->
      <div class="tw-body-sidebar">
        <tw-collapse-group
          class="tw-sidebar"
          key="meta-data-sidebar">
          <ul class="tw-nav xsidebar xnoborder">
            <li>
              <router-link to="/ceb/home">
                <i class="tw-ico xname"></i>
                <span>首页</span>
              </router-link>
            </li>

            <!--基础信息管理-->
            <li>
              <a class="js-menu1" :class="{'xactive xopen': /^\/path\/sub-path/.test($route.path)}">
                <i class="tw-ico xname"></i>
                <span>菜单</span>
                <i class="tw-arrow xright"></i>
              </a>
              <tw-collapse
                class="xsidebar"
                switch=".js-menu1">
                <ul class="tw-nav xsidebar">
                  <li>
                      <router-link to="/ceb/base/street" title="菜单项1">
                      <span>菜单项1</span>
                    </router-link>
                  </li>

                  <li v-if="$store.state.user.userSection === '0'">
                    <router-link to="/ceb/base/community" title="菜单项2">
                      <span>菜单项2</span>
                    </router-link>
                  </li>
                </ul>
              </tw-collapse>
            </li>
          </ul>
        </tw-collapse-group>
      </div>

      <!-- 侧边栏：收起/展开按钮 -->
      <a v-class="'xcollapse'"
        class="tw-body-sidebar-toolbar xeco"
        data-target=".js-body-inner">
        <i class="tw-ico xsidebtn"></i>
      </a>

      <!-- 右侧内容 -->
      <router-view />
    </div>
  </main>
</template>

<script>
export default {
  name: 'page-home'
}
</script>

<style lang="scss">

</style>
