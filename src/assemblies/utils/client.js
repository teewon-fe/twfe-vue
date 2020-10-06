import * as Bowser from 'bowser'

const client = Bowser.parse(window.navigator.userAgent)
const browser = Bowser.getParser(window.navigator.userAgent)

export default {
  ...client,
  is (condition) {
    return browser.satisfies(condition)
  }
}
