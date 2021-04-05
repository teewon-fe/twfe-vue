// 获取用户列表
export const getUsers = {
  url: '/user/list',
  method: 'get',

  request: {
    params: {
      groupIds: ''
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
