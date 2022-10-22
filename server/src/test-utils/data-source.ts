import { DataSource, DataSourceOptions } from 'typeorm';

export const options: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_TEST_USERNAME,
    password: process.env.POSTGRES_TEST_PASSWORD,
    database: process.env.POSTGRES_TEST_DATABASE,
    synchronize: true,
    dropSchema: true,
    entities: [__dirname + '/../models/*.ts']
};

export const TestDataSource = new DataSource(options);
