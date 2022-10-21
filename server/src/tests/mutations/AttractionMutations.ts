export const AddAttractionMutation = `
    mutation($input: CreateExperienceInput!) {
        addAttraction(input: $input) {
            id
            success
        }
    }
`;

export const DeleteAttractionMutation = `
    mutation($attractionId: String!) {
        deleteAttraction(id: $attractionId) {
            success
            message
        }
    }
`;
