/*
 * 功能: 注册所有vue公用组件
 * 为避免不必要的代码冗余，请按需引用公用组件
 * http://192.168.102.233:83/#/doc/comps
 */

import Vue from 'vue'
import Poppane from '@comps/poppane/poppane'
import Collapse from '@comps/collapse/collapse'
import CollapseGroup from '@comps/collapse/collapse-group'
import ApiSelect from '@comps/api-select/api-select'
import AdminPagination from '@comps/admin-pagination/admin-pagination'

const components = [
  Poppane,
  Collapse,
  CollapseGroup,
  ApiSelect,
  AdminPagination
]

components.forEach(function (component) {
  Vue.component(component.name, component)
})
