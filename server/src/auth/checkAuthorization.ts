import { AppContext } from 'interfaces/AppContext';
import { AppJwtPayload } from 'interfaces/AppJwtPayload';
import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';

export const checkAuthorization: MiddlewareFn<AppContext> = ({ context }, next) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization) throw new Error('You need a valid token');

    try {
        const accessToken = authorization.split(' ')[1];
        const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload as AppJwtPayload;
    } catch (error) {
        console.error('Verify Token Error', error.message);
        throw new Error('Please provide correct authentication details');
    }

    return next();
};
