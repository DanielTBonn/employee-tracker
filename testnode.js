const express = require('express');
const inquirer = require('inquirer');
const { viewAllEmployees, addEmployee, viewRoles, addRole, viewDepartments, addDepartment } = require('./sqlfuncs.js');
const questions = require('./questions.js')
const table = require('./table.js')
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function main(query, callback) {
    const mysql = require('mysql2');
    const db = mysql.createConnection(
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
                table(results)
            })
        }

        if (query === viewRoles()) {
            db.query(query, function(err, results) {
                if (err) {
                    throw err;

                }
                table(results)
            })
        }

        if (query === viewDepartments()) {
            db.query(query, function(err, results) {
                if (err) {
                    throw err;

                }
                table(results)
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

}
    

app.use((req, res) => {
    res.status(404).end();
});

init();
