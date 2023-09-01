const { viewAllEmployees, addEmployee, viewRoles, addRole, viewDepartments, addDepartment } = require('./sqlfuncs.js');


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
        
        
        db.promise().query(query).then(([rows,fields]) => {
            return callback(rows);
        })
        .catch

        // const returnData = db.promise().query(query).then(([rows,fields]) => {
        //     // console.log(rows);
        //     return rows;
        // })
        // .catch(console.log("db error"))
        // .then( () => db.end() )

        // return returnData;
        
    }

// let stuff = ''
// main(viewAllEmployees(), function(result){
//     stuff = result;
// });

// console.log("STUFF", stuff)

module.exports = { main };

