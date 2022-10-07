import { Request, Response } from 'express';
import { Trip, User } from 'models';

export interface AppContext {
    req: Request;
    res: Response;
    currentUser?: User;
    trip?: Trip;
}
