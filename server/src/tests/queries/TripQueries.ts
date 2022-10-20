export const GetTripQuery = `
    query($tripId: String!) {
        getTrip(tripId: $tripId) {
            ...on Trip {
                id
                destination
                departureDate
                createdAt
                comments {
                    text
                }
            }

            ...on ResolverError {
                message
            }
        }
    }
`;
