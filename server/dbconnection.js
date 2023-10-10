
var mysql = require('mysql2');

const dotenv = require("dotenv");
dotenv.config();

var connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  });

  module.exports =connection;


  // host: "ns135.hostingraja.org",
  // user: "mctcdnhi_kiran",
  // password: "kiran007",
  // database: "mctcdnhi_data"