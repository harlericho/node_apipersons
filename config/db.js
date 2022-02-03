const mysql = require('mysql');
const db = require('./db.json');

scriptMysql = {
    host: db.mysql.host,
    port: db.mysql.port,
    user: db.mysql.user,
    password: db.mysql.password,
    database: db.mysql.database
}
const myConnection = mysql.createConnection(scriptMysql);
myConnection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + myConnection.threadId);
})

module.exports = myConnection;