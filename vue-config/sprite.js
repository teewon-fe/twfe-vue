const path = require('path')
const Spritesmith = require('webpack-spritesmith')

let iconPath = './src/assets/icons'

if (process.env.APP_TEMPLATE_TYPE === 'web-and-mobile') {
  if (process.env.VUE_APP_TYPE === 'web') {
    iconPath += '/web'
  } else if (process.env.VUE_APP_TYPE === 'mobile') {
    iconPath += '/mobile'
  }
}

module.exports = new Spritesmith({
  src: {
    cwd: iconPath,
    glob: '**/*.png',
    options: {
      dot: true
    }
  },

  target: {
    image: path.resolve('./src/assets/images/icons.png'),
    css: [
      [path.resolve('./src/assets/css/_sprite.scss'), {
        format: 'template'
      }]
    ]
  },

  apiOptions: {
    generateSpriteName (spritePath) {
      return /.*[\\/](.+)\.png$/.exec(spritePath)[1].replace(/\)/g, '>').replace(/;/g, ':')
    }
  },

  spritesmithOptions: {
    padding: 10
  },

  customTemplates: {
    template (data) {
      const css = data.sprites.map((s) => {
        let sizeArr = [s.width, s.height, s.offset_x, s.offset_y, s.total_width, s.total_height]

        if (process.env.VUE_APP_TYPE === 'mobile') {
          sizeArr = sizeArr.map(item => item / 2)
        }

        /* eslint-disable */
        let [width, height, offset_x, offset_y, total_width, total_height] = sizeArr

        return `${s.name} {\n  width: ${width}px;\n  height: ${height}px; \n  background-position: ${offset_x}px ${offset_y}px;\n  background-size: ${total_width}px ${total_height}px;\n}\n`
      }).join('\n')

      return css
    }
  }
})
