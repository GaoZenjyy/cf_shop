import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "antd/dist/antd.css"
// 配置axios
import Axios from "axios"
Axios.defaults.baseURL = "http://127.0.0.1:9898/api/v1"
// 请求头
ReactDOM.render(<App />, document.getElementById('root'));


