// const querySql  = require('./testnode.js');
const questions = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do? (use arrow keys)',
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
        name: 'employeeManager',
        message: "Who is the employee's manager? ",
        choices: ['Kim', 'Tay', 'Sal', 'None'],
        when: function(answers) {
            return answers.menu === 'Add Employee'
        }
    }, 
    {
        type: 'list',
        name: 'employees',
        message: "What is the employee's name?",
        choices: querySql('Get Employees'),
        when: function(answers) {
            return answers.menu === 'Update Employee Role'
        }
    }, 
    {
        type: 'input',
        name: 'roleName',
        message: "What is the role's name? ",
        when: function(answers) {
            return answers.menu === 'Add Role'
        }
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: "What is the role's salary? ",
        when: function(answers) {
            return answers.menu === 'Add Role'
        }
    },
    {
        type: 'list',
        name: 'roleDepartment',
        message: "What is the role's department? ",
        choices: ['Finance', 'Engineering'],
        when: function(answers) {
            return answers.menu === 'Add Role'
        }
    },
    {
        type: 'input',
        name: 'departmentName',
        message: "What is the department's name? ",
        when: function(answers) {
            return answers.menu === 'Add Department'
        }
    },
]

module.exports = questions;