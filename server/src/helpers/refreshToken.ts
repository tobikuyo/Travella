import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppJwtPayload } from 'interfaces/AppJwtPayload';
import { User } from 'models';
import { createAccessToken, createRefreshToken } from './createTokens';

export const refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies.gid;
    if (!token) return res.send({ success: false, accessToken: '' });

    let payload: any;

    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!) as AppJwtPayload;
    } catch (error) {
        console.error('Refresh Token', error);
    }

    const user = await User.findOneBy({ id: payload.id });
    if (!user) return res.send({ success: false, accessToken: '' });

    // Token is valid, so we can send back an access token
    // Send new refresh token, so that a user can remain logged in
    res.cookie('gid', createRefreshToken(user), { httpOnly: true });
    return res.send({ success: true, accessToken: createAccessToken(user) });
};
