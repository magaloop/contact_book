/* eslint-env jest */
import React from 'react'
import ContactDetails from './ContactDetails.jsx'
import { shallow } from 'enzyme'

describe('ContactDetails', () => {
  const id = '1'
  const name = 'One'
  const address = 'Onestr. 1'
  const postalCode = '11111'
  const city = 'Berlin'
  const contact = { id, name, address, postalCode, city }
  const deselectContact = () => {}
  const props = { contact, deselectContact }

  it('renders the contact information', () => {
    const wrap = shallow(<ContactDetails {...props} />)

    expect(wrap.find('h3')).toHaveText(name)
    expect(wrap.find('address')).toIncludeText(address)
    expect(wrap.find('address')).toIncludeText(postalCode)
    expect(wrap.find('address')).toIncludeText(city)
  })

  it('calls deselectContact upon click on back button', () => {
    const deselectContact = jest.fn()
    const wrap = shallow(<ContactDetails {...props} deselectContact={deselectContact} />)

    expect(deselectContact).not.toHaveBeenCalled()

    wrap.find('button.back-button').simulate('click')
    expect(deselectContact).toHaveBeenCalled()
  })
})
