import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { API } from '../constants/api'

Vue.use(VueApollo)

const httpLink = createHttpLink({
  uri: API,
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})