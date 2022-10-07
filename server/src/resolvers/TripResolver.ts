import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';
import { Restaurant } from 'models';
import {
    checkUserAuthorization,
    checkAuthorizedMembers,
    checkTripExists
} from 'middleware';
import { CreateExperienceInput } from 'typeDefs/inputs';
import { CreateEntityResult, GetTripResult } from 'typeDefs/unions';

@Resolver()
export class TripResolver {
    // Get trip details
    @Query(() => GetTripResult)
    @UseMiddleware(checkTripExists)
    @UseMiddleware(checkUserAuthorization)
    @UseMiddleware(checkAuthorizedMembers)
    async getTrip(
        @Ctx() { trip }: AppContext,
        @Arg('tripId') tripId: string,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof GetTripResult> {
        if (!trip) return { message: `There is no trip with the id '${tripId}'` };
        return trip;
    }

    // Add restaurant to trip
    @Mutation(() => CreateEntityResult)
    @UseMiddleware(checkTripExists)
    @UseMiddleware(checkUserAuthorization)
    @UseMiddleware(checkAuthorizedMembers)
    async addRestaurant(
        @Ctx() { trip }: AppContext,
        @Arg('input') restaurantInput: CreateExperienceInput,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof CreateEntityResult> {
        try {
            const restaurant = await Restaurant.insert({ ...restaurantInput, trip });
            const { id } = restaurant.identifiers[0];
            return { id };
        } catch (error) {
            console.error('Create Restaurant Error', error);
            return { message: error.message };
        }
    }
}
