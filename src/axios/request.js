import React, {  } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Spin } from 'antd';

//创建axios实例
const service = axios.create({
  baseURL: process.env.REACT_APP_URL, // api的base_url
  timeout: 200000, // 请求超时时间
  withCredentials: true // 选项表明了是否是跨域请求
})


// 当前正在请求的数量

let requestCount = 0

// 显示loading

function showLoading() {
  if (requestCount === 0) {
    var dom = document.createElement('div')

    dom.setAttribute('id', 'loading')

    document.body.appendChild(dom)

    ReactDOM.render(<Spin/>,dom)

  }

  requestCount++

}

// 隐藏loading

function hideLoading() {
  requestCount--

  if (requestCount === 0) {
    document.body.removeChild(document.getElementById('loading'))

  }

}


//默认是每一个接口里面都会加上loading效果，如果不需要，可以在接口里面加上请求头
//例如headers:{
//   isLoading :false,设置成false就不会有加载效果
// }

//拦截响应
service.interceptors.request.use(config => {
  // requestCount为0，才创建loading, 避免重复创建
  if (config.headers.isLoading !== false) {
    showLoading()

  }

  return config

}, err => {
  // 判断当前请求是否设置了不显示Loading

  if (err.config.headers.isLoading !== false) {
    hideLoading()

  }

  return Promise.reject(err)

})

//拦截响应
service.interceptors.response.use(res => {

  // 判断当前请求是否设置了不显示Loading

  if (res.config.headers.isLoading !== false) {
    hideLoading()

  }

  return res

}, err => {
  if (err.config.headers.isLoading !== false) {
    hideLoading()

  }
 return Promise.reject(err)

})



export default service