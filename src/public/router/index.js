/**
 * 功能：前端路由设置
 *
 * 元数据说明:
 * title: 页面标题
 * noAuthRequired: 默认所有页面都需要登录才能访问，如果某页面不需要登录即可访问，请设置该值为true
 */

export default [
  {
    path: '/login',
    component: () => import('../views/login/login'),
    meta: {
      title: '登录',
      noAuthRequired: true,
      noHeader: true,
      noFooter: true,
      // --sync--
      toggleBodyClass: 'xlogin'
    }
  }
]
