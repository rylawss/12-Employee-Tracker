const inquirer = require("inquirer");
const db = require("./db");

const choices = [
  {
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
      {
        name: "View all departments",
        value: "view_all_departments",
      },
      {
        name: "view all roles",
        value: "view_all_roles",
      },
      {
        name: "view all employees",
        value: "view_all_employees",
      },
      {
        name: "Add a department",
        value: "Add_a_department",
      },
      {
        name: "Add a role",
        value: "Add_a_role",
      },
      {
        name: "Add an employee",
        value: "Add_an_employee",
      },
      {
        name: "Update an employee role",
        value: "Update_an_employee_role",
      },
    ],
  },
];
function startPrompts() {
  return inquirer.prompt(choices).then((res) => {
    switch (res.choice) {
      case "view_all_departments":
        viewDepartments();
        break;
      case "view_all_roles":
        viewRoles();
        break;
      case "view_all_employees":
        viewEmployees();
        break;
      case "Add_a_department":
        newDepartment();
        break;
      case "Add_a_role":
        newRole();
        break;
      case "Add_an_employee":
        newEmployee();
        break;
      case "Update_an_employee_role":
        updateEmployeeRole();
        break;
    }
  });
}

//  Retrieves and displays the list of departments from the database
function viewDepartments() {
  db.departments()
    .then(([data]) => console.table(data))
    .then(() => startPrompts());
}
//  Retrieves and displays the list of roles from the database
async function viewRoles() {
  db.roles()
    .then(([data]) => console.table(data))
    .then(() => startPrompts());
}
//  Retrieves and displays the list of employees from the database
function viewEmployees() {
  db.employees()
    .then(([employees]) => {
      console.table(employees);
    })
    .then(startPrompts);
}
//  Adds a new department to the database
function newDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "New Department name",
      },
    ])
    .then(handleNewDepartment)
    .catch(handleError);
}
//  Adds a new role to the database
function handleNewDepartment(res) {
  db.addDept(res);
  console.table(res);
  startPrompts();
}

function handleError(error) {
  console.error(error);
  startPrompts();
}
//  Creates a new employee by prompting the user for their first name, last name, and role
function newEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "Employee's first name:",
      },
      {
        name: "last_name",
        message: "Employee's last name:",
      },
    ])
    .then((employeeData) => {
      const { first_name, last_name } = employeeData;
      db.roles().then(([roles]) => {
        const dbRoles = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt({
            type: "list",
            name: "role",
            message: "Choose the employee's role:",
            choices: dbRoles,
          })
          .then(({ role }) => {
            const employee = {
              first_name,
              last_name,
              role_id: role,
            };
            db.addEmployee(employee)
              .then(() => console.table(employee))
              .then(() => startPrompts());
          });
      });
    });
}
//
function newRole() {
  db.departments().then(([data]) => {
    const departments = data.map(({ id, name }) => ({
      name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "New Role Title",
        },
        {
          type: "input",
          name: "salary",
          message: "New Role Salary",
        },
        {
          type: "list",
          name: "department_id",
          message: "New Role's Department",
          choices: departments,
        },
      ])
      .then((res) => {
        db.addRole(res)
          .then(() => console.table(res))
          .then(() => startPrompts());
      });
  });
}

function updateEmployeeRole() {
  db.employees().then(([employees]) => {
    const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee needs to be updated?",
          choices: employeeOptions,
        },
      ])
      .then(({ employeeId }) => {
        db.roles().then(([roles]) => {
          const roleOptions = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "roleId",
                message:
                  "Which role would you like to update for this employee?",
                choices: roleOptions,
              },
            ])
            .then(({ roleId }) => {
              db.updateEmployee(employeeId, roleId);
            })
            .then(() => startPrompts());
        });
      });
  });
}

startPrompts();
