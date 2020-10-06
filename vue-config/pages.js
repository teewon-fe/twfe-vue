module.exports =  process.env.VUE_APP_TYPE === 'web' ? {
  'web-page-name': {
    entry: 'src/main.js',
    template: 'public/index.html',
    chunks: ['chunk-vendors', 'chunk-common', 'web-page-name']
  }
} : {
  'mobile-page-name': {
    entry: 'src/main.js',
    template: 'public/index.html',
    chunks: ['chunk-vendors', 'chunk-common', 'mobile-page-name']
  }
}
