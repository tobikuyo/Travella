import { MiddlewareFn } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';
import { Comment, Reaction } from 'models';

export const checkEntityCreator: MiddlewareFn<AppContext> = async (
    { args, context },
    next
) => {
    try {
        const { type } = args;
        const { currentUser, trip } = context;

        const reaction = await Reaction.findOneBy({ id: args?.reactionId });
        const comment = await Comment.findOneBy({ id: args?.commentId });

        const isTripCreator = currentUser === trip?.creator;
        const isReactionCreator = currentUser === reaction?.user;
        const isCommentAuthor = currentUser === comment?.author;

        if ((type === 'trip' || type === 'experience') && !isTripCreator) {
            throw new Error("Only the trips's creator can delete it");
        }

        if (type === 'reaction' && !isReactionCreator) {
            throw new Error("Only the reaction's creator can delete it");
        }

        if (type === 'comment' && !isCommentAuthor) {
            throw new Error("Only the comment's author can update or delete it");
        }
    } catch (error) {
        console.error('Entity Creator Error:', error.message);
        return { success: false, message: error.message };
    }

    return next();
};
