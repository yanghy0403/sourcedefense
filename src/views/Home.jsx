import React, { Component } from 'react'
import Header from '../component/Header.jsx';
import ReactEcharts from 'echarts-for-react';
import style from './Home.module.scss';

import {GetgraphIndex} from '../axios/axios';
// import {message} from 'antd';
// import { DatabaseTwoTone } from '_@ant-design_icons@4.6.2@@ant-design/icons';
export default class Home extends Component {
     state={
        limit:50,//节点数量
        data:{ }
     }
    getOption= ()=>{
       
        // const color = ['#4592FF','#C23531','#339CA8'];
        
        let data = this.state.data;
     
        let categories =[];
         if(data.nodes.length>0){
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
            textStyle:{
              color:'#fff'
            }
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
                show: true,
                color:'#fff'
            },
            lineStyle:{
                normal:{
                    color:'#fff'
                }
            },
            // itemStyle:{
            //    normal:{
            //        color:'#fff'
            //    }
            // },
            force: {
              repulsion: 2000,
              edgeLength: 120
            },
            data: data.nodes,
            links: data.links
          }]
        }
      
        return option;
    }
    //获取首页数据
    getGraphData=()=>{
         let data={
          limit:this.state.limit
         }
         GetgraphIndex(data).then(res=>{
            // console.log(res);
             if(res.data.code ===0){
                 let data= res.data.data;
                  this.setState({
                     data:{...data}
                  })
                 
             }
         }).catch(error=>{
            console.log(error);
         })
    }
    componentDidMount(){
       
        this.getGraphData();
       
    }
    render() {
     
      let {data} = this.state;
        return (
            
                 <div className="wrap">
                     <Header/>
                        <div className={style.content}>
                          {
                              data.nodes && data.nodes.length>0 ?  <ReactEcharts option={this.getOption()} notMerge={true} lazyUpdate={true} style={{width: "100%", height: "100%"}}/> :null
                          }
                        </div>
                 </div>
           
        )
    }
}
