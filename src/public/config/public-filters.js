/*
 * 功能: 注册所有vue公用过滤器
 * http://192.168.102.233:83/#/doc/filter
 */

import Vue from 'vue'
import unixTimeToDate from '@/assemblies/filters/unixTimeToDate'
import unixTimeToTime from '@/assemblies/filters/unixTimeToTime'
import unixTimeToDatetime from '@/assemblies/filters/unixTimeToDatetime'
import dateFormatToString from '@/assemblies/filters/dateFormatToString'
import numToRoman from '@/assemblies/filters/numToRoman'
import numToLetter from '@/assemblies/filters/numToLetter'

Vue.filter('unixTimeToDate', unixTimeToDate)
Vue.filter('unixTimeToTime', unixTimeToTime)
Vue.filter('unixTimeToDatetime', unixTimeToDatetime)
Vue.filter('dateFormatToString', dateFormatToString)
Vue.filter('numToRoman', numToRoman)
Vue.filter('numToLetter', numToLetter)
