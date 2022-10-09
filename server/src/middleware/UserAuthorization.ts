import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';
import { AppJwtPayload } from 'interfaces/AppJwtPayload';
import { User } from 'models';

export const UserAuthorization: MiddlewareFn<AppContext> = async (
    { args, context },
    next
) => {
    // An email would be sent for a temporary user, instead of an authorization header.
    // In that case, the AuthorizedMembers middleware, will validate the request.
    if (args?.invitedUserEmail) return next();

    const authorization = context.req.headers['authorization'];
    if (!authorization) throw new Error('You need a valid access token');

    try {
        const accessToken = authorization.split(' ')[1];
        const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);

        // At this point jsonwebtoken's verify would have thrown an error if the user passed in
        // had an invalid access token, so there should be a valid user with the provided id.
        const { id } = payload as AppJwtPayload;
        const currentUser = await User.findOneBy({ id });
        context.currentUser = currentUser as User;
    } catch (error) {
        console.error('Verify Token Error:', error.message);
        return { message: error.message };
    }

    return next();
};
