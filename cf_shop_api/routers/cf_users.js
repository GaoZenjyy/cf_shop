const express = require("express");
const router = express.Router();
const md5 = require("md5");
const config = require("../config")
const connt = require("../db")
const jsonwebtoken = require("jsonwebtoken")
// const moment = require("moment")
// const fs = require('fs')
// const multer = require('multer')
// var upload = multer()
const { upload } = require("../util")

// 引入中间件 
// const { chkToken } = require("../util")
// 引入 同步 query 
// const { query } = require("../db");
const QcloudSms = require('qcloudsms_js');
const cfg = {
    appid: 1400286568, // SDK AppID 以1400开头
    appkey: '4ab7f9058667355bdb38c1ebddb5bd35', // 短信应用 SDK AppKey
    templateId: 475954, // 短信模板 ID，需要在短信控制台中申请
    smsSign: '高源的文章日志', // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
}

// 简单封装一下, 向指定手机下发验证码
// sendCode('18212341234', 1234) // 发送短信

// 短信验证
// router.post("/sendsms", (req, res) => {
//     // console.log(req.body.tel);

//     // let code = sendCode(req.body.tel, 121212)
//     // res.json({
//     //     code
//     // })
//     function sendCode(phone, code, time = 10) {
//         phone = typeof (phone) === 'object' ? phone : [phone]
//         const qcloudsms = QcloudSms(cfg.appid, cfg.appkey) // 实例化 QcloudSms
//         const msender = qcloudsms.SmsMultiSender()
//         msender.sendWithParam(86,
//             phone, // 一个数组
//             cfg.templateId, // 模版 id
//             [code, time], // 正文中的参数值
//             cfg.smsSign, // 签名 未提供或者为空时，会使用默认签名发送短信
//             '', '',
//             (err, res, resData) => { // 回调函数
//                 // err && 
//                 // // console.log('err: ', err)
//                 // // console.log('request data: ', res.req)
//                 // // console.log('response data: ', resData)
//                 return resData
//             })
//             console.log(resData);

//     }
//     sendCode(req.body.tel, 12121)
// })
// 用户注册
router.post("/register", (req, res) => {
    // console.log(req.body);
    // 获取前台数据
    let mobile = req.body.mobile;
    let password = req.body.password;
    // 手机号码校验
    let mobileRe = /^1(3|4|5|6|7|8|9)\d{9}$/
    // 密码校验
    let passwordRe = /^[0-9a-zA-Z_]{6,20}$/
    // 正则判断手机号码
    if (!mobileRe.test(mobile)) {
        res.json({
            "ok": 0,
            "error": "手机号码长度为11位"
        })
        return
    }
    // 正则判断密码
    if (!passwordRe.test(password)) {
        res.json({
            "ok": 0,
            "error": "密码长度为6 ~ 20 支持数字 字母 下划线"
        })
        return
    }
    // res.json({
    //     "code": 200
    // })
    // 写入sql连接数据库
    // 先判断数据有没有这个手机号 写查询语句
    let sql = "SELECT count(*) num FROM cf_users WHERE cf_username = ?";
    connt.query(sql, mobile, (error, data) => {
        // console.log(data);
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            if (data[0].num > 0) {
                res.json({
                    "ok": 0,
                    "message": "该用户已经注册"
                })
                return
            } else {
                let data = {
                    cf_username: mobile,
                    cf_password: md5(password + config.md5s),
                    create_time: new Date().getTime().toString().substring(0, 10)
                }
                let sql = "INSERT INTO cf_users set ?"
                connt.query(sql, data, (error, result) => {
                    // console.log(result);
                    if (error) {
                        res.json({
                            "ok": 0,
                            "error": error.message
                        })
                    } else {
                        res.json({
                            "code": 200,
                            "message": "恭喜 注册成功"
                        })
                    }
                })
            }
        }

    })
})
// 用户登录
router.post("/login", (req, res) => {
    let mobile = req.body.mobile
    let password = req.body.password
    // let data=req.body
    // console.log(data);
    // console.log(mobile);
    // 数据校验
    // 手机号码校验
    let mobileRe = /^1(3|4|5|6|7|8|9)\d{9}$/
    // 密码校验
    let passwordRe = /^[0-9a-zA-Z_]{6,20}$/

    // 正则判断手机号码
    if (!mobileRe.test(mobile)) {
        res.json({
            "ok": 0,
            "error": "手机号码长度为11位"
        })
        return
    }
    // 正则判断密码
    if (!passwordRe.test(password)) {
        res.json({
            "ok": 0,
            "error": "密码长度为6 ~ 20 支持数字 字母 下划线"
        })
        return
    }
    // res.json({
    //     "code": 200
    // })
    // let data = {
    //     cf_username: mobile
    // }
    // console.log(data);

    // 写入sql连接数据库
    // 先判断数据有没有这个手机号 写查询语句
    let sql = "SELECT id,cf_password FROM cf_users WHERE cf_username = ?";
    connt.query(sql, mobile, (error, data) => {
        console.log(data);
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })

        } else {
            if (data.length > 0) {
                let jwt = jsonwebtoken.sign({
                    id: data[0].id
                }, config.md5s, { expiresIn: 36000 })
                res.json({
                    "code": 200,
                    "message": "登录成功",
                    "token": jwt
                })
            } else {
                res.json({
                    "ok": 0,
                    "error": "改用户还没有注册 请去注册"
                })
            }
        }

    })

})
// 首页轮播
router.get("/wheel", (req, res) => {
    connt.query("SELECT * FROM cf_wheel", (error, data) => {
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                data
            })
        }
    })
})
// 首页标题
router.get("/titles", (req, res) => {
    // let result = await query("SELECT * FROM cf_title").catch(next);
    // if (result === undefined) return
    // // console.log(data);
    // res.json({
    //     result
    // })

    connt.query("SELECT * FROM cf_title", (error, result) => {
        // console.log();
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                result
            })
        }

    })
})
// 模型手办
router.get("/moxin", (req, res) => {
    let limits = parseInt(Math.random() * 8)
    // return console.log(limits);
    let sql = `SELECT * FROM cf_goods_shops WHERE class_id = 5 LIMIT ${limits},4`
    connt.query(sql, (error, data) => {
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                data
            })
        }
        // console.log(data);
    })
})
//个性生活
router.get("/gexing", (req, res) => {
    let limits = parseInt(Math.random() * 8)
    // return console.log(limits);
    let sql = `SELECT * FROM cf_goods_shops WHERE class_id = 2 LIMIT ${limits},4`
    connt.query(sql, (error, data) => {
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                data
            })
        }
        // console.log(data);
    })
})
//数码
router.get("/shuma", (req, res) => {
    let limits = parseInt(Math.random() * 3)
    // return console.log(limits);
    let sql = `SELECT * FROM cf_goods_shops WHERE class_id = 3 LIMIT ${limits},4`
    connt.query(sql, (error, data) => {
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                data
            })
        }
        // console.log(data);


    })
})
// 定制
router.get("/dingzhi", (req, res) => {
    let limits = parseInt((Math.random() * 5) + 6)
    // return console.log(limits);
    let sql = `SELECT * FROM cf_goods_shops WHERE class_id = 3 LIMIT ${limits},4`
    connt.query(sql, (error, data) => {
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                data
            })
        }
        // console.log(data);


    })
})
// 默认全部商品
router.get("/goodsall", (req, res) => {
    connt.query("SELECT * FROM cf_goods_shops", (error, data) => {
        if (error) {
            res.json({
                "0k": 0,
                "error": error.message
            })
        } else {
            res.json({
                data
            })
        }
    })
})
// 搜索商品
router.get("/search", (req, res) => {
    let goods_name = req.query.goods_name
    // console.log(goods_name);

    let sql = `SELECT * FROM cf_goods_shops WHERE goods_name like '%${goods_name}%'`
    connt.query(sql, (error, result) => {
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                result
            })
        }
    })
})
// 分类数据
router.get("/classes", (req, res) => {
    connt.query("SELECT * FROM cf_class_ification", (error, data) => {
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                data
            })
        }
    })
})
// 默认数据
router.get("/moren", (req, res) => {

    let page = req.query.page;
    let pagenum = parseInt(req.query.pagenum);
    let indexs = (page - 1) * pagenum
    // console.log(indexs, pagenum);
    connt.query(`SELECT * FROM cf_goods_shops LIMIT ${indexs},${pagenum}`, (error, result) => {
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                result
            })
        }
    })
})
// 分类选项
router.get("/optios", (req, res) => {
    let id = req.query.id
    // console.log(id);
    let sql = `select * from cf_goods_shops where class_id = ? `
    connt.query(sql, id, (error, data) => {
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                data
            })
        }
    })

})
// 获取登录数据
router.get("/userdata", (req, res) => {
    // let id = req.userId
    // let sql = `SELECT * FROM cf_users WHERE id = ${id}`
    // connt.query(sql, (error, data) => {
    //     // console.log(data);
    //     if (error) {
    //         res.json({
    //             "ok": 0,
    //             "error": error.message
    //         })
    //     } else {
    //         res.json({
    //             data
    //         })
    //     }
    // })
    // console.log(req.userId);
    let token = req.headers.authorization
    // console.log(token);
    if (token === undefined) {
        res.json({
            "ok": 0,
            "error": "无效的令牌"
        })
    } else {
        // console.log(12);

        try {
            // console.log(token);
            // var decoded = jsonwebtoken.verify(token.substring(6), config.md5s);
            // console.log(decoded);

            let decoded = jsonwebtoken.verify(token.substring(7), config.md5s);
            // console.log(decoded.id);
            let id = decoded.id
            let sql = `SELECT * FROM cf_users WHERE id = ${id}`
            connt.query(sql, (error, data) => {
                // console.log(data);
                if (error) {
                    res.json({
                        "ok": 0,
                        "error": error.message
                    })
                } else {
                    res.json({
                        data
                    })
                }
            })

        } catch (err) {
            res.json({
                "ok": 0,
                "error": "无效的令牌"
            })
        }
    }

})
// 获取商品图片
router.get("/goodsimage", (req, res) => {
    let id = req.query.id
    // console.log(id);
    let sql1 = `SELECT goods_name,goods_price FROM cf_goods_shops WHERE id = ${id}`
    connt.query(sql1, (error, data) => {
        // console.log(data);

        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            // console.log(data);
            let sql = `SELECT goods_image_lunbo FROM cf_image_lunbo WHERE cf_goods_shops_id = ${id}`
            connt.query(sql, (error, result) => {
                // console.log(result);
                if (error) {
                    res.json({
                        "ok": 0,
                        "error": error.message
                    })
                } else {
                    let sql = `SELECT details_image FROM cf_image_details WHERE cf_goods_shops_id = ${id}`
                    connt.query(sql, (error, results) => {
                        // console.log(results);
                        if (error) {
                            res.json({ "ok": 0, "error": error.message })
                        } else {
                            res.json({
                                data,
                                result,
                                results
                            })
                        }
                    })

                }
            })

        }
    })

})
// 根据商品id 获取 商品
router.get("/dataid", (req, res) => {
    // let id = req.query.id
    // // console.log(id);
    // id = id.split(",")
    // // console.log(id);
    // let cat = []
    // id.forEach(v => {
    //     cat.push("?")
    // })
    // // console.log(cat);
    // cat = cat.join(",")
    // // console.log(cat);
    let sql = `SELECT * FROM cf_cates WHERE ischk = 1`
    connt.query(sql, (error, data) => {
        // console.log(data);
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                data
            })
        }

    })


})
// 添加地址
router.post("/addresses", (req, res) => {
    // 用户名字
    let shr_name = req.body.name;
    // 用户手机号
    let mobile = req.body.tel;
    // 省
    let province = req.body.province;
    // 市
    let city = req.body.city;
    // 区
    let area = req.body.county;
    // 详细地址
    let address = req.body.addressDetail;
    // 邮编
    let zipcode = req.body.postalCode;
    // 地区邮编
    let area_code = req.body.areaCode
    // 默认地址
    // console.log(shr_name);
    // console.log(address);

    let isdefault = req.body.isDefault;
    // console.log(isdefault);

    if (isdefault == true) {
        isdefault = 0
        // 获取用户id
        let token = req.headers.authorization
        try {
            var decoded = jsonwebtoken.verify(token.substring(7), config.md5s);
            // console.log(decoded);
            let id = decoded.id
            let sql2 = `UPDATE cf_addresses SET isdefault = 1`
            connt.query(sql2, (error, data) => {
                if (error) {
                    res.json({
                        "ok": 0,
                        "error": error.message
                    })
                } else {
                    let sql = `SELECT count(*) num FROM cf_addresses WHERE shr_name ='${shr_name}' AND address = '${address}'`;
                    // console.log(sql);

                    connt.query(sql, (error, data) => {
                        // console.log(data[0].num);
                        if (error) {
                            res.json({
                                "ok": 0,
                                "error": error.message
                            })
                        } else {
                            if (data[0].num === 1) {
                                res.json({
                                    "ok": 0,
                                    "error": "该地址已经注册 请重新填写"
                                })
                            } else {
                                let sql = `INSERT INTO cf_addresses SET ?`
                                let data = { shr_name, mobile, province, city, area, address, zipcode, isdefault, user_id: id, area_code }
                                // console.log(data)

                                connt.query(sql, data, (error, result) => {
                                    // if (error) return console.log(error)
                                    // console.log(result);
                                    if (error) {
                                        res.json({
                                            "ok": 0,
                                            "error": error.message
                                        })
                                    } else {
                                        res.json({
                                            "ok": 1,
                                            "message": "添加收货地址成功"
                                        })
                                    }
                                })

                            }
                        }
                    })
                }
            })
            // console.log(id);

        } catch (error) {
            if (error) {
                res.json({
                    "ok": 0,
                    "error": "令牌无效"
                })
            }
        }
    } else {
        isdefault = 1
        let token = req.headers.authorization
        try {
            var decoded = jsonwebtoken.verify(token.substring(7), config.md5s);
            // console.log(decoded);
            let id = decoded.id
            // let sql2 = `UPDATE cf_addresses SET isdefault = 1`
            // connt.query(sql2, (error, data) => {
            //     if (error) {
            //         res.json({
            //             "ok": 0,
            //             "error": error.message
            //         })
            //     } else {
            // console.log(id);
            let sql = `SELECT count(*) num FROM cf_addresses WHERE shr_name ='${shr_name}' AND address = '${address}'`;
            // console.log(sql);
            connt.query(sql, (error, data) => {
                // console.log(data[0].num);
                if (error) {
                    res.json({
                        "ok": 0,
                        "error": error.message
                    })
                } else {
                    if (data[0].num === 1) {
                        res.json({
                            "ok": 0,
                            "error": "该地址已经注册 请重新填写"
                        })
                    } else {
                        let sql = `INSERT INTO cf_addresses SET ?`
                        let data = { shr_name, mobile, province, city, area, address, zipcode, isdefault, user_id: id, area_code }
                        // console.log(data)
                        connt.query(sql, data, (error, result) => {
                            // if (error) return console.log(error)
                            // console.log(result);
                            if (error) {
                                res.json({
                                    "ok": 0,
                                    "error": error.message
                                })
                            } else {
                                res.json({
                                    "ok": 1,
                                    "message": "添加收货地址成功"
                                })
                            }
                        })

                    }
                }
            })
            // }
            // })

        } catch (error) {
            if (error) {
                res.json({
                    "ok": 0,
                    "error": "令牌无效"
                })
            }
        }
    }


    // console.log(shr_name, mobile, province, city, area, address, zipcode, isdefault);

})
// 获取地址
router.get("/getaddress", (req, res) => {
    let token = req.headers.authorization
    try {
        var decoded = jsonwebtoken.verify(token.substring(7), config.md5s);
        // console.log(decoded);
        let id = decoded.id
        let sql = `SELECT id,shr_name,mobile,province a,city b,area c,address d,isdefault FROM cf_addresses WHERE user_id = ${id}`
        connt.query(sql, (error, data) => {
            // console.log(data); return
            let result = []
            data.forEach(v => {
                // console.log(v);
                result.push({
                    id: v.id,
                    name: v.shr_name,
                    tel: v.mobile,
                    address: v.a + v.b + v.c + v.d,
                    addressId: v.isdefault
                })
            })
            // console.log(result);

            // console.log(data); return
            if (error) {
                res.json({
                    "ok": 0,
                    "error": error.message
                })
            } else {
                res.json({
                    result
                })
            }

        })
    } catch (error) {
        if (error) {
            res.json({
                "ok": 0,
                "error": "令牌无效"
            })
        }
    }



})
// 地址回显
router.get("/getaddressedit", (req, res) => {
    let id = req.query.id
    // console.log(id);
    let sql = `SELECT * FROM cf_addresses WHERE id = ?`
    connt.query(sql, id, (error, result) => {
        // console.log(result);
        let results = {
            id: result[0].id,
            name: result[0].shr_name,
            tel: result[0].mobile,
            province: result[0].province,
            city: result[0].city,
            county: result[0].area,
            addressDetail: result[0].address,
            postalCode: result[0].zipcode,
            isDefault: result[0].isdefault,
            areaCode: result[0].area_code
        }
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                results
            })
        }

    })

})
// 更改地址
router.put("/editaddres", (req, res) => {
    let id = req.body.id
    // 用户名字
    let shr_name = req.body.name;
    // 用户手机号
    let mobile = req.body.tel;
    // 省
    let province = req.body.province;
    // 市
    let city = req.body.city;
    // 区
    let area = req.body.county;
    // 详细地址
    let address = req.body.addressDetail;
    // 邮编
    let zipcode = req.body.postalCode;
    // 地区邮编
    let area_code = req.body.areaCode
    // 默认地址
    // console.log(shr_name);
    // console.log(address);

    let isdefault = req.body.isDefault;
    // console.log(isdefault);

    if (isdefault == true) {
        isdefault = 0
        let sql2 = `UPDATE cf_addresses SET isdefault = 1`
        connt.query(sql2, (error, data) => {
            if (error) {
                res.json({
                    "ok": 0,
                    "error": error.message
                })
            } else {
                let sql = `UPDATE cf_addresses SET ?  WHERE id = ?`
                let data = { shr_name, mobile, province, city, area, address, zipcode, isdefault, user_id: null, area_code }
                // console.log(data)
                connt.query(sql, [data, id], (error, result) => {
                    // if (error) return console.log(error)
                    // console.log(result);
                    if (error) {
                        res.json({
                            "ok": 0,
                            "error": error.message
                        })
                    } else {
                        res.json({
                            "ok": 1,
                            "message": "修改收货地址成功"
                        })
                    }
                })
            }
        })
    } else {
        isdefault = 1
        let sql = `UPDATE cf_addresses SET ? WHERE id=?`
        let data = { shr_name, mobile, province, city, area, address, zipcode, isdefault, user_id: null, area_code }
        // console.log(data)
        connt.query(sql, [data, id], (error, result) => {
            // if (error) return console.log(error)
            // console.log(result);
            // if (error) return console.log(error)
            // console.log(result);
            if (error) {
                res.json({
                    "ok": 0,
                    "error": error.message
                })
            } else {
                res.json({
                    "ok": 1,
                    "message": "修改收货地址成功"
                })
            }
        })
    }

})
// 删除
router.delete("/addressdelete", (req, res) => {
    let id = req.query.id
    // console.log(id);
    let sql = `DELETE FROM cf_addresses WHERE id = ${id}`
    // console.log(sql);
    connt.query(sql, (error, result) => {
        // console.log(result);
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                "ok": 1,
                "message": "删除成功"
            })
        }

    })


})
// 选中状态
router.put("/updatadata", (req, res) => {
    let id = req.body.id
    // console.log(req.body)
    // let ids = req.body.addressId
    // console.log(req.body);
    let data = { isdefault: req.body.addressId }
    if (data.isDefault === 0) {
        let sql = `UPDATE cf_addresses SET isdefault = 1`
        connt.query(sql, (error, data) => {
            if (error) {
                res.json({
                    "ok": 0,
                    "error": error.message
                })
            } else {
                res.json({
                    "ok": 1,
                    "message": "修改默认地址成功"
                })
            }
        })
        return
    } else {
        let sql = `UPDATE cf_addresses SET isdefault = 1`
        connt.query(sql, (error, data) => {
            if (error) {
                res.json({
                    "ok": 0,
                    "error": error.message
                })
            } else {
                let sql1 = `UPDATE cf_addresses SET isdefault = 0 WHERE id = ${id}`
                connt.query(sql1, data, (error, result) => {
                    if (error) {
                        res.json({
                            "ok": 0,
                            "error": error.message
                        })
                    } else {
                        res.json({
                            "ok": 1,
                            "message": "修改默认地址成功"
                        })
                    }
                })
            }
        })

    }


})
// 选者地址
router.get("/geraddress", (req, res) => {
    let isdefault = 0;
    let sql = `SELECT id,shr_name,mobile,province a,city b,area c,address d,isdefault FROM cf_addresses WHERE isdefault = ${isdefault}`
    connt.query(sql, (error, data) => {
        // console.log(result);
        let result = []
        data.forEach(v => {
            // console.log(v);
            result.push({
                id: v.id,
                name: v.shr_name,
                tel: v.mobile,
                address: v.a + v.b + v.c + v.d,
                addressId: v.isdefault
            })
        })
        // console.log(result);

        // console.log(data); return
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                result
            })
        }


    })
})
// 加入购物车
router.post("/goshops", (req, res) => {
    let token = req.headers.authorization;
    if (token === undefined) {
        res.json({
            "ok": 0,
            "error": "令牌无效 请重新登录"
        })
    }
    let id = req.body.id
    // console.log(id);
    let sql = `SELECT * FROM cf_goods_shops WHERE id = ${id}`
    connt.query(sql, (error, data) => {
        // console.log(data);

        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            try {
                let decoded = jsonwebtoken.verify(token.substring(7), config.md5s);
                // console.log(decoded);
                let ids = decoded.id

                let sql = `SELECT * FROM cf_cates WHERE  cate_id = ${id} AND user_id = ${ids}`
                connt.query(sql, (error, result) => {
                    // console.log(result);
                    if (error) {
                        res.json({
                            "ok": 0,
                            "error": error.message
                        })
                    } else {
                        let info = {
                            goods_name: data[0].goods_name,
                            price: data[0].goods_price,
                            image: data[0].goods_image,
                            pag_count: 1,
                            ischk: 0,
                            cate_id: id,
                            user_id: ids
                        }
                        // console.log(info);
                        if (result.length == 0) {
                            let sql = `INSERT INTO cf_cates SET ?`
                            connt.query(sql, info, (error, data) => {
                                // console.log(data);
                                if (error) {
                                    res.json({
                                        "ok": 0,
                                        "error": error.message
                                    })
                                } else {
                                    res.json({
                                        "ok": 200,
                                        "message": "加入购物车成功"
                                    })
                                }
                            })
                        } else {
                            let count = ++result[0].pag_count
                            let sql = `UPDATE cf_cates SET pag_count = ? WHERE cate_id = ${id} AND user_id = ${ids}`
                            connt.query(sql, count, (error, data) => {
                                if (error) {
                                    res.json({
                                        "ok": 0,
                                        "error": error.message
                                    })
                                } else {
                                    res.json({
                                        "ok": 200,
                                        "message": "数量加一"
                                    })
                                }
                            })
                        }
                    }
                })
            } catch (error) {
                res.json({
                    "ok": 0,
                    "error": "令牌无效 请重新登录"
                })
            }

        }
    })
})
// 购物车显示
router.get("/cartgoods", (req, res) => {
    // console.log(req.headers.authorization);
    let token = req.headers.authorization;
    if (token === undefined) {
        res.json({
            "ok": 0,
            "error": "令牌无效 请重新登录"
        })
    } else {
        try {
            let decoded = jsonwebtoken.verify(token.substring(7), config.md5s);
            // console.log(decoded);
            let id = decoded.id
            connt.query(`SELECT * FROM cf_cates WHERE user_id = ${id}`, (error, data) => {
                // console.log(data);
                if (error) {
                    res.json({
                        "ok": 0,
                        "error": error.message
                    })
                } else {
                    res.json({
                        "ok": 200,
                        data
                    })
                }
            })
        } catch (error) {
            res.json({
                "ok": 0,
                "error": "令牌无效 请重新登录"
            })
        }
    }

})
// 步进
router.put("/bujidata", (req, res) => {
    let id = req.body.id
    let value = req.body.value
    // console.log(id, value);
    // console.log(id);
    let sql = `UPDATE cf_cates SET pag_count = ${value} WHERE id = ${id}`
    connt.query(sql, (error, data) => {
        // return console.log(data);
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                "ok": 200,
                "message": "数量更新成功"
            })
        }
    })


})
// 全选
router.put("/checklist", (req, res) => {
    let value = req.body.value
    let id = req.body.id
    // console.log(value);
    if (value === true) {
        value = 1
    } else {
        value = 0
    }
    // console.log(value);
    let sql = `UPDATE cf_cates SET ischk = ${value} WHERE id = ${id}`
    connt.query(sql, (error, data) => {
        // console.log(data);
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                "code": 200,
                "message": "更新状态成功"
            })
        }
    })


})
// 上传图片

router.post("/profile", upload.single("avatar"), (req, res, next) => {
    // console.log(req.file);
    let path = `http://127.0.0.1:9898/` + req.file.path
    // console.log(path);
    // res.json(req.file)
    let token = req.headers.authorization
    // console.log(token.substring(7));
    if (token === null) {
        res.json({
            error: "没有令牌 请登录"
        })
    } else {
        try {
            let decoded = jsonwebtoken.verify(token.substring(7), config.md5s)
            // console.log(decoded);
            let id = decoded.id
            // console.log(id);
            let sql = `UPDATE cf_users SET avatar = ? WHERE id = ?`
            let data = [path, id]
            connt.query(sql, data, (error, data) => {
                // console.log(data);
                if (error) {
                    res.json({
                        ok: 0,
                        error: error.message
                    })
                } else {
                    res.json({
                        ok: 1,
                        message: "头像更新成功"
                    })
                }

            })
        } catch (error) {
            res.json({
                error: "令牌无效"
            })
        }
    }
})
// router.post("/profile", upload.single("avatar"), (req, res, next) => {
//     // console.log(req.file)
//     // res.json({
//     //     ok: 1,
//     //     path: '/'
//     // })
//     let { originalname, buffer } = req.file
//     fs.writeFile(path.join(__dirname, `../uploads/${originalname}`), buffer, () => {
//         res.json({
//             ok: 1,
//             path: 'http://localhost:9898/api/v1/uploads/' + originalname
//         })
//     })

// })
// router.post("/profile", (req, res) => {
//     console.log(req.body);
// })
// ---------------------------------------------------------------------------后台登录---------------------------------------------------------------------
// 登录
router.post("/adminuser", (req, res) => {
    // console.log(req.body);
    let username = req.body.username
    let password = req.body.password
    // console.log(username,password);
    // let sql = `SELECT * FROM admin`
    // let data = [username,password]
    let sql = `SELECT id,password FROM admin WHERE username =?`
    connt.query(sql, username, (error, data) => {
        // console.log(data);
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            if (data.length > 0 && data[0].password === password) {
                let jwt = jsonwebtoken.sign({
                    id: data[0].id
                }, config.md5s, { expiresIn: 36000 })
                // console.log(jwt);
                res.json({
                    "ok": 1,
                    "token": jwt
                })
                // console.log(1);

            } else {
                // console.log(2);
                res.json({
                    "ok": 0,
                    "error": "密码错误"
                })
            }
        }
    })

})
// 获取商品数据
router.get("/orderlist", (req, res) => {
    let pagenum = req.query.pagenum
    let pagesize = req.query.pagesize
    // console.log(req.query);
    let datanum = parseInt((pagenum - 1) * pagesize)
    // console.log(datanum);
    let limit = `LIMIT ${datanum},${pagesize}`
    let sql = `SELECT COUNT(*) num FROM cf_goods_shops;SELECT * FROM cf_goods_shops ${limit}`
    connt.query(sql, (error, data) => {
        // console.log(data);
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            // console.log(data[0][0].num);
            res.json({
                ok: 1,
                data: data[1],
                total: data[0][0].num
            })
        }

    })
})
// 商品分类查询
router.get("/orderquery", (req, res) => {
    connt.query(`SELECT * FROM cf_class_ification LIMIT 1,10`, (error, data) => {
        // console.log(data);
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            res.json({
                "ok": 1,
                data
            })
        }
    })
})
// 上传图片
router.post("/profiles", upload.single("file"), (req, res, next) => {
    // console.log(req);
    // let path = `http://127.0.0.1:9898/` + req.file.path
    // console.log(path);
    // // res.json(req.file)
    // let token = req.headers.authorization
    // // console.log(token.substring(7));
    // if (token === null) {
    //     res.json({
    //         error: "没有令牌 请登录"
    //     })
    // } else {
    //     try {
    //         let decoded = jsonwebtoken.verify(token.substring(7), config.md5s)
    //         // console.log(decoded);
    //         let id = decoded.id
    //         // console.log(id);
    //         let sql = `UPDATE cf_users SET avatar = ? WHERE id = ?`
    //         let data = [path, id]
    //         connt.query(sql, data, (error, data) => {
    //             // console.log(data);
    //             if (error) {
    //                 res.json({
    //                     ok: 0,
    //                     error: error.message
    //                 })
    //             } else {
    //                 res.json({
    //                     ok: 1,
    //                     message: "头像更新成功"
    //                 })
    //             }

    //         })
    //     } catch (error) {
    //         res.json({
    //             error: "令牌无效"
    //         })
    //     }
    // }
})
//用户列表
router.get("/userlist", (req, res) => {
    let pagenum = req.query.pagenum
    let pagesize = req.query.pagesize
    // console.log(req.query);
    let datanum = parseInt((pagenum - 1) * pagesize)
    // console.log(datanum);
    let limit = `LIMIT ${datanum},${pagesize}`
    let sql = `SELECT COUNT(*) num FROM cf_users;SELECT * FROM cf_users ${limit}`
    connt.query(sql, (error, data) => {
        // console.log(data);
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            // console.log(data[0][0].num);
            res.json({
                ok: 1,
                data: data[1],
                total: data[0][0].num
            })
        }

    })
})

//添加用户
router.post("/adminusers", (req, res) => {
    // return console.log(123);
    // console.log(121);
    // 获取前台数据
    let mobile = req.body.mobile;
    let password = req.body.password;
    // 手机号码校验
    let mobileRe = /^1(3|4|5|6|7|8|9)\d{9}$/
    // 密码校验
    let passwordRe = /^[0-9a-zA-Z_]{6,20}$/
    // 正则判断手机号码
    if (!mobileRe.test(mobile)) {
        res.json({
            "ok": 0,
            "error": "手机号码长度为11位"
        })
        return
    }
    // 正则判断密码
    if (!passwordRe.test(password)) {
        res.json({
            "ok": 0,
            "error": "密码长度为6 ~ 20 支持数字 字母 下划线"
        })
        return
    }
    // res.json({
    //     "code": 200
    // })
    // 写入sql连接数据库
    // 先判断数据有没有这个手机号 写查询语句
    let sql = "SELECT count(*) num FROM cf_users WHERE cf_username = ?";
    connt.query(sql, mobile, (error, data) => {
        // console.log(data);
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            if (data[0].num > 0) {
                res.json({
                    "ok": 0,
                    "error": "该用户已经注册"
                })
                return
            } else {
                let data = {
                    cf_username: mobile,
                    cf_password: md5(password + config.md5s),
                    create_time: new Date().getTime().toString().substring(0, 10)
                }
                let sql = "INSERT INTO cf_users set ?"
                connt.query(sql, data, (error, result) => {
                    // console.log(result);
                    if (error) {
                        res.json({
                            "ok": 0,
                            "error": error.message
                        })
                    } else {
                        res.json({
                            "code": 200,
                            "message": "恭喜 注册成功"
                        })
                    }
                })
            }
        }

    })

})
// 删除
router.delete("/userdel", (req, res) => {
    // console.log(req.query.id);
    let id = req.query.id
    let sql = `DELETE FROM cf_users WHERE id = ${id}`
    connt.query(sql, (error, result) => {
        if (error) {
            res.json({
                "ok": 0,
                "error": error.message
            })
        } else {
            // console.log(result.affectedRows);
            if (result.affectedRows === 1) {
                res.json({
                    "ok":1,
                    "message":"删除用户成功"
                })
            } else {
                res.json({
                    "ok":0,
                    "error":"删除用户失败"
                })
            }

        }
    })

})
module.exports = router;