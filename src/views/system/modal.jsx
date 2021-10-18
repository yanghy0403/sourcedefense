import React, { Component } from 'react'
import {Row,Col,Table,Button,Space,Modal,Form, Input} from 'antd';

import {PlusOutlined} from '@ant-design/icons';
const { TextArea } = Input;

const layout = {
    labelCol: { span: 4},
    wrapperCol: { span: 20 },
  };
//添加模型
const Mymodal = ()=>{
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [form] = Form.useForm();
  
    const showModal = () => {
      setVisible(true);
    };
  
    const handleOk = () => {
        form.submit();
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    };
  
    const handleCancel = () => {
     
      setVisible(false);
    };
    // const handleChange =(value)=>{
    //     console.log(value);
    // }
    const onFinish=(value)=>{
        console.log(value);
        form.resetFields();
   }
    return (
      <>
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
           添加模型
        </Button>
        <Modal
          title="添加新模型"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
           <Form form={form} onFinish={onFinish} initialValues={{"permission":'1'}} {...layout}>
                <Form.Item label={'模型名称'} name="name">
                    <Input placeholder="请输入模型名称"/>
                </Form.Item>
                <Form.Item label={'模型描述'} name="desc">
                    <TextArea rows={4} placeholder="模型描述"/>
                </Form.Item>   
            
            </Form>
          
        </Modal>
      </>
    );
  };



export default class SystemModal extends Component {
    state={
        columns:[
            {
                title:"序号",
                width:80,
                align:'center',
                render:(text,record,index)=>`${index+1}`
            },{
                title:"模型名称",
                dataIndex:'name',
                key:'name',
                align:'center',
            },
            {
                title:"模型描述",
                dataIndex:'desc',
                key:'desc',
                align:'center',
            },
            {
                title:"创建时间",
                dataIndex:'createdate',
                key:'createdate',
                align:'center',
            },
            {
                title:"操作",
               key:'action',
               align:'center',
               render:(record)=>(
                     <Space size="middle">
                         <span style={{color:'#1890ff'}}>修改</span>
                         <span style={{color:'#1890ff'}}>删除</span>
                     </Space>
               )
            }
        ],
        tableData:[
            { 
                key:"1",
                name:'测试系统1',
                desc:'测试数据',
                createdate:'2021-04-09'
            }
        ],
        page:1,
        pageSize:10,
        total:10
    }
     //页码改变
     changePage = (current)=>{

    }
    //页数改变
    onShowSizeChange = (current,pageSize)=>{

    }
    render() {
        let {tableData,columns,total,pageSize} = this.state;
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
                 <Row>
                      <Col span={24} style={{display:"flex",justifyContent:"flex-end",alignItems:"center",marginBottom:20}}>
                         <Mymodal/>
                      </Col>
                 </Row>
                 <Row>
                       <Col span={24}>
                             <Table columns={columns} dataSource={tableData} bordered={true} pagination={paginationProps}></Table>
                       </Col>
                 </Row>
            </div>
        )
    }
}
