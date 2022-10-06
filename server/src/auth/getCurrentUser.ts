import { AppJwtPayload } from 'interfaces/AppJwtPayload';
import { User } from 'models';

// This should never return null, since the payload would have been verified by the
// checkAuthorization middleware. The middleware will throw an error if the user provides an
// invalid access token, before this function is even called
export const getCurrentUser = async (payload: AppJwtPayload): Promise<User> => {
    const { id } = payload;
    const currentUser = await User.findOneBy({ id });
    return currentUser as User;
};
