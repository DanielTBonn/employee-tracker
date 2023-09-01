
// Import and require mysql2
const mysql = require('mysql2');


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

// async function main() {
// async function main(command) {
//   const mysql = require('mysql2');
//   // Connect to database
//   try {

//       const db = mysql.createConnection(
//           {
//               host: 'localhost',
//               // MySQL username,
//               user: 'root',
//               // MySQL password
//               password: 'classpass123',
//               database: 'department_db'
//           },
//           console.log(`Connected to the department_db database.`)
//           );
          
//       let returnData = await db.promise().execute(command);
//       console.log(returnData[0])
//       db.end();
//       }
//       catch (err) {
//           console.log("something happened")

//       }
// }

// main(viewAllEmployees());

// async function invoke(command) {
//     let result = await main(command);
//     console.log("result: ", result)
//     // process.exit(0);
// }
// invoke(viewRoles());


// let nameValue = 'Tree';
// , nameValue || null
// const pass = 1002
// db.execute(addRole(), 
//   ['Service'], 
//   function (err, results) {
//     console.log(results);
// });

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
// app.use((req, res) => {
//   res.status(404).end();
// });

require('./index.js');

module.exports = { db };