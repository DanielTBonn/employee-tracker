const express = require('express');
const inquirer = require('inquirer');
const { viewAllEmployees, addEmployee, viewRoles, addRole, viewDepartments, addDepartment } = require('./sqlfuncs.js');
const questions = require('./questions.js')
const table = require('./table.js')
const PORT = process.env.PORT || 3001;
const app = express();
const queryDict = {'View All Employees': viewAllEmployees(), 'Add Employee': 'addEmployee()', 'Update Employee Role': null, 'View All Roles': viewRoles(), 'Add Role': 'addRole()', 'View All Departments': viewDepartments(), 'Add Department': 'addDepartment()', 'Quit': 'Quit'}

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function querySql(query) {
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
                // db.end();
                table(results)
                db.end();

            })
        }

    //     `SELECT id FROM role WHERE title=?;`
    // `SELECT id FROM employee WHERE first_name=? AND last_name=?;`
    // `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    // VALUES (?, ?, ?, ?);`;

        if (query === 'Add Employee') {
            let appendEmployee = ['Reed', 'Chavez'];
            
            db.promise().query(`SELECT id FROM role WHERE title=?;`, ['Lawyer']).then(([rows, fields]) => {
                console.log(rows);
                return rows;
            })
            .then((result1) => {
                console.log(result1);
                appendEmployee.push(result1[0].id)
                db.promise().query(`SELECT id FROM employee WHERE first_name=? AND last_name=?;`, ['Stella', 'Heinz']).then(([rows, fields]) => {
                    console.log(rows);
                    return rows;
                })
                .then((result2) => {
                    console.log(result2)
                    appendEmployee.push(result2[0].id)
                    console.log("Append Employee: ", appendEmployee);
                    db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?);`, appendEmployee).then(([rows, fields]) => {
                        console.log(rows)
                    })
                })
            })
        }

        if (query === 'Update Employee Role') {
            let appendEmployee = ['Reed', 'Chavez'];
            
            db.promise().query(`SELECT id FROM role WHERE title=?;`, ['Lawyer']).then(([rows, fields]) => {
                console.log(rows);
                return rows;
            })
            .then((result1) => {
                console.log(result1);
                appendEmployee.push(result1[0].id)
                db.promise().query(`SELECT id FROM employee WHERE first_name=? AND last_name=?;`, ['Stella', 'Heinz']).then(([rows, fields]) => {
                    console.log(rows);
                    return rows;
                })
                .then((result2) => {
                    console.log(result2)
                    appendEmployee.push(result2[0].id)
                    console.log("Append Employee: ", appendEmployee);
                    db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?);`, appendEmployee).then(([rows, fields]) => {
                        console.log(rows)
                    })
                })
            })
        }

        if (query === viewRoles()) {
            db.query(query, function(err, results) {
                if (err) {
                    throw err;

                }
                table(results)
                db.end();

            })
        }

        if (query === viewDepartments()) {
            db.query(query, function(err, results) {
                if (err) {
                    throw err;

                }
                table(results)
                return;
            })
        }

        if (query === 'Quit') {
            db.end();
        }
        
        
        
}

function init() {

    inquirer
    .prompt(questions)
    .then((answers) => {
        console.log('Answered Choice: ');
        console.log(answers);
        querySql(queryDict[answers.menu]);
        // querySql('Add Employee')
        if(answers.menu !== 'Quit') {
            setTimeout(() => {
                init();
            }, 50);
        }
        return answers;
    })
    .then((answers) => {
        if (answers.menu === 'Quit') {
            process.exit()
        }
    } );

}
    

app.use((req, res) => {
    res.status(404).end();
});

init();
// console.log(queryDict['View All Employees'])
