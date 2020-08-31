const Database = require('./db/db');
const Employee = require('./src/employee');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = new Database();
//Class Init
class Init {

  async viewAllEmp() {
    const employee = new Employee();
    employee.getAllEmployee()
    cTable.getTable();
  }

  viewEmpByDep() {

  }

  viewEmpByMng() {

  }

  async viewAllDepartments() {
    try {
      const employee = new Employee();
      const data = await employee.getAllDepartment();
      const table = cTable.getTable(data);
      console.log(table);
      initF();
      return;
    } catch (error) {
      console.log(error);
    }
  }

  viewAllRoles() {
    try {
      const employee = new Employee();
      const data = await employee.getAllRole();
      const table = cTable.getTable(data);
      console.log(table);
      initF();
      return;
    } catch (error) {
      console.log(error);
    }
  }

  addEmp() {

  }

  addRole() {

  }

  async addDep() {
    try {
      const employee = new Employee();
      const data = await inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: "Enter Department Name",
      }]);
      const res = await employee.addDepartment({ name: data.name });
      console.log(`\nAdded ${data.name} in Department`);
      initF();
    } catch (error) {
      console.log(error);
    }
  }

}
//End Class Init


//Init Function
const initF = () => {
  const init = new Init();
  inquirer.prompt(
    [
      {
        name: 'queryType',
        type: 'list',
        choices: [
          new inquirer.Separator("---= View Queries =---"),
          { name: "View all Employees", value: "viewAllEmp" },
          { name: "View all Employees by Department", value: "viewEmpByDep" },
          { name: "View all Employees by Manager", value: "viewEmpByMng" },
          { name: "View all Departments", value: "viewAllDepartments" },
          { name: "View all Roles", value: "viewAllRoles" },
          new inquirer.Separator("---= Add Queries =---"),
          { name: "Add Employee", value: "addEmp" },
          { name: "Add Role", value: "addRole" },
          { name: "Add Department", value: "addDep" },
          new inquirer.Separator("---= Update Queries =---"),
          { name: "Update Department", value: "updateDep" },
          { name: "Update Role", value: "updateRole" },
          { name: "Update Employee", value: "updateEmployee" },
          new inquirer.Separator("---= Delete Queries =---"),
          { name: "Delete Employee", value: "deleteDep" },
          { name: "Delete Role", value: "deleteRole" },
          { name: "Delete Employee", value: "deleteEmployee" },
          new inquirer.Separator("---= Close App Query =---"),
          { name: "Close the App", value: "closeApp" },
          new inquirer.Separator(),
        ],
        message: "What would you like to do"
      }
    ]
  ).then(function (data) {
    // console.log(data)
    switch (data.queryType) {
      case "viewAllEmp":
        init.viewAllEmp();
        break;
      case "viewEmpByDep":
        init.viewEmpByDep();
        break;
      case "viewEmpByMng":
        init.viewEmpByMng();
        break;
      case "viewAllDepartments":
        init.viewAllDepartments();
        break;
      case "viewAllRoles":
        init.viewAllRoles();
        break;
      case "addEmp":
        init.addEmp();
        break;
      case "addRole":
        init.addRole();
        break;
      case "addDep":
        init.addDep();
        break;
      case "closeApp":
        db.close();
        break;

      default:
        break;
    }
  }).catch(err => {
    console.log("switch: ", err);
  });
}
//End Init Function

initF();

