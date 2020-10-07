// 获取用户
export const getUser = {
  url: '/user/id',
  method: 'get',

  request: {
    params: {
      id: ''
    }
  },

  response: {
    data: {
      user: null
    }
  }
}
