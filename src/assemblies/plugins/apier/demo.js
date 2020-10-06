export const demo = {
  url: '/demo',
  method: 'post',

  request: {
    params: {
      str: '占位符',
      num: 0,
      obj: {},
      bln: true,
      pageSize: 20,
      pageNum: 1,
      arr: [],
      date: '2019-10-10'
    }
  },

  response: {
    data: {
      list: [
        { id: '001', name: '选项1', type: '1' },
        { id: '002', name: '选项2', type: '2' },
        { id: '003', name: '选项3', type: '3' }
      ],
      tree: [
        {
          id: '001',
          name: '节点1',
          children: [
            {
              id: '001-001',
              name: '节点1-1'
            },
            {
              id: '001-002',
              name: '节点1-2'
            },
            {
              id: '001-003',
              name: '节点1-3'
            }
          ]
        },
        {
          id: '002',
          name: '节点2',
          children: [
            {
              id: '002-001',
              name: '节点2-1',
              children: [
                {
                  id: '002-001-001',
                  name: '节点2-1-1'
                },
                {
                  id: '002-001-002',
                  name: '节点2-1-2'
                },
                {
                  id: '002-001-003',
                  name: '节点2-1-3'
                }
              ]
            },
            {
              id: '002-002',
              name: '节点2-2',
              children: [
                {
                  id: '002-002-001',
                  name: '节点2-2-1'
                },
                {
                  id: '002-002-002',
                  name: '节点2-2-2'
                },
                {
                  id: '002-002-003',
                  name: '节点2-2-3'
                }
              ]
            },
            {
              id: '002-003',
              name: '节点2-3'
            }
          ]
        },
        {
          id: '003',
          name: '节点3',
          children: [
            {
              id: '003-001',
              name: '节点3-1'
            },
            {
              id: '003-002',
              name: '节点3-2'
            },
            {
              id: '003-003',
              name: '节点3-3'
            }
          ]
        }
      ],
      classes: [
        {
          id: '000',
          name: '全部',
          children: [
            {
              id: '001',
              name: '我的任教班级',
              children: [
                {
                  id: '001-00',
                  name: '班级一'
                },
                {
                  id: '001-002',
                  name: '班级二'
                }
              ]
            },
            {
              id: '002',
              name: '高一',
              children: [
                {
                  id: '002-001',
                  name: '高一625班'
                },
                {
                  id: '002-002',
                  name: '高一626班'
                },
                {
                  id: '002-003',
                  name: '高一627班'
                },
                {
                  id: '002-004',
                  name: '高一628班'
                },
                {
                  id: '002-005',
                  name: '高一629班'
                },
                {
                  id: '002-006',
                  name: '高一630班'
                },
                {
                  id: '002-007',
                  name: '高一631班'
                }
              ]
            },
            {
              id: '003',
              name: '高二',
              children: [
                {
                  id: '003-001',
                  name: '高一625班'
                },
                {
                  id: '003-002',
                  name: '高一626班'
                },
                {
                  id: '003-003',
                  name: '高一627班'
                },
                {
                  id: '003-004',
                  name: '高一628班'
                },
                {
                  id: '003-005',
                  name: '高一629班'
                },
                {
                  id: '003-006',
                  name: '高一630班'
                },
                {
                  id: '003-007',
                  name: '高一631班'
                }
              ]
            }
          ]
        }
      ],
      abc: 333,
      total: 100,
      audioSrc: 'http://192.168.115.239:9001/1.mp3',
      videoSrc: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/2cd87a85226739595755659265/v.f30.mp4'
    }
  },

  getters (store) {
    return store.params.str
  }
}
