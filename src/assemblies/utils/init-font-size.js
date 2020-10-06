// set root font size for the rem
const initFont = function () {
  const windowWidth = document.documentElement.clientWidth
  const baseWidth = 375
  const baseFontSize = 37.5
  const widthRate = (windowWidth / baseWidth).toFixed(2)

  let rootFontSize = 0
  rootFontSize = parseFloat((widthRate * baseFontSize).toFixed(1))

  document.documentElement.style.fontSize = rootFontSize + 'px'
}

initFont()

window.addEventListener('resize', initFont)

window.onload = initFont
