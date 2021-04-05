// 获取项目列表
export const getProjects = {
  url: '/project',
  method: 'get',

  request: {
    params: {
      id: '',
      developer_id: '',
      status: '',
      pageNo: 1,
      pageSize: 20
    }
  },

  response: {
    data: {
      list: [],
      total: 0
    }
  }
}

// 更新项目
export const add = {
  url: '/project',
  method: 'post',

  request: {
    params: {
      id: '',

      project: {
        project_name: '【ECOV0R0C00】[AIREQ-0000]需求名称',
        project_version: '',
        project_type: '',
        dev_group: [],
        developer_ids: [],
        developer_names: [],
        project_leader_id: -1,
        project_leader_name: '',
        project_svn: '',
        project_prd_url: '',
        project_design_svn: '',
        project_psd_svn: '',
        project_api_svn: '',
        project_test_case_svn: '',
        status: '',
        remark: '',
        project_fe_leader_id: '',
        project_fe_leader_name: ''
      },

      timeNodes: [],

      plans: []
    },

    removeEmptyItem: false,

    rules: {
      'project.projectName': { required: true, message: '请输入项目名称', trigger: 'blur' },
      'project.projectVersion': { required: true, message: '请输入项目版本', trigger: 'blur' },
      'project.projectType': { required: true, message: '请选择项目版本', trigger: 'change' },
      'project.groupId': { required: true, message: '请选择开发组', trigger: 'change' },
      'project.developerIds': { required: true, message: '请选择开发成员', trigger: 'change' },
      'project.projectSvn': { required: true, message: '请输入项目svn地址', trigger: 'blur' }
    }
  },

  response: {
    data: {
      projectId: ''
    }
  }
}

export const update = window.$ui.cloneApiOption(add, {
  method: 'put'
})

// 更新单个计划进度
export const updatePlan = {
  url: '/project/plan',
  method: 'put',

  request: {
    params: {
      id: '',
      progress: 0
    }
  }
}

// 关闭项目
export const close = {
  url: '/project/close',
  method: 'put',

  request: {
    params: {
      id: 1
    }
  }
}

// 项目数量
export const count = {
  url: '/project/count',
  method: 'get',

  response: {
    data: {
      total: 0,
      doing: 0
    }
  }
}

// 删除项目
export const del = {
  url: '/project/{id}/{pwd}',
  method: 'delete',

  request: {
    mode: 'path',
    params: {
      id: '',
      pwd: ''
    }
  }
}

// 获取月度任务时间
export const mounthTaskTime = {
  url: '/project/month-task-time',
  method: 'get',

  request: {
    params: {
      ym: ''
    }
  },

  response: {
    data: {
      totalTime: 0
    }
  }
}

// 获取月度总进度
export const mounthProgress = {
  url: '/project/month-progress',
  method: 'get',

  request: {
    params: {
      ym: ''
    }
  },

  response: {
    data: {
      totalProgress: 0
    }
  }
}

// 获取进行中的项目列表
export const getDoingProjects = {
  url: '/project/doing-projects',
  method: 'get',

  response: {
    data: {
      list: []
    }
  }
}
