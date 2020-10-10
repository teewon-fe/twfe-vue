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
      time_node_name: '项目开发',
      start_time: new Date(),
      remark: ''
    },
    {
      time_node_name: '转测SDV1',
      start_time: new Date(),
      remark: ''
    },
    {
      time_node_name: '版本发布',
      start_time: new Date(),
      remark: ''
    }
  ],

  timeNode: {
    time_node_name: '',
    start_time: '',
    remark: ''
  },

  plans: [
    {
      project_id: '',
      task_name: '需求评审',
      task_type: 'group',
      scope: 'all',
      degreen: '',
      priority: 0,
      taskTime: '',
      start_time: '',
      end_time: '',
      developer_id: '',
      developer_name: '',
      progress: '',
      remark: ''
    },
    {
      project_id: '',
      task_name: '需求评审(开发A)',
      task_type: 'normal',
      degreen: '',
      priority: 0,
      taskTime: '',
      start_time: '',
      end_time: '',
      developer_id: '',
      developer_name: '',
      progress: '',
      remark: ''
    },
    {
      project_id: '',
      task_name: '高保真评审',
      task_type: 'group',
      scope: 'all',
      degreen: '',
      priority: 0,
      taskTime: '',
      start_time: '',
      end_time: '',
      developer_id: '',
      developer_name: '',
      progress: '',
      remark: ''
    },
    {
      project_id: '',
      task_name: '高保真评审(开发A)',
      task_type: 'normal',
      degreen: '',
      priority: 0,
      taskTime: '',
      start_time: '',
      end_time: '',
      developer_id: '',
      developer_name: '',
      progress: '',
      remark: ''
    },
    {
      project_id: '',
      task_name: '任务分组名称',
      task_type: 'group',
      degreen: '',
      priority: 0,
      taskTime: '',
      start_time: '',
      end_time: '',
      developer_id: '',
      developer_name: '',
      progress: '',
      remark: ''
    },
    {
      project_id: '',
      task_name: '任务1',
      task_type: 'normal',
      degreen: '',
      priority: 0,
      taskTime: '',
      start_time: '',
      end_time: '',
      developer_id: '',
      developer_name: '',
      progress: '',
      remark: ''
    },
    {
      project_id: '',
      task_name: '一级用例自验',
      task_type: 'group',
      scope: 'all',
      degreen: '',
      priority: 0,
      taskTime: '',
      start_time: '',
      end_time: '',
      developer_id: '',
      developer_name: '',
      progress: '',
      remark: ''
    },
    {
      project_id: '',
      task_name: '一级用例自验(开发A)',
      task_type: 'normal',
      degreen: '',
      priority: 0,
      taskTime: '',
      start_time: '',
      end_time: '',
      developer_id: '',
      developer_name: '',
      progress: '',
      remark: ''
    },
    {
      project_id: '',
      task_name: 'UI验收意见修改',
      task_type: 'group',
      scope: 'all',
      degreen: '',
      priority: 0,
      taskTime: '',
      start_time: '',
      end_time: '',
      developer_id: '',
      developer_name: '',
      progress: '',
      remark: ''
    },
    {
      project_id: '',
      task_name: 'UI验收意见修改(开发A)',
      task_type: 'normal',
      degreen: '',
      priority: 0,
      taskTime: '',
      start_time: '',
      end_time: '',
      developer_id: '',
      developer_name: '',
      progress: '',
      remark: ''
    },
    {
      project_id: '',
      task_name: '转测改单',
      task_type: 'group',
      scope: 'all',
      degreen: '',
      priority: 0,
      taskTime: '',
      start_time: '',
      end_time: '',
      developer_id: '',
      developer_name: '',
      progress: '',
      remark: ''
    },
    {
      project_id: '',
      task_name: '转测改单(开发A)',
      task_type: 'normal',
      degreen: '',
      priority: 0,
      taskTime: '',
      start_time: '',
      end_time: '',
      developer_id: '',
      developer_name: '',
      progress: '',
      remark: ''
    }
  ],

  planGroup: {
    project_id: '',
    task_name: '',
    task_type: 'group',
    degreen: '',
    priority: 0,
    taskTime: '',
    start_time: '',
    end_time: '',
    developer_id: '',
    developer_name: '',
    progress: '',
    remark: ''
  },

  plan: {
    project_id: '',
    task_name: '',
    task_type: 'normal',
    degreen: '',
    priority: 0,
    taskTime: '',
    start_time: '',
    end_time: '',
    developer_id: '',
    developer_name: '',
    progress: '',
    remark: ''
  }
}
