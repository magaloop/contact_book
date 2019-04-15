import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import './ContactList.scss'

const ContactList = ({ contacts }) => (
  <ul className='ContactList'>
    { sortBy(contacts, (contact) => contact.name).map((info, i) => <Contact key={i} {...info} />) }
  </ul>
)

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired
}

const Contact = ({ name, address, postalCode, city }) => (
  <li>
    <b>{ name }</b>
    <span>{ address }, { postalCode }, { city }</span>
  </li>
)

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired
}

export default ContactList
export { Contact }
