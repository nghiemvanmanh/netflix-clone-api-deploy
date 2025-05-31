import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

import 'dotenv/config';

const isProduction: boolean = process.env.NODE_ENV === 'production';
const ConfigDataSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    isProduction
      ? `${process.cwd()}/database/**/**.entity.js`
      : `${process.cwd()}/database/**/**.entity.ts`,
  ],
  migrations: [
    isProduction
      ? `${process.cwd()}/database/migrations/**/*.js`
      : `${process.cwd()}/database/migrations/**/*.ts`,
  ],
  ssl: {
    rejectUnauthorized: false, // Bắt buộc nếu dùng SSL mà không có CA certificate
  },
};

export const dataSource = new DataSource(ConfigDataSource);
