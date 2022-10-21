export const AddReactionMutation = `
    mutation($tripId: String!, $experienceId: String!, $type: String!) {
        addReaction(tripId: $tripId, experienceId: $experienceId, type: $type) {
            id
            success
        }
    }
`;

export const DeleteReactionMutation = `
    mutation($reactionId: String!) {
        deleteReaction(id: $reactionId) {
            success
            message
        }
    }
`;
