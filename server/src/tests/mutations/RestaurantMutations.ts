export const AddRestaurantMutation = `
    mutation($input: CreateExperienceInput!) {
        addRestaurant(input: $input) {
            id
            success
        }
    }
`;

export const DeleteRestaurantMutation = `
    mutation($restaurantId: String!) {
        deleteRestaurant(id: $restaurantId) {
            success
            message
        }
    }
`;
