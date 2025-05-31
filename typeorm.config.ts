import 'reflect-metadata';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const entitiesPath = path.join(
  process.cwd(),
  'dist',
  'database',
  '**',
  '*.entity.js',
);
const migrationsPath = path.join(
  process.cwd(),
  'dist',
  'database',
  'migrations',
  '**',
  '*.js',
);

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
