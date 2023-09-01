const express = require('express');
const { viewAllEmployees, addEmployee, viewRoles, addRole, viewDepartments, addDepartment } = require('./sqlfuncs.js');
const mysql = require('mysql2');



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// async function main() {
// function main() {
    // const mysql = require('mysql2');
    // Connect to database

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
            
            let getEmployeeNames = function(){
                return new Promise(function(resolve, reject){
                  db.query(
                      "SELECT * FROM employee", 
                      function(err, rows){                                                
                          if(rows === undefined){
                              reject(new Error("Error rows is undefined"));
                          }else{
                              resolve(rows);
                          }
                      }
                  )}
              )}
        
// }
console.log(getEmployeeNames)
            
    


// async function invoke() {
//     let result = await main();
//     console.log("result: ", result)
//     process.exit(0);
// }
// invoke();

app.use((req, res) => {
    res.status(404).end();
});
