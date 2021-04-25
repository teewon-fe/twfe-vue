/*
 * 功能: 注册所有vue公用组件
 * 为避免不必要的代码冗余，请按需引用公用组件
 * http://192.168.102.233:83/#/doc/comps
 */

import Vue from 'vue'
import publicComponents from '../../public/config/public-comps'
import timeNodes from '../components/time-node'

const components = [
  ...publicComponents,
  timeNodes
]

components.forEach(function (component) {
  Vue.component(component.name, component)
})
