import gql from 'graphql-tag'

export const mutationTypes = {
  LOGIN: 'login',
}

export const mutations = {
  [mutationTypes.LOGIN]: gql`
    mutation login($username: String!, $password: String!){
      login(username: $username, password: $password){
        bearerToken
        roleName
        username
        id
      }
    }
  `,
}
