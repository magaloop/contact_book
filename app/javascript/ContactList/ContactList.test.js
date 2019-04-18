/* eslint-env jest */
import React from 'react'
import ContactList, { Contact } from './ContactList.jsx'
import { shallow } from 'enzyme'
import reverse from 'lodash/fp/reverse'

describe('ContactList', () => {
  const contacts = [
    { id: '1', name: 'One', address: 'Onestr. 1', postalCode: '11111', city: 'Berlin' },
    { id: '2', name: 'Two', address: 'Twostr. 2', postalCode: '22222', city: 'Milano' }
  ]
  const selectContact = () => {}
  const props = { contacts, selectContact }

  it('renders each Contact', () => {
    const selectContact = jest.fn()
    const wrap = shallow(<ContactList {...props} selectContact={selectContact} />)
    const contactItems = wrap.find('Contact')

    expect(contactItems).toHaveLength(contacts.length)
    expect(selectContact).not.toHaveBeenCalled()

    contactItems.forEach((contactItem, i) => {
      expect(contactItem).toHaveProp(contacts[i])
      expect(contactItem).toHaveProp('onClick', expect.any(Function))

      contactItem.prop('onClick')()
      expect(selectContact).toHaveBeenCalledWith(contacts[i])
    })
  })

  it('sorts contacts alphabeticaly by name', () => {
    const wrap = shallow(<ContactList {...props} contacts={reverse(contacts)} />)
    const contactItems = wrap.find('Contact')

    expect(contactItems).toHaveLength(contacts.length)

    contactItems.forEach((contactItem, i) => {
      expect(contactItem).toHaveProp(contacts[i])
    })
  })
})

describe('Contact', () => {
  const id = '46'
  const name = 'Some name'
  const address = 'Some street 123'
  const postalCode = '12345'
  const city = 'Some City'
  const onClick = () => {}
  const props = { id, name, address, postalCode, city, onClick }

  it('renders the contact details', () => {
    const wrap = shallow(<Contact {...props} />)
    expect(wrap).toIncludeText(name)
    expect(wrap).toIncludeText(address)
    expect(wrap).toIncludeText(postalCode)
    expect(wrap).toIncludeText(city)
  })

  it('calls onClick upon click', () => {
    const onClick = jest.fn()
    const wrap = shallow(<Contact {...props} onClick={onClick} />)

    expect(onClick).not.toHaveBeenCalled()

    wrap.find('li').simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
