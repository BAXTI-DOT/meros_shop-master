import { gql } from '@apollo/client'

const FORWARDS = gql`
    query {
        getForward {
            id
            name
            price
            subcategory
            sale
            image
        }
    }
`

const SUBSCRIPTION = gql`
    subscription {
        getForward {
            id
            name
            price
            subcategory
            sale
            image
        }
    }
` 

export {
    FORWARDS,
    SUBSCRIPTION
}