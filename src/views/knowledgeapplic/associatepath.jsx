import React, { Component } from 'react'
import {Row,Col,Button,Input, message,Select } from 'antd';
import ReactEcharts from 'echarts-for-react';

import {Pathanalysis,getEntityType} from '../../axios/axios';
const { Option } = Select;
export default class Associatepath extends Component {
    state={
        defaultValue1:"F-35A",
        defaultValue2:"美国",
        label_ent_1:'',//第一个输入框类别
        label_ent_2:"",//第二个参数类别
        isgraph:false,//控制图形显示
        graph:{},//关系图数据
        width:0,
        height:0,
        entityType:[],//实体类别
    }
    getOption= ()=>{

        let data = this.state.graph;
      
       let width =this.state.width -104,height =this.state.height -300;
       
     
        data.categories = data.labels.map(item => {
            return {
                name: item
            };
        });
        
        // let itemColor = "";
        data.links = data.links.map(item => {
            
           return {
                ...item,
                source:item.source.toString(),
                target:item.target.toString()
           }
        });
      
        data.nodes = data.nodes.map(item => {
            item.symbolSize = 30;
            item.category = item.label;
            item.id = item.id.toString();
        //     item.fixed = true;
        //    item.x = random(120, width - 120);
        //     item.y = random(50, height - 50);

            return item;
        });
        
        data.nodes[0].x = 0 + 50;
        data.nodes[0].y = height / 2 + 20;
        data.nodes[0].fixed = true;
        if (data.nodes.length > 2) {
        //     console.log(111);
            data.nodes[data.nodes.length -1].x = width - 50;
            data.nodes[data.nodes.length -1].y = height / 2 +20;
            data.nodes[data.nodes.length -1].fixed = true;
        }
      
        
     
        let option = {
          //  color: color,
           
            legend: {
                top: 0,
               show:true,
                 right:10,
                 orient:'vertical',
                 width:50,
                 icon:'circle',
                 itemGap:10,
                data: data.categories
            },
            series: [
                {
                    top: "15%",
                    itemStyle: {
                      normal:{
                        borderColor: "#fff",
                        borderWidth: 1,
                        // shadowBlur: 10,
                        // shadowColor: "rgba(0, 0, 0, 0.3)"
                      },
                       emphasis:{
                            borderColor: "#fff",
                            borderWidth: 1,
                            // color:'#fff'
                        }
                    },
                   
                    type: "graph",
                    layout: "force",
                    categories: data.categories,
                    data: data.nodes,
                    links: data.links,
                    // cursor: "pointer",
                    roam: true,
                    draggable: true,
                    focusNodeAdjacency: true,
                    edgeSymbol: ['', 'arrow'],
                    label: {
                        show: true,
                        // color:'#464040',
                        // borderColor: "#fff",
                        // textBorderColor:"#fff"
                       
                    },
                    lineStyle: {
                        normal: {
                            width: 1,
                            type: "solid"
                        },
        
                        emphasis: {
                            width: 3
                        }
                    },
                    force: {
                        repulsion: 1000,
                        // edgeLength: 200,
                        gravity: 0.6
                        // layoutAnimation: true
                    }
                }
            ]
        };
        
      
        return option;
    }
    //点击搜索查看关联图
    handlePath = ()=>{
      
         let data={
            ent_1:this.state.defaultValue1,
            ent_2:this.state.defaultValue2,
            label_ent_1:this.state.label_ent_1,
            label_ent_2:this.state.label_ent_2
         }
         Pathanalysis(data).then(res=>{
             // console.log(res);
               if(res.data.code ===0){
                     this.setState({
                        graph:res.data.data,
                        isgraph:true
                     },()=>{
                       
                        if(this.state.graph.nodes && this.state.graph.nodes.length>0){
                            this.getClienWH();
                        }
                     })
                    
                    
               }else{
                     message.error(res.data.msg)
               }
         })

       
      
        
    }
    //获取图像展示宽高
    getClienWH =()=>{
        var Node = document.getElementById('react_echarts');
       
        var width1 = Node.clientWidth;
        var height1 = Node.clientHeight;
      
        this.setState({
            width:width1,
            height:height1
        },()=>{
            // this.getOption();
        })
              
    }
    //第一个输入框类别选择
    handleChange1 =(value)=>{
        this.setState({
            label_ent_1:value
          })
    }
    //第二个输入框类别选择
    handleChange2 =(value)=>{
     
        this.setState({
            label_ent_2:value
          })
    }
    //输入框变化
    onChange1 =(e)=>{
       this.setState({
          defaultValue1:e.target.value
       })
    }
    onChange2 =(e)=>{
       
        this.setState({
           defaultValue2:e.target.value
        })
     }
     //查询实体类别
     getEntityType =()=>{
        getEntityType({}).then(res=>{
         //  console.log(res);
           if(res.data.code ===0){
                this.setState({
                    entityType:res.data.data
                })
           }else{
               message.error(res.data.msg);
           }
        })
     }
    componentDidMount(){
         var node = document.getElementById('graph');
          this.setState({
              width:node.clientWidth,
              height:node.clientHeight
             
          })
          this.getEntityType();
    }
    render() {
        let {isgraph,graph,entityType} = this.state;
        let {captions} = graph;
        return (
            <div style={{height:'100%',position:'relative'}}>
                <div className="oper">
                      <Row>
                           <Col span={24} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                 <div style={{marginRight:40}}>
                                    <Select  style={{ width: 120 }} onChange={this.handleChange1} placeholder="请选择类别">
                                        {
                                             entityType.map((item,key)=>{
                                                return  <Option value={item.label} key={key}>{item.name}</Option>
                                             })
                                        }
                                       
                                    </Select>
                                     <Input  style={{width:200,marginRight:15}} onChange={(e)=>this.onChange1(e)} placeholder="请输入关键词"/>
                                 </div>
                                 <div>
                                    <Select style={{ width: 120 }} onChange={this.handleChange2} placeholder="请选择类别">
                                        {
                                             entityType.map((item,key)=>{
                                                return  <Option value={item.label} key={key}>{item.name}</Option>
                                             })
                                        }
                                    </Select>
                                    <Input  style={{width:200,marginRight:15}} onChange={(e)=>this.onChange2(e)} placeholder="请输入关键词"/>
                                 </div>
                                 
                                  <Button type="primary" onClick={this.handlePath}>路径关联</Button>
                           </Col>
                         
                      </Row>
                </div>
                {
                    isgraph && graph.nodes && graph.nodes.length>0 ?  <div style={{width:'100%',height:'50%'}} id="react_echarts">
                        <ReactEcharts option={this.getOption()} notMerge={true} lazyUpdate={true} style={{width: "100%", height: "100%"}}/>
                    </div>:null
                    // <p style={{marginTop:20,textAlign:'center'}}>未发现相关数据</p>
                }
                {
                   captions&& captions !=='' ?  <div  style={{height: 'calc(100% - 32px - 50%)',width:'100%',overflowY:'scroll'}}>
                    <h3>关系发现:</h3>
                    <div>
                            {
                                captions.map((item,key)=>{
                                    return <p key={key} style={{marginBottom:0}}><span style={{fontWeight:'bold'}}>{key+1}</span>. {item}</p>
                                })
                            }
                    </div>
                   </div>:null
                }
               
            </div>
        )
    }
}
