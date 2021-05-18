import { gql } from '@apollo/client'

const CART_PRODUCTS = gql`
    query {
        getCartProducts {
            id
            name
            price
            count
            subcategory
            image
        }
    }
`

const PRODUCT_SUBSCRIPTION = gql`
    subscription {
        getCartProducts {
            id
            name
            price
            count
            subcategory
            image
        }
    }
`

const SUM_SUBCRIPTION = gql`
    subscription {
        getCartSum {
            sum
        }
    }
`

const SUM = gql`
    query {
        getCartSum {
            sum
        }
    }
`

const UPDATE_PLUS = gql`
    mutation updateCountPlus($cartID: ID!) {
        updateCountPlus(cartID: $cartID)
    }
`

const UPDATE_MINUS = gql`
    mutation updateCountMinus($cartID: ID!) {
        updateCountMinus(cartID: $cartID)
    }
`

export {
    CART_PRODUCTS,
    PRODUCT_SUBSCRIPTION,
    SUM,
    SUM_SUBCRIPTION,
    UPDATE_PLUS,
    UPDATE_MINUS
}