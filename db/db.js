const mySql = require('mysql');

const connection = mySql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'tracker_db'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;