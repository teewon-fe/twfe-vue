const timestamp = require('time-stamp')

export default function (value) {
  const date = new Date(value * 1000)

  return timestamp('YYYY-MM-DD', date)
}
