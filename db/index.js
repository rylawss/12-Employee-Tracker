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
  departments() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }

  roles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title,  department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id"
      );
  }
  employees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.salary, employee.manager_id, employee.role_id FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on department_id = department.id"
      );
  }

  addDept(dept) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ? ", dept);
  }

  addRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  addEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ? ", employee);
  }

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
