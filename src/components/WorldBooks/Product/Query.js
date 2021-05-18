import { gql } from '@apollo/client'

const PRODUCT = gql`
    query singleProduct($productID: ID!)  {
        singleProduct(productID: $productID) {
            id
            name
            price
            definition
            image
            details {
                title
                name
            }
        }
    }
`

const PRODUCT_LINK = gql`
    query singleProductLink($productID: ID!) {
        singleProductLink(productID: $productID) {
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

const COMMENTS = gql`
    query byProductID($productID: ID! $page: Number! $limit: Number!) {
        byProductID(productID: $productID page: $page limit: $limit) {
            id
            userName
            rate
            body
            createdTime
        }
    }
`

const COMMENT_COUNT = gql`
    query countComments($limit: Number! $productID: ID!) {
        countComments(limit: $limit productID: $productID)
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

const FIRST_STAR = gql`
    query firstCount($productID: ID!) {
        firstCount(productID: $productID) {
            count
        }
    }
`

const SECOND_STAR = gql`
    query secondCount($productID: ID!) {
        secondCount(productID: $productID) {
            count
        }
    }
`

const THIRD_STAR = gql`
    query thirdCount($productID: ID!) {
        thirdCount(productID: $productID) {
            count
        }
    }
`

const FOURTH_STAR = gql`
    query fourthCount($productID: ID!) {
        fourthCount(productID: $productID) {
            count
        }
    }
`

const FIFTH_STAR = gql`
    query fifthCount($productID: ID!) {
        fifthCount(productID: $productID) {
            count
        }
    }
`

const ALL_COUNT = gql`
    query allCount($productID: ID!) {
        allCount(productID: $productID) {
            count
        }
    }
`

const SUBSCRIPTION = gql`
    subscription byProductID($productID: ID! $page: Number! $limit: Number!) {
        byProductID(productID: $productID page: $page limit: $limit) {
            id
            userName
            rate
            body
            createdTime
        }
    }
`

export {
    PRODUCT,
    PRODUCT_LINK,
    COMMENTS,
    COMMENT_COUNT,
    RECOMMENDED_PRODUCTS,
    FIRST_STAR,
    SECOND_STAR,
    THIRD_STAR,
    FOURTH_STAR,
    FIFTH_STAR,
    ALL_COUNT,
    SUBSCRIPTION
}