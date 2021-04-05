/*
 * 功能: 前端静态数据陪字典
 * 1、一般用于解释常量文件中定义的常量对应的显示文本
 * 2、也可以定义无需出接口，但前端中多个页面要用到的字典对象
 *
 * 要求与用法：
 * 在vue组件中以this.$dic.dicName的形式访问字典表，在js代码直接引入该文件访问
 * http://192.168.102.233:83/#/doc/guid/dic
 */

import * as cnt from './const'

// 项目类型
export const projectTypes = [
  {
    id: cnt.PROJECT_TYPE_H5,
    name: '前端项目'
  }
]

export const projectStatus = [
  {
    id: cnt.PROJECT_STATUS_DOING,
    name: '进行中'
  },
  {
    id: cnt.PROJECT_STATUS_DONE,
    name: '已完成'
  },
  {
    id: cnt.PROJECT_STATUS_RISKY,
    name: '有风险'
  }
]

export const issueStatus = [
  { id: 'doing', name: '进行中' },
  { id: 'done', name: '已完成' }
]

export const issueType = [
  { id: 'issue', name: '项目协作问题' },
  { id: 'bug', name: '组内项目Bug' }
]

// 进度百分比列表
export const progressList = (() => {
  const result = []

  for (let i = 0; i <= 100; i += 10) {
    result.push({
      id: parseFloat((i / 100).toFixed(2)),
      name: i + '%'
    })
  }

  return result
})()

// 统计年份值，默认从2020年开始统计
export const statisticsYearList = (() => {
  const result = []
  let year = 2020
  const currentYear = new Date().getFullYear()

  while (year <= currentYear) {
    result.push({
      id: year,
      name: year + '年'
    })

    year++
  }

  return result
})()

// 统计月份值
export const statisticsMonthList = (() => {
  const result = []
  let month = 1

  while (month <= 12) {
    result.push({
      id: month,
      name: month + '月'
    })

    month++
  }

  return result
})()
