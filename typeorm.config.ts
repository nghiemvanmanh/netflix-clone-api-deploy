import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

import 'dotenv/config';

const ConfigDataSource: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },

  migrations: [`${process.cwd()}/database/migrations/**`],
  entities: [`${process.cwd()}/database/**/**.entity.ts`],
};

export const dataSource = new DataSource(ConfigDataSource);
