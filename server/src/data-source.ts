import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Comment, Experience, Reaction, Trip, User } from 'models';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: true,
    entities: [Comment, Experience, Reaction, Trip, User],
    migrations: [],
    subscribers: []
});
