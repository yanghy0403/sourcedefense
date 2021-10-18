import React, { Component } from 'react'
import logo from '../logo.svg';
import { UserOutlined ,LogoutOutlined,SettingFilled} from '@ant-design/icons';
import {  Dropdown,Menu } from 'antd';
import {logout} from '../axios/axios'
import {Link } from 'react-router-dom'
import './Header.scss'





class Userinfo extends Component {
    state = {
        visible: false,//控制菜单显示
    }
    handleVisibleChange = (flag) => {

        this.setState({ visible   : flag });
    }
     //退出登录
     logout=()=>{
        logout({}).then(res=>{
             if(res.data.code ===0){
                 window.location.href = window.location.origin + '/login';
                 sessionStorage.removeItem('user');
              }
         })
      }
    render() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        const menu = (
            <Menu>
                 {
                     user && user.role === 'ADMIN' ? <Menu.Item key="system">
                        <Link to="/system/permission"> <SettingFilled className="user"/>系统管理</Link>
                        
                    </Menu.Item> :null
                 }
                 
                <Menu.Item key="outlogin" onClick={()=>this.logout()}><LogoutOutlined/>退出登录</Menu.Item>
            </Menu>
        )
        return (
            <Dropdown overlay={menu} onVisibleChange={this.handleVisibleChange} visible={this.state.visible} placement="bottomCenter" arrow>
                <div className="ant-dropdown-link" style={{marginLeft:'30px'}}>
                   <UserOutlined className="user"/>
                   <span className="user_info">{user.username}</span>
                </div>
            </Dropdown>
        )
    }
}

export default class Header extends Component {
   
    state={
         Navindex:0,//导航默认下标
         islogin:false,//
         user:null,
    }
     //切换导航
   handleClickNav = (index) =>{
        
         this.setState({
            Navindex:index
         })
         sessionStorage.setItem('navindex',JSON.stringify(index));
   }
    
    componentDidMount(){
        if(sessionStorage.getItem('navindex')){
              let navindex = JSON.parse(sessionStorage.getItem('navindex'));
              this.setState({
                  Navindex:navindex,
                 
              })
        }else{
            this.setState({
                Navindex:0
            })
        }
    }
    render() {
         let curpath = window.location.pathname;
       
        return (
           
                  <div className="header">
                        <div className="header_left">
                              <img src={logo} alt=""/>
                              <span>体系研究知识管理与应用系统</span>
                        </div>
                        <ul>
                            <li onClick={()=>this.handleClickNav(0)} className={curpath === '/'? 'active':''}>
                                <Link to="/">首页</Link>
                                </li>
                            <li onClick={()=>this.handleClickNav(1)} className={curpath === '/knowledgemanage' || curpath === '/edit' || curpath === '/managelist' || curpath === '/linkdata'? 'active':''}>
                                 <Link to="/knowledgemanage">知识管理 </Link>
                            </li>
                            <li onClick={()=>this.handleClickNav(2)} className={curpath === "/upload"? 'active':''}>
                                 <Link to="/upload">知识导入 </Link>
                            </li>
                            <li onClick={()=>this.handleClickNav(3)} className={curpath ==="/problem"? 'active':''}>
                                 <Link to="/problem">知识问答 </Link>
                            </li>
                            <li onClick={()=>this.handleClickNav(4)} className={curpath === "/entity"? 'active':''}>
                                 <Link to="/entity">知识检索 </Link>
                            </li>
                           
                            <li onClick={()=>this.handleClickNav(5)} className={curpath === "/knowledgeapplic"? 'active':''}> <Link to="/knowledgeapplic">知识应用</Link> </li>
                        </ul>
                        <div className="header_right">
                           <Userinfo></Userinfo>
                           
                        </div>
                       
                 </div>
           
        )
    }
}

