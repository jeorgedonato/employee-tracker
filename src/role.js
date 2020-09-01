const Database = require('../db/db');
const Department = require('./department');

module.exports = class Role extends Department {

  async getAllRole() {
    try {
      const db = new Database();
      let query = await db.query("select r.id,r.title,r.salary,d.name as department_name from roles r inner join departments d on r.department_id = d.id");
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async getRole(id) {
    try {
      const db = new Database();
      let query = await db.query("select r.id,r.title,r.salary,d.name as department_name from roles r inner join departments d on r.department_id = d.id where r.id = ?", [id]);
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async addRole(data) {
    try {
      const db = new Database();
      let query = await db.query("insert into roles set ?", data);
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
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



