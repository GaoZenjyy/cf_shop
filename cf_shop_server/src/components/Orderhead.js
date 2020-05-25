import React, { Component } from 'react'
import { Row, Col, Button, message } from 'antd'

export default class Orderhead extends Component {
    // 退出
    logout = () => {
        localStorage.clear();
        message.success("退出成功");
        this.props.history.push("/login")
        // console.log(this.props);

    }
    render() {
        return (
            <Row>
                <Col span={3}></Col>
                <Col span={18}></Col>
                <Col span={3}>
                    <Button type="primary" onClick={this.logout}>退出</Button>
                </Col>
            </Row>
        )
    }
}
