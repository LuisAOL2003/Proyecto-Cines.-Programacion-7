
//Conexion a la base de datos

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '17102003',
  database: process.env.DB_NAME || 'Proyecto_Cines'
});

export default pool;

