/*
 * 功能: 国际化处理
 * 1、标准语言代码：采用ISO 639-1/ISO 639-3定义
 * 2、标准国家/地区代码：采用ISO 3166-1定义
 * 3、文件命名： 标准语言代码-标准国家代码(小写)
 * 4、属性或变量命名: 标准语言代码_标准国家代码(大写)
 * http://192.168.102.233:83/#/doc/guid/i18n
 */

/* eslint-disable */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh_CN from './zh.js'
import en_US from './en.js'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    zh_CN,
    en_US
  }
})

window.$i18n = i18n
export default i18n


