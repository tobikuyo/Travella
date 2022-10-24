import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { refreshToken } from 'helpers/refreshToken';

export const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.post('/refresh_token', refreshToken);
