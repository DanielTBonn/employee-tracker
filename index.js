const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do? (use arrow keys)',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }
]

function init() {
    console.log("Welcome to the department's records!");
    console.log("Would you like to add anything?\n");
    let keepAlive = true;
    
    inquirer
    .prompt(questions)
    .then((answers) => {
        console.log('Answered Choice: ');
        console.log(answers.menu);
        if (answers.menu == 'Quit') {
            keepAlive = false;
        }
    })
    

}

init();