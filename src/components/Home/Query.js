import { gql } from '@apollo/client'

const BEST_PRODUCTS = gql`
    query {
        bestProducts {
            id
            name
            price
            category
            image
        }
    }
`

const SALE_PRODUCTS = gql`
    query {
        saleProducts {
            id
            name
            price
            category
            image
        }
    }
`

const RECOMMENDED_PRODUCTS = gql`
    query {
        recommended {
            id
            name
            price
            category
            image
        }
    }
`

const POPULAR_CATEGORIES = gql`
    query {
        popular {
            id
            name
        }
    }
`

const ADD_FORWARD = gql`
    mutation addToForwards($productID: ID!) {
        addToForwards(productID: $productID)
    }
`

const ADD_TO_CART = gql`
    mutation addToCart($productID: ID! $productCount: Int!) {
        addToCart(productID: $productID productCount: $productCount)
    }
`

export {
    BEST_PRODUCTS,
    SALE_PRODUCTS,
    RECOMMENDED_PRODUCTS,
    POPULAR_CATEGORIES,
    ADD_FORWARD,
    ADD_TO_CART
}