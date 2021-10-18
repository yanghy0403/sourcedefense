import React, { Component } from 'react'
import Header from '../../component/Header.jsx';
import { Menu } from 'antd';
import style from './index.module.scss'
import {
    MailOutlined,
   AppstoreOutlined,
 
  } from '@ant-design/icons';

import Associate from './associatepath.jsx';
import Network from './network';
import Network1 from './network1';
import Inference from './Inference'

// import img from '../../assets/img/sce.png'
import {structuOrgan,associatedNetwork} from '../../axios/axios'
const { SubMenu } = Menu;


const Demo = (props) => {
    //点击菜单切换组件
   const handleMenu =(item)=>{
        
        props.callback(item.key);//通知父组件修改渲染内容
   }
    return (
     
      
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={['sub1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          onClick={handleMenu}
        >
          <Menu.Item key="sub1" icon={<MailOutlined />}>
              路径分析
          </Menu.Item>
        
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="知识网络">
            <Menu.Item key="sub2-4">整体网络</Menu.Item>
            <Menu.Item key="sub2-1">飞机/平台</Menu.Item>
            <Menu.Item key="sub2-2">组织机构</Menu.Item>
            <Menu.Item key="sub2-3">战场设施</Menu.Item>
           
          </SubMenu>
         
          {/* <Menu.Item key="sub3" icon={<LinkOutlined />}>
               推理分析
          </Menu.Item> */}
        </Menu>
   
    );
  };
//  const Demo1 =()=>{
//        return (
//             <div className={style.demo}>
//                   <img src={img} />
//             </div>
//        )
//  }


export default class Application extends Component {
    state={
        width:0,
        height:0,
        curKey:'sub1',
        submenu:{
            'sub1':<Associate />,
            'sub2-1': <Network1 tab={'sub2-1'}/>,
            'sub2-2': <Network tab={'sub2-2'}/>,
            'sub2-3': <Network tab={'sub2-3'}/>,
            'sub2-4': <Inference/>,
            'sub3': <Inference/>,
        },
        limit:50,//控制节点数量
    }
    //点击节点后重新渲染新的数据
     AccessDeep =(params)=>{
        //  console.log(params);
        let data={
            id:params.data.id,
            limit:this.state.limit
        }
        associatedNetwork(data).then(res=>{
            // console.log(res);
            let newData = res.data.data;
             this.setState({
                submenu:{
                      ...this.state.submenu,
                      "sub2-1":<Network1 graph={newData} AccessDeep={this.AccessDeep} tab={'sub2-1'}/>
                }
            })
        })
     }
    //获取知识网络关系图数据
     getGraph =()=>{
         let {curKey} = this.state;
         let type = "";
         
         if(curKey === 'sub2-1'){
           
             type = 'Aircraft'
         }else  if(curKey === 'sub2-2'){
            type = 'Organization'
         }else if(curKey === 'sub2-3'){
            type = 'Facility'
         }
         let data={
            BType:type,
            limit:this.state.limit
         }
        
         structuOrgan(data).then(res=>{
            // console.log(res);
             if(res.data.code ===0){
                 let data = res.data.data;
                 let obj ={}
                if(curKey === 'sub2-1'){
                    obj={
                         ...this.state.submenu,
                         'sub2-1':<Network1 graph={data} AccessDeep={this.AccessDeep} tab={'sub2-1'}/>
                    }
                }else  if(curKey === 'sub2-2'){
                    obj={
                        ...this.state.submenu,
                        'sub2-2':<Network graph={data} AccessDeep={this.AccessDeep} tab={'sub2-2'}/>
                   }
                }else if(curKey === 'sub2-3'){
                    obj={
                        ...this.state.submenu,
                        'sub2-3':<Network graph={data} AccessDeep={this.AccessDeep} tab={'sub2-3'}/>
                   }
                }
                this.setState({
                    submenu:{...obj}
                })
             }
         })

     }
    //菜单选择的
    callback =(value)=>{
       
            let obj = {
                'sub1':<Associate width={600} height={500}/>,
                'sub2-1': <Network1 graph={{}} tab={'sub2-1'}/>,
                'sub2-2': <Network graph={{}} tab={'sub2-2'}/>,
                'sub2-3': <Network graph={{}} tab={'sub2-3'}/>,
                'sub3': <Inference/>,
                'sub2-4': <Inference/>,
            };
        this.setState({
            curKey:value,
            // graph:{},
            submenu:{...obj}
        },()=>{
            if(value === 'sub2-1' || value === 'sub2-2' || value === 'sub2-3'){
                this.getGraph();
            }
        })
        
    }
    //获取图形
    componentDidMount(){
        
    }
    render() {
       let {submenu,curKey}  = this.state;
    
        return (
            <div className="wrap">
             <Header/>
              <div className={style.content} style={{display:'flex'}}>
              
                     
                      <div className="slider">
                             <Demo callback={this.callback}/>
                      </div>
                      <div style={{width:'calc( 100% - 276px)',marginLeft:20}} id="graph">
                          {
                              submenu[curKey]
                          }
                      </div>
              </div>
         </div>
        )
    }
}
