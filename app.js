const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/db');



db.query('SELECT * FROM department', function (error, results, fields) {
  if (error) throw error;
  console.log(results)
});


