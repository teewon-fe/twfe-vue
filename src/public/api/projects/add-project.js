// 获取项目列表
export const getProjects = {
  url: '/project',
  method: 'get',

  request: {
    params: {
      pageNo: 1,
      pageSize: 2
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
export const update = {
  url: '/project',
  method: 'post',

  request: {
    params: {
      projectId: '',

      project: {
        projectName: '',
        projectVersion: '',
        projectType: '',
        groupId: '',
        developerIds: [],
        developerNames: [],
        projectLeaderId: -1,
        projectLeaderName: '',
        projectSvn: '',
        projectPrdUrl: '',
        projectDesignSvn: '',
        projectPsdSvn: '',
        projectApiSvn: '',
        projectTestCaseSvn: ''
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
