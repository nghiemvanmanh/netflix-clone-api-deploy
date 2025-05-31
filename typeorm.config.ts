import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

import 'dotenv/config';

const ConfigDataSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [`${process.cwd()}/database/migrations/**.{ts,js}`],
  entities: [`${process.cwd()}/database/**/**.entity.{ts,js}`],
  ssl: {
    rejectUnauthorized: false, // Bắt buộc nếu dùng SSL mà không có CA certificate
  },
};

export const dataSource = new DataSource(ConfigDataSource);
