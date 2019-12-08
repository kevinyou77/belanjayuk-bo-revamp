import gql from 'graphql-tag'

export const mutationTypes = {
  LOGIN: 'login',
  CHANGE_PASSWORD: 'changePassword'
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
  [mutationTypes.CHANGE_PASSWORD]: gql`   
    mutation changePassword (
      $oldPassword: String!,
      $newPassword: String!,
      $confirmPassword: String!
    ) {
      changePassword(
        oldPassword: $oldPassword, 
        newPassword: $newPassword, 
        confirmPassword: $confirmPassword
      )
    }
  `
}
