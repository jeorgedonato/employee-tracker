const Database = require('../db/db');
const Role = require('./role');
const cTable = require('console.table');

module.exports = class Employee extends Role {

  async parseData(data) {
    if (data && data.length > 0) {
      const table = cTable.getTable(data);
      console.log(table);
    } else {
      console.log(('-').repeat(30) + '= No records found! =' + ('-').repeat(30));
    }
  }

  async getAllEmployee() {
    try {
      const db = new Database();
      let query = await db.query("select emp.id,emp.first_name,emp.last_name,r.title,d.name as department,r.salary,concat(mng.first_name, ' ', mng.last_name) as manager from employees emp inner join roles r on emp.role_id = r.id inner join departments d on r.department_id = d.id left join employees mng on mng.id = emp.manager_id");
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployee(id) {
    try {
      const db = new Database();
      let query = await db.query("select emp.id,emp.first_name,emp.last_name,r.title,d.name as department,r.salary,concat(mng.first_name, ' ', mng.last_name) as manager from employees emp inner join roles r on emp.role_id = r.id inner join departments d on r.department_id = d.id left join employees mng on mng.id = emp.manager_id where emp.id = ?", [id]);
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeIsManager() {
    try {
      const db = new Database();
      let query = await db.query("select emp.id,emp.first_name,emp.last_name,r.title,d.name as department,r.salary,concat(mng.first_name, ' ', mng.last_name) as manager from employees emp inner join roles r on emp.role_id = r.id inner join departments d on r.department_id = d.id left join employees mng on mng.id = emp.manager_id where emp.is_manager = true");
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeByMng(manager_id) {
    try {
      const db = new Database();
      let query = await db.query(`select emp.id,emp.first_name,emp.last_name,r.title,d.name as department,r.salary,concat(mng.first_name, ' ', mng.last_name) as manager from employees emp inner join roles r on emp.role_id = r.id inner join departments d on r.department_id = d.id left join employees mng on mng.id = emp.manager_id where emp.manager_id = ${manager_id}`);
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeByDep(department_id) {
    try {
      const db = new Database();
      let query = await db.query(`select emp.id,emp.first_name,emp.last_name,r.title,d.name as department,r.salary,concat(mng.first_name, ' ', mng.last_name) as manager from employees emp inner join roles r on emp.role_id = r.id inner join departments d on r.department_id = d.id left join employees mng on mng.id = emp.manager_id where r.department_id = ${department_id}`);
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeByDepBudg(department_id) {
    try {
      const db = new Database();
      let query = await db.query(`select d.name,sum(r.salary) as budget from employees emp inner join roles r on emp.role_id = r.id inner join departments d on r.department_id = d.id left join employees mng on mng.id = emp.manager_id where r.department_id = ${department_id}`);
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async addEmployee(data) {
    try {
      const db = new Database();
      let query = await db.query("insert into employees set ?", data);
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async updateEmployee(id, data) {
    try {
      const db = new Database();
      let query = await db.query("update employees set ? where id = ?", [data, id]);
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteEmployee(id) {
    try {
      const db = new Database();
      let query = await db.query("delete from employees where id = ?", [id]);
      db.close();
      return query;
    } catch (error) {
      console.log(error);
    }
  }
}



