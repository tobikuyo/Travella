export const GetHotelQuery = `
    query($tripId: String!, $hotelId: String!) {
        getHotel(tripId: $tripId, hotelId: $hotelId) {
            ...on Hotel {
                name
                image
                address
                rating
            }

            ...on ResolverError {
                message
            }
        }
    }
`;
