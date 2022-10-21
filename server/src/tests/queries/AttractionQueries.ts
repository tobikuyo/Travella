export const GetAttractionQuery = `
    query($tripId: String!, $attractionId: String!) {
        getAttraction(tripId: $tripId, attractionId: $attractionId) {
            ...on Attraction {
                name
                image
                address
                rating
                awards
            }

            ...on ResolverError {
                message
            }
        }
    }
`;
