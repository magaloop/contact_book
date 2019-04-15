/* eslint-env jest */

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'

configure({ adapter: new Adapter() })

// Raise failed PropTypes as errors in tests
const logError = console.error
console.error = function (message) {
  if (/^Warning: Failed prop type/.test(message)) {
    throw TypeError(message.replace(/^Warning: /, ''))
  } else {
    logError.apply(console, arguments)
  }
}
