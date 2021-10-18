import React, { Component } from 'react'
import { Route, Link, } from "react-router-dom";
import { Menu } from 'antd';
import { AppstoreOutlined, UserOutlined, SettingOutlined,ClockCircleOutlined,AlignCenterOutlined,NumberOutlined } from '@ant-design/icons';
import Header from '../../component/Header'
import style from './index.module.scss';

// import Permission from './permission.jsx';


// const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];

const Sider = () => {
  let pathname = window.location.pathname;

  let selectedKey =  pathname  //设置defaultSelectedKeys
  let openKey = "/"+ pathname.split("/")[1] //截取二级路由的一级路径，设置defaultOpenKeys

    const [openKeys, setOpenKeys] = React.useState([openKey]);
  
    const onOpenChange = keys => {
      const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
      console.log(latestOpenKey);
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    };
  
    return (
      <Menu mode="inline"  onOpenChange={onOpenChange} style={{ width: 256 }} defaultOpenKeys={ [openKey] } defaultSelectedKeys={ [selectedKey] }>
       
          <Menu.Item key="/system/permission" icon={<UserOutlined />}>
              <Link to="/system/permission">用户管理</Link>
          </Menu.Item>
          {/* <Menu.Item key="/system/modal" icon={<AppstoreOutlined />}>
            
              <Link to="/system/modal">  模型管理</Link>
         </Menu.Item> */}
       
          <Menu.Item key="/system/template" icon={<AlignCenterOutlined />}>
               <Link to="/system/template"> 模板管理</Link>
           </Menu.Item>
           <Menu.Item key="/system/entity" icon={<SettingOutlined />}>
               <Link to="/system/entity"> 实体管理</Link>
           </Menu.Item>
          
           <Menu.Item key="/system/log" icon={<ClockCircleOutlined />}>
               <Link to="/system/log"> 日志管理</Link>
           </Menu.Item> 
           <Menu.Item key="/system/structdata" icon={<NumberOutlined />}>
               <Link to="/system/structdata"> 结构化数据管理</Link>
           </Menu.Item>
      </Menu>
    );
  };






export default class System extends Component {
   rendRouter=(routes)=>{
        let router= routes.map((item,key) => {
                    return <Route 
                        exact={false}
                        key={key} 
                        path={item.path} 
                        component={item.component}
                        />
                })
        return router;
   }

    render() {
        let { routes} = this.props;
       
        return (
            <div className="wrap">
                <Header/>
                 <div className={style.content}>
                   <Sider/>
                   <div className={style.main}>
                     
                     {this.rendRouter(routes)}
                        {/* <Redirect from="/system" to="/system/permission"></Redirect> */}
                       
                   </div>
                 </div>
            </div>
        )
    }
}
