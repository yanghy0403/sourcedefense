import React, { Component } from 'react'
import { Table, Space,message,Modal,Row,Col,Input,Select,Button } from 'antd';
import {EntityDelete,EntitySearch,getEntityType} from '../../axios/axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { Option } = Select;
export default class Entity extends Component {
    state={
        page:1,
        pageSize:10,
        total:0,
        search:'',
        type:'',//实体所在的分类
        TableData:[],
        columns:[
            {
                title: '实体名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                key: 'action',
                render:record=>{
                    return  <Space size="middle">
                        {
                            record.entityType === 2 ? 
                            <span style={{color:'#ddd',cursor:'pointer'}} >删除</span> : 
                            <span style={{color:'#1890ff',cursor:'pointer'}} onClick={()=>this.showConfirm(record)}>删除</span>
                        }
                              
                            </Space>
                }
            }
        ],
        entityType:[],//实体类别数据
        subjects:[
            {
                label:'全部',
                value:0
            },
            {
                label:'原有实体',
                value:2
            },
            {
                label:'新增实体',
                value:1
            }
        ],
       subject:0,
    }
    showConfirm=(record)=>{
        let that = this;
       confirm({
         title: '你确定要删除吗?',
         icon: <ExclamationCircleOutlined />,
        
         onOk() {
           that.handleDelete(record);
         },
         onCancel() {},
       });
    }
    //删除
    handleDelete =(record)=>{
         
          let data={
            identity:record.id,
            name:record.name
          }
          EntityDelete(data).then(res=>{
                if(res.data.code ===0){
                      message.success(`${record.name}删除成功`);
                      this.setState({
                        page:1
                      },()=>{
                        this.getTableData();
                      })
                     
                }else{
                    message.error(res.data.msg);
                }
          })
    }
    //获取模板数据
    getTableData =()=>{
       let data ={
           page:this.state.page,
           size:this.state.pageSize,
           q:this.state.search,
           allowEmptyQ:1,
           label:this.state.type,
           entityType:this.state.subject
       }
       EntitySearch(data).then(res=>{
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
            type:value
         })
    }
     //分类选择
     handleChange1 =(value)=>{
        this.setState({
             subject:value
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
     //监听输入框的变化
     changeInput =(e)=>{
        this.setState({
            search:e.target.value
        })
     }
     //清除全部
     handleClear =()=>{
        this.setState({
             page:1,
             pageSize:10,
             search:"",
             type:'',
             subject:0
         },()=>{
             this.getTableData();
         })
     }
    componentDidMount(){
        this.getEntityType();
       this.getTableData();
    }
    render() {
        let {columns,TableData,total,pageSize,entityType,subjects} = this.state;
       
        const paginationProps = {
            showSizeChanger: true,//设置每页显示数据条数
            showQuickJumper: false,
            current: this.state.page,
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
                     <Col span={24} style={{display:'flex'}}>
                         <Input placeholder="请输入实体名称" style={{width:200,marginRight:10}} value={this.state.search} onChange={this.changeInput}></Input>
                          <div>
                                实体分类 :
                                <Select  style={{ width: 120,marginRight:10,marginLeft:5 }} onChange={this.handleChange} placeholder="请选择分类" value={this.state.type} allowClear="true">
                                    {
                                        entityType.map((item,key)=>{
                                        return  <Option value={item.label} key={key}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                          </div>
                          <div>
                               实体类型 ：
                               <Select  style={{ width: 120,marginRight:10,marginLeft:5 }} onChange={this.handleChange1} placeholder="请选择分类" value={this.state.subject} allowClear="true">
                                    {
                                        subjects.map((item,key)=>{
                                        return  <Option value={item.value} key={key}>{item.label}</Option>
                                        })
                                    }
                                </Select>
                          </div>
                          <Button type="primary" onClick={()=>this.getTableData()} style={{marginRight:15}}>查询</Button>
                          <Button type="primary" onClick={()=>this.handleClear()}>清除</Button>
                     </Col>
                 </Row>
                <Table columns={columns} dataSource={TableData} bordered={true} pagination={paginationProps}/>
              
            </div>
        )
    }
}
