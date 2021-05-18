import { gql } from '@apollo/client'

const BOOK_NAME = gql`
    query byCategoryID($categoryID: ID!) {
        byCategoryID(categoryID: $categoryID) {
            id
            name
        }
    }
`

const COUNT = gql`
    query categoryCount($categoryID: ID!) {
        categoryCount(categoryId: $categoryID)
    }
`

const CATEGORY_NAV = gql`
    query subcategory($categoryID: ID!) {
        subcategory(categoryID: $categoryID) {
            id
            name
        }
    }
`

const NEW_PRODUCTS = gql`
    query newProducts($categoryID: ID!) {
        newProducts(categoryId: $categoryID) {
            id
            name
            price
            subcategory
            sale
            image
        }
    }
`

const ADD_FORWARD = gql`
    mutation addToForwards($productID: ID!) {
        addToForwards(productID: $productID)
    }
`

export { BOOK_NAME, COUNT, CATEGORY_NAV, NEW_PRODUCTS, ADD_FORWARD }