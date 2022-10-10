import { Request, Response } from 'express';
import { Experience, Trip, User } from 'models';

export interface AppContext {
    req: Request;
    res: Response;
    currentUser?: User;
    trip?: Trip;
    experience?: Experience;
}
