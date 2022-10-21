import { Trip } from 'models';

export const getTrip = async (id: string): Promise<Trip | null> => {
    const trip = await Trip.findOne({
        where: { id },
        relations: ['creator', 'restaurants', 'hotels', 'attractions', 'comments']
    });

    if (!trip) return null;
    return trip;
};
