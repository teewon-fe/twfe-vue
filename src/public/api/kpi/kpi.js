// 按组获取所有人的kpi
export const list = {
  url: '/kpi',
  method: 'get',

  request: {
    mode: 'query',
    params: {
      ym: '',
      user_group: '1'
    }
  },

  response: {
    data: {
      list: 0
    }
  }
}

// 插入kpi
export const submitKpi = {
  url: '/kpi',
  method: 'post',

  request: {
    params: {
      time_node: null,
      kpis: {}
    }
  }
}

// 更新kpi
export const updateKpi = {
  url: '/kpi',
  method: 'put',

  request: {
    params: {
      time_node: null,
      kpis: {}
    }
  }
}

// 按时间节点查询kpi
export const getApisByTimeNode = {
  url: '/kpi/getApisByTimeNode',
  method: 'get',

  request: {
    mode: 'query',
    params: {
      time_node_id: ''
    },

    handler (params) {
      params.time_node_id = parseInt(params.time_node_id)
      return params
    }
  },

  response: {
    data: {
      list: 0
    }
  }
}

// 新增问题
export const addIssue = {
  url: '/kpi/issue',
  method: 'post',

  request: {
    params: {
      id: '',
      descript: '',
      type: 'risk',
      project_id: '',
      project_name: '',
      create_developer_id: '',
      create_developer: '',
      group_id: '',
      handle_developer: '',
      resolve_time: '',
      status: 'doing'
    },

    handler (params) {
      params.create_developer_id = window.$app.user.userId
      params.create_developer = window.$app.user.username
      params.group_id = window.$app.user.userGroup
      return params
    },

    rules: {
      'descript': { required: true, message: '请输入问题描述', trigger: 'blur' }
    }
  },

  response: {
    data: {
      issueId: ''
    }
  }
}

// 删除项目
export const delIssue = {
  url: '/kpi/issue/{id}',
  method: 'delete',

  request: {
    mode: 'path',
    params: {
      id: ''
    }
  }
}

// 更新问题
export const updateIssue = window.$ui.cloneApiOption(addIssue, {
  method: 'put'
})

// 获取所有的问题列表
export const issues = {
  url: '/kpi/issues',
  method: 'get',

  request: {
    mode: 'query',
    params: {
      type: '',
      status: 'doing'
    }
  },

  response: {
    data: {
      list: 0
    }
  }
}

// 在jira中查询问题列表
export const jira = {
  url: '/kpi/jira',
  method: 'get',

  request: {
    mode: 'query',
    params: {
      keyword: '',
      users: []
    }
  },

  response: {
    data: {
      list: []
    }
  }
}
