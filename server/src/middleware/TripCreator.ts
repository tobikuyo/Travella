import { MiddlewareFn } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';
import { Attraction, Hotel, Restaurant, Trip } from 'models';

// This middleware is used specifically for 'Experience' entities, to determine
// if the currentUser is authorised to delete the entity, since only the trip's creator can delete
// these entities from a trip.
export const TripCreator: MiddlewareFn<AppContext> = async ({ args, context }, next) => {
    const { type, id } = args;
    const { currentUser, isTripCreator } = context;
    const errorMessage = 'Only the trip creator can delete from the trip';

    if (isTripCreator === true) return next();

    try {
        let experience;
        const tripFilter = {
            where: { id },
            relations: { trip: true }
        };

        if (type === 'restaurant') {
            experience = await Restaurant.findOne(tripFilter);
        }

        if (type === 'hotel') {
            experience = await Hotel.findOne(tripFilter);
        }

        if (type === 'attraction') {
            experience = await Attraction.findOne(tripFilter);
        }

        const trip = await Trip.findOne({
            where: { id: experience?.trip.id },
            relations: { creator: true }
        });

        if (currentUser?.id !== trip?.creator.id) throw new Error(errorMessage);
    } catch (error) {
        console.error('Trip Creator Error:', error.message);
        return { message: error.message };
    }

    return next();
};
