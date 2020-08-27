const db = require('./db/db');
const Role = require('./role');

module.exports = class Employee extends Role {

  getAllEmployee() {
    db.query("select * from employees", function (err, res) {
      if (err) throw err;
      return res;
    });
  }

  getEmployee(id) {
    db.query("select * from employees where ?",
      { id: id },
      function (err, res) {
        if (err) throw err;
        return res;
      });
  }

  addEmployee(data) {
    db.query("insert into employees set ?",
      {
        data
      },
      function (err, res) {
        if (err) throw err;
        console.log("Added 1 Employee!");
      });
  }

  updateEmployee(id, data) {
    db.query("update employees set ? where ?",
      [{
        data
      },
      { id: id }],
      function (err, res) {
        if (err) throw err;
        console.log("Updated 1 Employee!");
      });
  }

  deleteEmployee(id) {
    db.query("delete from employees where ?",
      { id: id },
      function (err, res) {
        if (err) throw err;
        console.log("Deleted 1 Employee!");
      });
  }
}



