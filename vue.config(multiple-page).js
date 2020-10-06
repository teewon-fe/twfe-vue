/**
 * 功能: vue项目构建配置
 * http://192.168.102.233:83/#/doc/guid/vue-cli
 */
const webpack = require('webpack')

const alias = require('./vue-config/alias')
const sprite = require('./vue-config/sprite')
const files = require('./vue-config/files')
const scss = require('./vue-config/scss')
const pages = require('./vue-config/pages')

module.exports = {
  pages,
  publicPath: process.env.VUE_APP_TYPE === 'web' ? '/web/' : '/mobile/',
  outputDir: process.env.VUE_APP_TYPE === 'web' ? 'web' : 'mobile',
  productionSourceMap: false,

  configureWebpack: config => {
    Object.assign(config.resolve.alias, alias)
    config.plugins.push(sprite)
    config.module.rules.push(files)
    config.devServer = { index: `${process.env.APP_NAME}.html` }
    config.performance = {
      hints: false
    }
  },
  css: {
    loaderOptions: { scss }
  }
}
