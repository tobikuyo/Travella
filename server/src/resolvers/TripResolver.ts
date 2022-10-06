import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getTrip } from 'helpers/getTrip';
import { Restaurant } from 'models';
import { CreateRestaurantResult, GetTripResult } from 'typeDefs/unions';
import { CreateExperienceInput } from 'typeDefs/inputs';

@Resolver()
export class TripResolver {
    // Get trip details
    @Query(() => GetTripResult)
    async getTrip(@Arg('id') id: string): Promise<typeof GetTripResult> {
        const trip = await getTrip(id);
        if (trip) return trip;
        return { message: `There is no trip with the id '${id}'` };
    }

    // Add restaurant to trip
    @Mutation(() => CreateRestaurantResult)
    async createRestaurant(
        @Arg('tripId') tripId: string,
        @Arg('input') restaurantInput: CreateExperienceInput
    ): Promise<typeof CreateRestaurantResult> {
        try {
            const trip = await getTrip(tripId);
            if (!trip) return { message: `There is no trip with the id '${tripId}'` };

            const restaurant = await Restaurant.insert({ ...restaurantInput, trip });
            const { id } = restaurant.identifiers[0];
            return { id };
        } catch (error) {
            console.error('Create Restaurant Error', error);
            return { message: error.message };
        }
    }
}
