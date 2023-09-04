// const querySql  = require('./testnode.js');
const {viewAllEmployees, viewRoles, viewDepartments, departmentChoices, roleChoices, employeeChoices, managerChoices} = require('./query.js');

// Question prompt for inquirer, follow up questions are based on choices from the 'menu' question
const questionPrompt = async() => {
    const questionArray = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
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
        name: 'employeeNames',
        message: "What is the employee's name?",
        choices: await employeeChoices(),
        when: function(answers) {
            return answers.menu === 'Update Employee Role' || answers.menu === 'Update Employee Manager'
        }
    }, 
    {
        type: 'list',
        name: 'employeeManager',
        message: "Who is the employee's manager? ",
        choices: await managerChoices(),
        // If the option of 'None' is chosen returns a null value for sql processing
        filter: (input, answers) =>  {
            if (input === 'None') {
                return null;
            } 
            return input
        },
        when: function(answers) {
            return answers.menu === 'Add Employee' || answers.menu === 'Update Employee Manager'
        },
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
    {
        type: 'input',
        name: 'newRoleName',
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
        choices: await departmentChoices(),
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
    return questionArray;
} 

// Performs logic if our menu option is in returnTables
const tableFuncs = async() => {

    const returnTables = {
        'View All Employees': await viewAllEmployees(),
        'View All Roles': await viewRoles(),
        'View All Departments': await viewDepartments(),
    }
    return returnTables;
}

// Performs logic if our menu option is in inserts
const insertFuncs = async() => {

    const inserts = {
            'Update Employee Role': 'Update employees',
            'Update Employee Manager': 'Update employees',
            'Add Employee': 'Add new employee',
            'Add Role': 'Add new roles',
            'Add Department': 'Add new departments',
        }
    return inserts;
}

module.exports = {questionPrompt, tableFuncs, insertFuncs};