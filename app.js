const Database = require('./db/db');
const Employee = require('./src/employee');
const inquirer = require('inquirer');

//I was thinking of adding is_manager to roles table but i'm already halfway through the code
//So I left it as it is for now
const db = new Database();
//Class Init
class Init {

  async viewAllEmp() {
    try {
      const employee = new Employee();
      const data = await employee.getAllEmployee();
      await employee.parseData(data);
      initF();
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async viewEmpByDep() {
    try {
      const employee = new Employee();
      const deps = await employee.getAllDepartment();
      const dep_id = await inquirer.prompt([{
        name: 'id',
        type: 'list',
        message: "Please choose a department",
        choices: deps.map(d => { return { name: d.name, value: d.id } })
      }])
      const data = await employee.getEmployeeByDep(dep_id.id);
      await employee.parseData(data);
      initF();
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async viewEmpByMng() {
    try {
      const employee = new Employee();
      const managers = await employee.getEmployeeIsManager();
      const manager_id = await inquirer.prompt([{
        name: 'id',
        type: 'list',
        message: "Please choose a manager",
        choices: managers.map(d => { return { name: d.first_name + ' ' + d.last_name, value: d.id } })
      }])
      const data = await employee.getEmployeeByMng(manager_id.id);
      await employee.parseData(data);
      initF();
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async viewAllDepartments() {
    try {
      const employee = new Employee();
      const data = await employee.getAllDepartment();
      await employee.parseData(data);
      initF();
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async viewAllRoles() {
    try {
      const employee = new Employee();
      const data = await employee.getAllRole();
      await employee.parseData(data);
      initF();
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async addEmp() {
    try {
      const employee = new Employee();
      const roles = await employee.getAllRole();
      const managers = await employee.getEmployeeIsManager();
      const data = await inquirer.prompt([
        {
          name: 'role_id',
          type: 'list',
          message: "Please select a role for the employee",
          choices: roles.map(r => { return { name: r.title, value: r.id } })
        },
        {
          name: 'first_name',
          type: 'input',
          message: "Enter Employee's First Name",
        },
        {
          name: 'last_name',
          type: 'input',
          message: "Enter Employee's Last Name",
        },
        {
          name: 'is_manager',
          type: 'confirm',
          message: 'Is this employee a manager?'
        },
        {
          name: 'manager_id',
          type: 'list',
          message: 'Please select a manager for the employee',
          choices: managers.map(m => { return { name: m.first_name + ' ' + m.last_name + ' | ' + m.department, value: m.id } }),
          when: questions => {
            if (questions.is_manager === true) {
              return false;
            } else {
              return true;
            }
          }
        }
      ]);
      await employee.addEmployee(data);
      console.log(`\nAdded ${data.first_name + ' ' + data.last_name} in Employee`);
      initF();
    } catch (error) {
      console.log(error);
    }
  }

  async addRole() {
    try {
      const employee = new Employee();
      const deps = await employee.getAllDepartment();
      const role = await inquirer.prompt([
        {
          name: 'department_id',
          type: 'list',
          message: "Please select which department",
          choices: deps.map(d => { return { name: d.name, value: d.id } })
        },
        {
          name: 'title',
          type: 'input',
          message: "Enter Role Title",
        },
        {
          name: 'salary',
          type: 'number',
          message: "Enter Role Salary (Number)",
        }
      ]);
      await employee.addRole(role);
      console.log(`\nAdded ${role.title} in Role`);
      initF();
    } catch (error) {
      console.log(error);
    }
  }

  async addDep() {
    try {
      const employee = new Employee();
      const data = await inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: "Enter Department Name",
      }]);
      await employee.addDepartment({ name: data.name });
      console.log(`\nAdded ${data.name} in Department`);
      initF();
    } catch (error) {
      console.log(error);
    }
  }

  async updateEmpRole() {
    try {
      const employee = new Employee();
      const employees = await employee.getAllEmployee();
      const roles = await employee.getAllRole();
      const managers = await employee.getEmployeeIsManager();
      const data = await inquirer.prompt([
        {
          name: 'employee_id',
          type: 'list',
          message: "Please select an employee",
          choices: employees.map(e => { return { name: e.first_name + ' ' + e.last_name + ' | ' + e.title, value: e.id } })
        },
        {
          name: 'role_id',
          type: 'list',
          message: "Please select the updated role for the employee",
          choices: roles.map(r => { return { name: r.title, value: r.id } })
        },
      ]);
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
          { name: "Update Employee Role", value: "updateEmpRole" },
          // { name: "Update Department", value: "updateDep" },
          // { name: "Update Role", value: "updateRole" },
          // { name: "Update Employee", value: "updateEmployee" },
          // new inquirer.Separator("---= Delete Queries =---"),
          // { name: "Delete Employee", value: "deleteDep" },
          // { name: "Delete Role", value: "deleteRole" },
          // { name: "Delete Employee", value: "deleteEmployee" },
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
      case "updateEmpRole":
        init.updateEmpRole();
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

