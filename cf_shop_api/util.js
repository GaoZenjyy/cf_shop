const config = require("./config");
// 引入jsonwebtoken
const jsonwebtoken = require("jsonwebtoken");
// 创建中间件
function chkToken(req, res, next) {
    // console.log();
    let token = req.headers.authorization
    // console.log(token);
    // 判断有没有token
    if (token === null) {
        res.json({
            "ok": 0,
            "error": "无效的令牌"
        })
    } else {
        // 解析token
        try {
            let decoded = jsonwebtoken.verify(token.substring(7), config.md5s);
            // console.log(decoded.id);
            // 用req进行传值
            req.userId = decoded.id
            // 放行 让下一个中间件 执行
            next()
        } catch (err) {
            res.json({
                "ok": 0,
                "error": "无效的令牌"
            })
        }
    }
}

// 暴露
module.exports = {
    chkToken
}