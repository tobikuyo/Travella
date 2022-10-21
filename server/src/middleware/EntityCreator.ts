import { MiddlewareFn } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';
import { Attraction, Comment, Hotel, Reaction, Restaurant, Trip } from 'models';

export const EntityCreator: MiddlewareFn<AppContext> = async (
    { args, context },
    next
) => {
    try {
        const { type, id, tripId } = args;
        const { currentUser } = context;

        const experienceFilter = {
            where: { id },
            relations: { trip: true }
        };

        const restaurant = await Restaurant.findOne(experienceFilter);
        const hotel = await Hotel.findOne(experienceFilter);
        const attraction = await Attraction.findOne(experienceFilter);

        const reaction = await Reaction.findOne({
            relations: { user: true },
            where: { id }
        });

        const comment = await Comment.findOne({
            relations: { author: true },
            where: { id }
        });

        let trip: Trip | null | undefined;

        if (type === 'trip') {
            trip = await Trip.findOne({
                relations: { creator: true },
                where: { id: tripId }
            });

            if (!trip) throw new Error(`There is no trip with the id '${tripId}'`);
        }

        if (type === 'restaurant') {
            trip = restaurant?.trip;
        }

        if (type === 'hotel') {
            trip = hotel?.trip;
        }

        if (type === 'attraction') {
            trip = attraction?.trip;
        }

        const isTripCreator = currentUser?.id === trip?.creator?.id;
        const isReactionCreator = currentUser?.id === reaction?.user.id;
        const isCommentAuthor = currentUser?.id === comment?.author.id;

        if (type === 'trip' && !trip) return next();
        if (type === 'restaurant' && !restaurant) return next();
        if (type === 'hotel' && !hotel) return next();
        if (type === 'attraction' && !attraction) return next();
        if (type === 'reaction' && !reaction) return next();
        if (type === 'comment' && !comment) return next();

        if (
            type === ('trip' || 'restaurant' || 'hotel' || 'attraction') &&
            !isTripCreator
        ) {
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
        return { message: error.message };
    }

    return next();
};
