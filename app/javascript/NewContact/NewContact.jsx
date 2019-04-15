import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AsyncEffect from '../AsyncEffect/AsyncEffect.jsx'
import capitalize from 'lodash/capitalize'
import './NewContact.scss'

const NewContact = ({ createContact, onSuccess }) => (
  <AsyncEffect perform={createContact}>
    { (perform, props) => <NewContactUI {...props} createContact={perform} onSuccess={onSuccess} /> }
  </AsyncEffect>
)

const NewContactUI = ({ createContact, onSuccess, loading, data, error }) => {
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (data != null) {
      onSuccess(data)
      setShowForm(false)
    }

    if (error != null) {
      window.alert(error.message || 'An unexpected error occurred')
    }
  }, [data, error])

  return (
    <div className='NewContact'>
      <button className='primary add-contact' disabled={loading} onClick={() => setShowForm(true)}>
        +
      </button>
      { showForm && <NewContactForm createContact={createContact} onCancel={() => setShowForm(false)} /> }
    </div>
  )
}

NewContactUI.propTypes = {
  createContact: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  data: PropTypes.object
}

const NewContactForm = ({ createContact, onCancel }) => {
  const [newContact, setNewContact] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    createContact(newContact)
  }

  const handleFieldChange = (fieldName) => ({ target: { value } }) => {
    setNewContact({ ...newContact, [fieldName]: value })
  }

  const renderField = (fieldName, label) => (
    <label>
      { label || capitalize(fieldName) }

      <input
        type='text'
        name={fieldName}
        onChange={handleFieldChange(fieldName)}
        value={newContact[fieldName] || ''} />
    </label>
  )

  return (
    <div className='overlay'>
      <form className='overlay-content' onSubmit={handleSubmit}>
        <h2>New Contact</h2>

        { renderField('name') }

        { renderField('address') }

        { renderField('postalCode', 'Postal Code') }

        { renderField('city') }

        <div className='buttons'>
          <button className='negative' onClick={onCancel}>Cancel</button>
          <button type='submit' className='primary'>Create</button>
        </div>
      </form>
    </div>
  )
}

NewContactForm.propTypes = {
  createContact: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default NewContact
export { NewContactUI, NewContactForm }
