import { Pool, type PoolClient } from 'pg';
import { DB_HOST, DB_PORT, DB_PASSWORD, DB_USERNAME, DB_DATABASE } from '$env/static/private';

const pool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  min: 0,
  max: 2,
  idleTimeoutMillis: 60000,
});

export const connectToDB = async (): Promise<PoolClient> => await pool.connect();
