const Database = require('../db/db');

module.exports = class Department {

  async getAllDepartment() {
    try {
      const db = new Database();
      let query = await db.query("select * from departments");
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async getDepartment(id) {
    try {
      const db = new Database();
      let query = await db.query("select * from departments where ?", { id: id });
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async addDepartment(data) {
    try {
      const db = new Database();
      let query = await db.query("insert into departments set ?", data);
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async updateDepartment(id, name) {
    try {
      const db = new Database();
      let query = await db.query("update departments set ? where ?", [{ name: name }, { id: id }]);
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDepartment(id) {
    db.query("delete from departments where ?",
      { id: id },
      function (err, res) {
        if (err) throw err;
        console.log(`Deleted 1 entry in Department`);
      });
  }


}