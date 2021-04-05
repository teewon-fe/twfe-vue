// 注册登录
export const addUser = {
  url: '/users',
  method: 'post',

  request: {
    params: {
      username: '',
      password: '',
      mob: '',
      groupId: '1'
    }
  },

  response: {
    data: {
      userId: '',
      token: ''
    }
  }
}
