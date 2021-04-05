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

// 新增问题
export const addIssue = {
  url: '/kpi/issue',
  method: 'post',

  request: {
    params: {
      id: '',
      descript: '',
      type: 'issue',
      project_id: '',
      project_name: '',
      create_developer_id: '',
      create_developer: '',
      handle_developer: '',
      resolve_time: '',
      status: 'doing'
    },

    handler (params) {
      params.create_developer_id = window.$app.user.userId
      params.create_developer = window.$app.user.username
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
      type: ''
    }
  },

  response: {
    data: {
      list: 0
    }
  }
}
