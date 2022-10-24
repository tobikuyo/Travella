import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
    mutation ($input: RegisterUserInput!) {
        registerUser(input: $input) {
            message
            success
        }
    }
`;

export const LOGIN_USER_MUTATION = gql`
    mutation ($password: String!, $email: String!) {
        loginUser(password: $password, email: $email) {
            ... on LoginSuccess {
                accessToken
            }

            ... on ResolverError {
                message
            }
        }
    }
`;
