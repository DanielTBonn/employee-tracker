const mysql = require('mysql2');

// Promise based connection to our database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'classpass123',
    database: 'department_db',
}).promise();

// Queries all employees and returns information about them
const viewAllEmployees = async () => {
    const employeesQuery = `SELECT employee.id, employee.first_name, employee.last_name, title, salary, 
    name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
    LEFT JOIN employee AS manager ON manager.id=employee.manager_id 
    LEFT JOIN role ON role.id=employee.role_id 
    LEFT JOIN department ON department_id=department.id;`;
    const employees = await db.query(employeesQuery);
    return employees[0];
}

// Queries all roles and returns information about them
const viewRoles = async () => {
    // -- View All Roles
    const rolesQuery = `SELECT role.id, title, name AS department, salary 
    FROM role 
    LEFT JOIN department ON department_id=department.id;`;
    const roles = await db.query(rolesQuery);
    return roles[0];
}

// Queries all departments and returns information about them
const viewDepartments = async () => {
    const departmentQuery = `SELECT * FROM department;`;
    const departments = await db.query(departmentQuery);
    return departments[0];
}

const viewEmployeesByManager = async (manager) => {
    const idQuery = `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name)=?;`;
    let managerId = null;
    if (manager) {
        const managerQuery = await db.query(idQuery, [manager]);
        managerId = managerQuery[0][0].id
    }

    const employeesQuery = `SELECT employee.id, employee.first_name, employee.last_name, title, salary, 
    name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
    LEFT JOIN employee AS manager ON manager.id=employee.manager_id 
    LEFT JOIN role ON role.id=employee.role_id 
    LEFT JOIN department ON department_id=department.id 
    WHERE employee.manager_id=?;`;

    const managedEmployees = await db.query(employeesQuery, [managerId])
    return managedEmployees[0];
}

const viewEmployeesByDepartment = async (department) => {
    const idQuery = `SELECT id FROM department WHERE name=?;`;
    let departmentId = null;
    if (department) {
        const departmentQuery = await db.query(idQuery, [department]);
        departmentId = departmentQuery[0][0].id
    }

    const employeesQuery = `SELECT employee.id, employee.first_name, employee.last_name, title, salary, 
    name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
    LEFT JOIN employee AS manager ON manager.id=employee.manager_id 
    LEFT JOIN role ON role.id=employee.role_id 
    LEFT JOIN department ON department_id=department.id 
    WHERE department.id=?;`;

    const managedEmployees = await db.query(employeesQuery, [departmentId])
    return managedEmployees[0];

}

const viewDepartmentBudget = async (department) => {
    const idQuery = `SELECT id FROM department WHERE name=?;`;
    let departmentId = null;
    if (department) {
        const departmentQuery = await db.query(idQuery, [department]);
        departmentId = departmentQuery[0][0].id
    }

    const budgetQuery = `SELECT SUM(salary) AS budget 
    FROM employee
    LEFT JOIN employee AS manager ON manager.id=employee.manager_id 
    LEFT JOIN role ON role.id=employee.role_id 
    LEFT JOIN department ON department_id=department.id 
    WHERE department.id=?;`;
    const budget = await db.query(budgetQuery, [departmentId])
    return budget[0]
}


// Returns all department names
const departmentChoices = async () => {
    const departmentQuery = `SELECT name FROM department`;
    const departments = await db.query(departmentQuery);
    return departments[0];
}

// Returns all role names
const roleChoices = async () => {
    const roleQuery = `SELECT title, id FROM role;`;
    const roles = await db.query(roleQuery);
    let justRoles = roles[0]
    let returnRoles = justRoles.map(justRoles => justRoles.title)
    return returnRoles;
}

// Returns all employee names
const employeeChoices = async () => {
    const employeeQuery = `SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee;`;
    const employees = await db.query(employeeQuery);
    return employees[0];
}

// Returns all employee names including a None option
const managerChoices = async () => {
    const managers = await employeeChoices();
    managers.push({'name': 'None'})
    return managers;
}

// Adds an employee to the sql database
const addEmployee = async (first_name, last_name, role, manager) => {
    const roleIdQuery = `SELECT id FROM role WHERE title=?;`;
    const roleId = await db.query(roleIdQuery, [role])

    const idQuery = `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name)=?;`;
    let managerId = null;
    if (manager) {
        managerQuery = await db.query(idQuery, [manager]);
        managerId = managerQuery[0][0].id
    }

    const addQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?);`;

    // return [first_name, last_name, roleId[0][0].id, managerId[0][0].id];
    await db.query(addQuery, [first_name, last_name, roleId[0][0].id, managerId]);


}

// Updates an employees role in the sql database
const updateEmployeeRole = async (name, role) => {
    const idQuery = `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name)=?;`;
    const employeeId = await db.query(idQuery, [name]);

    const roleIdQuery = `SELECT id FROM role WHERE title=?;`;
    const roleId = await db.query(roleIdQuery, [role])

    const updateQuery = `UPDATE employee SET role_id=? WHERE id=?;`
    
    await db.query(updateQuery, [roleId[0][0].id, employeeId[0][0].id])

    return [employeeId[0][0].id, roleId[0][0].id];

}

const updateEmployeeManager = async (name, manager) => {
    const idQuery = `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name)=?;`;
    const employeeId = await db.query(idQuery, [name]);
    
    let managerId = null;
    if (manager) {
        managerQuery = await db.query(idQuery, [manager]);
        managerId = managerQuery[0][0].id
    }

    const updateQuery = `UPDATE employee SET manager_id=? WHERE id=?;`
    
    await db.query(updateQuery, [managerId, employeeId[0][0].id])


}

// Adds a new role to the sql database
const addRole = async (title, salary, department) => {
    const departmentQuery = `SELECT id FROM department WHERE name=?;`;
    const departmentId = await db.query(departmentQuery, [department]);

    const addQuery = `INSERT INTO role (title, salary, department_id)
    Values (?, ?, ?);`;

    await db.query(addQuery, [title, salary, departmentId[0][0].id])

}

// Adds a new department to the sql database
const addDepartment = async (name) => {
    const addQuery = `INSERT INTO department (name)
    VALUES (?);`; 

    await db.query(addQuery, [name]);

}

const deleteEmployee = async(name) => {
    const deleteQuery = `DELETE FROM employee WHERE CONCAT(first_name, ' ', last_name)=?`;
    await db.query(deleteQuery, name);
}

const deleteRole = async(name) => {
    const deleteQuery = `DELETE FROM role WHERE title=?`;
    await db.query(deleteQuery, name);
}

const deleteDepartment = async(name) => {
    const deleteQuery = `DELETE FROM department WHERE name=?`;
    await db.query(deleteQuery, name);
}

module.exports = { viewAllEmployees, viewEmployeesByManager, viewEmployeesByDepartment, viewDepartmentBudget, viewRoles, viewDepartments, departmentChoices, roleChoices, employeeChoices, managerChoices, addEmployee, updateEmployeeRole, updateEmployeeManager, addRole, addDepartment, deleteEmployee, deleteRole, deleteDepartment }