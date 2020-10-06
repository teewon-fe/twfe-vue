/**
 * 功能：前端路由设置
 *
 * 元数据说明:
 * title: 页面标题
 * noAuthRequired: 默认所有页面都需要登录才能访问，如果某页面不需要登录即可访问，请设置该值为true
 */

import Vue from 'vue'
import Router from 'vue-router'
import hook from '../../public/router/hook'
import publicRouters from '../../public/router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    component: () => import('../views/home/index'),
    meta: {
      title: '项目列表',
      isNavProject: true
    }
  },

  {
    path: '/new-project',
    component: () => import('../views/new-project/new-project'),
    meta: {
      title: '新建项目',
      noAuthRequired: true,
      isNavProject: true
    }
  },

  {
    path: '/project-detail',
    component: () => import('../views/project-detail/index'),
    meta: {
      title: '项目详情',
      noAuthRequired: true,
      isNavProject: true
    }
  }
]

const router = new Router({
  linkActiveClass: 'xactive',
  linkExactActiveClass: 'xcurrent',
  routes: publicRouters.concat(routes)
})

router.beforeEach(hook.beforeEach)
router.afterEach(hook.afterEach)

export default router
