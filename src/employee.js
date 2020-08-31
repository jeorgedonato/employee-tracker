const Database = require('../db/db');
const Role = require('./role');

module.exports = class Employee extends Role {

  async getAllEmployee() {
    try {
      const db = new Database();
      let query = await db.query("select emp.id,emp.first_name,emp.last_name,r.title,d.name,r.salary,concat(emp.first_name, ' ', emp.last_name) as manager from employees emp inner join roles r on emp.role_id = r.id inner join departments d on r.department_id = d.id");
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  getEmployee(id) {
    db.query("select * from employees where ?",
      { id: id },
      function (err, res) {
        if (err) throw err;
        return res;
      });
  }

  async getEmployeeByDep(department_id) {
    try {
      const db = new Database();
      let query = await db.query(`select emp.id,emp.first_name,emp.last_name,r.title,d.name,r.salary,concat(emp.first_name, ' ', emp.last_name) as manager from employees emp inner join roles r on emp.role_id = r.id inner join departments d on r.department_id = d.id where r.department_id = ${department_id}`);
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
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



