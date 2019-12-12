const mysql = require("mysql");
const config = require("./config")
// 连接数据库
const connt = mysql.createConnection(config.db)
connt.connect();
// 创建同步代码
// 第一个是sql 语句 ，第二个是参数 是要传入的值
function query(sql, params) {
    // 创建一个promise对象 第一个是 返回 正确参数 第二个返回的是错误参数
    return new Promise((resolve, reject) => {
        // 连接数据库
        connt.query(sql, params, (error, data) => {
            // 判断 返回信息
            if (error) reject(error)
            else {
                resolve(data)
            }
        })
    })
}
module.exports = connt