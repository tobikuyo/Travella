import { AppContext } from 'interfaces/AppContext';
import { Attraction, Experience, Hotel, Restaurant } from 'models';
import { MiddlewareFn } from 'type-graphql';

export const DetermineExperience: MiddlewareFn<AppContext> = async (
    { args, context },
    next
) => {
    try {
        const { type, experienceId: id } = args;
        let experience: Experience | null | undefined;

        if (type === 'restaurant') {
            experience = await Restaurant.findOneBy({ id });
        }

        if (type === 'hotel') {
            experience = await Hotel.findOneBy({ id });
        }

        if (type === 'attraction') {
            experience = await Attraction.findOneBy({ id });
        }

        if (experience) context.experience = experience;
    } catch (error) {
        console.error('Determine Experience Error:', error.message);
        return { message: error.message };
    }

    return next();
};
