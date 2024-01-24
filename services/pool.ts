import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    database: 'koa_rest',
    port: 5432,
});
