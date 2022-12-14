export const CreateTripMutation = `
    mutation($input: CreateTripInput!) {
        createTrip(input: $input) {
            id
            success
        }
    }   
`;

export const UpdateTripMutation = `
    mutation($updateTripInput: UpdateTripInput!, $tripId: String!) {
        updateTrip(input: $updateTripInput, tripId: $tripId) {
            ...on ResolverSuccess {
                message
                success
            }
            
            ...on ResolverError {
                message
            }
        }
    }
`;

export const DeleteTripMutation = `
    mutation($tripId: String!) {
        deleteTrip(tripId: $tripId) {
            success
            message
        }
    }
`;
