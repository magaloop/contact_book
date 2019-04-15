import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../Layout/Layout.jsx'
import { ApolloProvider, Query } from 'react-apollo'
import ContactList from '../ContactList/ContactList.jsx'
import NewContact from '../NewContact/NewContact.jsx'
import * as queries from '../graphql/queries.gql'
import graphQlClient from '../graphql/client.js'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken.js'
import './ContactBook.scss'

const ContactBook = () => (
  <ApolloProvider client={graphQlClient}>
    <Query query={queries.contactBook}>
      { (props) => <ContactBookUI {...props} /> }
    </Query>
  </ApolloProvider>
)

const ContactBookUI = ({ loading, error, data, refetch }) => {
  const { contacts } = data || {}

  return (
    <Layout>
      <div className='ContactBook'>
        { loading && <span className='loading'>Loading...</span> }
        { error && <span className='error'>{ error.message || 'An unexpected error occurred' }</span> }
        { contacts && <ContactList contacts={contacts} /> }
        <NewContact createContact={createContact} onSuccess={refetch} />
      </div>
    </Layout>
  )
}

ContactBookUI.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  data: PropTypes.shape({
    data: PropTypes.array
  })
}

const createContact = ({ name, address, postalCode, city }) =>
  axios.post('/contacts', {
    contact: {
      name,
      address,
      postal_code: postalCode,
      city
    },
    authenticity_token: csrfToken()
  }, {
    headers: { 'Accept': 'application/json' },
    responseType: 'json'
  })

export default ContactBook
export { ContactBookUI, createContact }
