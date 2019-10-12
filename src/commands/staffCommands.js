import gql from 'graphql-tag'

export const mutationTypes = {
  ADD_STAFF: 'addStaff',
  GET_STAFFS: 'getStaffs',
}

export const queryTypes = {
  GET_ROLES: 'getRoles',
}

export const mutations = {
  [mutationTypes.ADD_STAFF]: gql`
    mutation createStaff($staff: StaffInput!) {
      createStaff(staff: $staff){
          id
          user{
            username
            password
            email
            userProfile{
              address
              fullName
              dateOfBirth
              noNik
              phoneNumber
            }
          }
          role {
            name
          }
      }
    }
  `,
}

export const queries = {
  [queryTypes.GET_ROLES]: gql`
    query datas {
      roles {
        id
        name
      }
    }
  `,
  [queryTypes.GET_STAFFS]: gql`
    query staffList {
      staffs {
        status
        id
        user {
          username
          userProfile {
            fullName
          }
        }
        role {
          name
        }
      }
    }
  `
}
