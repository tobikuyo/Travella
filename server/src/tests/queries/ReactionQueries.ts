export const GetReactionQuery = `
    query($reactionId: String!, $invitedUserEmail: String) {
        getReaction(id: $reactionId, invitedUserEmail: $invitedUserEmail) {
            ...on Reaction {
                like
                user {
                    name
                    email
                }
            }

            ...on ResolverError {
                message
            }
        }
    }
`;
