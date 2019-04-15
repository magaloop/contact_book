/* eslint-env jest */
import React from 'react'
import AsyncEffect from './AsyncEffect.jsx'
import { shallow } from 'enzyme'

describe('AsyncEffect', () => {
  const perform = () => new Promise(() => {})
  const children = (perform, props) => <div {...props} perform={perform} />
  const props = { perform, children }

  it('calls children function with loading state', () => {
    const children = jest.fn((perform, props) => <div {...props} perform={perform} />)
    const perform = jest.fn(() => new Promise(() => {}))
    const wrap = shallow(<AsyncEffect {...props} perform={perform} children={children} />)

    expect(children).toHaveBeenCalledWith(expect.any(Function), expect.objectContaining({
      loading: false,
      error: null,
      data: null
    }))

    const args = ['some', 'args']
    const promise = wrap.prop('perform')(...args)
    expect(promise).toBeInstanceOf(Promise)
    expect(perform).toHaveBeenCalledWith(...args)
    wrap.update()

    expect(children).toHaveBeenLastCalledWith(expect.any(Function), expect.objectContaining({
      loading: true,
      error: null,
      data: null
    }))
  })

  it('calls children function with data if promise resolves successfully', () => {
    const children = jest.fn((perform, props) => <div {...props} perform={perform} />)
    const data = { something: 'some data' }
    const perform = jest.fn(() => Promise.resolve(data))
    const wrap = shallow(<AsyncEffect {...props} perform={perform} children={children} />)

    const promise = wrap.prop('perform')()

    expect.assertions(1)
    return promise.then(() => {
      wrap.update()
      expect(children).toHaveBeenLastCalledWith(expect.any(Function), expect.objectContaining({
        loading: false,
        error: null,
        data
      }))
    })
  })

  it('calls children function with error if promise is rejected', () => {
    const children = jest.fn((perform, props) => <div {...props} perform={perform} />)
    const error = new Error('boom')
    const perform = jest.fn(() => Promise.reject(error))
    const wrap = shallow(<AsyncEffect {...props} perform={perform} children={children} />)

    const promise = wrap.prop('perform')()

    expect.assertions(1)
    return promise.catch(() => {
      wrap.update()
      expect(children).toHaveBeenLastCalledWith(expect.any(Function), expect.objectContaining({
        loading: false,
        data: null,
        error
      }))
    })
  })
})
