var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '7894',
  database : 'server_management'
});
db.connect();

module.exports = db;
