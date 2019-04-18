import React from 'react'
import PropTypes from 'prop-types'
import './ContactDetails.scss'

const ContactDetails = ({ deselectContact, contact }) => {
  const { name, address, postalCode, city } = contact

  return (
    <div className='overlay'>
      <div className='ContactDetails overlay-content'>
        <h3>{name}</h3>
        <address>
          { address }<br />
          { postalCode }, { city }
        </address>
        <div className='buttons'>
          <button className='back-button' onClick={deselectContact}>Back</button>
        </div>
      </div>
    </div>
  )
}

ContactDetails.propTypes = {
  deselectContact: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired
  }).isRequired
}

export default ContactDetails
