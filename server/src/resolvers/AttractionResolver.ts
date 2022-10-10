import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';
import {
    AuthorizedMembers,
    EntityCreator,
    TripExists,
    UserAuthorization
} from 'middleware';
import { Attraction } from 'models';
import { DeleteEntityResult } from 'typeDefs';
import { CreateExperienceInput } from 'typeDefs/inputs';
import { CreateEntityResult, GetAttractionResult } from 'typeDefs/unions';

@Resolver()
export class AttractionResolver {
    // Get attraction
    @Query(() => GetAttractionResult)
    @UseMiddleware(TripExists, UserAuthorization, AuthorizedMembers)
    async getAttraction(
        @Arg('attractionId') id: string,
        @Arg('tripId') _tripId: string,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof GetAttractionResult> {
        try {
            const attraction = await Attraction.findOne({
                where: { id },
                relations: { reactions: true, trip: true }
            });

            if (attraction) return attraction;
            throw new Error(`There is no attraction with the id '${id}'`);
        } catch (error) {
            console.error('Get Attraction Error:', error);
            return { message: error.message };
        }
    }

    // Add attraction to trip
    @Mutation(() => CreateEntityResult)
    @UseMiddleware(TripExists, UserAuthorization, AuthorizedMembers)
    async addAttraction(
        @Ctx() { trip }: AppContext,
        @Arg('input') attractionInput: CreateExperienceInput,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof CreateEntityResult> {
        try {
            const attraction = await Attraction.insert({ ...attractionInput, trip });
            const { id } = attraction.identifiers[0];
            return { id, success: true };
        } catch (error) {
            console.error('Create Attraction Error:', error);
            return { message: error.message };
        }
    }

    // Delete attraction
    @Mutation(() => DeleteEntityResult)
    @UseMiddleware(UserAuthorization, EntityCreator)
    async deleteAttraction(
        @Arg('id') id: string,
        @Arg('type', { defaultValue: 'attraction' }) _type: string
    ): Promise<DeleteEntityResult> {
        try {
            await Attraction.delete({ id });
            return {
                success: true,
                message: `Attraction with id '${id} was deleted successfully`
            };
        } catch (error) {
            console.error('Delete Attraction Error:', error);
            return { success: false, message: error.message };
        }
    }
}
