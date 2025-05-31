import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const entitiesPath = isProduction
  ? path.join(__dirname, 'database', 'entities', '*.entity.js')
  : path.join(__dirname, 'database', 'entities', '*.entity.ts');

const migrationsPath = isProduction
  ? path.join(__dirname, 'database', 'migrations', '*.js')
  : path.join(__dirname, 'database', 'migrations', '*.ts');

console.log('Entities path:', entitiesPath); // log ra để chắc chắn
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
