const db = require('./db/db');
const Department = require('./department');

module.exports = class Role extends Department {

  getAllRole() {
    db.query("select * from roles", function (err, res) {
      if (err) throw err;
      return res;
    });
  }

  getRole(id) {
    db.query("select * from roles where ?",
      { id: id },
      function (err, res) {
        if (err) throw err;
        return res;
      });
  }

  addRole(data) {
    db.query("insert into roles set ?",
      {
        data
      },
      function (err, res) {
        if (err) throw err;
        console.log("Added 1 Role!");
      });
  }

  updateRole(id, data) {
    db.query("update roles set ? where ?",
      [{
        data
      },
      { id: id }],
      function (err, res) {
        if (err) throw err;
        console.log("Updated 1 Role!");
      });
  }

  deleteRole(id) {
    db.query("delete from roles where ?",
      { id: id },
      function (err, res) {
        if (err) throw err;
        console.log("Deleted 1 Role!");
      });
  }
}


