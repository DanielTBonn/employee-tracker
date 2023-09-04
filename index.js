// Dependicies and functions we will use to execute inquirer
const inquirer = require('inquirer');
const toTable = require('./assets/js/table.js');
const { addEmployee, updateEmployee, addRole, addDepartment } = require('./assets/js/query.js');
const{ questionPrompt, tableFuncs, insertFuncs } = require('./assets/js/questions.js')

// Async function because we wait on our queries in the form of promises
async function init() {

    // Creates the questions, executes the prompt, and retrieves methods that will perform logic on what to do with user input
    let questions = await questionPrompt();
    const answers = await inquirer.prompt(questions)
    const inserts = await insertFuncs();
    const tables = await tableFuncs();

    console.log(answers)
    
    // If a answer from the menu is in the inserts object, then we perform an update to our database
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
    // Otherwise we create a table with queried data
    } else if (tables[answers.menu]) {
        const table = tables[answers.menu];
        toTable(table);
    }

    // Choice of continuing our script or exiting.
    console.log("Hello inserts", inserts[answers.menu] )
    if (answers.menu !== 'Quit') {
        init();
    } else {
        process.exit();
    }

}

// init();

// console.log(questions())
// const asyncCall = async() => {
//     // const info = await updateEmployee('Gary Ciello', 'Account Manager');
//     // const info = await addEmployee('Drake', 'Friday', 'Junior Software Developer', 'Daniel Bonn');
//     const info = await managerChoices();
//     // const obj = []
//     // const info = await viewAllEmployees();
//     // console.log(toTable(info))
//     console.log(info)
// }
// asyncCall();
init();