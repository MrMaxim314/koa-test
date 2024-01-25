import { Pool } from 'pg';

export const pool = new Pool({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'koa_rest',
    port: 5432,
});
