import { Trip } from 'models';

export const getTrip = async (id: string): Promise<Trip | null> => {
    try {
        const trip = await Trip.findOne({
            where: { id },
            relations: {
                creator: true,
                participants: true,
                restaurants: true,
                hotels: true,
                attractions: true,
                comments: true
            }
        });
        if (!trip) return null;
        return trip;
    } catch (error) {
        console.error('Get Trip Details Error ', error);
        return null;
    }
};
