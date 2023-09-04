const inquirer = require('inquirer');
const toTable = require('./table.js');
const { db, viewAllEmployees, viewRoles, viewDepartments, departmentChoices, roleChoices, employeeChoices, managerChoices, addEmployee, updateEmployee, addRole, addDepartment, questionPrompt } = require('./anothertest.js');


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

async function init() {

    let questions = await questionPrompt();
    const answers = await inquirer.prompt(questions)
    const inserts = await insertFuncs();
    const tables = await tableFuncs();

    console.log(answers)
    
    if (inserts[answers.menu]) {
        if (answers.menu === 'Add Employee') {
            await addEmployee(answers.employeeFirst, answers.employeeLast, answers.employeeRole, answers.employeeManager);
        } else if (answers.menu === 'Update Employee Role') {
            await updateEmployee(answers.employeeNames, answers.roleName);
        } else if (answers.menu === 'Add Role') { 
            await addRole(answers.newRoleName, answers.roleSalary, answers.roleDepartment);
        } else if (answers.menu === 'Add Department') { 
            await addDepartment(answers.departmentName);
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

init();