export const demo = {
  url: '/demo',
  method: 'post',

  request: {
    params: {
      str: '文本',
      num: 0,
      obj: {},
      bln: true,
      pageSize: 20,
      pageNum: 1,
      arr: [],
      date: '2019-10-10',
      userId: '',
      total: 0,
      list: []
    }
  },

  response: {
    data: {
      tree: [
        {
          id: '001',
          name: '节点1',
          children: []
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

      tableData: [
        {
          prop1: '内容1',
          prop2: '内容1',
          prop3: '内容1'
        },
        {
          prop1: '内容2',
          prop2: '内容2',
          prop3: '内容2'
        },
        {
          prop1: '内容3',
          prop2: '内容3',
          prop3: '内容3'
        }
      ],

      images: [
        {
          name: '图片1',
          url: 'http://192.168.102.233:83/files/jpg-demo.jpg',
          fileType: 'image'
        },
        {
          name: '图片1',
          url: 'http://192.168.102.233:83/files/png-demo.png',
          fileType: 'image'
        },
        {
          name: '图片1',
          url: 'http://192.168.102.233:83/files/bmp-demo.bmp',
          fileType: 'image'
        },
        {
          name: '图片1',
          url: 'http://192.168.102.233:83/files/gif-demo.gif',
          fileType: 'image'
        }
      ],

      attachs: [
        {
          fileType: 'pdf',
          name: '文件3',
          url: 'http://192.168.102.233:83/files/mp4-demo.mp4'
        },
        {
          fileType: 'pdf',
          name: '文件3',
          url: 'http://192.168.102.233:83/files/mp3-demo.mp3'
        },
        {
          fileType: 'excel',
          name: '文件1',
          url: 'http://192.168.102.233:83/files/excel-demo.xlsx'
        },
        {
          fileType: 'ppt',
          name: '文件2',
          url: 'http://192.168.102.233:83/files/ppt-demo.pptx'
        },
        {
          fileType: 'pdf',
          name: '文件3',
          url: 'http://192.168.102.233:83/files/pdf-demo.pdf'
        }
      ],

      audioSrc: 'http://192.168.102.233:83/files/mp3-demo.mp3',
      videoSrc: 'http://192.168.102.233:83/files/mp4-demo.mp4',

      list: [
        {
          id: '1',
          text: '内容'
        },
        {
          id: '2',
          text: '内容'
        },
        {
          id: '3',
          text: '内容'
        }
      ],

      total: 100
    }
  }
}
