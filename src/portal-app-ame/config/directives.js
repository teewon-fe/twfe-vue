/*
 * 功能: 注册所有vue公用指令
 * 为避免不必要的代码冗余，请按需引用公用组件
 * http://192.168.102.233:83/#/doc/directive
 */

import Vue from 'vue'
import publicDirectives from '../../public/config/public-directives'

const directives = [
  ...publicDirectives
]

directives.forEach(function (directive) {
  Vue.directive(directive.name, directive.hooks)
})
