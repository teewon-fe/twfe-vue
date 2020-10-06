/*
 * 功能: 注册所有vue公用组件
 * 为避免不必要的代码冗余，请按需引用公用组件
 * http://192.168.102.233:83/#/doc/comps
 */

import Vue from 'vue'
import publicComponents from '../../public/config/public-comps-mobile'

const components = [
  ...publicComponents
]

components.forEach(function (component) {
  Vue.component(component.name, component)
})
