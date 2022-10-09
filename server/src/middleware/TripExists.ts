import { MiddlewareFn } from 'type-graphql';
import { getTrip } from 'helpers/getTrip';
import { AppContext } from 'interfaces/AppContext';

export const TripExists: MiddlewareFn<AppContext> = async ({ args, context }, next) => {
    try {
        const { tripId } = args.input ? args.input : args;
        const trip = await getTrip(tripId);
        if (!trip) throw new Error(`There is no trip with the id '${tripId}'`);
        context.trip = trip;
    } catch (error) {
        console.error('Trip Exists Error:', error.message);
        return { message: error.message };
    }

    return next();
};
