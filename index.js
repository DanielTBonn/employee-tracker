// Dependicies and functions we will use to execute inquirer
const inquirer = require('inquirer');
const toTable = require('./assets/js/table.js');
const { viewEmployeesByManager, viewEmployeesByDepartment, viewDepartmentBudget, addEmployee, updateEmployeeRole, updateEmployeeManager, addRole, addDepartment, deleteEmployee, deleteRole, deleteDepartment } = require('./assets/js/query.js');
const{ questionPrompt, tableFuncs, insertFuncs } = require('./assets/js/questions.js')

// Async function because we wait on our queries in the form of promises
async function init() {

    // Creates the questions, executes the prompt, and retrieves methods that will perform logic on what to do with user input
    let questions = await questionPrompt();
    const answers = await inquirer.prompt(questions)
    const inserts = await insertFuncs();
    const tables = await tableFuncs();

    // If a answer from the menu is in the inserts object, then we perform an update to our database
    if (inserts[answers.menu]) {
        if (answers.menu === 'Add Employee') {
            await addEmployee(answers.employeeFirst, answers.employeeLast, answers.employeeRole, answers.employeeManager);
        } else if (answers.menu === 'Delete Employee') {
            await deleteEmployee(answers.employeeNames);
        }  else if (answers.menu === 'Update Employee Role') {
            await updateEmployeeRole(answers.employeeNames, answers.employeeRole);
        } else if (answers.menu === 'Update Employee Manager') {
            await updateEmployeeManager(answers.employeeNames, answers.employeeManager);
        } else if (answers.menu === 'Add Role') { 
            await addRole(answers.newRoleName, answers.roleSalary, answers.roleDepartment);
        } else if (answers.menu === 'Delete Role') { 
            await deleteRole(answers.employeeRole);
        } else if (answers.menu === 'Add Department') { 
            await addDepartment(answers.departmentName);
        } else if (answers.menu === 'Delete Department') { 
            await deleteDepartment(answers.departmentSearch);
        }else if (answers.menu === 'View Employees By Manager') {
            const newTable = await viewEmployeesByManager(answers.managerNames)
            if (newTable.length > 1) {
                toTable(newTable)
            } else {
                console.log("No employees under their management")
            }

        } else if (answers.menu === 'View Employees By Department') {
            const newTable = await viewEmployeesByDepartment(answers.departmentSearch)
            if (newTable.length > 1) {
                toTable(newTable)
            } else {
                console.log("No employees in this department")
            }
        } else if (answers.menu === 'View Department Budget') {
            const newTable = await viewDepartmentBudget(answers.departmentSearch)
            if (newTable.length > 0) {
                toTable(newTable)
            } else {
                console.log("No budget allotted for this department")
            }
        }
    // Otherwise we create a table with queried data
    } else if (tables[answers.menu]) {
        const table = tables[answers.menu];
        toTable(table);
    }

    // Choice of continuing our script or exiting.
    if (answers.menu !== 'Quit') {
        init();
    } else {
        process.exit();
    }

}

init();