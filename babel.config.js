module.exports = Object.assign({
  presets: [
    '@vue/app'
  ]
}, process.env.VUE_APP_TYPE === 'mobile' ? {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: name => `${name}/style/less`
    }, 'vant']
  ]
} : null)
