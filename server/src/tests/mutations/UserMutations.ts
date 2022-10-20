export const RegisterMutation = `
    mutation($registerInput: RegisterUserInput!) {
        registerUser(input: $registerInput) {
            message
            success
        }
    }
`;

export const LoginMutation = `
    mutation($password: String!, $email: String!) {
        loginUser(password: $password, email: $email) {
            ...on LoginSuccess {
                accessToken
            }

            ...on ResolverError {
                message
            }
        }
    }
`;

export const CreateTempUserMutation = `
    mutation($input: CreateTempUserInput!) {
        createTempUser(input: $input) {
            success
            message
        }
    }
`;
