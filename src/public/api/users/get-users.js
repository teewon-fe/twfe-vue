// 获取用户列表
export const getUsers = {
  url: '/user/list',
  method: 'get',

  request: {
    params: {
      groupIds: ''
    },

    removeEmptyItem: false,

    handler (params) {
      if (Array.isArray(params.groupIds)) {
        params.groupIds = params.groupIds.join(',')
      }

      return params
    }
  },

  response: {
    data: {
      list: []
    }
  }
}

// 获取所有可用用户及名称
export const getUsernames = {
  url: '/user/usernames',
  method: 'get',

  response: {
    data: {
      list: []
    }
  }
}

export const count = {
  url: '/user/count',
  method: 'get',

  request: {
    params: {
      groupId: ''
    }
  },

  response: {
    data: {
      count: 0
    }
  }
}
