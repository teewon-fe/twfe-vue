// 获取项目列表
export const getProjects = {
  url: '/project',
  method: 'get',

  request: {
    params: {
      id: '',
      pageNo: 1,
      pageSize: 10
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
        project_name: '',
        project_version: '',
        project_type: '',
        dev_group: '',
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
        status
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
