const mysql = require('mysql');

//Creating a class for database controls
class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '12345678',
      database: 'tracker_db'
    });
  }
  //Made query() to a promise
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err)
          return reject(err);
        resolve(rows);
      });
    });
  }
  //Made end() to a promise
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err)
          return reject(err);
        resolve();
      });
    });
  }
}

module.exports = Database;