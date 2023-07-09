import { Pool } from 'pg';
import { DB_HOST, DB_PORT, DB_PASSWORD, DB_USERNAME, DB_DATABASE } from '$env/static/private';

export const dbPool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  min: 0,
  max: 2,
  idleTimeoutMillis: 60000,
});
