<template>
  <div class="tw-header" :class="{xfull: $route.meta.pageType!=='web'}">
    <div class="tw-header-inner">
      <!-- 头部: logo内容 -->
      <h1 class="tw-header-left">
        <span class="tw-popswitch xheader" v-if="UI_APP_NAME === 'jx-web'">
          <img v-if="user.roleType==='' && user.roleType==='0'" src="@images/logo1-jx.png">
          <img v-else src="@images/logo2-jx.png">
          <span class="tw-header-title">嘉兴市中小学幼儿园入学管理系统</span>
        </span>
        <span class="tw-popswitch xheader" v-if="UI_APP_NAME === 'ph-web'">
          <img v-if="user.roleType==='' && user.roleType==='0'" src="@images/logo1-ph.png">
          <img v-else src="@images/logo2-ph.png">
          <span class="tw-header-title">平湖市中小学幼儿园入学管理系统</span>
        </span>
      </h1>
      <!-- /头部: logo内容 -->

      <!-- 头部: 用户信息区 -->
      <div class="tw-header-right">
        <!-- 登录状态 -->
        <template v-if="user.logged">
          <a class="js-rightmenu">
            <img v-if="user.avatarUrl" class="tw-avatar xsmall" :src="user.avatarUrl" alt="avatar" />
            <img v-else class="tw-avatar xsmall" src="@images/avatar-default.png" alt="avatar" />
            <span>{{user.username}}</span>
          </a>
          <!-- <template v-if="user.roleType!=='0' && $route.path==='/'">
            <span class="pl-step">|</span>
            <router-link :to="mapRoleHome[user.roleType]">管理后台</router-link>
          </template> -->
          <template v-if="user.roleType==='0'">
            <span class="pl-step">|</span>
            <router-link to="/password">重置密码</router-link>
          </template>
          <span class="pl-step">|</span>
          <a @click="logoff">退出</a>
        </template>

        <!-- 未登录状态 -->
        <template v-else>
          <template v-if="$route.path==='/' && allowRegisterAndLogin">
            <a @click="setLoginModal({visible:true, from: '-1'})">登录</a>
            <span class="pl-step">|</span>
            <router-link to="/register">注册</router-link>
          </template>
        </template>
      </div>
      <!-- /头部: 用户信息区 -->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import utils from '@/config/cookieUtils'

export default {
  name: 'tw-header',

  data () {
    return {
      loginForm: {
        username: '',
        pwd: '',
        orgId: '',
        autoLogin: false,
        verificationCode: ''
      },

      orgList: [],

      errorMsg: '',

      verificationCode: {
        visible: false,
        imgUrl: ''
      },

      // 角色首页映射: 0-监护人 1-市级管理员 2-区级管理员 3-校级管理员
      mapRoleHome: {
        '0': '/',
        '1': '/ceb',
        '2': '/deb',
        '3': '/school'
      }
    }
  },

  computed: {
    // store.state映射
    ...mapState(['allowRegisterAndLogin', 'user'])
  },

  methods: {
    // store映射
    ...mapMutations(['setLoginModal', 'setUser']),

    /**
    * 功能: 注销
    */
    logoff () {
      const vm = this

      var req = {}
      req.appId = vm.appId
      req.branchCode = utils.get('CURRENT_TENANT_ID')
      req.type = 'JX_ENROLL'
      req.eventCode = 'logout'
      req.resolution = '0'
      req.operateSystem = 'windows'
      req.browser = 'chrome'
      req.browserVersion = '1.0'
      req.appName = '嘉兴招生'
      req.eventName = '注销'
      req.handledDevice = '0'
      req.access_token = utils.get('Access-Token')
      req.msgBody = {}
      req.msgBody.opt = vm.$store.state.user.username + '退出系统'
      req.msgBody.type = 'C'
      req.msgBody.schoolId = vm.$store.state.user.orgId
      req.userId = vm.$store.state.user.userId
      req.realName = vm.$store.state.user.username
      req.roleId = vm.$store.state.user.roleType
      // 安全漏洞，这个日志暂时也没什么意义，先去掉
      // vm.$axios.post(vm.gatewayUrl + 'openapi-log/addBusinessLog', req)
      //   .then(function (response) {
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })

      // 发送注销请求
      vm.$axios.get(this.gatewayUrl + '/openapi-uc/oauth/logout?response_type=code&client_id=' + this.appId)
      utils.set('Access-Token', null)
      utils.set('Current_User_Id', '')
      utils.set('Current_Org_Id', '')
      utils.set('CURRENT_LOGIN_NAME', '')
      utils.set('CURRENT_TENANT_ID', '')
      utils.set('CURRENT_ORG_NAME', '')
      utils.set('LOGIN_USERID', '')
      utils.set('LOGIN_NAME', '')
      utils.set('CURRENT_ROLE_ID_LIST', [])

      // 清空全局保存的用户信息
      this.setUser({
        logged: false,
        userId: '',
        username: '',
        idType: '',
        idNumber: '',
        avatarUrl: ''
      })

      // 跳转到未登录首页
      this.$router.push('/')
    }
  }
}
</script>
