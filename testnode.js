const express = require('express');
const { viewAllEmployees, addEmployee, viewRoles, addRole, viewDepartments, addDepartment } = require('./sqlfuncs.js');




const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// async function main() {
function main() {
    const mysql = require('mysql2');
    // Connect to database
    let returnVal;
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
        
    db.promise().execute(viewDepartments()).then( ([rows,fields]) => {
        console.log(rows);
        return rows
    })
    .catch(console.log("something happened"))
    .then ( (result) => {
        db.end();
        returnVal = result;
        return result;
    });
    console.log(returnVal)

    
}

async function invoke() {
    let result = await main();
    console.log("result: ", result)
}
invoke();

app.use((req, res) => {
    res.status(404).end();
});


// main();
// process.exit();

// app.listen(PORT, (req, res) => {
//     console.log(`Server running on port ${PORT}`);
//     const rows = main();
//     console.log("Rows: ", rows);
//     // return rows;
//     // init;
//   })
//   .then(() => process.exit());