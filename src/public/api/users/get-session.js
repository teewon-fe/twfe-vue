// 用户登录
export const getSession = {
  url: '/user',
  method: 'get',

  request: {
    params: {
      username: '',
      password: ''
    }
  },

  response: {
    data: {
      userId: '',
      sessionid: ''
    }
  }
}
