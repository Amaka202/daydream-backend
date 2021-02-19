const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let pool;

if (process.env.NODE_ENV === 'development') {
  pool = new Pool({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
  });
} else if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.TEST_DATABASE_NAME,
  });
} else {
  const connectionString = process.env.PRODUCTION_DATABASE_URL;
  pool = new Pool({
    connectionString,
  });
}

pool.on('connect', () => {
  console.log('Database connected...');
});

module.exports = pool;