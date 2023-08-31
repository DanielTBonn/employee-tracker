const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// const init = require('./index.js');
const { viewAllEmployees, addEmployee, viewRoles, addRole, viewDepartments, addDepartment } = require('./sqlfuncs.js');
const queryDict = {
  first: 'SELECT * FROM `employee`',
  second: 'INSERT INTO `employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (?, ?, ?, ?, ?)',
  third: 'UPDATE `employee` SET `role_id` = ? WHERE `id`= 2033',
  fourth: 'SELECT * FROM `role`',
  fifth: 'INSERT INTO `role` (`id`, `title`, `salary`, `department_id`) VALUES (?, ?, ?, ?)',
  sixth: 'SELECT * FROM `department`',
  seventh: 'INSERT INTO `department` (`id`, `name`) VALUES (?, ?)'
}

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// let nameValue = 'Tree';
// , nameValue || null
const pass = 1002
db.execute(addRole(), 
  ['Service'], 
  function (err, results) {
    console.log(results);
});

// db.execute(queryDict['fifth'], 
//   [3004, 'Paralegal', 80000, 0x4], 
//   function (err, results) {
//     console.log(results);
// });

// db.execute(queryDict['second'], 
//   [2023, 'Red', 'Foreman', 2003, 1013], 
//   function (err, results) {
//     console.log(results);
// });

// db.execute(queryDict['sixth'], 
//   ['Engineering'], 
//   function (err, results) {
//     console.log(results);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
  // init;
});
