import { MiddlewareFn } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';

export const AuthorizedMembers: MiddlewareFn<AppContext> = async (
    { args, context },
    next
) => {
    try {
        const { currentUser, trip } = context;

        // Checks if the currently logged user was the creator of the trip
        // or in the invitees list.
        const isTripCreator = trip?.creator.id === currentUser?.id;
        context.isTripCreator = isTripCreator;

        const currentUserWasInvited =
            currentUser && trip?.invitees?.includes(currentUser.email);

        // Checks if the provided email, is indeed included in the invitees list.
        const invitedUserEmail = args.invitedUserInput
            ? args.invitedUserInput.email
            : args.invitedUserEmail;
        const invitedUser = trip?.invitees?.includes(invitedUserEmail);

        if (!isTripCreator && !currentUserWasInvited && !invitedUser) {
            throw new Error(
                'You are not authorised to view or make any changes to this trip'
            );
        }
    } catch (error) {
        console.error('Authorized Members Error:', error.message);
        return { message: error.message };
    }

    return next();
};
