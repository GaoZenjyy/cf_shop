import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Orderhead from "./Orderhead"
import "../statis/index.css"
import Orderlist from "./order/Orderlist"
// import Category from "./category/Class"
import Uress from "./user/User"
// import Address from "./address/Address"
import { Route, Link } from 'react-router-dom';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class Home extends Component {
    render() {
        return (
            <Layout>
                <Header className="header">

                    <Orderhead {...this.props}></Orderhead>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }} >
                        <Menu

                            mode="inline"
                            defaultSelectedKeys={['/orderlist']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="user" />
                                        商品管理
              </span>
                                }
                            >
                                <Menu.Item key="/orderlist" ><Link to="/orderlist">商品列表</Link></Menu.Item>
                                {/* <Menu.Item key="/category"><Link to="/category">分类列表</Link> </Menu.Item> */}
                                <Menu.Item key="/users"><Link to="/users">用户中心</Link> </Menu.Item>
                                {/* <Menu.Item key="/address"><Link to="/address">地址管理</Link> </Menu.Item> */}
                            </SubMenu>

                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                            <Breadcrumb.Item>商品列表</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Route path="/orderlist" component={Orderlist}></Route>
                            {/* <Route path="/category" component={Category}></Route> */}
                            <Route path="/users" component={Uress}></Route>
                            {/* <Route path="/address" component={Address}></Route> */}

                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
