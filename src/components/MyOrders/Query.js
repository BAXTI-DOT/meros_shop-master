import { gql } from '@apollo/client'

const STATES = gql`
    query {
        allStates {
            id
            name
        }
    }
`

const REGIONS = gql`
    query byStateID($stateID: ID!) {
        byStateID(stateID: $stateID) {
            id
            name
        }
    }
`

const PRODUCT_ID = gql`
  query {
    productID
  }
`

export {
    STATES,
    REGIONS,
    PRODUCT_ID
}