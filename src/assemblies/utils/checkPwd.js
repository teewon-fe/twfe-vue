var patterns = {
  letter: /[a-z]+/,
  letterUpper: /[A-Z]+/,
  digit: /\d+/,
  symbol: /([^\w\s]+|_+)/
}
export default {
  check: function (pwd) {
    var result
    var checks = {}
    if (this.digitAndLetter(pwd)) {
      result = 'f'
    } else {
      checks['number'] = true
      checks['letter'] = true
      checks['letterUpper'] = true
      // 包含特殊字符
      if (this.checkSymbol(pwd)) {
        checks['symbol'] = true
      }
      result = checks
    }
    return result
  },
  checkDigital: function (pwd) {
    return patterns.digit.test(pwd)
  },
  checkLetter: function (pwd) {
    return patterns.letter.test(pwd)
  },
  checkSymbol: function (pwd) {
    return patterns.symbol.test(pwd)
  },
  checkLetterUpper: function (pwd) {
    return patterns.letterUpper.test(pwd)
  },
  digitAndLetter: function (pwd) {
    return this.checkDigital(pwd) && this.checkLetter(pwd) && this.checkLetterUpper(pwd) ? !1 : !0
  }
}
