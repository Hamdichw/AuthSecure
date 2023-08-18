var mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

var connection = mysql.createPool({
  connectionLimit: process.env.CONNECTIONLIMIT || 100,
  host: process.env.MYSQL_HOST || "Localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "authsecure",
  charset: "cp1256",
  port: process.env.DB_PORT || 3306,
});
connection.getConnection((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Runnig . . . .");
  }
});
module.exports = connection;
