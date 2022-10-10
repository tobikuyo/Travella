import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';
import {
    AuthorizedMembers,
    EntityCreator,
    TripExists,
    UserAuthorization
} from 'middleware';
import { Restaurant } from 'models';
import { DeleteEntityResult } from 'typeDefs';
import { CreateExperienceInput } from 'typeDefs/inputs';
import { CreateEntityResult, GetRestaurantResult } from 'typeDefs/unions';

@Resolver()
export class RestaurantResolver {
    // Get restaurant
    @Query(() => GetRestaurantResult)
    @UseMiddleware(TripExists, UserAuthorization, AuthorizedMembers)
    async getRestaurant(
        @Arg('id') id: string,
        @Arg('tripId') _tripId: string,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof GetRestaurantResult> {
        try {
            const restaurant = await Restaurant.findOne({
                where: { id },
                relations: { reactions: true, trip: true }
            });

            if (restaurant) return restaurant;
            throw new Error(`There is no restaurant with the id '${id}'`);
        } catch (error) {
            console.error('Get Restaurant Error:', error);
            return { message: error.message };
        }
    }

    // Add restaurant to trip
    @Mutation(() => CreateEntityResult)
    @UseMiddleware(TripExists, UserAuthorization, AuthorizedMembers)
    async addRestaurant(
        @Ctx() { trip }: AppContext,
        @Arg('input') restaurantInput: CreateExperienceInput,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof CreateEntityResult> {
        try {
            const restaurant = await Restaurant.insert({ ...restaurantInput, trip });
            const { id } = restaurant.identifiers[0];
            return { id, success: true };
        } catch (error) {
            console.error('Create Restaurant Error:', error);
            return { message: error.message };
        }
    }

    // Delete restaurant
    @Mutation(() => DeleteEntityResult)
    @UseMiddleware(UserAuthorization, EntityCreator)
    async deleteRestaurant(
        @Arg('id') id: string,
        @Arg('type', { defaultValue: 'restaurant' }) _type: string
    ): Promise<DeleteEntityResult> {
        try {
            await Restaurant.delete({ id });
            return {
                success: true,
                message: `Restaurant with id '${id} was deleted successfully`
            };
        } catch (error) {
            console.error('Delete Restaurant Error:', error);
            return { success: false, message: error.message };
        }
    }
}
