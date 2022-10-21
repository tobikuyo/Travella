export const GetTripQuery = `
    query($tripId: String!) {
        getTrip(tripId: $tripId) {           
            id
            destination
            departureDate
            createdAt
            comments {
                text
            }
        }
    }
`;
