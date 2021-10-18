import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
// import linkData from '../../assets/js/linkdata';
export default class Network extends Component {
  state={
     graph:{},
     SelectionId:'',//选中的id
  }
  //单击获取节点相关详情
  onChartClick =(params)=>{
      //console.log(params);
      this.props.AccessDeep(params);
        this.setState({
            SelectionId:params.data.id
          })
  }
    getOption= ()=>{
      
        let data = this.state.graph;
      //  const color =['#4592FF','#C23531','#339CA8'];
       let categories =[];
       if(data.nodes.length>0){
              data.nodes= data.nodes.map(item=>{
                 if( this.props.tab === 'sub2-1' && this.state.SelectionId !=='' && this.state.SelectionId === item.id){
                      return {
                          ...item,
                          category:item.label,
                          symbolSize:80,
                          id:item.id,
                          itemStyle:{
                              normal:{
                                  color:'orange'
                              }
                          }
                        }
                }else{
                    return {
                        ...item,
                        category:item.label,
                        symbolSize:50,
                        id:item.id
                    }
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
        //   title: {
        //     text: '知识图谱',
        //   },
          legend: [{
            bottom: 20,
            show:true,
            right:20,
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
            zoom:0.6,
            edgeLabel: {
              normal: {
                show: true,
                color:'#464040',
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
    componentDidMount(){
     }
    UNSAFE_componentWillReceiveProps(props) {
      
        this.setState({
          graph: props.graph
        },()=>{
             
            if(this.state.graph.nodes && this.state.graph.nodes.length>0){
              this.getOption();
            }
        })
    }
    componentWillUnmount(){
     
        this.setState({
          SelectionId:''
        })
    }
    render() {
      let {graph} = this.state;
        let onEvents = {
          'click':this.onChartClick.bind(this)
        }
        return (
            <div style={{width:'100%',height:'100%'}} id="react_echarts">
               {
                graph.nodes && graph.nodes.length>0 ?  <ReactEcharts option={this.getOption()} notMerge={true} onEvents={onEvents} lazyUpdate={true} style={{width: "100%", height: "100%"}}/>:null
              }
         </div>
        )
    }
}
