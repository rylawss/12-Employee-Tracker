-- Active: 1686788190550@@127.0.0.1@3306@employees_db
use employees_db;

INSERT INTO department
    (name)
VALUES
    ('IT'),
    ('Engineering'),
    ('Marketing'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('IT Manager', 100000, 1),
    ('Marketing lead', 80000, 1),
    ('Head Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Social Media Manager', 90000, 3),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Ross', 2, 1),
    ('Ashley', 'Kruger', 3, 1),
    ('Todd', 'Tupik', 4, 1),
    ('Devin', 'Singh', 5, NULL),
    ('Kent', 'Brown', 6, 1),
    ('Sarah', 'Todd', 7, NULL),
    ('Tom', 'Smith', 7, NULL);
