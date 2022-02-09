const mysql = require('mysql2');

var connection = mysql.createConnection({
  host     : process.env.MYSQL_ADDON_HOST,
  port     : process.env.MYSQL_ADDON_PORT,
  user     : process.env.MYSQL_ADDON_USER,
  password : process.env.MYSQL_ADDON_PASSWORD,
  database : process.env.MYSQL_ADDON_DB
});

connection.connect((err) => {
  if(err) throw err;
  console.log("Connected!");
})

module.exports = {
  connection
}