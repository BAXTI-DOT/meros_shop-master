import { gql } from '@apollo/client'

const LOGIN = gql`
    mutation login($number: String! $password: String!) {
        login(number: $number password: $password)
    }
`

export {
    LOGIN
}