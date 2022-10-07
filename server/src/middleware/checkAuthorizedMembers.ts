import { MiddlewareFn } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';

export const checkAuthorizedMembers: MiddlewareFn<AppContext> = async (
    { args, context },
    next
) => {
    try {
        const { currentUser, trip } = context;
        const isTripCreator = trip?.creator.id === currentUser?.id;
        const invitedUser = trip?.invitees?.includes(args.invitedUserEmail);

        if (!isTripCreator || !invitedUser) {
            throw new Error(
                'You are not authorised to view or make any changes to this trip'
            );
        }
    } catch (error) {
        console.error('Invited User Authorization Error:', error.message);
        return { message: error.message };
    }

    return next();
};
