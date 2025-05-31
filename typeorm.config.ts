import 'reflect-metadata';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const ConfigDataSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  // Dùng __dirname vì khi chạy file đã build, __dirname sẽ là thư mục dist hoặc build
  entities: [path.join(__dirname, 'database', '**', '*.entity.js')],
  migrations: [path.join(__dirname, 'database', 'migrations', '**', '*.js')],

  ssl: {
    rejectUnauthorized: false,
  },
};

export const dataSource = new DataSource(ConfigDataSource);
