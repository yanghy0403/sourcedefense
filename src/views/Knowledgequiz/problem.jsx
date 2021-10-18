import React, { Component,useState } from 'react'
import { Input, Row,Col,Pagination,message,Button,Modal,Form   } from 'antd';
// import { AudioOutlined } from '@ant-design/icons';
import style from './index.module.scss'
import Header from '../../component/Header.jsx';
import {SearchResult,getProblemTem,AddProblemTem} from '../../axios/axios'
// import obj from '../../util/highlight.js'//封装的高亮方法
import ReactEcharts from 'echarts-for-react';

const { Search } = Input;
// const {findHighlight} = obj;

//添加问题模板
const Addproblem =(props)=>{
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        form.submit();
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
      };
      //提交新增加的问题模板
      const onFinish=(value)=>{
        // console.log(value);
        if(value.template === '' || value.template === undefined){
           return message.warning('请输入问题');
        }
        AddProblemTem(value).then(res=>{
            // console.log(res);
             if(res.data.code ===0){
                 message.success('问题模板新增成功');
                 props.getProblemTem();
                 form.resetFields();
             }else{
                 message.error(res.data.msg);
             }
        })
      
   }
      return (
        <>
          <Button type="primary" onClick={showModal}>增加模板</Button>
          <Modal title="问题模板" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form {...{wrapperCol: { span: 24 }}} form={form} onFinish={onFinish} style={{maxHeight:400,overflow:'hidden',overflowY:'auto'}}>
                        <Form.Item  name="template">
                                <Input placeholder="请输入问题"/>
                        </Form.Item>
                     
                     </Form>
          </Modal>
        </>
      );
}


export default class Problem extends Component {
    state={
        total:0,
        result:[],//搜索结果
        page:1,
        pageSize:5,
        page1:1,
        pageSize1:5,
        total1:0,//问题模板的分页
        remend:[
            {
                id:1,
                title:'重量大于____公斤的炸弹有哪些?'
            },
            {
                id:2,
                title:'部署特定机型的中队属于哪个指挥部?'
            },
            {
                id:3,
                title:'基地位于美国的中队的飞机挂载炸弹重量大于____公斤的有哪些?'
            },
            {
                id:4,
                title:'特定机型挂载的特定武器装备有哪些'
            },
            {
                id:5,
                title:'特定中队的飞机/使用者有哪些'
            },
            {
                id:6,
                title:'特定机型的详细参数'
            },
            {
                id:7,
                title:'重量大于____公斤的炸弹有哪些?'
            },
            {
                id:8,
                title:'基地位于特定州的中队有哪些/属于哪个国家'
            },
            {
                id:9,
                title:'部署特定机型的中队的基地位于美国的有哪些'
            },
            {
                id:10,
                title:'部署特定机型的中队的基地位于某州的有哪些'
            },
            {
                id:11,
                title:'某中队属于哪个联队'
            },
            {
                id:12,
                title:'某中队属于哪个指挥部'
            },
            {
                id:13,
                title:'某中队的基地位于哪个国家'
            },
            {
                id:14,
                title:'部署特定机型的中队属于哪个指挥部'
            },
            {
                id:15,
                title:'部署特定机型的中队属于美国的有哪些'
            },
            {
                id:16,
                title:'高度小于____的飞机有哪些?'
            },
            {
                id:17,
                title:'高度等于____的飞机有哪些'
            },
            {
                id:18,
                title:'高度小于____且长度大于____的飞机有哪些'
            },
            {
                id:19,
                title:'____年之后入职某中队的人员有哪些'
            },
            {
                id:20,
                title:'____年到____年之间入某中队的人员有哪些'
            },
            {
                id:21,
                title:'在某机构获得特定学位的人员'
            }
        ],
        defaultValue:"",
        graph:{},//关系图数据
        searchValue:'',//搜索的值
        isAddtem:false,//判断是否新增了模板
    }
    //搜索
    onSearch =(value)=>{
       this.setState({
            searchValue:value 
         },()=>{
             if(this.state.searchValue !==''){
                this.getSearchData();
             }
 
         })
       }
    //获取搜索数据
    getSearchData=()=>{
        
        let data={
            q:this.state.searchValue,
            page:this.state.page,
            size:this.state.pageSize
        }
      SearchResult(data).then(res=>{
             //console.log(res);
              if(res.data.code === 0){
                  let data = res.data.data;
                  this.setState({
                      total:res.data.total,
                      result:data,
                    //   graph:data[0]
                  })
              
                  this.getOption(data[0]);
                 
             }else{
                 message.error(res.data.msg)
             }
        }).catch(error=>{
              console.log(error);
        })
    }
    //获取配置
    getOption=()=>{ 
        
         let data= this.state.result;
      
        // let color=['#006acc','#ff7d18','#10a050','#3366cc'];
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
        // title: {
        //     text: '知识图谱',
        // },
        backgroundColor:'#f2f6f9',
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
            zoom:0.6,
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
    //页码发生改变
    onChange=(page,pageSize)=>{
       this.setState({
           page:page,
           pageSize:pageSize
       },()=>{
          this.getSearchData();
       })
    }
    //双击查看对应推理过程
    view=(index)=>{
      
         this.setState({
             graph:{...this.state.result[index]}
         })       // this.getSearchData();
    }
    //获取问题模板
    getProblemTem =()=>{
        let data={
            page:this.state.page1,
            size:this.state.pageSize1
        }
        getProblemTem(data).then(res=>{
            //  console.log(res);
             if(res.data.code ===0){
                  this.setState({
                    remend:[...res.data.data],
                    total1:res.data.total
                  })
             }else{
                 message.error(res.data.msg);
             }
        })
    }
    //随机分页
    randomPage =()=>{
       let maxPage = Math.ceil(this.state.total1/ this.state.pageSize1);
      let page = this.state.page1;
       let cur = page+=1;
     
       if(cur>maxPage){
           cur = 1;
       }
       this.setState({
           page1:cur
       },()=>{
            this.getProblemTem();
       })
    }
   
   

    componentDidMount(){
       this.getProblemTem();
       // this.onSearch(this.state.defaultValue);
    }
    render() {
        let {total,result,remend,defaultValue,page,pageSize} = this.state;
        return (
           <div className="wrap">
                  <Header/>
                  <div className={style.content}>
                        <div className={style.title}>
                            <Search placeholder="请输入问题" onSearch={this.onSearch} enterButton allowClear defaultValue={defaultValue}/>
                        </div>
                        <div className={style.result_content}>
                            <p>检索到{total}条结果</p>
                            <Row>
                                    <Col span={16}>
                                            <ul>
                                                    {
                                                       result.answers && result.answers.length>0 ? result.answers.map((item,key)=>{
                                                            return (<li style={{cursor:'pointer'}} key={key}>
                                                                            {/* <Tooltip title="双击搜索结果查看对应推理过程"> */}
                                                                            <span>{ (page-1)*pageSize +1 + key}. {item}</span>
                                                                            {/* </Tooltip> */}
                                                                 </li>)
                                                                    
                                                            
                                                        }):null
                                                    }
                                            </ul>
                                            <div className={style.item_one}>
                                                <h3>推理过程</h3>
                                                {
                                                   result.nodes && result.nodes.length>0 ?  <ReactEcharts option={this.getOption()} notMerge={true} lazyUpdate={true} style={{width: "100%", height: 400}}/>:null
                                                }
                                             </div>
                                            <Pagination defaultCurrent={1} total={total} onChange={this.onChange} defaultPageSize={5} pageSizeOptions={[5,10,15,20]} style={{marginTop:10,paddingBottom:10}} className/>
                                    </Col>
                                    <Col span={6} offset={2}>
                                       
                                       <div className={style.item_one}>
                                            <h3>
                                                <span>问题模板</span>
                                                <span onClick={this.randomPage} style={{cursor:'pointer'}}>换一批</span>
                                            </h3>
                                            <ul>
                                                {
                                                    remend.slice(0,10).map((item,key)=>{
                                                        return <li key={key}>
                                                            {key+1}. <span dangerouslySetInnerHTML={{ __html: item.qa}}></span>
                                                        </li>
                                                    })
                                                }
                                                <li style={{display:'flex',justifyContent:'center',marginTop:10}}>
                                                   <Addproblem getProblemTem = {this.getProblemTem}/>
                                                </li>
                                            </ul>
                                       </div>
                                    </Col>
                            </Row>
                        </div>
                    </div>
           </div>
        )
    }
}
