import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';
import {
    AuthorizedMembers,
    EntityCreator,
    UserAuthorization,
    TripExists
} from 'middleware';
import { Trip } from 'models';
import { DeleteEntityResult } from 'typeDefs';
import { CreateTripInput, UpdateTripInput } from 'typeDefs/inputs';
import { CreateEntityResult, GetTripResult, UpdateEntityResult } from 'typeDefs/unions';

@Resolver()
export class TripResolver {
    // Get trip details
    @Query(() => GetTripResult)
    @UseMiddleware(TripExists, UserAuthorization, AuthorizedMembers)
    async getTrip(
        @Ctx() { trip }: AppContext,
        @Arg('tripId') tripId: string,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof GetTripResult> {
        if (!trip) return { message: `There is no trip with the id '${tripId}'` };
        return trip;
    }

    // Create trip
    @Mutation(() => CreateEntityResult)
    @UseMiddleware(UserAuthorization)
    async createTrip(
        @Arg('input') createTripInput: CreateTripInput,
        @Ctx() { currentUser }: AppContext
    ) {
        try {
            const tripInsertResult = await Trip.insert({
                ...createTripInput,
                creator: currentUser
            });
            const { id } = tripInsertResult.identifiers[0];
            return { id, success: true };
        } catch (error) {
            console.error('Create Trip Error:', error);
            return { message: error.message };
        }
    }

    // Update trip details
    @Mutation(() => UpdateEntityResult)
    @UseMiddleware(TripExists, UserAuthorization, EntityCreator)
    async updateTrip(
        @Arg('tripId') id: string,
        @Arg('input') updateTripInput: UpdateTripInput
    ): Promise<typeof UpdateEntityResult> {
        try {
            const updatedTrip = await Trip.update(id, { ...updateTripInput });
            console.log('updatedTrip ', updatedTrip);
            return { success: true, message: 'Trip details were updated successfully' };
        } catch (error) {
            console.error('Update Trip Error:', error);
            return { success: false, message: error.message };
        }
    }

    // Delete trip
    @Mutation(() => DeleteEntityResult)
    @UseMiddleware(TripExists, UserAuthorization, EntityCreator)
    async deleteTrip(
        @Arg('tripId') id: string,
        @Arg('type', { defaultValue: 'trip' }) _type: string
    ): Promise<DeleteEntityResult> {
        try {
            await Trip.delete(id);
            return {
                success: true,
                message: `Trip with id '${id}' was deleted successfully`
            };
        } catch (error) {
            console.error('Delete Trip Error:', error);
            return { success: false, message: error.message };
        }
    }
}
