import React, { Component } from 'react'
import {message} from 'antd';
import ReactEcharts from 'echarts-for-react';
// import style from './index.module.scss'
// import img from '../../assets/img/sce.png'
import {AsawholeNetwork} from '../../axios/axios'
export default class Inference extends Component {
    state={
        graph:{},
    }
    getOption= ()=>{
        //  console.log(this.state.graph);
        let data = this.state.graph;
      //  const color =['#4592FF','#C23531','#339CA8'];
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
                fontSize: 12,
                
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
            top: 0,
            show:false,
            right:10,
            orient:'vertical',
            width:50,
            icon:'circle',
            itemGap:10,
            data: categories.map(x => x.name),
            // icon: 'circle'
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
            zoom:1.4,
            edgeLabel: {
              normal: {
                show: true,
                color:'#464040',
                textStyle: {
                  fontSize: 20
                },
                formatter(x) {
                  return x.data.rel_name;
                }
              }
            },
            label: {
                show: true,
              //  color:'#fff',
              //  textBorderColor :"inherit"
            },
            lineStyle:{
              color:'#464040',
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
    //放大图片
    expandPhoto =(that)=>{
      
        var overlay = document.createElement("div");
        overlay.setAttribute("id","overlay");
        overlay.setAttribute("class","overlay");
        document.body.appendChild(overlay);

        var img = document.createElement("img");
        img.setAttribute("id","expand")
        img.setAttribute("class","overlayimg");
        img.src = that.getAttribute('src');
        document.getElementById("overlay").appendChild(img);

        img.onclick = this.restore;
    }
    //点击放大图片缩小
    restore=()=>{
       
        document.body.removeChild(document.getElementById("overlay"));
       
    }
    //整体网络图谱
    AsawholeNetwork =()=>{
        AsawholeNetwork({}).then(res=>{
            // console.log(res);
             if(res.data.code ===0){
                   this.setState({
                       graph:{...res.data.data}
                   })
             }else{
                 message.error(res.data.msg);
             }
        })
    }
   componentDidMount(){
       this.AsawholeNetwork();
   }
    render() {
        let {graph} = this.state;
        // return (
           
        //          <div className={style.demo}>
        //               <img src={img} alt="" ref="img" onClick={()=>this.expandPhoto(this.refs.img)}/>
        //          </div>
                
            
        // )
        return (
            <div style={{width:'100%',height:'100%'}} id="react_echarts">
               {
                graph.nodes && graph.nodes.length>0 ?  <ReactEcharts option={this.getOption()} notMerge={true} lazyUpdate={true} style={{width: "100%", height: "100%"}}/>:null
              }
          </div>
        )
    }
}
