const inquirer = require('inquirer');
const questions = require('./questions.js')
const { viewAllEmployees, addEmployee, viewRoles, addRole, viewDepartments, addDepartment } = require('./sqlfuncs.js');
const mysql = require('mysql2');


function init() {
    // console.log("Welcome to the department's records!");
    // console.log("Would you like to add anything?\n");
    
    inquirer
    .prompt(questions)
    .then((answers) => {
        console.log('Answered Choice: ');
        console.log(answers);
        if (answers.menu !== 'Quit') {
            init();
        } else if (answers.menu === 'View All Employees') {
            db.query('SELECT * FROM `employee`', function(err, results) {
                console.log("index.js results: ",results)

            })
        // }
        }
    })
    // .on('done', (answers) => {
    //     console.log('It is done!')
    // })


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