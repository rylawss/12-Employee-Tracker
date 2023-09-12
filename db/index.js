const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "rylaw",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
});

class SqlQueries {
  constructor(connection) {
    this.connection = connection;
  }
  // Retrieves the id and name of all departments from the database.
  departments() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }

  // Retrieves the id, title, salary, and department id of all roles from the database.
  roles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title,  department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id"
      );
  }
  // Retrieves the first name, last name, and role of all employees.
  employees() {
    return this.connection.promise().query(
      // "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.salary, employee.manager_id, employee.role_id FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on department_id = department.id"
      "SELECT employee.id, employee.first_name, employee.last_name FROM employee"
    );
  }

  // Adds a new department to the database
  addDept(dept) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ? ", dept);
  }

  // Adds a new role to the database
  addRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  // Adds a new employee to the database
  addEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ? ", employee);
  }

  // Updates an employee's role in the database
  updateEmployee(employee, role) {
    return this.connection
      .promise()
      .query(
        "INSERT INTO employee SET role_id = ? WHERE id = ?",
        role,
        employee
      );
  }
}

module.exports = new SqlQueries(connection);
