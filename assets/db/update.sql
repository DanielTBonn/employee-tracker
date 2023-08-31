UPDATE `employee` SET `id` = 2033, `first_name` = '', `last_name` = '', `role_id` = 1001,`manager_id` = 'NULL' WHERE `id`= 2033;
-- UPDATE `employee` SET `id` = ?, `first_name` = ?, `last_name` = ?, `role_id` = ?,`manager_id` = NULL WHERE `id`= 0
-- UPDATE `employee` SET first_name = 'ted', last_name = 'clause', `role_id` = 6969, manager_id = NULL WHERE `id`= 0;
-- UPDATE `employee` SET `id`=02, `first_name` = 'jed', last_name = 'flause', role_id = 1001, manager_id = NULL WHERE `id`= 01;

SELECT * FROM employee WHERE id=2033;

-- View All Employees

SELECT employee.id, employee.first_name, employee.last_name, title, salary, 
    name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
FROM employee 
LEFT JOIN employee AS manager ON manager.id=employee.manager_id 
LEFT JOIN role ON role.id=employee.role_id 
LEFT JOIN department ON department_id=department.id;


-- Add Employee
-- 
-- Query for the role id
SELECT id FROM role WHERE title=?;
-- Query for the manager id
SELECT id FROM emloyee WHERE first_name=? AND last_name=?;
-- Inserts user inputed name and id's retrieved from inquirer list values
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);

-- Update Employee Role
-- 
-- Query all employees and return result
SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee;
-- Query all roles and return result
SELECT title FROM role;
-- Update employee's role
UPDATE employee SET role_id=? WHERE id=?;



-- View All Roles
SELECT role.id, title, name AS department, salary 
FROM role 
LEFT JOIN department ON department_id=department.id;

-- Add Role
-- 
-- Receive user input as title and salary
-- Then query all departments and return the result
SELECT name FROM department;
-- Then insert new role
INSERT INTO role (title, salary, department)
Values (?, ?, ?);


--  View All Departments
SELECT * FROM department;

-- Add department
-- Receive user input then insert into department
INSERT INTO department (name)
VALUES (?);
