const { Pool, Client } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER, 
  password: process.env.DB_PASS,
  host: process.env.DB_HOSTNAME, 
  database: process.env.DB_NAME
});


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}