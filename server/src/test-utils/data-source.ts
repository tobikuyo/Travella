import { DataSource } from 'typeorm';
import { options as dataSourceOptions } from './databaseSetup';

export const TestDataSource = new DataSource(dataSourceOptions);
