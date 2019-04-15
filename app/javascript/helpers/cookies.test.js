/* eslint-env jest */

import { cookies, getCookie } from './cookies.js'

describe('cookies', () => {
  beforeEach(() => {
    document.cookie = 'Some-Cookie=some%20value;'
    document.cookie = 'Some-Other-Cookie=some%20other%20value;'
  })

  afterEach(() => {
    document.cookie = 'Some-Cookie=;'
    document.cookie = 'Some-Other-Cookie=;'
  })

  it('returns an object of cookie names and values', () => {
    const object = cookies()
    expect(object['Some-Cookie']).toEqual('some value')
    expect(object['Some-Other-Cookie']).toEqual('some other value')
  })

  describe('getCookie', () => {
    it('returns the value of a cookie with the given name', () => {
      expect(getCookie('Some-Cookie')).toEqual('some value')
      expect(getCookie('Some-Other-Cookie')).toEqual('some other value')
    })

    it('returns undefined if the cookie does not exist', () => {
      expect(getCookie('Inexistent-Cookie')).toEqual(undefined)
    })
  })
})

