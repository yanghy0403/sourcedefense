import React, { Component } from 'react'
import { Input, Row, Col, Card, Select, message } from 'antd';
import style from './index.module.scss'
import ReactEcharts from 'echarts-for-react';
import Header from '../../component/Header.jsx';
import { knowlodeResult, SearchNodeattr, AddRelationSearch,RelationSearch,EntitySearch } from '../../axios/axios'
import { SearchOutlined } from '@ant-design/icons';

// const { Search } = Input;
const { Option } = Select;
export default class Entity extends Component {
    state = {
        associate: [
            {
                id: '1',
                title: '米格-35的冲上还能可否媲美F-22和F-35'
            },
            {
                id: '2',
                title: '领域前言J-15总工谈J-31与F-35对决'
            }
        ],
        sectionvalue: 'entity',//选择搜索的内容是实体，属性还是关系,默认是实体
        attr: [],//实体属性
        sectionNode: 'Torpedo',
        sectionNodeId: '',//点击的节点id
        graphData: {},//关系图数据
        defaultInputValue: '3MN-1',
        defaultRelation: [],//查询的关系
        relationnum: 0,//关系数量
        list:[],//模糊匹配结果
        islist:false,//是否显示模糊匹配结果
        relationInput:'',//选择关系时搜索的关键词用来展示搜索结果
    }
  
    //模糊匹配
    fuzzySearch = (e)=>{
       this.setState({
         defaultInputValue:e.target.value,
         islist:true
       },()=>{
             if(this.state.sectionvalue === 'relation'){
                 this.Relationfuzzy();
             }else{
                this.Entityfuzzy();
             }
       })
    }
    //关系模糊匹配
    Relationfuzzy =()=>{
        let data ={
            q:this.state.defaultInputValue,
            page:1,
            size:200
        };
        RelationSearch(data).then(res=>{
            //   console.log(res);
              if(res.data.code ===0){
                  this.setState({
                      list:res.data.data
                  })
              }
        })
    }
    //实体模糊匹配
    Entityfuzzy =()=>{
        let data ={
            q:this.state.defaultInputValue,
            page:1,
            size:200
        };
        EntitySearch(data).then(res=>{
            //   console.log(res);
              if(res.data.code ===0){
                  this.setState({
                      list:res.data.data
                  })
              }
        })
    }
    //选择匹配到的结果
    handleClick = (item)=>{
       
        this.setState({
            defaultInputValue:item.name,
            islist:false,
            sectionNodeId:item.id,
            sectionNode:item.name
        })
    }
    //搜索
    onSearch = () => {
        
        let data = {
            type: this.state.sectionvalue,
            value: this.state.defaultInputValue
        }
        this.setState({
            relationInput:this.state.defaultInputValue,
            islist:false
        })
        if (this.state.sectionvalue === 'relation') {
            this.AddRelationSearch();
        }
          knowlodeResult(data).then(res => {
            // console.log(res);
            if (res.data.code === 0) {
                let obj = res.data.data;
                this.setState({
                    graphData: { ...obj },
                    sectionNode: obj.nodes[0].name,
                    sectionNodeId: obj.nodes[0].id * 1
                }, () => {
                  if (this.state.sectionvalue === 'relation') {
                       this.setState({
                            relationnum:res.data.total
                        })
                    }
                })
              
            } else {
                message.error(res.data.msg);
                this.setState({
                    graphData: {},
                    sectionNode:'',
                    sectionNodeId:'',
                    attr:[],
                    relationnum:0
                })
            }
            this.getAttrs();
        }).catch(error => {
            console.log(error);
        })

    }
    getOption = () => {
        let data = this.state.graphData;


        // let color=['#006acc','#ff7d18','#10a050'];
        data.nodes = data.nodes.map(item => {
            return {
                ...item,
                category: item.label,
                symbolSize: 50,
                id: item.id.toString()
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
        let categories = data.labels.map(item => {
            return {
                name: item
            }
        })

        let option = {

            legend: [{
                // selectedMode: 'single',
                data: categories.map(x => x.name),
                right: 10,
                bottom: 10,
                orient: 'vertical',
                width: 40,
                show: true,
                icon: 'circle'
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
                    repulsion: 2000,
                    edgeLength: 120
                },
                data: data.nodes,
                links: data.links
            }]
        }
        return option;
    }
    //修改传输数据类型，是查实体还是关系
    handleChange = (value) => {

        let sectionval = '', defaultInputValue = '';
        if (value === 'entity') {
            sectionval = 'entity';
            defaultInputValue = '3MN-1';
        } else if (value === 'relation') {
            sectionval = 'relation';
            defaultInputValue = '装备';
        }
        this.setState({
            sectionvalue: sectionval,
            defaultInputValue: defaultInputValue
        },()=>{
            this.onSearch(this.state.defaultInputValue);
        })
    }
    //点击节点
    onChartClick = (params) => {
        this.setState({
            sectionNode: params.data.name,
            sectionNodeId: params.data.id * 1
        })
        this.getAttrs();
    }
    changeInput = (e) => {

        this.setState({
            defaultInputValue: e.target.value
        })
    }
    //获取点击节点属性
    getAttrs = () => {
        let data = {
            identity: this.state.sectionNodeId
        }
        SearchNodeattr(data).then(res => {
            //  console.log(res);
            if (res.data.code === 0) {

                this.setState({
                    attr: [...res.data.data.props]
                })
            } else {
                message.error(res.data.msg)
            }
        }).catch(error => {
            console.log(error);
        })
    }
    //新增关系查询
    AddRelationSearch = () => {
        let data = {
            id: "",
            ent_1: '',
            rel: '',
            ent_2: '',
            ts: "",
            docId: ''
        }
        if (this.state.sectionvalue === 'relation') {
            data.rel = this.state.defaultInputValue;
        }
        AddRelationSearch(data).then(res => {
            // console.log(res);
            if (res.data.code === 0) {
                this.setState({
                    defaultRelation: [...res.data.data]
                })
            } else {
                message.error(res.data.msg);
            }
        })
    }
    componentDidMount() {
        this.onSearch(this.state.defaultInputValue);

    }
    render() {
        let { attr, graphData, defaultInputValue, defaultRelation, sectionvalue, relationnum,list,islist,relationInput } = this.state;

        let onEvents = {
            'click': this.onChartClick.bind(this)
        }
        return (
            <div className="wrap">
                <Header />
                <div className={style.content}>
                    <div className={style.title}>
                        <Select defaultValue="实体" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="entity">实体</Option>
                            <Option value="relation">关系</Option>
                            {/* <Option value="attr">属性</Option> */}
                        </Select>
                        <div className={style.search}>
                            <Input onChange={this.fuzzySearch} style={{width:'100%'}} value={defaultInputValue} allowClear={true}></Input>
                            <ul className={style.result}>
                                {
                                   islist && list.length>0 ? list.map((item,i)=>{
                                            return <li key={i} onClick={()=>this.handleClick(item)}>{item.name}</li>
                                    }):null
                                }
                            </ul>
                        </div>
                       
                        <span className={style.search_icon} onClick={this.onSearch}>
                            <SearchOutlined />
                        </span>
                        
                        {/* <Search placeholder="请输入检索词" onSearch={this.onSearch} value={defaultInputValue} enterButton onChange={(e) => this.changeInput(e)} /> */}
                    </div>
                    <div className={style.entity}>
                       
                        {
                            sectionvalue === 'relation' ? <p>检索到{relationnum}条 <span style={{background:'yellow'}}>{relationInput}</span>结果</p> : null
                        }
                        <Row>
                            <Col span={12}>
                                <Card title={`${this.state.sectionNode} 详细数据展示`}>
                                    <div className={style.attr}>

                                        {
                                            attr.map((item, key) => {
                                                return <p key={key}><span>{item.name}</span> : {item.value}</p>
                                            })
                                        }
                                    </div>
                                </Card>
                                {/* <Card title="相关数据推荐" style={{marginTop:20}}>
                                     {
                                          associate.map((item,key)=>{
                                              return <p key={key}>{key +1}. {item.title}</p>
                                          })
                                     }
                                  </Card> */}
                            </Col>
                            <Col span={12}>
                                <div style={{ height: '100%', position: 'relative' }}>
                                    {
                                        graphData.nodes && graphData.nodes.length > 0 ? <ReactEcharts option={this.getOption()} onEvents={onEvents} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 600 }} /> : null
                                    }

                                    <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}>
                                        {
                                            defaultRelation && defaultRelation.length > 0 ? defaultRelation.map((item, key) => {
                                                return <p key={key}>{item.ts},{item.ent_1}{item.rel}{item.ent_2}</p>
                                            }) : null
                                        }
                                    </div>
                                </div>


                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}
