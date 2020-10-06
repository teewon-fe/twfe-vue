/**
 * 功能: vue项目构建配置
 * http://192.168.102.233:83/#/doc/guid/vue-cli
 */

const alias = require('./vue-config/alias')
const sprite = require('./vue-config/sprite')
const scss = require('./vue-config/scss')

process.env.VUE_APP_VERSION = require('./package.json').tw.version

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  outputDir: process.env.APP_NAME,

  configureWebpack: config => {
    config.entry = `./src/${process.env.APP_NAME}/main.js`
    Object.assign(config.resolve.alias, alias)
    config.plugins.push(sprite)
  },
  css: {
    loaderOptions: { scss }
  }
}
