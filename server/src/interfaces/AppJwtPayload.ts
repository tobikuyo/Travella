import { JwtPayload } from 'jsonwebtoken';

export interface AppJwtPayload extends JwtPayload {
    id: string;
}
