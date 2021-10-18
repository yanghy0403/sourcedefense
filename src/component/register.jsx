import React, { Component,  } from 'react'
import style from './login.module.scss';
import { Form, Input, Button} from 'antd';
import {Link } from 'react-router-dom'

const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span:24,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset:0,
      span:24,
    },
  };
 

export default class Register extends Component {
    //注册
    onFinish = (values) => {
        console.log('提交数据', values);
      };
    render() {
       
        return (
            <div className={style.wrap}>
                 <div className={style.form}>
                        <h3>开源防务系统</h3>
                        <Form
                            name="normal_login"
                            className="login-form"
                            {...layout}
                            
                            initialValues={{
                                remember: false,
                            }}
                            onFinish={this.onFinish}
                            >
                            <Form.Item
                                name="username"
                                label="用户名"
                                key="name"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                    {
                                        validator:(_,value)=>{
                                           let reg= /^[a-zA-z]\w{3,7}$/;
                                           if(reg.test(value)){
                                               return Promise.resolve();
                                            }else{
                                                return Promise.reject(new Error('不符合规则,请输入以字母开头,数字,下划线组成的4-8位用户名'));
                                            }  
                                        }
                                    }
                                  ]}
                              >
                                 
                                <Input placeholder="请输入以字母开头,数字,下划线组成的4-8位用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="密码"
                                key="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    },
                                    {
                                        validator:(_,value)=>{
                                           let reg= /^[a-zA-z]\w{5,15}$/;
                                           if(reg.test(value)){
                                              return Promise.resolve();
                                            }else{
                                              return Promise.reject(new Error('不符合规则,不符合规则,请输入数字、字母、下划线组成的6-16位密码'));
                                            }  
                                        }
                                    }
                                  ]}
                                >
                                
                                <Input.Password
                               
                                type="password"
                                placeholder="请输入数字、字母、下划线组成的6-16位密码"
                                />
                            </Form.Item>
                            <Form.Item
                                name="cfpassword"
                                label="确认密码"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                {
                                    required: true,
                                    message: '请确认你的密码',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('输入的两个密码不匹配'));
                                    },
                                }),
                                ]}
                            >
                                <Input.Password placeholder="确认密码"/>
                            </Form.Item>
                            <Form.Item>
                                <Link to="/login" className="login-form-forgot">返回登录</Link>
                             </Form.Item>
                           <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                  注册
                                </Button>
                               
                            </Form.Item>
                         </Form>
                        
                 </div>
            </div>
        )
    }
}
