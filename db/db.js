const mySql = require('mysql');
const util = require('util');

const connection = mySql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'tracker_db'
});

const querySync = util.promisify(connection.query);
connection.connect();

module.exports = querySync;