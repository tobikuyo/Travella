export const AddCommentMutation = `
    mutation($input: CreateCommentInput!) {
        addComment(input: $input) {
            id
            success
        }
    }
`;

export const UpdateCommentMutation = `
    mutation($text: String!, $commentId: String!) {
        updateComment(text: $text, id: $commentId) {
            ...on ResolverSuccess {
                success
                message
            }

            ...on ResolverError {
                message
            }
        }
    }
`;

export const DeleteCommentMutation = `
    mutation($commentId: String!) {
        deleteComment(id: $commentId) {
            success
            message
        }
    }
`;
