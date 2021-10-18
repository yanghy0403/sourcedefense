// import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom';
// import React, { Component } from 'react'
import Myhome from '../views/Home.jsx';

import Manage from '../views/knowledgemanage/index.jsx';
import Managelist from '../views/knowledgemanage/managelist'
import Linkdata from '../views/knowledgemanage/linkdata'
import Upload from '../views/Knowledgimport/upload'
import Edit from '../views/knowledgemanage/Edit'


import Application from '../views/knowledgeapplic/index.jsx';
import Problem from '../views/Knowledgequiz/problem.jsx';
import Entity from '../views/Knowledgeretrieval/entity.jsx';

import System from '../views/system/index.jsx';
import Permission from '../views/system/permission.jsx';
import Modal from '../views/system/modal.jsx';
import Template from '../views/system/template.jsx';
import Systementity from '../views/system/entity.jsx';
import Structdata from '../views/system/structdata.jsx';
import Log from '../views/system/log.jsx';
//一级路由下面如果没有二级页面可以开启严格模式，如果有只能关闭严格模式进行模糊匹配
let router=[
    
    {
         path:'/',
         component:Myhome,
         exact:true
    },
    {
        path:'/knowledgemanage',//知识管理
        component:Manage,
        exact:false
    },
    {
        path:'/managelist',//知识管理详情
        component:Managelist,
        exact:false
    },
    {
        path:'/linkdata',//知识管理关联页面
        component:Linkdata,
        exact:false
    },
   {
        path:'/knowledgeapplic',//知识应用
        component:Application,
        exact:false
    },
    {
        path:'/upload',//知识导入
        component:Upload,
        exact:false
    },
    {
        path:'/problem',//知识问答
        component:Problem,
        exact:false
    },
    {
        path:'/entity',//知识检索
        component:Entity,
        exact:false
    },
    {
        path:'/edit',//修改关联数据
        component:Edit,
        exact:false
    },
    {
        path:'/system',//系统管理
        component:System,
        exact:false,
        children:[
            { 
                path:'/system/permission',//权限管理
                component:Permission,
                exact:true
            },
            {
                path:'/system/modal',//模型管理
                component:Modal,
                exact:true
            },
            {
                path:'/system/template',//模板管理
                component:Template,
                exact:true
            },
            {
                path:'/system/entity',//实体管理
                component:Systementity,
                exact:true
            },
            {
                path:'/system/structdata',//机构化数据管理
                component:Structdata,
                exact:true
            },
            {
                path:'/system/log',//日志管理
                component:Log,
                exact:true
            },
        ]
    },
   
   

]

let object={
    routes:router
}
  


export default object;

