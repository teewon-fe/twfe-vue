// 获取用户列表
export const getUsers = {
  url: '/user/list',
  method: 'get',

  request: {
    params: {
      groupId: ''
    }
  },

  response: {
    data: {
      list: []
    }
  }
}
