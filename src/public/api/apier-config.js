export default {
  timeout: 30000,

  authDetection: {
    enable: false
  },

  headers: {
    'token': window.$app.user.token,
    'user-id': window.$app.user.userId,
    'global-dev-group': window.$app.user.globalDevGroup
  },

  response: {
    dataKey: 'data.data',
    codeKey: 'data.code',
    uiMessageTypeKey: 'data.resType'
  }
}
