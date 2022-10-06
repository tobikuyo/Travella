import { DataSource } from 'typeorm';
import {
    Attraction,
    Comment,
    Experience,
    Hotel,
    Reaction,
    Restaurant,
    Trip,
    User
} from 'models';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: true,
    entities: [Comment, Experience, Reaction, Trip, User, Attraction, Restaurant, Hotel],
    migrations: [],
    subscribers: []
});
