import React, { Component,  } from 'react'
import style from './login.module.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link } from 'react-router-dom';
import {handleLogin} from '../axios/axios';
export default class Login extends Component {
   // 提交
    onFinish = (values) => {
      
        let data={
            username:values.username,
            password:values.password
        }
        handleLogin(data).then(res=>{
            //   console.log(res);
              if(res.data.code ===0){
                  let user ={
                        role:res.data.role,
                        username:res.data.username
                  }
                  sessionStorage.setItem('user',JSON.stringify(user));
              
                window.location.href = window.location.origin + '/';
                
              }
        })
      };
    
    render() {
        return (
            <div className={style.wrap}>
                 <div className={style.form}>
                        <h3>体系研究知识管理与应用系统</h3>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: false,
                            }}
                            onFinish={this.onFinish}
                            >
                            <Form.Item
                                name="username"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                                ]}
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>自动登录</Checkbox>
                                </Form.Item>
                                {/* <a className="login-form-forgot" > 忘记密码</a> */}
                                <Link to="" className="login-form-forgot">忘记密码</Link>
                                {/* <Link to="/register" className="login-form-forgot" style={{paddingRight:10}}>注册</Link> */}
                              
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                  登录
                                </Button>
                               
                            </Form.Item>
                         </Form>
                        
                 </div>
            </div>
        )
    }
}
