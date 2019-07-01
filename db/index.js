const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'ricky', 
  password: '1111',
  host: 'localhost', 
  database: 'bookstax'
});


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}