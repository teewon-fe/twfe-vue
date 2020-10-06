export default {
  timeout: 30000,

  authDetection: {
    enable: false
  },

  headers: {
    'session-id': window.$app.user.sessionid,
    'user-id': window.$app.user.userId
  },

  response: {
    dataKey: 'data.data',
    codeKey: 'data.code',
    uiMessageTypeKey: 'data.resType'
  }
}
