/*
 * 功能: 引入系统要使用的第三方组件
 * http://192.168.102.233:83/#/doc/guid/project
 */

import Vue from 'vue'
import ElementUI from 'element-ui'
import '../../assets/css/base/_element-variables.scss'

Vue.use(ElementUI, { size: 'medium', zIndex: 3000 })

let msgs = {
  msg: ElementUI.Message,
  msgBox: ElementUI.MessageBox,
  confirm: ElementUI.MessageBox.confirm,
  alert: ElementUI.MessageBox.alert,
  loading: ElementUI.Loading.service
}

export default msgs
