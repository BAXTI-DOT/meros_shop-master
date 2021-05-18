import { gql } from '@apollo/client'

const NAVBAR = gql`
    query {
        navbar {
            id
            name
        }
    }
`

const SEARCH = gql`
    query {
        search {
            id
            name
        }
    }
`

export {
    NAVBAR,
    SEARCH
}