const express = require('express');
const { viewAllEmployees, addEmployee, viewRoles, addRole, viewDepartments, addDepartment } = require('./sqlfuncs.js');




const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function main() {

    const mysql = require('mysql2/promise');
    // Connect to database
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
    
    const [rows, fields] = await db.execute(viewDepartments(), [])
    console.log(rows, fields)
    return rows;
}

app.use((req, res) => {
    res.status(404).end();
});



app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`);
    const rows = main();
    console.log(rows);
    return rows;
    // init;
  });