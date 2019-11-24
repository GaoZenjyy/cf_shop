const mysql = require("mysql");
const config = require("./config")
// 连接数据库
const connt = mysql.createConnection(config.db)
connt.connect();
module.exports = connt