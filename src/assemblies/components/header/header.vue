<template>
  <div class="tw-header xfull">
    <div class="tw-header-inner">
      <!-- 头部: logo内容 -->
      <h1 class="tw-header-left">
        <a class="tw-popswitch xheader js-navmenu1">
          <img src="@images/logo.png">
          <span class="tw-header-title">{{headTitle}}</span>
        </a>
      </h1>
      <!-- /头部: logo内容 -->

      <!-- 头部: 导航区 -->
      <div class="tw-header-body">
      </div>
      <!-- /头部: 导航区 -->

      <!-- 头部: 用户信息区 -->
      <div class="tw-header-right">
        <template>
          <a class="tw-popswitch xheader xavatar js-rightmenu xopen">
            <img class="tw-avatar xsmall" src="@images/avatar-default.png" alt="avatar" />
          </a>
          <tw-poppane switch=".js-rightmenu" :noArrow="true">
            <ul class="tw-header-menu xuser">
              <li>
                <div class="tw-piclr xuser">
                  <div class="tw-piclr-imgbox">
                    <img class="tw-avatar xsmall" src="@images/avatar-default.png">
                  </div>
                  <div class="tw-piclr-text">
                    <h4 class="tw-piclr-title xellipsis" style="line-height:36px;">{{realName}}</h4>
                    <!-- <div class="tw-piclr-des text-secondary">校长</div> -->
                  </div>
                </div>
              </li>

              <!-- <li>
                <a class="no-hover"><i class="tw-ico navuser"></i>用户角色</a>
              </li>
              <li class="mt-step">
                <div style="border-bottom: 1px solid #e1e7eb; margin: 0 5px;"></div>
              </li> -->
              <li @click="logOut"><a>退出</a></li>
            </ul>
          </tw-poppane>
        </template>
      </div>
      <!-- /头部: 用户信息区 -->
    </div>
  </div>
</template>

<script>
import cookieUtils from '@utils/cookie'
export default {
  name: 'tw-header-theme',
  // mixins: [login],
  data () {
    return {
      realName: '',
      headTitle: '学生智慧成长系统',
      roleList: []
    }
  },
  created: function () {
    this.realName = this.$store.state.user.realName
  },
  methods: {
    logOut () {
      let vm = this
      vm.$confirm('您是否确认退出', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 跳转默认首页
        let toUrl = window.$app.loginPage
        if (toUrl) {
          let accessToken = vm.$store.state.user.token
          vm.$axios.get('/openapi-uc/oauth2.0/logout', { headers: { 'Access-Token': accessToken } })
            .then(function (response) {
              cookieUtils.delete('logged')
              window.location.href = toUrl
            })
            .catch((err) => {
              console.log(err)
              window.location.href = toUrl
            })
        }
      }).catch(() => {
        vm.$message({
          type: 'info',
          message: '操作取消'
        })
      })
    }
  }
}
</script>
