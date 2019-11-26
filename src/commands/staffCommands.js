import gql from 'graphql-tag'

export const mutationTypes = {
  ADD_STAFF: 'addStaff',
  GET_STAFFS: 'getStaffs',
  EDIT_STAFF: 'editStaffs',
}

export const queryTypes = {
  GET_ROLES: 'getRoles',
  GET_STAFF: 'getStaff',
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
            id
            name
          }
      }
    }
  `,
  [mutationTypes.EDIT_STAFF]: gql`
    mutation updateStaff (
      $staffId: String!, 
      $fullName: String!,
      $phoneNumber: String!,
      $address: String!,
      $noNik: String!,
      $dateOfBirth: Long!,
      $roleId: String!,
      $staffEmail: String!
    ) {
      updateStaff(
        staffId: $staffId, 
        fullName: $fullName,
        phoneNumber: $phoneNumber,
        address: $address,
        noNik: $noNik,
        dateOfBirth: $dateOfBirth,
        roleId: $roleId,
        staffEmail: $staffEmail
      ) {
        status
        id
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
          email
          userProfile {
            fullName
            dateOfBirth
            address
            noNik
            phoneNumber
          }
        }
        role {
          id
          name
        }
      }
    }
  `,
  [queryTypes.GET_STAFF]: gql`
    query staff ($staffId: String!){
      staff(staffId: $staffId){
        status
        id
        user {
          username
          password
          email
          userProfile {
            phoneNumber
            dateOfBirth
            address
            noNik
            fullName
          }
        }
        role {
          id
          name
        }
      }
    }
  `,
}
