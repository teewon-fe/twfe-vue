export default function (px) {
  return parseFloat(px) * document.documentElement.clientWidth / 375
}
