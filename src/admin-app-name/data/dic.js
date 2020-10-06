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
export * from '../../public/data/dic'

export const roles = [
  {
    id: cnt.ROLE_TEACHER,
    name: '老师'
  },
  {
    id: cnt.ROLE_STUDENT,
    name: '学生'
  }
]
