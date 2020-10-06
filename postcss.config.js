module.exports = process.env.VUE_APP_TYPE === 'mobile' ? {
  plugins: {
    autoprefixer: {},
    'postcss-plugin-px2rem': {
      rootValue: 37.5,
      mediaQuery: true,
      exclude: '/node_modules/i',
      selectorBlackList: ['html'],
      propBlackList: ['border']
    }
  }
} : { plugins: { autoprefixer: {} } }
