import { gql } from '@apollo/client'

const DATA = gql`
    query {
        cabinet {
            id
            name
            image
        }
    }
`

export {
    DATA
}