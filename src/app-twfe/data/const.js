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
export * from '../../public/data/const'

// 示例
export const CONST_NAME1 = '1'
export const CONST_NAME2 = '2'

// 项目模板
export const projectTemplate = {
  timeNodes: [
    {
      timeNodeName: '项目启动',
      startTime: new Date(),
      remark: ''
    },
    {
      timeNodeName: '转测SDV1',
      startTime: new Date(),
      remark: ''
    },
    {
      timeNodeName: '版本发布',
      startTime: new Date(),
      remark: ''
    }
  ],

  timeNode: {
    timeNodeName: '',
    startTime: '',
    remark: ''
  },

  plans: [
    {
      projectId: '',
      taskName: '需求评审',
      taskType: 'group',
      scope: 'all',
      degreen: '',
      priority: 0,
      taskTime: '',
      startTime: '',
      endTime: '',
      developerId: '',
      developerName: '',
      progress: '',
      remark: ''
    },
    {
      projectId: '',
      taskName: '需求评审(开发A)',
      taskType: 'normal',
      degreen: '',
      priority: 0,
      taskTime: '',
      startTime: '',
      endTime: '',
      developerId: '',
      developerName: '',
      progress: '',
      remark: ''
    },
    {
      projectId: '',
      taskName: '高保真评审',
      taskType: 'group',
      scope: 'all',
      degreen: '',
      priority: 0,
      taskTime: '',
      startTime: '',
      endTime: '',
      developerId: '',
      developerName: '',
      progress: '',
      remark: ''
    },
    {
      projectId: '',
      taskName: '高保真评审(开发A)',
      taskType: 'normal',
      degreen: '',
      priority: 0,
      taskTime: '',
      startTime: '',
      endTime: '',
      developerId: '',
      developerName: '',
      progress: '',
      remark: ''
    },
    {
      projectId: '',
      taskName: '任务分组名称',
      taskType: 'group',
      degreen: '',
      priority: 0,
      taskTime: '',
      startTime: '',
      endTime: '',
      developerId: '',
      developerName: '',
      progress: '',
      remark: ''
    },
    {
      projectId: '',
      taskName: '任务1',
      taskType: 'normal',
      degreen: '',
      priority: 0,
      taskTime: '',
      startTime: '',
      endTime: '',
      developerId: '',
      developerName: '',
      progress: '',
      remark: ''
    },
    {
      projectId: '',
      taskName: '一级用例自验',
      taskType: 'group',
      scope: 'all',
      degreen: '',
      priority: 0,
      taskTime: '',
      startTime: '',
      endTime: '',
      developerId: '',
      developerName: '',
      progress: '',
      remark: ''
    },
    {
      projectId: '',
      taskName: '一级用例自验(开发A)',
      taskType: 'normal',
      degreen: '',
      priority: 0,
      taskTime: '',
      startTime: '',
      endTime: '',
      developerId: '',
      developerName: '',
      progress: '',
      remark: ''
    },
    {
      projectId: '',
      taskName: 'UI验收意见修改',
      taskType: 'group',
      scope: 'all',
      degreen: '',
      priority: 0,
      taskTime: '',
      startTime: '',
      endTime: '',
      developerId: '',
      developerName: '',
      progress: '',
      remark: ''
    },
    {
      projectId: '',
      taskName: 'UI验收意见修改(开发A)',
      taskType: 'normal',
      degreen: '',
      priority: 0,
      taskTime: '',
      startTime: '',
      endTime: '',
      developerId: '',
      developerName: '',
      progress: '',
      remark: ''
    },
    {
      projectId: '',
      taskName: '转测改单',
      taskType: 'group',
      scope: 'all',
      degreen: '',
      priority: 0,
      taskTime: '',
      startTime: '',
      endTime: '',
      developerId: '',
      developerName: '',
      progress: '',
      remark: ''
    },
    {
      projectId: '',
      taskName: '转测改单(开发A)',
      taskType: 'normal',
      degreen: '',
      priority: 0,
      taskTime: '',
      startTime: '',
      endTime: '',
      developerId: '',
      developerName: '',
      progress: '',
      remark: ''
    }
  ],

  planGroup: {
    projectId: '',
    taskName: '',
    taskType: 'group',
    degreen: '',
    priority: 0,
    taskTime: '',
    startTime: '',
    endTime: '',
    developerId: '',
    developerName: '',
    progress: '',
    remark: ''
  },

  plan: {
    projectId: '',
    taskName: '',
    taskType: 'normal',
    degreen: '',
    priority: 0,
    taskTime: '',
    startTime: '',
    endTime: '',
    developerId: '',
    developerName: '',
    progress: '',
    remark: ''
  }
}
