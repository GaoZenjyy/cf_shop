import React, { Component,Fragment } from 'react'
import { Button, Table } from "antd"
import Axios from "axios"
import "../../statis/index.css"

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],//数据列表
            total: '',//总数据
            pagenum: 1, //页码
            pagesize: 3,//页码数据 几条
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
                            <Button type="danger">删除</Button>

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
            console.log(res);
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
    render() {
        return (
            <div>
                {/* 添加按钮 */}
                <Button type="primary" style={{ marginBottom: "10px" }} onClick={this.adddataModel}>添加地址</Button>
                {/* 表单 */}
                <Table rowKey="id" bordered dataSource={this.state.data} columns={this.state.columns} pagination={{
                    total: this.state.total,
                    current: this.state.pagenum,
                    pageSize: this.state.pagesize,
                    showTotal: (total, range) => `现在是${range[0]}~${range[1]}条数据 一共 ${total} 数据`,
                    onChange: this.onChanged
                }} />
            </div>
        )
    }
}
