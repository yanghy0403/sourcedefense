import React, { Component } from 'react'
import { Input,Row, Col,Button,Table,Pagination,  } from 'antd';
// import { AudioOutlined } from '@ant-design/icons';

import Header from '../../component/Header.jsx';

import {GetTableList} from '../../axios/axios';

// import ReactEcharts from 'echarts-for-react';
import "echarts-wordcloud";


import style from './index.module.scss'
const { Search } = Input;
// const { Column } = Table;



export default class Manage extends Component {
    state={
        //classaction:['热点专题','顶层文件','领域前沿','飞机装备'],
        classaction:[
            {
                name:'全部类别',
                key:''
            },
            {
                name:'飞机装备',
                key:'aircraft'
            },
            {
                name:'热点专题',
                key:'hot'
            },
            {
                name:'顶层文件',
                key:'top'
            },
            {
                name:'领域前沿',
                key:'frontier'
            },
           
           
        ],
        tableData:[
            {
                key:'1',
                title:'热点专题',
                type:'军事报告',
                ctitle:'F-35飞机',
                format:'图文',
                author:'王海洋',
                date:'2020-11-20 10:20:09'
            },
            {
                key:'2',
                title:'热点专题',
                type:'军事报告',
                ctitle:'F-35飞机',
                format:'图文',
                author:'王海洋',
                date:'2020-11-20 10:20:09'
            },
            {
                key:'3',
                title:'热点专题',
                type:'军事报告',
                ctitle:'F-35飞机',
                format:'图文',
                author:'王海洋',
                date:'2020-11-20 10:20:09'
            }
        ],
        columns:[
            {
                title:'文档分类',
                dataIndex:'tag',
                key:'tag',
                width:100
            },
            // {
            //     title:'内容类型',
            //     dataIndex:'tag',
            //     key:'tag'
            // },
            {
                title:'内容标题',
                dataIndex:'title',
                key:'title',
                width:'30%',
                render:(ctitle,record)=>(
                    <span onClick={()=>this.handleRouter(record)} className={style.ctitle}>{ctitle}</span>
                )
            },
            {
                title:'来源',
                dataIndex:'source',
                key:'source',
                width:'30%',
            },
            {
                title:'作者',
                dataIndex:'author',
                key:'author',
                width:'30%',
            },
            // {
            //     title:'创建时间',
            //     dataIndex:'date',
            //     key:'date'
            // }
        ],
        tagindex:0,
        tag_params:'',//类别参数
        total:0,
        page:1,
        pageSize:10,
        search:'',//输入框搜索的值
    }
    //检索
    onSearch =(value )=>{
         
          this.setState({
              search:value
          },()=>{
               this.getTableList();
          })
    }
    //获取高词平云配置
    getOption= ()=>{
        let data = {
            dataval: [ {
                "name": "Nancy",
                "value": 520
            }, {
                "name": "生活资源",
                "value": "999"
            }, {
                "name": "供热管理",
                "value": "888"
            }, {
                "name": "供气质量",
                "value": "777"
            }, {
                "name": "生活用水管理",
                "value": "688"
            }, {
                "name": "一次供水问题",
                "value": "588"
            }, {
                "name": "交通运输",
                "value": "516"
            }, {
                "name": "城市交通",
                "value": "515"
            }, {
                "name": "环境保护",
                "value": "483"
            }, {
                "name": "房地产管理",
                "value": "462"
            }, {
                "name": "城乡建设",
                "value": "449"
            }, {
                "name": "社会保障与福利",
                "value": "429"
            }, {
                "name": "社会保障",
                "value": "407"
            }, {
                "name": "文体与教育管理",
                "value": "406"
            }, {
                "name": "公共安全",
                "value": "406"
            }, {
                "name": "公交运输管理",
                "value": "386"
            }, {
                "name": "出租车运营管理",
                "value": "385"
            }, {
                "name": "供热管理",
                "value": "375"
            }, {
                "name": "市容环卫",
                "value": "355"
            }, {
                "name": "自然资源管理",
                "value": "355"
            }, {
                "name": "粉尘污染",
                "value": "335"
            }, {
                "name": "噪声污染",
                "value": "324"
            }, {
                "name": "土地资源管理",
                "value": "304"
            }, {
                "name": "物业服务与管理",
                "value": "304"
            }, {
                "name": "医疗卫生",
                "value": "284"
            }, {
                "name": "粉煤灰污染",
                "value": "284"
            }, {
                "name": "占道",
                "value": "284"
            }, {
                "name": "供热发展",
                "value": "254"
            }, {
                "name": "农村土地规划管理",
                "value": "254"
            }, {
                "name": "生活噪音",
                "value": "253"
            }, {
                "name": "供热单位影响",
                "value": "253"
            }, {
                "name": "城市供电",
                "value": "223"
            }, {
                "name": "房屋质量与安全",
                "value": "223"
            }, {
                "name": "大气污染",
                "value": "223"
            }, {
                "name": "房屋安全",
                "value": "223"
            }, {
                "name": "文化活动",
                "value": "223"
            }, {
                "name": "拆迁管理",
                "value": "223"
            }
               ]
       }
       let option = {
        series: [
            {
                name: "热点分析",
                type: "wordCloud",
                // size: ['99%', '99%'],
                sizeRange: [32, 96],
                // textRotation: [0, 45, 90, -45],
                rotationRange: [-45, 90],
                // shape: 'circle',
                // shape: 'pentagon',
                shape: "smooth", //平滑
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 12
                },
                //   gridSize: 1,
                textStyle: {
                    normal: {
                        color: function () {
                            return (
                                "rgb(" +
                                [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(",") +
                                ")"
                            );
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: "#333"
                    }
                },
                data: data.dataval
            }
        ]
    };
      
        return option;
    }
    //点击内容标题跳转
    handleRouter=(record)=>{
      
          this.props.history.push({pathname:'/managelist',state:{id:record.id}})
    }
    //分页
    onChange =(page,pageSize)=>{
       
        this.setState({
            page:page,
            pageSize:pageSize
        },()=>{
            this.getTableList();
        })
    }
    //跳转上传页
    handleToupload(){
         
        this.props.history.push({pathname:'/upload'})
    }
    //切换tag
    handleTag =(i,type)=>{
      
          this.setState({
            tagindex:i,
            tag_params:type,
            page:1
          },()=>{
            this.getTableList();
          })
       
    }
    //获取列表数据
    getTableList=()=>{
        let data={
            tag:this.state.tag_params,
            page:this.state.page,
            size:this.state.pageSize,
            q:this.state.search
        }
        GetTableList(data).then(res=>{
            // console.log(res);
            if(res.data.code ===0){
                let newData= res.data.data.map(item=>{
                      switch(item.tag){
                          case 'hot':
                            item.tag ='热点专题';
                            break;
                         case 'frontier':
                            item.tag ='领域前沿';
                            break;
                         case 'aircraft':
                            item.tag ='飞机装备';
                            break;
                        default:
                            item.tag = '顶层文件'
                            break;
                      }
                      return {
                            ...item,
                            key:item.id
                      }
                })
                 this.setState({
                    tableData:[...newData],
                    total:res.data.total
                 })
            }
        }).catch(error=>{
            console.log(error);    
        })
    }
    componentDidMount(){
        this.getTableList();
    }
    render() {
        let {tagindex,classaction,total} = this.state;
        return (

            <div className="wrap">
            <Header/>
            <div className={style.content}>
                <div  className={style.rows}>
                    
                    <Search placeholder="文档检索" onSearch={this.onSearch} enterButton allowClear className={style.search} />
                    <Button type="primary" onClick={()=>this.handleToupload()}>我要上传</Button>
                </div>
               <Row className={style.main}>
                    <Col span={4} className={style.submenu}>
                      <div>
                            <h3 className={style.title}>文档分类</h3>
                            <ul className={style.column}>
                            
                                    {
                                    classaction.map((item,i)=>{
                                            return <li key={item.key} className={tagindex === i?'tag_active':''} onClick={()=>this.handleTag(i,item.key)}>{item.name}</li>
                                        })
                                    }
                            </ul>
                      </div>
                   </Col>
                   <Col span={20}>
                        <Table dataSource={this.state.tableData} columns={this.state.columns} className="table" pagination={false}></Table>
                        <div className={style.pagination}>
                             <Pagination showQuickJumper current={this.state.page} onChange={this.onChange} total={total} showSizeChanger showTotal={total=>`共${total}条`}/>
                        </div>
                   </Col>
                   {/* <Col span={3}>
                       <div className={style.graph}>
                            <ReactEcharts option={this.getOption()} notMerge={true} lazyUpdate={true} style={{width: "100%", height: "400px"}}/>
                       </div>
                   </Col> */}
               </Row>
            </div>
           
         </div>
        )
    }
}
