const db = require('../db/db');
const cTable = require('console.table');
// console.log("this is db : ", db)
module.exports = class Department {

  async getAllDepartment() {
    try {
      let query = await db("select * from departments");
      console.log("this is the quesry: ");
    } catch (error) {
      console.log(error);
    }
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
        return res;
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