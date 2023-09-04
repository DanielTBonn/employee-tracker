const inquirer = require('inquirer');
const toTable = require('./assets/js/table.js');
const { addEmployee, updateEmployee, addRole, addDepartment } = require('./assets/js/query.js');
const{ questionPrompt, tableFuncs, insertFuncs } = require('./assets/js/questions.js')

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