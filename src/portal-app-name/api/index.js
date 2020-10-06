/*
 * 功能: 使用apier插件
 * http://192.168.115.239/#/doc/guid/apier-beta
 */

import Vue from 'vue'
import Apier from '../../assemblies/plugins/apier/apier'
import store from '../store'
import publicApi from '../../public/api'
import apierConfig from '../../public/api/apier-config'

Vue.use(Apier)

const apier = new Apier(store, {
  modules: {
    ...publicApi
  },

  ...apierConfig,

  authDetection: {
    enable: false
  },

  baseUrl: window.$app.apiBaseUrl
})

export default apier
