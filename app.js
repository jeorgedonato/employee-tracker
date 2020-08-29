const inquirer = require('inquirer');
const cTable = require('console.table');
const Employee = require('./src/employee');
const db = require('./db/db')

class Init {

  viewAllEmp() {
    const employee = new Employee();
    cTable.getTable(employee.getAllEmployee());
  }

  viewAllDep() {

  }

  viewAllMng() {

  }

  viewAllDepartments() {

  }

  viewAllRoles() {

  }

  addEmp() {

  }

  addRole() {

  }

  addDep() {
    const employee = new Employee();
    inquirer.prompt([
      {
        name: 'name',
        type: 'input',
        message: "Enter Department Name",

      }
    ]).then(function (data) {
      employee.addDepartment({ name: data.name });
      initF();
    }).catch(function (err) {
      console.log('Something went wrong');
    })
  }

}

function initF() {
  const init = new Init();
  inquirer.prompt(
    [
      {
        name: 'queryType',
        type: 'list',
        choices: [
          { name: "View all Employees", value: "viewAllEmp" },
          { name: "View all Employees by Department", value: "viewAllDep" },
          { name: "View all Employees by Manager", value: "viewAllMng" },
          { name: "View all Departments", value: "viewAllDepartments" },
          { name: "View all Roles", value: "viewAllRoles" },
          { name: "Add Employee", value: "addEmp" },
          { name: "Add Role", value: "addRole" },
          { name: "Add Department", value: "addDep" },
          { name: "Close the App", value: "closeApp" },
        ],
        message: "What would you like to do"
      }
    ]
  ).then(function (data) {
    // console.log(data)
    switch (data.queryType) {
      case "viewAllEmp":

        break;
      case "viewAllDep":

        break;
      case "viewAllMng":

        break;
      case "viewAllDepartments":

        break;
      case "viewAllRoles":

        break;
      case "addEmp":

        break;
      case "addRole":

        break;
      case "addDep":
        init.addDep();
        break;
      case "closeApp":
        db.end();
        break;

      default:
        break;
    }
  }).catch(err => {
    console.log('Something went wrong')
  });
}

initF();


