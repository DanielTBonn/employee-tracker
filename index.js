const inquirer = require('inquirer');
const questions = require('./questions.js')
const { viewAllEmployees, addEmployee, viewRoles, addRole, viewDepartments, addDepartment } = require('./sqlfuncs.js');
// const mysql = require('mysql2');`
const { main } = require('./db.js')

function init() {

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