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

// 获取节假日与加班日期
export const specialDates = {
  url: '/dic/specialDates',
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
