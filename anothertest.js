const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'classpass123',
    database: 'department_db',
}).promise();


const employeeChoices = async () => {
    const employeeQuery = `SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee;`;
    const employees = await db.query(employeeQuery);
    return employees[0];
}

const roleChoices = async () => {
    const roleQuery = `SELECT title FROM role;`;
    const roles = await db.query(roleQuery);
    // console.log(roles);
    return roles[0];
}

const questionPrompt = async() => {
    const questionArray = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do? (use arrow keys)',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
    // {
    //     type: 'list',
    //     name: 'employeeNames',
    //     message: "What is the employee's name?",
    //     choices: await employeeChoices(),
    //     when: function(answers) {
    //         return answers.menu === 'Update Employee Role'
    //     }
    // }, 
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
        const roles = await roleChoices();
        console.log(roles)
        if (answers.menu !== 'Quit') {
            init();
        } else {
            process.exit();
        }
    
}

// console.log(questions())
const asyncCall = async() => {
    const info = await roleChoices();
    console.log(info)
}
// asyncCall();
init();

