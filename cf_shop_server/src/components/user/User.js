import React, { Component, Fragment } from 'react'
import { Button, Table, Form, Modal, Input, message } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import Axios from "axios"
import "../../statis/index.css"
const { confirm } = Modal
class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],//数据列表
            total: '',//总数据
            pagenum: 1, //页码
            pagesize: 3,//页码数据 几条
            visible: false,//弹框
            columns: [
                {
                    title: "编号",
                    dataIndex: "id",
                    key: "id",
                    align: "center"
                },
                {
                    title: "登录账号",
                    dataIndex: "cf_username",
                    align: 'center'
                },
                {
                    title: "登录密码(加密)",
                    dataIndex: "cf_password",
                    align: "center"
                },
                // {
                //     title: "头像",
                //     render: (recode) => {
                //         return <img className="orderImg" alt={recode.avatar} src={recode.avatar}></img>
                //     },
                //     align: "center"
                // },
                {
                    title: "操作",
                    render: (recode) => {
                        return <Fragment>
                            <Button type="primary">编辑</Button>&nbsp;&nbsp;
                            <Button type="danger" onClick={() => { this.userdel(recode) }}>删除</Button>

                        </Fragment>
                    },
                    align: "center"
                }
            ]
        }
    }
    // 调用页面数据
    getDataList = (pagenum) => {
        Axios.get(`/userlist?pagenum=${pagenum || this.state.pagenum}&pagesize=${this.state.pagesize}`).then(res => {
            // console.log(res);
            if (res.data.ok === 1) {
                this.setState({
                    data: res.data.data,
                    total: res.data.total
                })
            }
        })
    }
    // 获取分类数据
    getcClass = () => {
        Axios.get("/orderquery").then(res => {
            // console.log(res);
            if (res.data.ok === 1) {
                this.setState({
                    classData: res.data.data
                })
            }

        })
    }
    // 生命周期函数
    componentDidMount() {
        // 调用页面数据
        this.getDataList()
        this.getcClass()
    }
    // 监听分页
    onChanged = (pagenum) => {
        // console.log(pagenum);
        this.setState({
            pagenum
        })
        this.getDataList(pagenum)
    }
    // 添加用户
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            // console.log(values);
            if (!err) {
                Axios.post("/adminusers", values).then(res => {
                    // console.log(res);
                    if (res.data.ok === 0) {
                        message.error(res.data.error)
                    } else {
                        message.success(res.data.message)
                        this.setState({
                            visible: false
                        })
                        this.props.form.resetFields()
                        this.getDataList()

                    }
                })
            }

        })
    }
    // 弹框的消失隐藏
    handleCancel = () => {
        this.setState({
            visible: false
        })
        this.props.form.resetFields()

    }
    adddataModel = () => {
        this.setState({
            visible: true
        })
    }
    // 删除用户
    userdel = (recode) => {
        // console.log(recode.id);
        confirm({
            title: '你确定要删除该该用户的账号吗?',
            icon: <ExclamationCircleOutlined />,
            content: '删除就不可以恢复了',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Axios.delete(`/userdel?id=${recode.id}`).then(res => {
                    // console.log(res);
                    if (res.data.ok === 0) {
                        message.error(res.data.error)
                    } else {
                        message.success(res.data.message)

                        if (this.state.data.length < 1) {
                            this.setState({
                                pagenum: this.state.pagenum - 1
                            })
                            this.getDataList()
                        } else {
                            this.getDataList()
                        }
                    }
                })
            },

        });

    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                {/* 添加按钮 */}
                <Button type="primary" style={{ marginBottom: "10px" }} onClick={this.adddataModel}>添加账号</Button>
                {/* 表单 */}
                <Table rowKey="id" bordered dataSource={this.state.data} columns={this.state.columns} pagination={{
                    total: this.state.total,
                    current: this.state.pagenum,
                    pageSize: this.state.pagesize,
                    showTotal: (total, range) => `现在是${range[0]}~${range[1]}条数据 一共 ${total} 数据`,
                    onChange: this.onChanged
                }} />
                {/* modal 弹框 */}
                <Modal
                    title="添加用户"
                    okText="确定"
                    cancelText="取消"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item>
                            {getFieldDecorator("mobile", {
                                rules: [{ required: true, message: "账户名不可以为空" }]
                            })(<Input placeholder="请输入账户名(账户名为手机号11位数字)"></Input>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("password", {
                                rules: [{ required: true, message: "账户密码不可以为空" }]
                            })(<Input.Password placeholder="请输入账户密码" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(User)