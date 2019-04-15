/* eslint-env jest */
import React from 'react'
import NewContact, { NewContactUI, NewContactForm } from './NewContact.jsx'
import { shallow, mount } from 'enzyme'

describe('NewContact', () => {
  const createContact = () => {}
  const onSuccess = () => {}
  const props = { createContact, onSuccess }

  it('renders NewContactUI wrapped in AsyncEffect', () => {
    const wrap = shallow(<NewContact {...props} />)

    const asyncEffect = wrap.find('AsyncEffect')
    expect(asyncEffect).toExist()
    expect(asyncEffect).toHaveProp('perform', createContact)
  })

  it('passes props, createContact and onSuccess to NewContactUI', () => {
    const wrap = shallow(<NewContact {...props} />)
    const asyncEffect = wrap.find('AsyncEffect')

    const perform = jest.fn()
    const childrenProps = { loading: false, error: null, data: null }
    const children = asyncEffect.renderProp('children')(perform, childrenProps)

    const newContactUI = children.find('NewContactUI')
    expect(newContactUI).toExist()
    expect(newContactUI).toHaveProp('createContact', perform)
    expect(newContactUI).toHaveProp('onSuccess', onSuccess)
    expect(newContactUI).toHaveProp(childrenProps)
  })
})

describe('NewContactUI', () => {
  const createContact = () => {}
  const onSuccess = () => {}
  const loading = false
  const data = null
  const error = null
  const props = {
    createContact,
    onSuccess,
    loading,
    data,
    error
  }

  it('displays form upon click on the add contact button', () => {
    const wrap = shallow(<NewContactUI {...props} />)

    const addContact = wrap.find('button.add-contact')
    expect(addContact).toExist()
    expect(wrap.find('NewContactForm')).not.toExist()

    addContact.simulate('click')

    const form = wrap.update().find('NewContactForm')
    expect(form).toExist()
  })

  let _alert

  beforeEach(() => {
    _alert = window.alert
    window.alert = jest.fn()
  })

  afterEach(() => {
    window.alert = _alert
  })

  it('hides the form and calls onSuccess upon successfully receiving data', () => {
    const onSuccess = jest.fn()
    const wrap = mount(<NewContactUI {...props} onSuccess={onSuccess} />)
    const data = {}

    wrap.setProps({ loading: false, data })

    expect(onSuccess).toHaveBeenCalledWith(data)
    expect(wrap.find('NewContactForm')).not.toExist()
  })

  it('shows an alert with the error message upon receiving an error', () => {
    const onSuccess = jest.fn()
    const wrap = mount(<NewContactUI {...props} onSuccess={onSuccess} />)
    const error = new Error()
    error.message = 'boom!'

    wrap.setProps({ loading: false, error })

    expect(onSuccess).not.toHaveBeenCalled()
    expect(window.alert).toHaveBeenCalledWith(error.message)
  })
})

describe('NewContactForm', () => {
  const createContact = () => {}
  const onCancel = () => {}
  const props = {
    createContact,
    onCancel
  }

  it('calls onCancel upon click on cancel button', () => {
    const onCancel = jest.fn()
    const wrap = shallow(<NewContactForm {...props} onCancel={onCancel} />)

    expect(onCancel).not.toHaveBeenCalled()

    wrap.find('button.negative').simulate('click')
    expect(onCancel).toHaveBeenCalled()
  })

  it('prevents default and calls createContact with all fields upon form submission', () => {
    const createContact = jest.fn()
    const wrap = shallow(<NewContactForm {...props} createContact={createContact} />)

    ;['name', 'address', 'postalCode', 'city'].forEach((fieldName) => {
      const input = wrap.find(`input[name="${fieldName}"]`)
      const value = `some value for ${fieldName}`
      const changeEvent = { target: { value } }

      input.simulate('change', changeEvent)
    })

    expect(createContact).not.toHaveBeenCalled()

    const submitEvent = { preventDefault: jest.fn() }
    wrap.find('form').simulate('submit', submitEvent)

    expect(submitEvent.preventDefault).toHaveBeenCalled()
    expect(createContact).toHaveBeenCalledWith({
      name: 'some value for name',
      address: 'some value for address',
      postalCode: 'some value for postalCode',
      city: 'some value for city'
    })
  })
})
