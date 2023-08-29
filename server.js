const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const schema = require('./assets/db/schema.sql');
const seeds = require('./assets/db/seeds.sql');


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
    database: 'books_db'
  },
  console.log(`Connected to the books_db database.`)
);

db.query(schema, function(err, results) {
  console.log(results);
});

db.query(seeds, function(err, results) {
  console.log(results);
});

db.query('SELECT * FROM department', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});