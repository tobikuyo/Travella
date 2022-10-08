import { AppContext } from 'interfaces/AppContext';
import {
    checkAuthorizedMembers,
    checkTripExists,
    checkUserAuthorization
} from 'middleware';
import { Comment } from 'models';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { CreateCommentInput } from 'typeDefs/inputs';
import { CreateEntityResult } from 'typeDefs/unions';

@Resolver()
export class CommentResolver {
    // Add comment to trip
    @Mutation(() => CreateEntityResult)
    @UseMiddleware(checkTripExists)
    @UseMiddleware(checkUserAuthorization)
    @UseMiddleware(checkAuthorizedMembers)
    async addComment(
        @Ctx() { trip, currentUser }: AppContext,
        @Arg('input') commentInput: CreateCommentInput,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof CreateEntityResult> {
        try {
            const comment = await Comment.insert({
                ...commentInput,
                author: currentUser,
                trip
            });
            const { id } = comment.identifiers[0];
            return { id };
        } catch (error) {
            console.error('Create Comment Error', error);
            return { message: error.message };
        }
    }
}
