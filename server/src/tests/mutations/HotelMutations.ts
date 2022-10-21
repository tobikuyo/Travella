export const AddHotelMutation = `
    mutation($input: CreateExperienceInput!) {
        addHotel(input: $input) {
            id
            success
        }
    }
`;

export const DeleteHotelMutation = `
    mutation($hotelId: String!) {
        deleteHotel(id: $hotelId) {
            success
            message
        }
    }
`;
