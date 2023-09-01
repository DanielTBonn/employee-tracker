const inquirer = require('inquirer');
const questions = require('./questions.js')
const { viewAllEmployees, addEmployee, viewRoles, addRole, viewDepartments, addDepartment } = require('./sqlfuncs.js');
// const mysql = require('mysql2');`
const { main } = require('./db.js')

function init() {
    // console.log("Welcome to the department's records!");
    // console.log("Would you like to add anything?\n");

    //     inquirer.prompt(questions);
    //     let returnData = ''
    //     main(viewAllEmployees(), function(result){
    //         returnData = result;
    //     });
    //     console.log("Returned Data ", returnData)
    //     console.log('Answered Choice: ');
    //     console.log(answers);
    //     if (answers.menu !== 'Quit') {
    //         init();
    //     } 
    // }
    inquirer
    .prompt(questions)
    .then((answers) => {
        console.log('Answered Choice: ');
        console.log(answers);
        let returnData = ''
        main(viewAllEmployees(), function(result){
            returnData = result;
        });
        console.log("Returned Data ", returnData)
        if (answers.menu !== 'Quit') {
            init();
        }
    })

    // else if (answers.menu === 'View All Employees') {
    //     await main(viewAllEmployees)
    // }
}





// init();

module.exports = init();

// module.exports = init();

// function add2 (n) {
//     return n + 2;
// }

// const testClass = {
//     called: (n) => {return n + 2}
// }

// console.log(testClass.called(3))