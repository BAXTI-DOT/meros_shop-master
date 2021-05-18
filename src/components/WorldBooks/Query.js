import { gql } from '@apollo/client'

const SUB_DATA = gql`
    query subcategoryLink($subcategoryID: ID!) {
        subcategoryLink(subcategoryID: $subcategoryID) {
            id
            category
            categoryID
            subcategory
            subcategoryID
        } 
    }
`

const SUB_CLASSES = gql`
    query subClasses($subcategoryID: ID!) {
        subClasses(subcategoryID: $subcategoryID) {
            id
            name
        }
    }
`

const FILTERS = gql`
    query filters($subcategoryID: ID!) {
        filters(subcategoryID: $subcategoryID) {
            id
            name
            detail {
                    id
                    name
                }
            }
    }
`

const FILTERED = gql`
    query filteredProducts($input: [ID!]) {
        filteredProducts(input: $input) {
            id
            name
            price
            sale
            image
        }
    }
`

const SUBCATEGORY_PRODUCTS = gql`
    query subcategoryProducts($subcategoryID: ID! $sortStatus: Int! $page: Int! $limit: Int!) {
        subcategoryProducts(subcategoryID: $subcategoryID sortStatus: $sortStatus page: $page limit: $limit) {
            id
            name
            price
            category
            sale
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

const ADD_FORWARD = gql`
    mutation addToForwards($productID: ID!) {
        addToForwards(productID: $productID)
    }
`

export {
    SUB_DATA,
    SUB_CLASSES,
    FILTERS,
    FILTERED,
    SUBCATEGORY_PRODUCTS,
    RECOMMENDED_PRODUCTS,
    ADD_FORWARD
}