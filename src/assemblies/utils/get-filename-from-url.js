export default function (url) {
  return url.replace(/.*\//, '').replace(/\?.*/, '')
}
