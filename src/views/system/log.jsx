import React, { Component } from 'react'
import { Table,Input,Select,Button,Row,Col, } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
import {LogData} from '../../axios/axios';
const { Option } = Select;
export default class Log extends Component {
    state={
        page:1,
        pageSize:10,
        total:0,
        TableData:[],
        columns:[
            {
                title: '用户名',
                dataIndex: 'uname',
                key: 'uname',
                width:140
              },
              {
                title: '用户身份',
                // dataIndex: 'role',
                key: 'role',
                width:140,
                render:(record)=>{
                    return  (<div style={{width:80}}>{record.role === 'ADMIN'?'管理员':'操作员'}</div>)
                 }
              },
              {
                title: '方式',
                dataIndex: 'method',
                key: 'method',
                width:140
              },
              {
                title: '访问路径',
                dataIndex: 'path',
                key: 'path',
                ellipsis: true,
              },
              {
                title: '操作时间',
                dataIndex: 'startTime',
                key: 'startTime',
              },
              {
                title: '操作记录',
                // dataIndex: 'params',
                key: 'params',
                render:(record)=>{
                   return  (<span>{JSON.stringify(record.params)}</span>)
                }
              },
              
        ],
        types:[
            {
                label:"GET",
                value:'GET'
            },
            {
                label:"POST",
                value:'POST'
            },
            {
                label:"DELETE",
                value:'DELETE'
            }
        ],
        search:"",
        type:'',
    }
    
    //获取模板数据
    getTableData =()=>{
       let data ={
           page:this.state.page,
           size:this.state.pageSize,
           uname:this.state.search,
           method:this.state.type
       }
       LogData(data).then(res=>{
            // console.log(res);
            if(res.data.code === 0){
                this.setState({
                    TableData:res.data.data.map(item=>{
                          return {
                                ...item,
                                key:item.id
                          }
                    }),
                    total:res.data.total
                })
            }
       })
    }
     //页码改变
     changePage = (current)=>{
        this.setState({
            page:current
        },()=>{
           this.getTableData()
        })
    }
    //页数改变
    onShowSizeChange = (current,pageSize)=>{
        this.setState({
            page:current,
            pageSize:pageSize
        },()=>{
           this.getTableData();
        })
    }
     //类别选择
     handleChange =(value)=>{
       this.setState({
            type:value,
            page:1
          })
     }
     //监听输入框的变化
     changeInput =(e)=>{
        this.setState({
            search:e.target.value,
            page:1
        })
     }
      //清除全部
      handleClear =()=>{
        this.setState({
             page:1,
             pageSize:10,
             search:"",
             type:''
         },()=>{
             this.getTableData();
         })
     }
    componentDidMount(){
       this.getTableData();
    }
    render() {
        let {columns,TableData,total,pageSize,types,page} = this.state;
      
        const paginationProps = {
            showSizeChanger: true,//设置每页显示数据条数
            showQuickJumper: false,
            current:page,
            showTotal: () => `共${total}条`,
            position:['bottomCenter'],
            pageSize: pageSize,
            total: total,  //数据的总的条数
            onChange: (current) => this.changePage(current), //点击当前页码
            onShowSizeChange: (current, pageSize) => {//设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
              
                this.onShowSizeChange(current, pageSize)
            }

        }
        return (
            <div>
                 <Row style={{marginBottom:15}}>
                     <Col span={24}>
                         <Input placeholder="请输入用户名" style={{width:200,marginRight:10}} value={this.state.search} onChange={this.changeInput}></Input>
                         <Select  style={{ width: 120,marginRight:10 }} onChange={this.handleChange} placeholder="请选择分类" value={this.state.type} allowClear="true">
                             {
                                types.map((item,key)=>{
                                    return  <Option value={item.value} key={key}>{item.label}</Option>
                                })
                            }
                          </Select>
                          <Button type="primary" onClick={()=>this.getTableData()} style={{marginRight:15}}>查询</Button>
                          <Button type="primary" onClick={()=>this.handleClear()}>清除</Button>
                     </Col>
                 </Row>
                <Table columns={columns} dataSource={TableData} bordered={true} pagination={paginationProps}/>
              
            </div>
        )
    }
}
