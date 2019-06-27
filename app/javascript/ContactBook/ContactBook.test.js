/* eslint-env jest */
import React from 'react'
import ContactBook, { ContactBookUI, createContact, findNearDuplicates } from './ContactBook.jsx'
import graphQlClient from 'graphql/client.js'
import { shallow } from 'enzyme'
import * as queries from 'graphql/queries.gql'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken.js'

jest.mock('graphql/client.js')
jest.mock('axios')
jest.mock('helpers/csrfToken.js')

describe('ContactBook', () => {
  it('wraps ContactBookUI in a GraphQL Query', () => {
    graphQlClient.query.mockResolvedValue({ data: null })
    const wrap = shallow(<ContactBook />)

    const query = wrap.find('Query')
    expect(query).toHaveProp('query', queries.contactBook)

    const childrenWrap = query.renderProp('children')({ loading: true, error: null, data: null })
    expect(childrenWrap.find('ContactBookUI')).toExist()
  })
})

describe('ContactBookUI', () => {
  const loading = false
  const error = null
  const data = null
  const props = { loading, error, data }

  it('renders loader while loading', () => {
    const wrap = shallow(<ContactBookUI {...props} loading />)
    expect(wrap.find('.loading')).toExist()
    expect(wrap.find('.error')).not.toExist()
    expect(wrap.find('ContactList')).not.toExist()
  })

  it('renders error message if an error is present', () => {
    const message = 'Something went boom'
    const error = new Error(message)
    const wrap = shallow(<ContactBookUI {...props} error={error} />)
    expect(wrap.find('.loading')).not.toExist()
    expect(wrap.find('.error')).toHaveText(message)
    expect(wrap.find('ContactList')).not.toExist()
  })

  it('renders address list when data is received', () => {
    const contacts = [{ name: 'One' }, { name: 'Two' }]
    const data = { contacts }
    const wrap = shallow(<ContactBookUI {...props} data={data} />)
    expect(wrap.find('.loading')).not.toExist()
    expect(wrap.find('.error')).not.toExist()
    expect(wrap.find('ContactList')).toHaveProp('contacts', contacts)
    expect(wrap.find('ContactList')).toHaveProp('selectContact', expect.any(Function))
  })

  it('shows ContactDetails when a contact is selected', () => {
    const contacts = [
      { id: '1', name: 'One', address: 'Onestr. 1', postalCode: '11111', city: 'Milano' },
      { id: '2', name: 'Two', address: 'Twostr. 2', postalCode: '22222', city: 'Milano' }
    ]
    const data = { contacts }
    const wrap = shallow(<ContactBookUI {...props} data={data} />)

    expect(wrap.find('ContactDetails')).not.toExist()

    wrap.find('ContactList').prop('selectContact')(contacts[1])

    const contactDetails = wrap.update().find('ContactDetails')
    expect(contactDetails).toExist()
    expect(contactDetails).toHaveProp('contact', contacts[1])
    expect(contactDetails).toHaveProp('deselectContact', expect.any(Function))

    wrap.find('ContactDetails').prop('deselectContact')()
    expect(wrap.update().find('ContactDetails')).not.toExist()
  })
})

describe('createContact', () => {
  const name = 'Some Contact Name'
  const address = 'Nice street 123'
  const postalCode = '12345'
  const city = 'Cozy Town'
  const token = 'some-csrf-token'

  it('makes a POST request to /contacts', () => {
    csrfToken.mockReturnValue(token)

    createContact({ name, address, postalCode, city })

    expect(axios.post).toHaveBeenCalledWith('/contacts', {
      contact: {
        name,
        address,
        postal_code: postalCode,
        city
      },
      authenticity_token: token
    }, {
      headers: { 'Accept': 'application/json' },
      responseType: 'json'
    })
  })
})

describe('findNearDuplicates', () => {
  const name = 'Some Contact Name'
  const address = 'Nice street 123'
  const postalCode = '12345'
  const city = 'Cozy Town'

  it('makes a GET request to /contacts/near_duplicates', () => {
    findNearDuplicates({ name, address, postalCode, city })

    expect(axios.get).toHaveBeenCalledWith('/contacts/near_duplicates', {
      params: {
        'contact[name]': name,
        'contact[address]': address,
        'contact[postal_code]': postalCode,
        'contact[city]': city
      },
      headers: { 'Accept': 'application/json' },
      responseType: 'json'
    })
  })
})
