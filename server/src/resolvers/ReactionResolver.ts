import { AppContext } from 'interfaces/AppContext';
import {
    AuthorizedMembers,
    DetermineExperience,
    EntityCreator,
    TripExists,
    UserAuthorization
} from 'middleware';
import { Reaction } from 'models';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { DeleteEntityResult } from 'typeDefs';
import { CreateEntityResult, GetReactionResult } from 'typeDefs/unions';

@Resolver()
export class ReactionResolver {
    @Query(() => GetReactionResult)
    @UseMiddleware(UserAuthorization, AuthorizedMembers)
    // Get reaction
    async getReaction(
        @Arg('id') id: string,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof GetReactionResult> {
        try {
            const reaction = await Reaction.findOne({
                relations: { user: true },
                where: { id }
            });

            if (reaction) return reaction;
            throw new Error(`There is no reaction with the id '${id}'`);
        } catch (error) {
            console.error('Get Reaction Error:', error.message);
            return { message: error.message };
        }
    }

    // Add reaction
    @Mutation(() => CreateEntityResult)
    @UseMiddleware(TripExists, UserAuthorization, AuthorizedMembers, DetermineExperience)
    async addReaction(
        @Ctx() { currentUser, experience }: AppContext,
        @Arg('type') type: string,
        @Arg('experienceId') _id: string,
        @Arg('tripId') _tripId: string
    ) {
        try {
            let experienceObj;

            if (type === 'restaurant') {
                experienceObj = { restaurant: experience };
            }

            if (type === 'hotel') {
                experienceObj = { hotel: experience };
            }

            if (type === 'attraction') {
                experienceObj = { attraction: experience };
            }

            const reaction = await Reaction.insert({
                like: true,
                user: currentUser,
                ...experienceObj
            });
            const { id } = reaction.identifiers[0];
            return { id, success: true };
        } catch (error) {
            console.error('Add Reaction Error:', error.message);
            return { message: error.message };
        }
    }

    // Delete reaction
    @Mutation(() => DeleteEntityResult)
    @UseMiddleware(UserAuthorization, EntityCreator)
    async deleteReaction(
        @Arg('id') id: string,
        @Arg('type', { defaultValue: 'reaction' }) _type: string
    ): Promise<DeleteEntityResult> {
        try {
            await Reaction.delete({ id });
            return {
                success: true,
                message: `Reaction with id '${id} was deleted successfully`
            };
        } catch (error) {
            console.error('Delete Reaction Error:', error);
            return { success: false, message: error.message };
        }
    }
}
