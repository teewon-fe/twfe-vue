/**
 * 功能：前端路由设置
 *
 * 元数据说明:
 * title: 页面标题
 * noAuthRequired: 默认所有页面都需要登录才能访问，如果某页面不需要登录即可访问，请设置该值为true
 * level: 表示页面的级别(如:1级页面，2级页面)
 * 确定页面的级别及滑动效果: 向小一级的页面路由，会向左滑动，向大一级的页面路由，会向右滑动
 */

import Vue from 'vue'
import Router from 'vue-router'
import hook from '../../public/router/hook-mobile'
import publicRouters from '../../public/router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "group-foo" */ '../views/demo'),
    meta: {
      title: '示例页',
      level: 1,
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
