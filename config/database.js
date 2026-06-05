import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: 'admin',
  password: 'gjeJDccKX05Yysvn1VEShEWbYELrMb1C',
  host: 'dpg-d8h7fuj7uimc73clpu4g-a',
  port: '5432',
  database: 'order_management_db_exeq',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;
