export const GetCurrentUserQuery = `
    query {
        getCurrentUser {
            id
            name
            email
            type
            createdAt
        }
    }
`;

export const GetUserQuery = `
    query($input: GetUserInput!){
        getUser(input: $input) {
            ...on User {
                name
                email
                type
            }

            ...on ResolverError {
                message
            }
        }
    }
`;
