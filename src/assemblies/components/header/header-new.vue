<template>
  <div class="tw-header xfull xnew">
    <div class="tw-header-inner">
      <!-- 头部: logo内容 -->
      <h1 class="tw-header-left" style="flex:none">
        <a class="tw-popswitch xheader js-navmenu1">
          <img src="@images/logo.png">
          <span class="tw-header-title">{{headTitle}}</span>
        </a>
      </h1>
      <!-- /头部: logo内容 -->

      <!-- 头部: 导航区 -->
      <div class="tw-header-body" style="display:flex">
      <li class="tw-newheader-list" :class="{xactive: $route.path==='/teacher/class'||$route.path==='/teacher/personal'||$route.path==='/teacher/report'}" v-if="this.$route.meta.roles[0]==='teacher' && !this.$route.meta.noMenu"  @click="go(1)">
        <div class="tw-newheader-list-pic">
          <i class="tw-ico xheader-index xmb20" style="margin-bottom: 20px;"></i>
        </div>
        <div class="tw-newheader-list-title">班级主页</div>
      </li>
      <li class="tw-newheader-list" :class="{xactive: $route.path==='/teacher/classstat'}" v-if="this.$route.meta.roles[0]==='teacher' && !this.$route.meta.noMenu"  @click="go(2)">
        <div class="tw-newheader-list-pic">
          <i class="tw-ico xheader-stat xmb20"></i>
        </div>
        <div class="tw-newheader-list-title">班级统计</div>
      </li>
      <li class="tw-newheader-list" :class="{xactive: $route.path==='/teacher/release'}" v-if="this.$route.meta.roles[0]==='teacher' && !this.$route.meta.noMenu"  @click="go(3)">
        <div class="tw-newheader-list-pic">
          <i class="tw-ico xheader-release xmb20"></i>
        </div>
        <div class="tw-newheader-list-title">发布记录</div>
      </li>
      <li class="tw-newheader-list" :class="{xactive: $route.path==='/teacher/mulimport'}" v-if="this.$route.meta.roles[0]==='teacher' && !this.$route.meta.noMenu"  @click="go(4)">
        <div class="tw-newheader-list-pic">
          <i class="tw-ico xheader-import xmb20"></i>
        </div>
        <div class="tw-newheader-list-title">批量导入</div>
      </li>
      <li class="tw-newheader-list" :class="{xactive: $route.path==='/student/personal'||$route.path==='/student/report'}" v-if="this.$route.meta.roles[0]==='student'"  @click="go(5)">
        <div class="tw-newheader-list-pic">
          <i class="tw-ico xheader-index xmb20"></i>
        </div>
        <div class="tw-newheader-list-title">个人空间</div>
      </li>
      <li class="tw-newheader-list" :class="{xactive: $route.path==='/student/release'}" v-if="this.$route.meta.roles[0]==='student'"  @click="go(6)">
        <div class="tw-newheader-list-pic">
          <i class="tw-ico xheader-release xmb20"></i>
        </div>
        <div class="tw-newheader-list-title">发布记录</div>
      </li>
      </div>
      <!-- /头部: 导航区 -->

      <!-- 头部: 用户信息区 -->
      <div class="tw-header-right" style="text-align:right;">
        <div class="tw-header-right-top" v-if="this.$route.meta.roles[0]==='teacher'">欢迎您，{{$user.realName}}老师</div>
        <div class="tw-header-right-top" v-else>欢迎您，{{$user.realName}}同学</div>
        <a class="tw-header-right-bottom" @click="$store.dispatch('logoff')"><i class="tw-ico xheader-index1" style="margin-top:-3px;"></i><span style="padding:5px;">退出</span></a>
      </div>
      <!-- /头部: 用户信息区 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'tw-header-new',
  data () {
    return {
      realName: '',
      headTitle: '学生智慧成长系统',
      roleList: [],
      teacher: false,
      student: false,
      classid: 1
    }
  },
  created: function () {
    if (this.$route.meta.roles.indexOf('teacher') > -1 && this.$route.query.classid) {
      this.classid = this.$route.query.classid
      this.termid = this.$route.query.termid
    }

    console.log(this.$route.query)
  },
  methods: {
    go (id) {
      switch (id) {
        case 1:
          this.$router.push({ path: '/teacher/class?classid=' + this.$route.query.classid + '&termid=' + this.$route.query.termid })
          break
        case 2:
          this.$router.push({ path: '/teacher/classstat?classid=' + this.$route.query.classid + '&termid=' + this.$route.query.termid })
          break
        case 3:
          this.$router.push({ path: '/teacher/release?classid=' + this.$route.query.classid + '&termid=' + this.$route.query.termid })
          break
        case 4:
          this.$router.push({ path: '/teacher/mulimport?classid=' + this.$route.query.classid + '&termid=' + this.$route.query.termid })
          break
        case 5:
          this.$router.push({ path: '/student/personal' })
          break
        case 6:
          this.$router.push({ path: '/student/release' })
          break
        default:
          this.$router.push({ path: '/' })
      }
    }
  }
}
</script>
<style lang="scss">
.tw-header.xnew {
  height: 80px;
  line-height: 80px;
}
.tw-newheader-list {
  height: 80px;
  padding: 0 20px;
  text-align: center;
  &.xactive {
    background: #006dd9;
  }
  .xmb20 {
    margin-bottom: 20px;
  }
}
.tw-newheader-list-pic {
  height:20px;
}
.tw-newheader-list-title {
  height:20px;
}
.tw-header-right-top {
  height: 24px;
  line-height: 30px;
  margin-top: 10px;
}
.tw-header-right-bottom {
  line-height:30px;
  color: #fff;
}
</style>
