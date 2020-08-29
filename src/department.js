const db = require('../db/db');

module.exports = class Department {

  getAllDepartment() {
    db.query("select * from departments", function (err, res) {
      if (err) throw err;
      return res;
    });
  }

  getDepartment(id) {
    db.query("select * from departments where ?",
      { id: id },
      function (err, res) {
        if (err) throw err;
        return res;
      });
  }

  addDepartment(data) {
    const query = db.query("insert into departments set ?",
      data,
      function (err, res) {
        if (err) throw err;
        console.log(`Added ${data.name} in Department`);
      });
    // console.log(query.sql);
  }

  updateDepartment(id, name) {
    db.query("update departments set ? where ?",
      [{ name: name }, { id: id }],
      function (err, res) {
        if (err) throw err;
        console.log(`Updated '${name}' in Department`);
      });
  }

  deleteDepartment(id) {
    db.query("delete from departments where ?",
      { id: id },
      function (err, res) {
        if (err) throw err;
        console.log(`Deleted 1 entry in Department`);
      });
  }


}