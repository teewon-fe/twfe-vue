// 获取项目难度
export const degreens = {
  url: '/dic/degreens',
  method: 'get',
  once: true,

  debounce: {
    enable: true,
    message: ''
  },

  response: {
    data: {
      list: []
    }
  }
}
