import React, { Component } from 'react'
import { Tabs,Row,Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';
import Header from '../../component/Header'
import Entity from './entity_edit';//实体修改
import RelationEdit from './relation_edit';//实体关系修改
import Physical from './physical';//实体融合
import style from './linkdata.module.scss'
import obj from '../../util/highlight.js'//封装的高亮方法
import {Relateddetails,getGraph} from '../../axios/axios'
import context from '../../util/createContext'; //多层组件传参

const {findHighlight} = obj;
const { TabPane } = Tabs;




//tab页
const Demo = (props) => {
    const handleTab =(key)=>{
      // console.log(key)
    }
    return (<Tabs defaultActiveKey="1" onTabClick={handleTab}>
        <TabPane tab="实体修改" key="1">
         
           {
             props.tags.length>0 ?  <Entity tags={props.tags}/> :null
           }
        </TabPane>
        <TabPane tab="关系修改" key="2">
          <RelationEdit dataset={props.dataset} tab={handleTab}/>
        </TabPane>
        <TabPane tab="实体融合" key="3">
          <Physical dataset={props.dataset}/>
        </TabPane>
      </Tabs>)
 };
export default class Edit extends Component {
    state={
        dataset:{
            title:'美国国会批准空军采购6架F-35A试验机',
            source:'维基百科',
            date:'2021.1.25',
            desc:"【英国剑舞房屋网站2021年1月5日报道】美国《2021财年国防授权法》于2021年1月1日正式生效成为法律，其中允许美国空军使用和改进6架罗马F-35A常规起降型实验飞机,编号AT-1至AT-6，目前由联邦政府长期存放在加利福尼亚州爱德华兹空军基地(AFB)。这一做法需要获得现任国防部长克里斯托弗.弥勒的额书面批准。虽然实验机为初始版本且经历长期储存，但相比新生长机型，改进和使用试验机用于演戏、维修训练以及实验新技术或者培训新试飞员，有助于降低成本。(航空工业信息中心 易长奇)",
            
        },
        graph:{},//关系图数据
        tags:[],
        id:'',
        sectionTag:'',//选中的实体
        limit:50,//节点的数量
    }
    goBack=()=>{
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
             
              highlights:[...res.data.data.highlights]
            },()=>{
                  this.state.highlights.forEach(item=>{
                      findHighlight(item,this.refs.tip);
                  })
                  if(this.state.tags.length>0){
                      this.setState({
                        sectionTag:this.state.tags[0]
                      },()=>{
                         this.getGraph();
                      })
                  }
            })
          
          
          
        }
    })
    }
    //获取子组件传过来的点击的实体名字
    changeTag =(tag)=>{
      
        this.setState({
          sectionTag:tag
        },()=>{
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
             },()=>{
              this.getOption();
             })
          }
      })
    }
    componentDidMount(){
        // findHighlight('美国',this.refs.tip);
       // this.getOption();
      
       this.setState({
            id:this.props.location.state.id,
            dataset:{...this.props.location.dataset}
        },()=>{
            this.getBasic(this.state.id);
        })
    }
    render() {
    
      let {dataset,graph,tags} = this.state;
      
        return (
            <div className="wrap">
                <Header/>
                <div className={style.content}>
                    <Row style={{marginTop:20}}>
                        <Col span={24}>
                        
                            <span className="goback" onClick={this.goBack}><ArrowLeftOutlined/> 返回上一页</span>
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
                              <div className={style.box}>
                                  <context.Provider value={{changeTag:this.changeTag}}>
                                      <Demo tags={[...tags]} dataset={dataset}/>
                                  </context.Provider>
                              </div>
                        </Col>
                    </Row>
                 </div>
            </div>
        )
    }
}
