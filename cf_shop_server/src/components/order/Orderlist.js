import React, { Component, Fragment } from 'react'
import { Button, Table, Tag, Modal, Form, Input, Select, Upload } from 'antd'
import Axios from 'axios'
import "../../statis/index.css"
const { Option } = Select;
class Orderlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],//列表数据
            classData: [],//分类列表
            classID: '',//分类ID
            imageUrl: '',//图片
            columns: [
                {
                    title: "编号",
                    dataIndex: "id",
                    key: "id",
                    align: "center"
                },
                {
                    title: "商品名称",
                    dataIndex: "goods_name",
                    align: "center"

                },
                {
                    title: "商品图片",
                    render: (recode) => {
                        return <img className="orderImg" alt={recode.goods_image} src={recode.goods_image}></img>
                    },
                    align: "center"

                },
                {
                    title: "商品价格",
                    render: (recode) => {
                        return <Tag color="blue">￥{recode.goods_price}.00</Tag>
                    },
                    align: "center"

                },
                // {
                //     title: "商品分类",
                //     align: "center",

                //     reder: (recode) => {
                //         return <Tag color="blue" >{}</Tag>
                //     }
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
            ],//列表表头
            pagenum: 1, //页码
            pagesize: 3,//页码数据 几条
            total: 0,//总条数
            visible: false,//弹框状态
        }
    }
    // 调用页面数据
    getDataList = (pagenum) => {
        Axios.get(`/orderlist?pagenum=${pagenum || this.state.pagenum}&pagesize=${this.state.pagesize}`).then(res => {
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
    // 添加弹框显示
    adddataModel = () => {
        // 修改弹框状态
        this.setState({
            visible: true
        })

    }
    // 点击弹框消失
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    // 分类选择ID
    selectClear = (value) => {
        // console.log(value);
        this.setState({
            classID: value
        })

    }
    // 图片上次
    handleCancelle = (info) => {
        console.log(info);

    }
    render() {
        const { getFieldDecorator } = this.props.form
        // 选择分类数据
        const listdata = this.state.classData.map((v, i) => {
            return <Option value={v.id} key={v.id}>{v.text}</Option>
        })
        return (
            <div>
                {/* 添加按钮 */}
                <Button type="primary" style={{ marginBottom: "10px" }} onClick={this.adddataModel}>添加商品</Button>
                {/* 表单 */}
                <Table rowKey="id" bordered dataSource={this.state.data} columns={this.state.columns} pagination={{
                    total: this.state.total,
                    current: this.state.pagenum,
                    pageSize: this.state.pagesize,
                    showTotal: (total, range) => `现在是${range[0]}~${range[1]}条数据 一共 ${total} 数据`,
                    onChange: this.onChanged
                }} />
                {/* 添加弹框 */}
                <Modal
                    title="添加商品"
                    okText="确定"
                    cancelText="取消"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item>
                            {getFieldDecorator("goods_name", {
                                rules: [{ required: true, message: "商品名称不可以为空" }]
                            })(<Input placeholder="请输入商品名称"></Input>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("goods_price", {
                                rules: [{ required: true, message: "商品价格不可以为空" }, {
                                    pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
                                    message: "商品价格是数字"
                                }]
                            })(<Input placeholder="请输入商品价格"></Input>)}
                        </Form.Item>
                    </Form>
                    {/* 分类选择 */}
                    <Select defaultValue="" style={{ width: 120 }} onChange={this.selectClear} >
                        {listdata}
                    </Select>
                    {/* 图片上传 */}
                    <Upload
                        className="selectes"
                        name="file"
                        action="http://127.0.0.1:9898/api/v1/profiles"
                        listType="picture-card"
                        onChange={this.handleCancelle}
                        showUploadList={false}
                        headers={{
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }}
                    >
                        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : "上传图片"}
                    </Upload>

                </Modal>

            </div>
        )
    }
}
export default Form.create()(Orderlist)