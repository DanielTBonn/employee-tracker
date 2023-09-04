const inquirer = require('inquirer');
const mysql = require('mysql2');
const toTable = require('./table.js');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'classpass123',
    database: 'department_db',
}).promise();

const insertFuncs = async() => {

    const inserts = {
            'Update Employee Role': 'Update employees',
        
            'Add Employee': 'Add new employee',
        
            'Add Role': 'Add new roles',
        
            'Add Department': 'Add new departments',
        }
    
    return inserts;
}

const tableFuncs = async() => {

    const returnTables = {
        'View All Employees': await viewAllEmployees(),
        'View All Roles': await viewRoles(),
        'View All Departments': await viewDepartments(),
    }
    return returnTables;
}

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

const viewRoles = async () => {
    // -- View All Roles
    const rolesQuery = `SELECT role.id, title, name AS department, salary 
    FROM role 
    LEFT JOIN department ON department_id=department.id;`;
    const roles = await db.query(rolesQuery);
    return roles[0];
}

const viewDepartments = async () => {
    const departmentQuery = `SELECT * FROM department;`;
    const departments = await db.query(departmentQuery);
    return departments[0];
}
    
const roleChoices = async () => {
    const roleQuery = `SELECT title, id FROM role;`;
    const roles = await db.query(roleQuery);
    let justRoles = roles[0]
    let returnRoles = justRoles.map(justRoles => justRoles.title)
    return returnRoles;
}

const employeeChoices = async () => {
    const employeeQuery = `SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee;`;
    const employees = await db.query(employeeQuery);
    return employees[0];
}

const addEmployee = async (first_name, last_name, role, manager) => {
    const roleIdQuery = `SELECT id FROM role WHERE title=?;`;
    const roleId = await db.query(roleIdQuery, [role])

    const idQuery = `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name)=?;`;
    const managerId = await db.query(idQuery, [manager]);

    const addQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?);`;

    // return [first_name, last_name, roleId[0][0].id, managerId[0][0].id];
    await db.query(addQuery, [first_name, last_name, roleId[0][0].id, managerId[0][0].id]);


}

const updateEmployee = async (name, role) => {
    const idQuery = `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name)=?;`;
    const employeeId = await db.query(idQuery, [name]);

    const roleIdQuery = `SELECT id FROM role WHERE title=?;`;
    const roleId = await db.query(roleIdQuery, [role])

    const updateQuery = `UPDATE employee SET role_id=? WHERE id=?;`
    
    await db.query(updateQuery, [roleId[0][0].id, employeeId[0][0].id])

    return [employeeId[0][0].id, roleId[0][0].id];

}


const questionPrompt = async() => {
    const questionArray = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
    {
        type: 'input',
        name: 'employeeFirst',
        message: "What is the employee's first name? ",
        when: function(answers) {
            return answers.menu === 'Add Employee'
        }
    },
    {
        type: 'input',
        name: 'employeeLast',
        message: "What is the employee's last name? ",
        when: function(answers) {
            return answers.menu === 'Add Employee'
        }
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: "What role is it?",
        choices: await roleChoices(),
        when: function(answers) {
            return answers.menu === 'Add Employee'
        }
    }, 
    {
        type: 'list',
        name: 'employeeManager',
        message: "Who is the employee's manager? ",
        choices: await employeeChoices(),
        when: function(answers) {
            return answers.menu === 'Add Employee'
        }
    },
    {
        type: 'list',
        name: 'employeeNames',
        message: "What is the employee's name?",
        choices: await employeeChoices(),
        when: function(answers) {
            return answers.menu === 'Update Employee Role'
        }
    }, 
    {
        type: 'list',
        name: 'roleName',
        message: "What role is it?",
        choices: await roleChoices(),
        when: function(answers) {
            return answers.menu === 'Update Employee Role'
        }
    }, 
]
    return questionArray;
} 


async function init() {

        let questions = await questionPrompt();
        const answers = await inquirer.prompt(questions)
        const inserts = await insertFuncs();
        const tables = await tableFuncs();

        console.log(answers)
        
        if (inserts[answers.menu]) {
            if (answers.menu === 'Add Employee') {
                addEmployee(answers.employeeFirst, answers.employeeLast, answers.employeeRole, answers.employeeManager);
            } else if (answers.menu === 'Update Employee Role') {
                updateEmployee(answers.employeeNames, answers.roleName);
            } else if (answers.menu === 'Add Role') { 
                return;
            } else if (answers.menu === 'Add Department') { 
                return;
            }
        } else if (tables[answers.menu]) {
            const table = tables[answers.menu];
            toTable(table);
        }

        console.log("Hello inserts", inserts[answers.menu] )
        if (answers.menu !== 'Quit') {
            init();
        } else {
            process.exit();
        }
    
}

// console.log(questions())
const asyncCall = async() => {
    // const info = await updateEmployee('Gary Ciello', 'Account Manager');
    const info = await addEmployee('Daniel', 'Bonn', 'Junior Software Developer', 'Sally Weston');

    // const info = await viewAllEmployees();
    console.log(info)
}
// asyncCall();
init();
