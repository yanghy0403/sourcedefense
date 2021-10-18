import React, { Component } from 'react'
import Header from '../../component/Header';
import {Row,Col,Tag,Button, Tabs  } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';
import style from './linkdata.module.scss';

import obj from '../../util/highlight.js'//封装的高亮方法
import {Relateddetails,SearchEntityAttr,getRelation,getGraph} from '../../axios/axios'
const {findHighlight} = obj;
const { TabPane } = Tabs;




export default class Linkdata extends Component {
    state={
      tagindex:0,
      dataset:{
        title:'美国国会批准空军采购6架F-35A试验机',
        source:'维基百科',
        date:'2021.1.25',
        desc:"【英国剑舞房屋网站2021年1月5日报道】美国《2021财年国防授权法》于2021年1月1日正式生效成为法律，其中允许美国空军使用和改进6架罗马F-35A常规起降型实验飞机,编号AT-1至AT-6，目前由联邦政府长期存放在加利福尼亚州爱德华兹空军基地(AFB)。这一做法需要获得现任国防部长克里斯托弗.弥勒的额书面批准。虽然实验机为初始版本且经历长期储存，但相比新生长机型，改进和使用试验机用于演戏、维修训练以及实验新技术或者培训新试飞员，有助于降低成本。(航空工业信息中心 易长奇)",
       
      },
      Relation:['现任国防部长克里斯托弗.弥勒','美国空军使用和改进6架罗马F-35A'],
      tags:[],//分析出来的实体
      graph:{},//关系图数据
      entity:[],//实体属性
      id:'',
      sectionTag:'',//选中的实体
      limit:50,//节点的数量
    }
     //返回上一页
     goBack =()=>{
      
      this.props.history.push({pathname:'/managelist',state:{id:this.state.id}});
    }
    getOption= ()=>{

        let data = this.state.graph;
      
        // const color =['#4592FF','#C23531','#339CA8'];
        let categories =[];
        if(data.nodes && data.nodes.length>0){
               data.nodes= data.nodes.map(item=>{
                 return {
                     ...item,
                     category:item.label,
                     symbolSize:50,
                     id:item.id.toString()
                 }
             })
             data.links.forEach(link => {
               link.label = {
                 align: 'center',
                 fontSize: 12
               };
               link.id = link.id.toString()
               link.source = link.source.toString()
               link.target = link.target.toString()
             });
              categories = data.labels.map(item=>{
                 return {
                     name:item
                 }
             })
        }
       
        let option = {
        //   title: {
        //     text: '知识图谱',
        //   },
          legend: [{
            bottom:20,
            show:true,
            right:20,
            orient:'vertical',
            width:50,
            icon:'circle',
            itemGap:10,
            data: categories.map(x => x.name),
           }],
          series: [{
            type: 'graph',
            layout: 'force',
            symbolSize: 30,
            draggable: true,
            roam: true,
            focusNodeAdjacency: true,
            categories: categories,
            edgeSymbol: ['', 'arrow'],
            // edgeSymbolSize: [80, 10],
            zoom:0.6,
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 20
                },
                formatter(x) {
                  return x.data.name;
                }
              }
            },
            label: {
                show: true
            },
            force: {
              repulsion: 1000,
              edgeLength: 120
            },
            data: data.nodes,
            links: data.links
          }]
        }
        
      
        return option;
    }
    //跳转实体修改
    handleEntity=()=>{
        this.props.history.push({pathname:'/edit',state:{id:this.state.id}});
    }
     //切换tag
     handleTag =(i,name)=>{
      
      this.setState({
        tagindex:i,
        sectionTag:name
      },()=>{
        this.SearchEntity(name);
        this.getGraph();
      })
     
    }
    //获取网络图谱数据
    getGraph =()=>{
      let data={
        entity:this.state.sectionTag,
        limit:this.state.limit
      }
      getGraph(data).then(res=>{
         
          if(res.data.code ===0){
             this.setState({
              graph:{...res.data.data}
             })
          }
      })
    }
    //获取基本详情数据
    getBasic=(id)=>{
      let data={
          id:id
      }
      Relateddetails(data).then(res=>{
      //  console.log(res);
          if(res.data.code ===0){
              this.setState({
                dataset:res.data.data,
                tags:[...res.data.data.entities],
                sectionTag:res.data.data.entities[0],
                // graph:{...res.data.data.graph},
                highlights:[...res.data.data.highlights]
              },()=>{
                  // if(this.state.graph !=={}){
                  //   this.getOption();
                  // }
               
                  this.state.highlights.forEach(item=>{
                      findHighlight(item,this.refs.tip);
                  })
              })
             
             if(this.state.tags.length ===0){
                //  message.warning('暂未发现实体数据');
             }else{
                this.SearchEntity(this.state.tags[0]);
                this.getGraph();
             }
           
          }
      })
    }
    //查询实体属性
    SearchEntity=(name)=>{
      let data={
          name:name
      }
      SearchEntityAttr(data).then(res=>{
          //console.log(res);
          if(res.data.code ===0){
              this.setState({
                entity:res.data.data.props
              })
          }
      })
    }
    //查询关系
    getRelation = (id)=>{
        let data={
            id:id
        }
        getRelation(data).then(res=>{
         // console.log(res);
           if(res.data.code ===0){
             if(res.data.data.length ===0){
                //  message.error('未发现相关关系');
             }
               this.setState({
                Relation:[...res.data.data]
               })
           }
        })
    }
    //切换tab
    onChange = (key)=>{
   
       if(key ==='2'){
        this.getRelation(this.state.id);
       }
   }
    componentDidMount(){
     
       this.setState({
            id:this.props.location.state.id,
            dataset:{...this.props.location.dataset}
        },()=>{
            this.getBasic(this.state.id);
           
        })
      
      
    }
    render() {
      let {tagindex,dataset,Relation,graph,tags,entity} = this.state;
     
        return (
            <div className="wrap">
                <Header/>
                <div className={style.content}>
                    <Row style={{marginTop:20}}>
                            <Col span={24}>
                                <span className={style.goback} onClick={this.goBack}><ArrowLeftOutlined/> 返回上一页</span>
                            </Col>
                     </Row>
                     <Row style={{marginTop:30}}>
                         <Col span={12}>
                                <h2 style={{fontWeight:'bold'}}>{dataset.title}</h2>
                                <p>
                                        <span style={{paddingRight:10}}>来源 : {dataset.source}</span>
                                        <span>时间 : {dataset.date ? dataset.date:'暂无数据'}</span>
                                </p>
                               <p className={style.desc} ref="tip">{dataset.body}</p>
                               <div className={style.action} ref="button">
                                    <Button type="primary" onClick={this.handleEntity}>实体关系修改</Button>
                               </div>
                                  
                                
                           </Col>
                          <Col span={12}>
                                {
                                    
                                    graph.nodes && graph.nodes.length>0 ? 
                                          <div style={{width:'100%',height:'100%',paddingLeft:30,marginBottom:15}}>
                                              <ReactEcharts option={this.getOption()} notMerge={true} lazyUpdate={true} style={{width: "100%", height: "100%"}}/>
                                          </div>:null
                                  }
                          </Col>
                     </Row>
                     <Row>
                         <Col span={24}>
                             <div className={style.detail_info}>
                                  <Tabs defaultActiveKey="1" onChange={this.onChange}>
                                    <TabPane tab="实体属性" key="1">
                                       <div className={style.detail_info}>
                                              <p>识别到的实体</p>
                                              <div className={style.tags}>
                                                    {
                                                          tags.length>0 ? tags.map((item,i)=>{
                                                            return  <Tag key={i} className={tagindex ===i ?'tag_active':''} onClick={()=>this.handleTag(i,item)} style={{lineHeight:'32px',cursor:'pointer',marginBottom:10}}>{item}</Tag>
                                                          }):<p style={{textAlign:'center'}}>暂无实体数据</p>
                                                    }
                                              </div>
                                               <div className={style.attr}>
                                                        {
                                                           entity.map((item,index)=>{
                                                              return <p key={index}><span>{item.name}</span> : {item.value}</p>
                                                            })
                                                        }
                                                </div>
                                       </div>
                                      </TabPane>
                                      <TabPane tab="关系发现" key="2">
                                          <div>
                                            
                                              <ul style={{background: '#ddd'}}>
                                                <li>实体</li>
                                                <li>关系</li>
                                                <li>实体</li>
                                              </ul>
                                              
                                                {
                                                  Relation.length>0 ? Relation.map((item,key)=>{
                                                        return <ul key={key}>
                                                              <li>{item.ent_1}</li>
                                                              <li>
                                                                {item.rel} 
                                                                {
                                                                    item.ts && item.ts!==''? <span>({item.ts})</span>:null
                                                                }
                                                              </li>
                                                              <li>{item.ent_2}</li>
                                                        </ul>
                                                      }): <p style={{textAlign:'center',paddingTop: 10}}>暂无关系数据</p>
                                                }
                                            
                                          </div>
                                    </TabPane>
                                 </Tabs>

                                    
                                </div>
                         </Col>
                     </Row>
                </div>
            </div>
        )
    }
}
