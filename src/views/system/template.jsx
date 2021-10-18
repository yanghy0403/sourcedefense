import React, { Component } from 'react'
import { Table, Space,message,Modal } from 'antd';
import {getProblemTem,temDelete} from '../../axios/axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
export default class Template extends Component {
    state={
        page:1,
        pageSize:10,
        total:0,
        TableData:[],
        columns:[
            {
                title: '问题',
                dataIndex: 'raw_qa',
                key: 'raw_qa',
            },
            {
                title: '操作',
                key: 'action',
                render:record=>{
                    return  <Space size="middle">
                               <span style={{color:'#1890ff',cursor:'pointer'}} onClick={()=>this.showConfirm(record)}>删除</span>
                            </Space>
                }
            }
        ]
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
              id:record.id
          }
          temDelete(data).then(res=>{
                if(res.data.code ===0){
                      message.success('问题删除成功');
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
           size:this.state.pageSize
       }
       getProblemTem(data).then(res=>{
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
    componentDidMount(){
       this.getTableData();
    }
    render() {
        let {columns,TableData,total,pageSize} = this.state;
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
                <Table columns={columns} dataSource={TableData} bordered={true} pagination={paginationProps}/>
              
            </div>
        )
    }
}
