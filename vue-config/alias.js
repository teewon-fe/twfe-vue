const path = require('path')

module.exports = {
  '@comps': path.resolve('./src/assemblies/components'),
  '@plugins': path.resolve('./src/assemblies/plugins'),
  '@utils': path.resolve('./src/assemblies/utils'),
  '@css': path.resolve('./src/assets/css'),
  '@images': path.resolve('./src/assets/images'),
  '@fonts': path.resolve('./src/assets/fonts'),
  'vue$': 'vue/dist/vue.esm.js'
}
