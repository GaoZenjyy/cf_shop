const config = require("./config");
// 引入jsonwebtoken
const jsonwebtoken = require("jsonwebtoken");
const moment = require("moment")
const fs = require('fs')
const path = require("path")
const multer = require('multer')
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
// 创建存储对象
const storage = multer.diskStorage({
    // 配置保存文件的路经
    destination: function (req, file, cd) {
        // console.log(req);
        // 先获取今天的日期
        let today = moment().format("YYYYMMDD")
        fs.access(path.join(__dirname, "/uploads"), fs.constants.F_OK, (error) => {
            if (error) {
                fs.mkdir("uploads", (err) => { })
            }
            let dir = "./uploads/" + today
            // console.log(dir);
            fs.access(dir, fs.constants.F_OK, (err) => {
                if (err) {
                    fs.mkdir(dir, (err) => { })
                }
                cd(null, dir)
            })
        })
    },
    // destination: function (req, file, cb) {
    //     cb(null, './uploads')
    // },
    filename: function (req, file, cd) {
        // console.log(file);
        let newName = Date.now() + "." + file.originalname.substr(file.originalname.lastIndexOf(".") + 1)
        // console.log(newName);
        cd(null, newName)
    }

})
// console.log(storage);

const upload = multer({
    storage,
    // 最大尺寸限制
    limits: {
        fileSize: 1024 * 1024     // 最大 1M ，单位：字节
    },
    // 自定义上传过滤器
    fileFilter: (req, file, cb) => {
        // 文件类型
        if (['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].indexOf(file.mimetype) !== -1)
            cb(null, true)
        else
            cb(new Error('不允许上传的类型'))
    }


})




// console.log(sendCode("15984775637",1234));


// 暴露
module.exports = {
    chkToken,
    upload
 
}