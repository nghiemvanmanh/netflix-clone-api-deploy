import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

import 'dotenv/config';
const isProduction = process.env.NODE_ENV === 'production';
const ConfigDataSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    isProduction
      ? 'dist/database/**/*.entity.js'
      : 'src/database/**/*.entity.ts',
  ],
  migrations: [
    isProduction
      ? 'dist/database/migrations/**/*.js'
      : 'src/database/migrations/**/*.ts',
  ],
  ssl: {
    rejectUnauthorized: false, // Bắt buộc nếu dùng SSL mà không có CA certificate
  },
};

export const dataSource = new DataSource(ConfigDataSource);
