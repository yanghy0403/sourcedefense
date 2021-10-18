import React, { Component } from 'react'
import {Table,Row,Col,Button,Space,Modal,Form, Input,message  } from 'antd';
import {userList,adduser,Resetpwd} from '../../axios/axios'
// const { Option } = Select;

const layout = {
    labelCol: { span: 4},
    wrapperCol: { span: 20 },
  };
  //添加用户
const Mymodal = (props)=>{
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [form] = Form.useForm();
  
    const showModal = () => {
      setVisible(true);
    };
  
    const handleOk = () => {
        form.submit();
      setConfirmLoading(true);
    
    };
  
    const handleCancel = () => {
     
      setVisible(false);
    };
   
    const onFinish=(value)=>{
      
        let data={
             username:value.userName,
            password:value.password,
            role:'OPERATOR'
        }
        adduser(data).then(res=>{
           setVisible(false);
           setConfirmLoading(false);
            // console.log(res);
            if(res.data.code ===0){
                 message.success('用户新增成功');
                 form.resetFields();
                props.getTabellist();
            }else{
                message.error(res.data.msg);
            }
        })
       
   }
    return (
      <>
        <Button type="primary" onClick={showModal}>
           添加新用户
        </Button>
        <Modal
          title="添加新用户"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
           <Form form={form} onFinish={onFinish} initialValues={{"permission":'1'}} {...layout}>
                {/* <Form.Item label={'用户权限'} name="permission">
                  <Select >
                        <Option value="1">普通用户</Option>
                        <Option value="2">系统管理员</Option>
                    </Select>
                </Form.Item> */}
                <Form.Item label={'用户名'} name="userName">
                  <Input placeholder=""/>
                </Form.Item>   
                <Form.Item label={'密码'} name="password">
                  <Input placeholder=""/>
                </Form.Item>   
            </Form>
          
        </Modal>
      </>
    );
  };

//密码重置
const Resetpassword = (props)=>{
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
      form.submit();
    setConfirmLoading(true);
  
  };

  const handleCancel = () => {
   
    setVisible(false);
  };
 
  const onFinish=(value)=>{
      
      let data={
         uid:props.record.id,
          password:value.cofpassword
      }
     
      Resetpwd(data).then(res=>{
         setVisible(false);
         setConfirmLoading(false);
          console.log(res);
          if(res.data.code ===0){
               message.success('密码重置成功');
               form.resetFields();
              props.getTabellist();
          }else{
              message.error(res.data.msg);
          }
      })
     
 }
  return (
    <>
        <span onClick={showModal} style={{color:'#1890ff',cursor:'pointer'}}>密码重置</span>
      <Modal
        title="确定新密码"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
         <Form form={form} onFinish={onFinish} {...layout}>
            
              <Form.Item label="" name="cofpassword">
                <Input.Password placeholder=""/>
              </Form.Item>   
             
          </Form>
        
      </Modal>
    </>
  );
};

export default class Permission extends Component {
    state={
        tableData:[
            {
               name:'张三',
               key:"1",
               date:'20201-03-08',
               permission:"普通用户",
            },
            {
                name:'李四',
                key:"2",
                date:'20201-03-08',
                permission:"系统管理员",
             }
        ],
        column:[
            {
                title:'用户名',
                dataIndex:'username',
                key:'username',
                align:'center'
            },
            {
                title:'操作时间',
                dataIndex:'updateTime',
                key:'updateTime',
                align:'center'
            },
            {
                title:'角色类型',
                dataIndex:'roleName',
                key:'roleName',
                align:'center'
            },
            {
                title:'操作',
                // dataIndex:'action',
                key:'action',
                align:'center',
                render:(Text,record,index)=>(
                    <Space size="middle">
                       
                        <Resetpassword record={record} getTabellist={this.getTabellist}></Resetpassword>
                    </Space>
                )
            }
        ],
        total:100,
        pageSize:10,
        current:1,
        inputval:"",//输入框的值
    }
    //页码改变
    changePage = (current)=>{
         this.setState({
             page:current
         },()=>{
             this.getTabellist();
         })
    }
    //页数改变
    onShowSizeChange = (current,pageSize)=>{
          this.setState({
            page:current,
            pageSize:pageSize
        },()=>{
            this.getTabellist();
        })
    }
    //获取列表数据
    getTabellist =()=>{
       let data= {
            page:this.state.current,
            size:this.state.pageSize,
       }
       if(this.state.inputval !== ''){
           data.username = this.state.inputval;
       }
       userList(data).then(res=>{
          //  console.log(res);
           if(res.data.code ===0){
               this.setState({
                   tableData:res.data.data.map(item=>{
                       return {
                            ...item,
                            key:item.id,
                            roleName:item.role ==="ADMIN" ? '管理员':'操作员'
                       }
                   }),
                   total:res.data.total
               })
           }
       })
    }
    //修改密码
    handleEdit= (record)=>{
       console.log(record);
    }
    //删除
    handleRemove= (record,index)=>{
       console.log(record,index);
    }
    //监听输入框变化
    handleInput =(e)=>{
        this.setState({
          inputval:e.target.value
        })
    }
    //添加新用户
    handleAdd = ()=>{

    }
    componentDidMount(){
        this.getTabellist();
    }
    render() {
        let {tableData,column,total,pageSize} = this.state;
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
                     <Col span={24} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                          <div>
                              <Input placeholder="请输入用户名" style={{width:300,marginRight:15}} onChange={e=>this.handleInput(e)} allowClear={true}/>
                              <Button type="primary" onClick={()=>this.getTabellist()}>查询</Button>
                          </div>
                            <Mymodal getTabellist={this.getTabellist}/>
                     </Col>
                 </Row>
                  <Row>
                        <Col span={24}>
                           <Table columns={column} dataSource={tableData} bordered={true} pagination={paginationProps}/>
                        </Col>
                    </Row>
            </div>
        )
    }
}
