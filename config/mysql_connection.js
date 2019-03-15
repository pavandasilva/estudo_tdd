const mysql = require('mysql');

let mysql_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tdd'
});

module.exports = mysql_connection;