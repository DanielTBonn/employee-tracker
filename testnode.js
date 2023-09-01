const express = require('express');
const inquirer = require('inquirer');
const { viewAllEmployees, addEmployee, viewRoles, addRole, viewDepartments, addDepartment } = require('./sqlfuncs.js');
const questions = require('./questions.js')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function main(query, callback) {
    const mysql = require('mysql2');
    const db = await mysql.createConnection(
        {
            host: 'localhost',
            // MySQL username,
            user: 'root',
            // MySQL password
            password: 'classpass123',
            database: 'department_db'
        },
        console.log(`Connected to the department_db database.`)
        );

        if (query === viewAllEmployees()) {
            db.query(query, function(err, results) {
                if (err) {
                    throw err;
                }
                console.log(results)
            })
        }

        if (query === viewRoles()) {
            db.query(query, function(err, results) {
                if (err) {
                    throw err;
                }
                console.log(results)
            })
        }
        
        
        
}


function init() {

    inquirer
    .prompt(questions)
    .then((answers) => {
        console.log('Answered Choice: ');
        console.log(answers);
        let returnData = ''
        main(viewRoles(), function(result){
            returnData = result;
        });
        return returnData
    })
    .then((answers) => {
        console.log("Answers", answers)
    } );


        // if (answers.menu !== 'Quit') {
            //     init();
            // }
            
        // console.log("Returned Data ", returnData)

}

// let stuff = ''
// main(viewAllEmployees(), function(result){
//     stuff = result;
// });

// console.log("STUFF", stuff)
    

app.use((req, res) => {
    res.status(404).end();
});

init();
