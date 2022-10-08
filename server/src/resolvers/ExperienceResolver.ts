import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';
import {
    checkAuthorizedMembers,
    checkTripExists,
    checkUserAuthorization
} from 'middleware';
import { Attraction, Hotel, Restaurant } from 'models';
import { CreateExperienceInput } from 'typeDefs/inputs';
import { CreateEntityResult } from 'typeDefs/unions';

@Resolver()
export class ExperienceResolver {
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

    // Add hotel to trip
    @Mutation(() => CreateEntityResult)
    @UseMiddleware(checkTripExists)
    @UseMiddleware(checkUserAuthorization)
    @UseMiddleware(checkAuthorizedMembers)
    async addHotel(
        @Ctx() { trip }: AppContext,
        @Arg('input') hotelInput: CreateExperienceInput,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof CreateEntityResult> {
        try {
            const hotel = await Hotel.insert({ ...hotelInput, trip });
            const { id } = hotel.identifiers[0];
            return { id };
        } catch (error) {
            console.error('Create Hotel Error', error);
            return { message: error.message };
        }
    }

    // Add attraction to trip
    @Mutation(() => CreateEntityResult)
    @UseMiddleware(checkTripExists)
    @UseMiddleware(checkUserAuthorization)
    @UseMiddleware(checkAuthorizedMembers)
    async addAttraction(
        @Ctx() { trip }: AppContext,
        @Arg('input') attractionInput: CreateExperienceInput,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof CreateEntityResult> {
        try {
            const attraction = await Attraction.insert({ ...attractionInput, trip });
            const { id } = attraction.identifiers[0];
            return { id };
        } catch (error) {
            console.error('Create Attraction Error', error);
            return { message: error.message };
        }
    }
}
