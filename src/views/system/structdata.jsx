import React, { Component } from 'react'
import { Table, Space,message,Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {getTableList,DeleteTableData,parsingData} from '../../axios/axios';
const { confirm } = Modal;
export default class Structdata extends Component {
    state={
        page:1,
        pageSize:10,
        total:0,
        TableData:[],
        columns:[
            {
                title: '表名',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '原表名',
                dataIndex: 'origin_name',
                key: 'origin_name',
              },
              {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
              },
                {
                    title: '操作',
                    key: 'action',
                    render:record=>{
                        return  <Space size="middle">
                                    <span style={{color:'#1890ff',cursor:'pointer'}} onClick={()=>this.handleDown(record)}>下载</span>
                                    <span style={{color:'#1890ff',cursor:'pointer'}} onClick={()=>this.showConfirm(record)}>删除</span>
                                    <span style={{color:'#1890ff',cursor:'pointer'}} onClick={()=>this.handleParsing(record)}>解析</span>
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
            name:record.name
          }
          DeleteTableData(data).then(res=>{
                if(res.data.code ===0){
                      message.success(`${record.name}文件删除成功`);
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
       getTableList(data).then(res=>{
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
    //解析
    handleParsing = (record)=>{
        // console.log(record);
        let data={
            name:record.name
        }
        parsingData(data).then(res=>{
            // console.log(res);
            if(res.data.code ===0){
                message.success(record.name + '解析成功');
            }else{
                message.error(res.data.msg);
            }
        })
    }
     //下载结构化数据
   handleDown =(record)=>{
    let baseurl = process.env.REACT_APP_URL;
    let url=`${baseurl}/defence/kf/struct/download?name=${record.name}`;
    window.open(url);
 }
    componentDidMount(){
       this.getTableData();
    }
    render() {
        let {columns,TableData,total,pageSize} = this.state;
        const paginationProps = {
            showSizeChanger: true,//设置每页显示数据条数
            showQuickJumper: false,
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
