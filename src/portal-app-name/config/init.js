/*
 * 功能:
 * 1、配置应用依赖的全局环境变量
 * 2、Vue项目本身，及组件初始化等依赖的环境变量
 *
 * 用法：
 * 在本文本中定义的全局属性，在vue中可用this.$app.propName访问，在js中可用window.$app.propName访问
 * http://192.168.102.233:83/#/doc/guid/app-config
 */

import Vue from 'vue'
import InitConfig from '@/assemblies/plugins/init-config'
import publicInit from '../../public/config/public-init'

Vue.use(InitConfig, {
  appName: 'web-app-name',
  ...publicInit
})
