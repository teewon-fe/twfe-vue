const path = require('path')

module.exports = {
  includePaths: [
    path.resolve('./src/assets/css'),
    path.resolve('./src/assets/css/modules'),
    path.resolve('./src/components'),
    path.resolve('./src/assemblies/components')
  ],
  data: [
    `$app-type:${process.env.VUE_APP_TYPE};`,
    '@import "~@css/base/_functions.scss";',
    '@import "~@css/base/_variables.scss";',
    '@import "~@css/mixins/_responsive.scss";',
    '@import "~@css/mixins/_utils.scss";'
  ].join('')
}
