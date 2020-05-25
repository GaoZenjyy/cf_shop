import React, { Component, Fragment } from 'react'
import { Form, Input, Button, Icon, message } from "antd"
import "../statis/index.css"
import Axios from 'axios'
class Login extends Component {
    //    用户登录
    userLogin = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values);
                Axios.post("/adminuser", values).then(res => {
                    // console.log(res);
                    if (res.data.ok === 1) {
                        localStorage.setItem("token", res.data.token)
                        message.success("登录成功")
                        this.props.history.push("/")
                    } else {
                        message.error(res.data.error)
                        console.log(this.props);
                    }
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            // 登录表单
            <Fragment>
                <Form className="formLogin">
                    <Form.Item hasFeedback>
                        {getFieldDecorator("username", { rules: [{ required: true, message: "用户名不可以为空" }] })(<Input prefix={<Icon type="user"></Icon>} placeholder="请输入用户名"></Input>)}
                    </Form.Item>
                    <Form.Item hasFeedback >
                        {getFieldDecorator("password", { rules: [{ required: true, message: "密码不可以为空" }] })(<Input.Password prefix={<Icon type="lock"></Icon>} placeholder="请输入密码" />)}
                    </Form.Item>
                    <Button type="primary" size="large" className="loginButton" onClick={this.userLogin}>登录</Button>
                </Form>

            </Fragment>
        )
    }
}
export default Form.create()(Login)