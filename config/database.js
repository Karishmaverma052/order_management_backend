import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: 'admin',
  password: 'qsuwV8qiTD58w58xOZgw67KzEsdqXGDs',
  host: 'dpg-d8h7k96q1p3s73fria40-a',
  port: '5432',
  database: 'order_management_db_vmfz',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;
