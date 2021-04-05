/*
 * 功能:
 * 1、定义前端常量，避免前端代码中出现难以理解的数字判断逻辑
 * 2、避免数据库或后端接口中某个常量定义改变，导致前端整个系统相关的代码都要做相应改变的强耦合代码出现
 *
 * 要求与用法：
 * 1、所有接口中表常量概念的数字，符号，字母，前端都需要定义成相应的常量
 * 2、在vue组件中以this.$cnt.CONST_NAME的形式访问常量，在js代码直接引入该文件访问常量
 * http://192.168.102.233:83/#/doc/guid/const
 */

// 用户角色
export const ROLE_TEAM_LEADER = 1

// 项目类型
export const PROJECT_TYPE_H5 = '1'

// 项目状态
export const PROJECT_STATUS_DOING = 'doing'
export const PROJECT_STATUS_DONE = 'done'
export const PROJECT_STATUS_RISKY = 'risky'

// 任务时间
export const TASK_MAX_DAYS = 30
export const ISSUE_TASK_TIME_RATE = 0.4

// 时间节点类型
export const timeNodeTypes = [
  '需求评审',
  '高保真评审',
  '启动开发',
  '转测SDV1',
  '转测SDV2',
  '转测SDV3',
  '转测SDV4',
  '转测SDV5',
  '转测SDV6',
  '转测SDV7',
  '转测SDV8',
  '转测SDV9',
  '转测SDV10',
  '版本发布'
]

// 当前年份
export const TIME_CUR_YEAR = new Date().getFullYear()

// 当前月份
export const TIME_CUR_MONTH = new Date().getMonth() + 1
