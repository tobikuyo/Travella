import { sign } from 'jsonwebtoken';
import { User } from 'models';

export const createAccessToken = (user: User): string => {
    return sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '5m' });
};

export const createRefreshToken = (user: User): string => {
    return sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};
