import { AppContext } from 'interfaces/AppContext';
import {
    AuthorizedMembers,
    EntityCreator,
    TripExists,
    UserAuthorization
} from 'middleware';
import { Comment } from 'models';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { DeleteEntityResult } from 'typeDefs';
import { CreateCommentInput } from 'typeDefs/inputs';
import { CreateEntityResult, UpdateEntityResult } from 'typeDefs/unions';

@Resolver()
export class CommentResolver {
    // Add comment to trip
    @Mutation(() => CreateEntityResult)
    @UseMiddleware(TripExists, UserAuthorization, AuthorizedMembers)
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
            return { id, success: true };
        } catch (error) {
            console.error('Create Comment Error', error);
            return { message: error.message };
        }
    }

    // Update comment
    @Mutation(() => UpdateEntityResult)
    @UseMiddleware(UserAuthorization, EntityCreator)
    async updateComment(
        @Arg('id') id: string,
        @Arg('text') text: string,
        @Arg('type', { defaultValue: 'comment' }) _type: string
    ): Promise<typeof UpdateEntityResult> {
        try {
            await Comment.update(id, { text });
            return { success: true, message: 'Comment was updated successfully' };
        } catch (error) {
            console.error('Update Comment Error:', error.message);
            return { success: false, message: error.message };
        }
    }

    // Delete comment
    @Mutation(() => DeleteEntityResult)
    @UseMiddleware(UserAuthorization, EntityCreator)
    async deleteComment(
        @Arg('id') id: string,
        @Arg('type', { defaultValue: 'comment' }) _type: string
    ): Promise<DeleteEntityResult> {
        try {
            await Comment.delete(id);
            return {
                success: true,
                message: `Comment with id '${id}' was deleted successfully`
            };
        } catch (error) {
            console.error('Delete Comment Error:', error.message);
            return { success: false, message: error.message };
        }
    }
}
