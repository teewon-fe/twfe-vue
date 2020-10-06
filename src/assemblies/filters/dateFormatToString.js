export default function (val) {
  let value = new Date(val)
  let year = value.getFullYear()
  let month = value.getMonth() + 1
  let day = value.getDate()
  return year + '年' + month + '月' + day + '日'
}
