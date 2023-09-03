// -- View All Employees

function viewAllEmployees() {

    return `SELECT employee.id, employee.first_name, employee.last_name, title, salary, 
    name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
    LEFT JOIN employee AS manager ON manager.id=employee.manager_id 
    LEFT JOIN role ON role.id=employee.role_id 
    LEFT JOIN department ON department_id=department.id;`;
}

function addEmployee() {
    // -- Add Employee
    // -- 
    // -- Query for the role id
    // -- Query for the manager id
    // -- Inserts user inputed name and id's retrieved from inquirer list values
   
    return `SELECT id FROM role WHERE title=?;`
    `SELECT id FROM employee WHERE first_name=? AND last_name=?;`
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?);`;
}

function updateEmployee() {
    // // -- Update Employee Role
    // // -- 
    // // -- Query all employees and return result
    // // -- Query all roles and return result
    // // -- Update employee's role
    return `SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee;`
    `SELECT title FROM role;`
    `UPDATE employee SET role_id=? WHERE id=?;`;
}



function viewRoles() {
    // -- View All Roles
    return `SELECT role.id, title, name AS department, salary 
    FROM role 
    LEFT JOIN department ON department_id=department.id;`;
}


function addRole() {
    // -- Add Role
    // -- 
    // -- Receive user input as title and salary
    // -- Then query all departments and return the result
    // -- Then insert new role
    return `SELECT name FROM department;
    INSERT INTO role (title, salary, department_id)
    Values (?, ?, name);`;
}


function viewDepartments() {
    // --  View All Departments
    return `SELECT * FROM department;`;
}


function addDepartment(){
    // -- Add department
    // -- Receive user input then insert into department
    return `INSERT INTO department (name)
    VALUES (?);`; 
}

module.exports = {viewAllEmployees, addEmployee, updateEmployee, viewRoles, addRole, viewDepartments, addDepartment};