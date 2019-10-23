import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { API } from '../constants/api'
import { ApolloLink } from 'apollo-link'

Vue.use(VueApollo)

const httpLink = createHttpLink({
  uri: API,
})

const authLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem('bearerToken');

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })

  return forward(operation);
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})