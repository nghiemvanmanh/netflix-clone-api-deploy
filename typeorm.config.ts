import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const isProduction: boolean = process.env.NODE_ENV === 'production';

const entitiesPath = isProduction
  ? `${process.cwd()}/database/**/**.entity.js`
  : `${process.cwd()}/database/**/**.entity.ts`;

const migrationsPath = isProduction
  ? `${process.cwd()}/database/migrations/**/*.js`
  : `${process.cwd()}/database/migrations/**/*.ts`;

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Entities path:', entitiesPath);
console.log('Migrations path:', migrationsPath);

const ConfigDataSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  ssl: {
    rejectUnauthorized: false,
  },
};

export const dataSource = new DataSource(ConfigDataSource);
