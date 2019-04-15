import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import csrfToken from 'helpers/csrfToken.js'

const fetchWithCSRF = (fetch) => (uri, options) => {
  options.headers['X-CSRF-Token'] = csrfToken()
  return fetch(uri, options)
}

const httpLink = new HttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
  fetch: fetchWithCSRF(window.fetch)
})

const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache()
})

export default client
