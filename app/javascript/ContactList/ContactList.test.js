/* eslint-env jest */
import React from 'react'
import ContactList, { Contact } from './ContactList.jsx'
import { shallow } from 'enzyme'
import reverse from 'lodash/fp/reverse'

describe('ContactList', () => {
  const contacts = [
    { name: 'One', address: 'Onestr. 1', postalCode: '11111', city: 'Berlin' },
    { name: 'Two', address: 'Twostr. 2', postalCode: '22222', city: 'Milano' }
  ]
  const props = { contacts }

  it('renders each Contact', () => {
    const wrap = shallow(<ContactList {...props} />)
    const addressElements = wrap.find('Contact')

    expect(addressElements).toHaveLength(contacts.length)

    addressElements.forEach((addressElement, i) => {
      expect(addressElement).toHaveProp(contacts[i])
    })
  })

  it('sorts contacts alphabeticaly by name', () => {
    const wrap = shallow(<ContactList {...props} contacts={reverse(contacts)} />)
    const addressElements = wrap.find('Contact')

    expect(addressElements).toHaveLength(contacts.length)

    addressElements.forEach((addressElement, i) => {
      expect(addressElement).toHaveProp(contacts[i])
    })
  })
})

describe('Contact', () => {
  const name = 'Some name'
  const address = 'Some street 123'
  const postalCode = '12345'
  const city = 'Some City'
  const props = { name, address, postalCode, city }

  it('renders the contact details', () => {
    const wrap = shallow(<Contact {...props} />)
    expect(wrap).toIncludeText(name)
    expect(wrap).toIncludeText(address)
    expect(wrap).toIncludeText(postalCode)
    expect(wrap).toIncludeText(city)
  })
})
