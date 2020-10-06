module.exports = {
  test: /\.(pdf|exe|xlsx|xls|doc|docx|ppt|pptx)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'files/[name].[ext]'
      }
    }
  ]
}
