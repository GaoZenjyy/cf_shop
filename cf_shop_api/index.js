// 引入包
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const config = require("./config")
// 创建服务器
const app = express();
// 配置
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
// 路由 登录 注册
app.use("/api/v1", require("./routers/cf_users"))

// 监听服务
app.listen(config.server.port, config.server.ip, () => {
    console.log(`run serve ${config.server.port}`);
})