import React, { Component } from 'react';
// 路由
import { BrowserRouter, Route, Redirect } from "react-router-dom"
// 引入登录页面
import Login from "./components/Login"
// 引入主页
import Home from "./components/Home"

export default class App extends Component {
  isToken = (props) => {
    let token = localStorage.getItem("token")
    if (token === null) {
      return <Redirect to="/login"></Redirect>
    } else {
      return <Home {...props}></Home>
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={props => this.isToken(props)}></Route>
        <Route path="/login" component={Login}></Route>
      </BrowserRouter>
    )
  }
}

