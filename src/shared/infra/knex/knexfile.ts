import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'pgpassword',
    database: process.env.POSTGRES_DATABASE || 'apitdd',
  },
  migrations: {
    extension: 'ts',
  },
  pool: { min: 0, max: 20 },
  acquireConnectionTimeout: 10000,
};

export default config;
