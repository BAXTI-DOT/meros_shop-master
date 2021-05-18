import { gql } from '@apollo/client'

const SUB_LINK = gql`
    query subclassLink($subclassID: ID!) {
        subclassLink(subclassID: $subclassID) {
            id
            category
            categoryID
            subcategory
            subcategoryID
            subclass
            subclassID
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

const SUBCLASS_PRODUCTS = gql`
    query subclassProducts($subclassID: ID! $sortStatus: Int! $page: Int! $limit: Int!) {
        subclassProducts(subclassID: $subclassID sortStatus: $sortStatus page: $page limit: $limit) {
            id
            name
            price
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
    SUB_LINK,
    SUB_CLASSES,
    FILTERS,
    FILTERED,
    SUBCLASS_PRODUCTS,
    RECOMMENDED_PRODUCTS,
    ADD_FORWARD
}