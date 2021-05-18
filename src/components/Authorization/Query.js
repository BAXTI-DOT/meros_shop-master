import { gql } from '@apollo/client'

const REGISTER = gql`
    mutation register($name: String! $number: String! $password: String!) {
        register(name: $name number: $number password: $password)
    }
`

export {
    REGISTER
}