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
        @Arg('tripId') _tripId: string,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<Trip | undefined> {
        return trip;
    }

    // Create trip
    @Mutation(() => CreateEntityResult)
    @UseMiddleware(UserAuthorization)
    async createTrip(
        @Arg('input') createTripInput: CreateTripInput,
        @Ctx() { currentUser }: AppContext
    ) {
        const tripInsertResult = await Trip.insert({
            ...createTripInput,
            creator: currentUser
        });

        const { id } = tripInsertResult.identifiers[0];
        return { id, success: true };
    }

    // Update trip details
    @Mutation(() => UpdateEntityResult)
    @UseMiddleware(TripExists, UserAuthorization, EntityCreator)
    async updateTrip(
        @Arg('tripId') id: string,
        @Arg('input') updateTripInput: UpdateTripInput
    ): Promise<typeof UpdateEntityResult> {
        await Trip.update(id, { ...updateTripInput });
        return { success: true, message: 'Trip details were updated successfully' };
    }

    // Delete trip
    @Mutation(() => DeleteEntityResult)
    @UseMiddleware(TripExists, UserAuthorization, EntityCreator)
    async deleteTrip(
        @Arg('tripId') id: string,
        @Arg('type', { defaultValue: 'trip' }) _type: string
    ): Promise<DeleteEntityResult> {
        await Trip.delete(id);
        return {
            success: true,
            message: `Trip with id '${id}' was deleted successfully`
        };
    }
}
