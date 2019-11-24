const express = require("express");
const router = express.Router();
const md5 = require("md5");
const config = require("../config")
const connt = require("../db")
const jsonwebtoken = require("jsonwebtoken")
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
        // console.log(data);
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
                    "code": 400,
                    "error": "用户名或者密码错误"
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
            var decoded = jsonwebtoken.verify(token.substring(6), config.md5s);
            // let decoded = jsonwebtoken.verify(token.substring(7), config.md5s);
            // console.log(decoded.id);
            let id = decoded.id
            let sql = `SELECT * FROM cf_users WHERE id = ${id}`
            connt.query(sql, (error, data) => {

                if (error) {
                    res.json({
                        "ok": 0,
                        "error": error.message
                    })
                } else {
                    // console.log(data);
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
    let id = req.query.id
    // console.log(id);
    id = id.split(",")
    // console.log(id);
    let cat = []
    id.forEach(v => {
        cat.push("?")
    })
    // console.log(cat);
    cat = cat.join(",")
    // console.log(cat);
    let sql = `SELECT * FROM cf_goods_shops WHERE id in(${cat})`
    connt.query(sql, id, (error, data) => {
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
            var decoded = jsonwebtoken.verify(token.substring(6), config.md5s);
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
            var decoded = jsonwebtoken.verify(token.substring(6), config.md5s);
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
    let sql = `SELECT id,shr_name,mobile,province a,city b,area c,address d,isdefault FROM cf_addresses`
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

module.exports = router;