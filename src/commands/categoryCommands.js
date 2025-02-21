import gql from 'graphql-tag'

export const mutationTypes = {
  ADD_CATEGORY: 'addCategory',
  DELETE_CATEGORY: 'deleteCategory'
}

export const queryTypes = {
  GET_CATEGORIES: 'getCategories',
}

export const mutations = {
  [mutationTypes.ADD_CATEGORY]: gql`
    mutation category($name: String!) {
      createCategory(name: $name) {
        id
        name
      }
    }
  `,
  [mutationTypes.DELETE_CATEGORY]: gql`
    mutation category($id: String!) {
      deleteCategory(id: $id)
    }
  `
}

export const queries = {
  [queryTypes.GET_CATEGORIES]: gql`
    query categories {
      categories {
        id
        name
      }
    }
  `,
}
