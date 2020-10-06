export default function numToRoman (val) {
  let ans = ''
  let k = Math.floor(val / 1000)
  let h = Math.floor((val % 1000) / 100)
  let t = Math.floor((val % 100) / 10)
  let o = val % 10
  let one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  let ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']
  let hundred = ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
  let thousand = 'M'

  for (let i = 0; i < k; i++) {
    ans += thousand
  }

  if (h) { ans += hundred[h - 1] }
  if (t) { ans += ten[t - 1] }
  if (o) { ans += one[o - 1] }

  return ans
}
