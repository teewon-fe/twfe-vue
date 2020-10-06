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
    redirect: '/demo'
  },

  {
    path: '/demo',
    component: () => import('../views/demo/index'),
    meta: {
      title: '示例页',
      noAuthRequired: true
    }
  }
]

const router = new Router({
  linkActiveClass: 'xactive',
  linkExactActiveClass: 'xcurrent',
  routes: publicRouters.concat(routes)
})

router.beforeEach(hook.beforeEach)

export default router
