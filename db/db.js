const mySql = require('mysql');

const connection = mySql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'tracker_db'
});

module.exports = connection;