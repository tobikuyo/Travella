export const GetRestaurantQuery = `
    query($tripId: String!, $restaurantId: String!) {
        getRestaurant(tripId: $tripId, id: $restaurantId) {
            ...on Restaurant{
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
