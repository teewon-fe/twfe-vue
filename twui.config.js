module.exports = {
  swagger: {
    docs: [
      {
        path: 'http://localhost:3000/v1/doc.yml',
        outputDir: './src/public/api/v1'
      }
    ],
    flatten: {
      enable: true,
      defaultKey: 'data',
      pageableKey: 'data'
    },
    default: {
      pageNum: 1,
      pageSize: 20
    }
  }
}
