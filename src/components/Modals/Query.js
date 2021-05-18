import { gql } from '@apollo/client'

const ALL_CATEGORIES = gql`
    query {
        categories {
            id
            name
        }
    }
`

const ALL_SUBCATEGORIES = gql`
    query categoryID($categoryID: ID!) {
        subcategory(categoryID: $categoryID) {
            id
            name
        }
    }
`

const SUBCATEGORIES = gql`
    query modalSubcategory($categoryID: ID!) {
        modalSubcategory(categoryID: $categoryID) {
            id
            name
            subclass {
                id
                name
            }
        }
    }
`

const CREATE_COMMENT = gql`
    mutation createComment($body: String! $rate: Int! $productID: ID!) {
        createComment(body: $body rate: $rate productID: $productID)
    }
`

export {
    ALL_CATEGORIES,
    ALL_SUBCATEGORIES,
    SUBCATEGORIES,
    CREATE_COMMENT
}