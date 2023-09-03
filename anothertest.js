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

const questionPrompt = async() => {
    const questionArray = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do? (use arrow keys)',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
    {
        type: 'list',
        name: 'employees',
        message: "What is the employee's name?",
        choices: await employeeChoices(),
        when: function(answers) {
            return answers.menu === 'Update Employee Role'
        }
    }, 
]
    return questionArray;
} 


async function init() {
    
        // const { path } = await inquirer.prompt(([{
        //     type: 'input',
        //     name: 'message',
        //     message: 'testing',
        // }
        // ]))
        let questions = await questionPrompt();
        const answers = await inquirer.prompt(questions)
        console.log(answers);
    
}

// console.log(questions())
const asyncCall = async() => {
    const info = await employeeChoices();
    console.log(info)
}
// asyncCall();
init();